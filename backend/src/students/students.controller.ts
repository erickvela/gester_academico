import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../common/auth.types.js';
import { AccessTokenGuard } from '../common/access-token.guard.js';
import { RolesGuard } from '../common/roles.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto.js';
import { StudentsService } from './students.service.js';

@ApiTags('Alumnos')
@ApiBearerAuth()
@Controller('students')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles('ADMIN', 'TEACHER')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Consultar alumnos' })
  list(@Query('offset') offset?: string, @Query('limit') limit?: string) {
    return this.studentsService.list(offset, limit);
  }

  @Post()
  @Roles('ADMIN', 'TEACHER')
  create(@Body() input: CreateStudentDto, @Req() request: AuthenticatedRequest) {
    return this.studentsService.create(input, request.user.sub, request.ip);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: UpdateStudentDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.studentsService.update(id, input, request.user.sub, request.ip);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body('status') status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED',
    @Req() request: AuthenticatedRequest,
  ) {
    return this.studentsService.update(id, { status }, request.user.sub, request.ip);
  }
}
