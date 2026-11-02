#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3d0ed7d588f2c7a5e70c7bc623e8a93d307f473d4902a767878cbe6e45b07841/contract';
import startContract from '../../snapshots/3d0ed7d588f2c7a5e70c7bc623e8a93d307f473d4902a767878cbe6e45b07841/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/db224fb3ee79a53809729857876f0e0d1b1f60ecc1972e51f08dd22d5f8879f4/contract';
import endContract from '../../snapshots/db224fb3ee79a53809729857876f0e0d1b1f60ecc1972e51f08dd22d5f8879f4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'users',
        column: col('mustChangePassword', 'bool', {
          notNull: true,
          default: lit(true),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
