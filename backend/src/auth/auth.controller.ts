import { Body, Controller, Post, Patch, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js'; // <-- Importa el nuevo DTO
import { AccessTokenGuard } from '../common/access-token.guard.js';

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

  // Endpoint para registrar docentes usando el DTO
  @Post('teachers')
  @ApiOperation({ summary: 'Crear cuenta de docente y enviar credenciales por correo' })
  createTeacher(@Body() dto: CreateTeacherDto) { // <-- Usamos el DTO tipado
    return this.authService.createTeacher(dto);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @Patch('change-password')
  @ApiOperation({ summary: 'Cambio obligatorio de contraseña en el primer inicio de sesión' })
  changePassword(@Req() req: any, @Body() body: { oldPass: string; newPass: string }) {
    const userId = req.user.sub;
    return this.authService.changePassword(userId, body.oldPass, body.newPass);
  }
}