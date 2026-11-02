import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async record(userId: string, action: string, ipAddress?: string): Promise<void> {
    await this.prisma.db.orm.public.AuditLog.create({
      userId,
      action,
      details: null,
      ipAddress: ipAddress ?? null,
    });
  }
}
