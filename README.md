# AulaBase

**AulaBase** es un proyecto académico para organizar cursos, alumnos, inscripciones y punteos desde una sola plataforma. Incluye una página de presentación, un panel interno para docentes y administración, reportes básicos y control de accesos por rol.

> El nombre es provisional. La carta de aceptación incluida es una plantilla: la institución y el asesor deben revisar y completar sus datos antes de firmarla.

## Tecnologías

- **Frontend:** Angular 22, TypeScript y SCSS.
- **Backend:** NestJS 12, REST API y Swagger.
- **Base de datos:** PostgreSQL.
- **ORM:** Prisma 8 RC (se conserva la versión ya configurada en este proyecto).

## Funcionalidades

- Acceso de docentes y administradores.
- Registro y seguimiento del estado de alumnos y cursos.
- Inscripciones de alumnos en cursos.
- Registro de punteos, valor máximo y ponderación.
- Indicadores y exportación CSV de un resumen por curso.
- Administración de cuentas y roles para el personal autorizado.
- Restricción de docentes a sus propios cursos y a los reportes relacionados.
- Validación de entrada, protección de contraseñas y bitácora de acciones importantes.

## Requisitos

- Node.js 22.18 o superior (el CLI Prisma instalado requiere Node 22.18 o 24.11+).
- npm.
- PostgreSQL accesible desde el backend.

## Configuración local en Windows

### 1. Configura PostgreSQL y el backend

La carpeta `backend` ya contiene `DATABASE_URL` en su `.env` local. No reemplaces ese valor si es el de tu base de datos. Agrega al mismo archivo las demás variables de `backend/.env.example`:

```env
JWT_SECRET="una-clave-aleatoria-de-al-menos-32-caracteres"
PORT=3000
FRONTEND_ORIGIN="http://localhost:4200"
ADMIN_EMAIL="admin@tu-institucion.edu"
ADMIN_PASSWORD="una-contrasena-temporal-de-al-menos-12-caracteres"
```

Mantén `.env` fuera de Git y no compartas sus valores. El API necesita `JWT_SECRET` para iniciar.

```powershell
Set-Location backend
npm install
npm exec -- prisma contract emit
npm exec -- prisma db init --dry-run
```

Revisa el resultado del modo de prueba. Si la base de datos es la correcta y el plan coincide con lo esperado, inicializa el esquema:

```powershell
npm exec -- prisma db init
npm run seed:admin
npm run start:dev
```

`db init` aplica operaciones aditivas para que la base coincida con el contrato. En la base local `localhost:5432/backend_app_db` ya se aplicó y verificó el único cambio pendiente (`courses.isActive`). Si usas otra base, revisa primero su propio `--dry-run`. Si el esquema presenta incompatibilidades, detente y revisa el diagnóstico; no borres ni reinicies la base para resolverlo.

La cuenta inicial se crea con `ADMIN_EMAIL` y `ADMIN_PASSWORD`. El script falla si ya existe esa cuenta y no modifica contraseñas existentes. Después de entrar, crea las cuentas de docentes desde **Accesos**.

### 2. Inicia Angular

En otra terminal:

```powershell
Set-Location frontend
npm install
npm start
```

Abre `http://localhost:4200`. La documentación de la API está en `http://localhost:3000/api/docs`; su comprobación de disponibilidad es `http://localhost:3000/api/v1/health`.

## Migraciones posteriores

El esquema actual añade `Course.isActive` para archivar cursos sin borrar su historial. Se generó una migración aditiva en `backend/migrations/app/20261101T0115_add_course_active_flag`. La base local se actualizó con `db init` (operación aditiva) y se verificó contra el contrato; el paquete de migración queda disponible para otros entornos que sigan esa cadena.

Para una base nueva, `prisma db init` incorpora el contrato actual. Para una base que ya sigue la cadena de migraciones, revisa primero lo que se aplicaría y luego ejecuta la migración:

```powershell
npm exec -- prisma db migrate --show
npm exec -- prisma db migrate
```

Al cambiar el contrato en otra ocasión, usa este orden:

```powershell
npm run prisma:emit
npm exec -- prisma migration plan --name nombre-del-cambio
npm exec -- prisma db migrate --show
npm exec -- prisma db migrate
```

Revisa siempre los artefactos generados y el plan antes de modificar una base compartida o productiva.

## Pruebas y compilación

```powershell
# En backend
npm run test
npm run build

# En frontend
npm test
npm run build
```

## Documentación del proyecto

- [Documentación funcional, técnica y de seguridad](./docs/documentacion-proyecto.md)
- [Carta modelo de aceptación del proyecto](./docs/carta-aceptacion-proyecto.md)

## Alcance actual y siguientes pasos

La versión actual es un MVP académico. El promedio de los reportes es la media de los puntajes capturados; la ponderación queda almacenada, pero todavía no se calcula una nota final ponderada. No incluye portal de autoservicio para alumnos, períodos académicos, recuperación de contraseñas ni importación masiva. Para uso institucional real se requiere, entre otras cosas, revisar políticas de privacidad, respaldos, despliegue HTTPS y un mecanismo de sesión en cookie HttpOnly.
