import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Iniciar sesión' })
  login(@Body() input: LoginDto) {
    return this.authService.login(input);
  }

  // Endpoint para registrar docentes
  @Post('teachers')
  @ApiOperation({ summary: 'Crear cuenta de docente y enviar credenciales por correo' })
  createTeacher(@Body() dto: CreateTeacherDto) {
    return this.authService.createTeacher(dto);
  }

  // Endpoint para solicitar la contraseña temporal por correo
  @Post('reset-password')
  @ApiOperation({ summary: 'Solicitar restablecimiento de contraseña' })
  resetPassword(@Body() body: { email: string }) {
    return this.authService.resetPassword(body.email);
  }
}