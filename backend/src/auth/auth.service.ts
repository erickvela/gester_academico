import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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
        mustChangePassword: user.mustChangePassword,
      },
    };
  }

  // 1. Agrega este método
  async createTeacher(dto: { email: string; firstName: string; lastName: string }) {
    const emailNormalized = dto.email.trim().toLowerCase();
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(tempPassword, 10);

    const newTeacher = await this.prisma.db.orm.public.User.create({
      email: emailNormalized,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: 'TEACHER',
      mustChangePassword: true,
      isActive: true,
    });

    await this.mailService.sendTeacherCredentials(emailNormalized, tempPassword);

    return {
      message: 'Docente creado exitosamente y credenciales enviadas por correo.',
      teacherId: newTeacher.id,
    };
  }

  // 2. Agrega este método
  async changePassword(userId: string, oldPass: string, newPass: string) {
    const user = await this.prisma.db.orm.public.User
      .where({ id: userId })
      .first();

    if (!user) throw new UnauthorizedException('Usuario no encontrado.');

    const isMatch = await compare(oldPass, user.password);
    if (!isMatch) throw new BadRequestException('La contraseña actual es incorrecta.');

    const hashedNewPassword = await hash(newPass, 10);

    await this.prisma.db.orm.public.User
      .where({ id: userId })
      .update({
        password: hashedNewPassword,
        mustChangePassword: false,
      });

    return { message: 'Contraseña actualizada correctamente. Acceso concedido.' };
  }
}