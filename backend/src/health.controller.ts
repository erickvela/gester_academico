import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Estado')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Comprobar que la API está disponible' })
  check() {
    return { status: 'ok' };
  }
}
