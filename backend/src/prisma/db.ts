import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from '../../prisma/contract.d.js';
import contractJson from '../../prisma/contract.json' with { type: 'json' };

export const contract = contractFromJson<Contract>(contractJson);
export const database = postgres({
  contract,
  url: process.env['DATABASE_URL'],
});
