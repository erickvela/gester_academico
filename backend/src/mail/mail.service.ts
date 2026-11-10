import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env['MAIL_HOST'],
    port: Number(process.env['MAIL_PORT']),
    secure: false,
    auth: {
      user: process.env['MAIL_USER'],
      pass: process.env['MAIL_PASS'],
    },
  });

  async sendTeacherCredentials(email: string, tempPassword: string) {
    const loginUrl = `${process.env['FRONTEND_ORIGIN'] ?? 'http://localhost:4200'}/auth/login`;

    await this.transporter.sendMail({
      from: `"AulaBase Soporte" <${process.env['MAIL_FROM']}>`,
      to: email,
      subject: 'Bienvenido a AulaBase - Credenciales de Acceso',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #4F46E5;">¡Bienvenido a AulaBase!</h2>
          <p>Se ha registrado una cuenta para ti como docente en el sistema académico.</p>
          <p>Tus credenciales de acceso temporales son:</p>
          <ul style="background: #F3F4F6; padding: 15px; border-radius: 5px; list-style: none;">
            <li><strong>Correo:</strong> ${email}</li>
            <li><strong>Contraseña Temporal:</strong> <code style="background: #E5E7EB; padding: 2px 6px; border-radius: 4px;">${tempPassword}</code></li>
          </ul>
          <p>Por seguridad, al iniciar sesión por primera vez el sistema te exigirá cambiar esta contraseña.</p>
          <p><a href="${loginUrl}" style="background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Iniciar Sesión</a></p>
        </div>
      `,
    });
  }
}