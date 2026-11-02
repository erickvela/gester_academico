import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../common/access-token.guard.js';
import type { AuthenticatedRequest } from '../common/auth.types.js';
import { RolesGuard } from '../common/roles.guard.js';
import { Roles } from '../common/roles.decorator.js';
import { ReportsService } from './reports.service.js';

@ApiTags('Reportes')
@ApiBearerAuth()
@Controller('reports')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles('ADMIN', 'TEACHER')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Resumen académico general' })
  overview(@Req() request: AuthenticatedRequest) {
    return this.reportsService.overview(request.user);
  }

  @Get('courses')
  @ApiOperation({ summary: 'Resumen de calificaciones por curso' })
  courses(@Req() request: AuthenticatedRequest) {
    return this.reportsService.coursePerformance(request.user);
  }
}
