import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import type { AuthenticatedRequest, AuthenticatedUser } from './auth.types.js';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers['authorization'];
    const token = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : undefined;

    if (!token) {
      throw new UnauthorizedException('Se requiere una sesión válida.');
    }

    let claims: AuthenticatedUser;
    try {
      claims = await this.jwtService.verifyAsync<AuthenticatedUser>(token);
    } catch {
      throw new UnauthorizedException('La sesión no es válida o ha expirado.');
    }

    const account = await this.prisma.db.orm.public.User.where({ id: claims.sub }).first();
    if (!account || !account.isActive) {
      throw new UnauthorizedException('La cuenta no está activa.');
    }

    request.user = {
      sub: account.id,
      email: account.email,
      role: account.role,
    };
    return true;
  }
}
