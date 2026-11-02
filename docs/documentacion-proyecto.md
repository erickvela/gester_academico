# AulaBase — documentación del proyecto

## 1. Datos generales

| Campo | Descripción |
|---|---|
| Nombre de trabajo | AulaBase |
| Tipo | Aplicación web de gestión académica |
| Institución | Por definir |
| Responsable del proyecto | Por completar |
| Asesor o catedrático | Por completar |
| Versión documentada | MVP inicial |

El nombre AulaBase es provisional y puede cambiarse con aprobación de la institución. Este documento describe una primera versión académica; no constituye una certificación de producción ni sustituye las políticas institucionales.

## 2. Planteamiento

La administración de cursos, alumnos, inscripciones y punteos en registros separados dificulta el seguimiento y la elaboración de reportes. AulaBase propone centralizar esos datos en una aplicación con acceso controlado para docentes y administración.

### Objetivo general

Desarrollar una aplicación web que facilite el registro y seguimiento de información académica mediante una interfaz Angular, una API NestJS y persistencia en PostgreSQL usando Prisma 8.

### Objetivos específicos

1. Registrar cursos y asignarles un docente responsable.
2. Mantener un directorio de alumnos con carné, correo y estado académico.
3. Relacionar alumnos y cursos mediante inscripciones.
4. Registrar evaluaciones y sus punteos, máximos y ponderaciones.
5. Presentar indicadores y reportes consultables por el personal autorizado.
6. Administrar cuentas de personal y permisos por rol.
7. Proteger los datos con autenticación, validación, autorización y auditoría.

## 3. Alcance funcional del MVP

### Módulos incluidos

- **Landing page:** presenta el propósito y los módulos principales.
- **Autenticación:** inicio de sesión para cuentas de personal activas.
- **Resumen:** total de alumnos, cursos activos, inscripciones, evaluaciones y promedio de punteos registrados.
- **Cursos:** creación, asignación de docente y activación/desactivación. Desactivar conserva la información histórica.
- **Alumnos:** creación, consulta y cambio de estado. Graduados no se eliminan ni se reactivan desde el control rápido.
- **Inscripciones:** relación única alumno-curso y consulta por curso.
- **Punteos:** evaluaciones asociadas a alumnos inscritos; el puntaje no puede exceder el máximo definido.
- **Reportes:** resumen del promedio de puntajes y cantidad de evaluaciones por curso, descargable como CSV.
- **Accesos:** creación, consulta y desactivación de cuentas de administración y docentes.

### Fuera del alcance actual

Portal de autoservicio para alumnos, recuperación de contraseñas, segundo factor, períodos/semestres, asistencia, importación masiva, edición de evaluaciones desde la interfaz, cálculo final ponderado, firma electrónica, notificaciones y despliegue productivo.

## 4. Roles y permisos

| Acción | Administración | Docente |
|---|:---:|:---:|
| Iniciar sesión | Sí | Sí |
| Consultar resumen y reportes | Institucional | Solo cursos propios |
| Consultar cursos | Todos | Solo cursos asignados |
| Crear cursos | Sí; asigna docente | Sí; queda asignado a sí mismo |
| Editar o desactivar cursos | Todos | Solo cursos propios |
| Registrar y actualizar alumnos | Sí | Sí |
| Inscribir alumnos | Sí | Solo en cursos propios |
| Crear y editar punteos | Sí | Solo en cursos propios |
| Crear/desactivar cuentas | Sí | No |

El esquema incluye el rol `STUDENT`, pero esta versión no proporciona cuentas de alumno ni una vista de autoservicio. La creación de cuentas en el panel solo permite `ADMIN` y `TEACHER`.

## 5. Modelo de datos

```text
User 1 ───── N Course
Student 1 ── N Enrollment N ── 1 Course
Student 1 ── N Grade      N ── 1 Course
User 1 ───── N AuditLog
```

| Entidad | Propósito y campos principales |
|---|---|
| `User` | Personal con acceso: correo único, nombre, hash de contraseña, rol y estado activo. |
| `Student` | Directorio: carné y correo únicos, nombre y estado `ACTIVE`, `INACTIVE` o `GRADUATED`. |
| `Course` | Código único, nombre, descripción, créditos, docente responsable y estado `isActive`. |
| `Enrollment` | Relaciona un alumno con un curso; la combinación alumno/curso no se duplica. |
| `Grade` | Evaluación de un alumno inscrito: título, `score`, `maxScore` y ponderación `percentage`. |
| `AuditLog` | Acción administrativa/académica, usuario responsable, fecha e IP cuando está disponible. No almacena contraseñas. |

## 6. Arquitectura y herramientas

```text
Navegador
  └── Angular 22 (landing, acceso, panel, formularios y CSV)
        └── REST /api/v1
              └── NestJS 12 (DTOs, guards, roles, servicios y auditoría)
                    └── Prisma 8 RC / @prisma/orm-postgres
                          └── PostgreSQL
```

Prisma 8 se conserva por decisión del propietario del proyecto. En esta versión, el esquema Prisma existente se adapta como fuente del contrato y Prisma emite `contract.json` y `contract.d.ts`. El acceso de la API usa el cliente del paquete `@prisma/orm-postgres`; no depende de `@prisma/client`.

### Estructura principal

```text
backend/
  prisma.config.ts
  prisma/schema.prisma
  prisma/contract.json             # generado: no editar a mano
  prisma/contract.d.ts             # generado: no editar a mano
  migrations/app/                  # migraciones Prisma 8
  src/
    auth/ access/ courses/ students/
    enrollments/ grades/ reports/
    common/ prisma/
frontend/
  src/app/core/                    # API, sesión y guards
  src/app/pages/                   # landing, acceso y panel
docs/
```

