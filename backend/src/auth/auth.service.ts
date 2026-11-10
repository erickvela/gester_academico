import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
import type { LoginDto } from './dto/login.dto.js';
import { MailService } from '../mail/mail.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  private generateRandomPassword(length = 12): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let rawPassword = '';
    for (let i = 0; i < length; i++) {
      rawPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return rawPassword;
  }

  async login(input: LoginDto) {
    const user = await this.prisma.db.orm.public.User
      .where({ email: input.email.trim().toLowerCase() })
      .first();

    if (!user || !user.isActive || !(await compare(input.password, user.password))) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async createTeacher(dto: { email: string; firstName: string; lastName: string }) {
    const emailNormalized = dto.email.trim().toLowerCase();
    const tempPassword = this.generateRandomPassword(12);
    const hashedPassword = await hash(tempPassword, 10);

    const newTeacher = await this.prisma.db.orm.public.User.create({
      email: emailNormalized,
      password: hashedPassword,
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      role: 'TEACHER',
      isActive: true,
    });

    await this.mailService.sendTeacherCredentials(emailNormalized, tempPassword);

    return {
      message: 'Docente creado exitosamente y credenciales enviadas por correo.',
      teacherId: newTeacher.id,
    };
  }

  async resetPassword(email: string) {
    const emailNormalized = email.trim().toLowerCase();
    const user = await this.prisma.db.orm.public.User
      .where({ email: emailNormalized })
      .first();

    if (!user) {
      // Por seguridad, devolvemos un mensaje neutral para evitar que adivinen correos
      return { message: 'Si el correo existe, se enviaron las instrucciones.' };
    }

    const newTempPassword = this.generateRandomPassword(12);
    const hashedPassword = await hash(newTempPassword, 10);

    await this.prisma.db.orm.public.User
      .where({ email: emailNormalized })
      .update({ password: hashedPassword });

    await this.mailService.sendTeacherCredentials(emailNormalized, newTempPassword);

    return { message: 'Correo de recuperación enviado exitosamente.' };
  }
}