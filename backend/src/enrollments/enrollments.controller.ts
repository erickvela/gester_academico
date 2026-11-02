import { Body, Controller, Get, ParseUUIDPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../common/auth.types.js';
import { AccessTokenGuard } from '../common/access-token.guard.js';
import { RolesGuard } from '../common/roles.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { EnrollmentsService } from './enrollments.service.js';

@ApiTags('Inscripciones')
@ApiBearerAuth()
@Controller('enrollments')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles('ADMIN', 'TEACHER')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Consultar inscripciones de un curso' })
  list(
    @Query('courseId', new ParseUUIDPipe()) courseId: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.enrollmentsService.list(courseId, request.user);
  }

  @Post()
  @ApiOperation({ summary: 'Inscribir un alumno en un curso' })
  create(@Body() input: CreateEnrollmentDto, @Req() request: AuthenticatedRequest) {
    return this.enrollmentsService.create(input, request.user, request.ip);
  }
}
