import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { database } from './db.js';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly db = database;

  async onModuleDestroy(): Promise<void> {
    await this.db.close();
  }
}