## 7. API REST

Prefijo: `/api/v1`. La documentación interactiva Swagger está disponible en `/api/docs`.

| Método | Ruta | Acceso | Función |
|---|---|---|---|
| `GET` | `/health` | Público | Disponibilidad del proceso API |
| `POST` | `/auth/login` | Público, limitado por tasa | Inicio de sesión |
| `GET` | `/access/users` | Administración | Listar cuentas |
| `POST` | `/access/users` | Administración | Crear cuenta |
| `PATCH` | `/access/users/:id/status` | Administración | Activar/desactivar cuenta |
| `GET`, `POST` | `/courses` | Administración/docente | Consultar/crear cursos |
| `PATCH` | `/courses/:id` | Administración/docente responsable | Actualizar curso |
| `GET`, `POST` | `/students` | Administración/docente | Consultar/registrar alumnos |
| `PATCH` | `/students/:id` | Administración/docente | Actualizar datos/estado |
| `GET`, `POST` | `/enrollments` | Administración/docente autorizado | Consultar/crear inscripciones |
| `GET`, `POST` | `/grades` | Administración/docente autorizado | Consultar/registrar punteos |
| `PATCH` | `/grades/:id` | Administración/docente del curso | Actualizar punteo |
| `GET` | `/reports/overview` | Administración/docente | Indicadores generales o del docente |
| `GET` | `/reports/courses` | Administración/docente | Promedio y cantidad de evaluaciones por curso |

Las listas de alumnos y cursos aceptan `offset` y `limit`; la interfaz muestra la primera página. Las inscripciones y evaluaciones se consultan por `courseId`.

## 8. Seguridad y privacidad

- Contraseñas con hash bcrypt (coste 12); nunca se devuelven en las respuestas del API.
- JWT de acceso de 15 minutos. El cliente conserva el token en `sessionStorage` durante la sesión.
- Guards de autenticación y rol en rutas protegidas; el docente queda limitado a sus propios cursos y reportes.
- DTOs con lista permitida de campos, transformación y rechazo de propiedades no declaradas.
- Validación de UUID, rangos de créditos, puntajes y ponderaciones.
- Límite general de solicitudes y límite más estricto para inicio de sesión.
- CORS limitado a `FRONTEND_ORIGIN`; Helmet para cabeceras HTTP.
- Contraseñas y cadenas de conexión en `.env`; nunca deben incorporarse al repositorio.
- Desactivación lógica en vez de eliminar cuentas, alumnos y cursos, para conservar trazabilidad.
- Eventos de creación y actualización de cuentas, cursos, alumnos, inscripciones y punteos en `AuditLog`.
- Descarga CSV con neutralización de fórmulas para evitar que celdas controladas por usuarios se interpreten como fórmulas.

**Antes de producción:** publicar exclusivamente bajo HTTPS, evaluar cookies `HttpOnly` y protección CSRF, establecer una política de CSP, limitar y monitorizar intentos de acceso, respaldar/restaurar PostgreSQL, definir retención de datos, revisar privacidad institucional y establecer un proceso de gestión de secretos.

## 9. Instalación, base de datos y ejecución

Los pasos reproducibles están en el [README del proyecto](../README.md). Resumen:

1. Configurar PostgreSQL y agregar `JWT_SECRET`, `FRONTEND_ORIGIN`, `ADMIN_EMAIL` y `ADMIN_PASSWORD` al `.env` local de `backend`, conservando `DATABASE_URL`.
2. Ejecutar `npm install` y `prisma contract emit` en `backend`.
3. Revisar `prisma db init --dry-run`; inicializar la base correcta con `prisma db init`.
4. Crear el usuario inicial con `npm run seed:admin`.
5. Iniciar API y Angular en terminales separadas.
6. Revisar `http://localhost:3000/api/docs` y `http://localhost:4200`.

La base local configurada se inspeccionó en modo `--dry-run`, recibió únicamente la columna aditiva `courses.isActive` y luego pasó `prisma db verify` con coincidencia de marcador y esquema. El paquete de migración generado para otros entornos está en `backend/migrations/app/20261101T0115_add_course_active_flag`.

## 10. Criterios de aceptación funcional del MVP

- Un usuario no autenticado no accede al panel ni a rutas protegidas del API.
- Una cuenta desactivada no inicia sesión; un docente no administra accesos ni ve cursos ajenos.
- El código de curso, el carné y el correo de alumno no se duplican.
- Un alumno solo recibe punteos después de inscribirse al curso.
- La validación no permite puntajes negativos ni superiores al máximo.
- Desactivar un curso o cuenta conserva los registros relacionados.
- Reportes y CSV coinciden con los datos que devuelve el API para los permisos del usuario.
- Los dos proyectos compilan y sus pruebas automatizadas terminan correctamente.

## 11. Limitaciones y evolución sugerida

1. Definir períodos académicos y asociarlos con cursos e inscripciones.
2. Definir fórmula institucional de nota final; validar cómo se acumulan las ponderaciones.
3. Añadir paginación visible, filtros y edición de alumnos, cursos y evaluaciones.
4. Decidir si el rol de alumno tendrá autenticación y acceso limitado a sus notas.
5. Añadir recuperación de acceso, auditoría de inicio de sesión y pruebas e2e.
6. Definir despliegue, backups, monitoreo y política de tratamiento de datos.
