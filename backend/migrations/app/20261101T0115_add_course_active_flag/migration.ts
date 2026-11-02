#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3d0ed7d588f2c7a5e70c7bc623e8a93d307f473d4902a767878cbe6e45b07841/contract';
import endContract from '../../snapshots/3d0ed7d588f2c7a5e70c7bc623e8a93d307f473d4902a767878cbe6e45b07841/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/6296e188d0429233fecbf69f812a2bbc0c0c052056be482760cf778cf409597b/contract';
import startContract from '../../snapshots/6296e188d0429233fecbf69f812a2bbc0c0c052056be482760cf778cf409597b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'courses',
        column: col('isActive', 'bool', {
          notNull: true,
          default: lit(true),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
