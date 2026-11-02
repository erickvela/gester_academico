import 'dotenv/config';
import { hash } from 'bcryptjs';
import { database } from '../src/prisma/db.js';

const email = process.env['ADMIN_EMAIL']?.trim().toLowerCase();
const password = process.env['ADMIN_PASSWORD'];

if (!email || !password || password.length < 12) {
  throw new Error('Configura ADMIN_EMAIL y un ADMIN_PASSWORD de al menos 12 caracteres en backend/.env.');
}

try {
  const existing = await database.orm.public.User.where({ email }).first();
  if (existing) {
    throw new Error('Ya existe una cuenta con ese correo; no se modificó.');
  }

  await database.orm.public.User.create({
    email,
    firstName: 'Administración',
    lastName: 'AulaBase',
    password: await hash(password, 12),
    role: 'ADMIN',
  });

  console.log('Cuenta administradora creada.');
} finally {
  await database.close();
}
