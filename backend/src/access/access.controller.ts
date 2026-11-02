import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../common/auth.types.js';
import { AccessTokenGuard } from '../common/access-token.guard.js';
import { RolesGuard } from '../common/roles.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { AccessService } from './access.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserStatusDto } from './dto/update-user-status.dto.js';

@ApiTags('Administración de accesos')
@ApiBearerAuth()
@Controller('access/users')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles('ADMIN')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Get()
  @ApiOperation({ summary: 'Listar cuentas de acceso' })
  list() {
    return this.accessService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una cuenta de acceso' })
  create(@Body() input: CreateUserDto, @Req() request: AuthenticatedRequest) {
    return this.accessService.create(input, request.user.sub, request.ip);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Activar o desactivar una cuenta' })
  updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: UpdateUserStatusDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.accessService.updateStatus(id, input.isActive, request.user.sub, request.ip);
  }
}
