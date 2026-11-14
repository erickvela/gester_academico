# AulaBase

Plataforma de gestión académica full-stack.

## Tecnologías

- **Frontend:** Angular 22+ y SCSS.
- **Backend:** NestJS 12 y Prisma ORM.
- **Base de datos e infraestructura:** PostgreSQL alojado en Supabase con políticas Row-Level Security (RLS) activas.

## Funcionalidades

- Inicio de sesión con interfaz Glassmorphism y recuperación de credenciales.
- Landing Page institucional y responsive.
- Portal académico adaptable con menú móvil e iconografía SVG.
- Gestión de cursos, alumnos, inscripciones, punteos y reportes.
- Administración de cuentas y roles.

## Despliegue en producción

El entorno productivo opera con despliegue continuo en Vercel (frontend) conectado al API en NestJS y la base de datos en Supabase:

1. Configurar `DATABASE_URL` con la URL del pooler de Supabase y las variables de entorno en `backend/.env`.
2. Verificar las políticas Row-Level Security (RLS) aplicadas en las tablas expuestas en Supabase.
3. Apuntar `frontend/src/environments/environment.prod.ts` a la URL pública del API y habilitar su origen en CORS dentro de NestJS.
4. En Vercel, establecer `frontend` como directorio raíz con el comando `npm run build` y directorio de salida `dist/aulabase/browser`.

## Desarrollo local

Configura `backend/.env` tomando como base `backend/.env.example`. Ejecuta `npm install` y `npm run start:dev` en `backend`, y `npm install` junto con `npm start` en `frontend`.

Detalles técnicos y funcionales: [docs/documentacion-proyecto.md](./docs/documentacion-proyecto.md).