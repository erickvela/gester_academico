# AulaBase

Aplicación web de gestión académica para administrar cursos, alumnos, inscripciones y punteos, con reportes y control de acceso por rol.

> **Nota sobre nombres:** el producto se llama **AulaBase**; el repositorio y el servicio de backend conservan el nombre técnico original `gester_academico`.

- **Frontend (Vercel):** `<https://gester-academico.vercel.app/>`
- **API (Render):** https://gester-academico-backend.onrender.com/api/v1
- **Swagger:** https://gester-academico-backend.onrender.com/api/docs

> El backend corre en Render; como está en plan gratuito, la primera solicitud tras un periodo de inactividad puede tardar varios segundos por el arranque en frío.

## Acceso para revisión

- Las credenciales de la cuenta de administración **no se publican en este repositorio**; se entregan al asesor de forma privada.
- El envío de credenciales por correo electrónico (al crear cuentas y en la recuperación de contraseña) **solo funciona con direcciones del dominio `miumg.edu.gt`**. Para probar estas funciones, usa un correo institucional de ese dominio.

## 1. Datos generales

| Campo | Descripción |
|---|---|
| Nombre de trabajo | AulaBase |
| Tipo | Aplicación web de gestión académica |
| Institución | Universidad Mariano Gálvez de Guatemala (Sede Amatitlán) |
| Responsable del proyecto | Erick Vela |
| Asesor o catedrático | Ing. Isaías Och |
| Versión documentada | 1.0, desplegada en producción con diseño responsive |

Este documento describe la arquitectura, el alcance funcional, la seguridad y el despliegue operativo de la plataforma académica **AulaBase**, actualmente desplegada y funcional en entorno productivo.

## 2. Planteamiento

La administración de cursos, alumnos, inscripciones y punteos en registros separados dificulta el seguimiento y la elaboración de reportes. AulaBase propone centralizar esos datos en una aplicación con acceso controlado para docentes y administración.

### Objetivo general

Desarrollar una aplicación web que facilite el registro y seguimiento de información académica mediante una interfaz Angular, una API NestJS y persistencia PostgreSQL usando Prisma 8.

### Objetivos específicos

1. Registrar cursos y asignarles un docente responsable.
2. Mantener un directorio de alumnos con carné, correo y estado académico.
3. Relacionar alumnos y cursos mediante inscripciones.
4. Registrar evaluaciones y sus punteos, máximos y ponderaciones.
5. Presentar indicadores y reportes consultables por el personal autorizado.
6. Administrar cuentas de personal y permisos por rol.
7. Proteger los datos con autenticación, validación, autorización y auditoría.

## 3. Alcance funcional del proyecto

### Módulos incluidos

- **Landing page:** presenta el propósito y los módulos principales con diseño responsive.
- **Autenticación:** inicio de sesión para cuentas de personal activas y recuperación de contraseña: el docente registrado por administración puede solicitarla con su correo registrado y el sistema le envía por correo una contraseña nueva para ingresar.
- **Resumen:** total de alumnos, cursos activos, inscripciones, evaluaciones y promedio de punteos registrados.
- **Cursos:** creación, asignación de docente y activación/desactivación. Desactivar conserva la información histórica.
- **Alumnos:** creación, consulta y cambio de estado. Los graduados no se eliminan ni se reactivan desde el control rápido.
- **Inscripciones:** relación única alumno-curso y consulta por curso.
- **Punteos:** evaluaciones asociadas a alumnos inscritos; el puntaje no puede exceder el máximo definido.
- **Reportes:** resumen del promedio de puntajes y cantidad de evaluaciones por curso, descargable como CSV desde la interfaz.
- **Accesos:** creación, consulta y desactivación de cuentas de administración y docentes. Al crear una cuenta, las credenciales se envían por correo; esta función solo opera con direcciones del dominio `miumg.edu.gt`.

### Interfaz y experiencia de usuario

- Diseño mobile-first con ajustes para escritorio, tableta y celular.
- Inicio de sesión con tarjeta translúcida estilo Glassmorphism, iconos SVG y control para mostrar u ocultar la contraseña.
- Landing page con hero, ilustración del panel académico y tarjetas de características.
- Portal con iconografía SVG uniforme en navegación, indicadores, acciones y estados vacíos.
- En escritorio, el portal usa una barra lateral; en móviles, presenta un menú desplegable con las secciones disponibles y una acción visible para cerrar sesión.
- Formularios, tarjetas y controles tienen áreas de interacción ampliadas y estados de enfoque.

### Fuera del alcance actual

Portal de autoservicio para alumnos, segundo factor de autenticación (2FA), gestión multi-período/semestres, control de asistencia, importación masiva de archivos y cálculo final ponderado automatizado.

## 4. Roles y permisos

| Acción | Administración | Docente |
|---|:---:|:---:|
| Iniciar sesión | Sí | Sí |
| Consultar resumen y reportes | Institucional | Solo cursos propios |
| Consultar cursos | Todos | Solo cursos asignados |
| Crear cursos | Sí; asigna docente | Sí; queda asignado a sí mismo |
| Editar o desactivar cursos | Todos | Solo cursos propios |
| Registrar y actualizar alumnos | Sí | Sí (directorio compartido, ver nota) |
| Inscribir alumnos | Sí | Solo en cursos propios |
| Crear y editar punteos | Sí | Solo en cursos propios |
| Crear/desactivar cuentas | Sí | No |

> **Nota:** el directorio de alumnos es institucional. Cualquier docente puede registrar y actualizar datos o estado de un alumno, aunque no esté inscrito en sus cursos. Las inscripciones y los punteos sí se restringen a los cursos propios.

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
  └── Angular 22 + TypeScript + SCSS (Vercel)
        └── REST /api/v1
              └── NestJS 12 (Render: DTOs, guards, roles, servicios y auditoría)
                    └── Prisma 8 / @prisma/orm-postgres
                          └── PostgreSQL (Supabase con RLS activo)
```

Stack implementado en producción: Angular 22 con TypeScript y SCSS en el frontend (Vercel), NestJS 12 y Prisma 8 en el backend (Render), y PostgreSQL administrado en Supabase con Row-Level Security (RLS) activo.

En esta versión, el esquema Prisma sirve como fuente del contrato y emite `contract.json` y `contract.d.ts`. El acceso de la API utiliza el cliente del paquete `@prisma/orm-postgres`.

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
| GET | `/health` | Público | Disponibilidad del proceso API |
| POST | `/auth/login` | Público, limitado por tasa | Inicio de sesión |
| GET | `/access/users` | Administración | Listar cuentas |
| POST | `/access/users` | Administración | Crear cuenta |
| PATCH | `/access/users/:id/status` | Administración | Activar/desactivar cuenta |
| GET, POST | `/courses` | Administración/docente | Consultar/crear cursos |
| PATCH | `/courses/:id` | Administración/docente responsable | Actualizar curso |
| GET, POST | `/students` | Administración/docente | Consultar/registrar alumnos |
| PATCH | `/students/:id` | Administración/docente | Actualizar datos/estado |
| GET, POST | `/enrollments` | Administración/docente autorizado | Consultar/crear inscripciones |
| GET, POST | `/grades` | Administración/docente autorizado | Consultar/registrar punteos |
| PATCH | `/grades/:id` | Administración/docente del curso | Actualizar punteo |
| GET | `/reports/overview` | Administración/docente | Indicadores generales o del docente |
| GET | `/reports/courses` | Administración/docente | Promedio y cantidad de evaluaciones por curso |

Las listas de alumnos y cursos aceptan `offset` y `limit`; la interfaz muestra la primera página. Las inscripciones y evaluaciones se consultan por `courseId`. El archivo CSV de reportes se genera en la interfaz a partir de los datos de `/reports/courses`.

## 8. Seguridad y privacidad

- Contraseñas con hash bcrypt (coste 12); nunca se devuelven en las respuestas del API.
- JWT de acceso de 15 minutos. El cliente conserva el token en `sessionStorage` durante la sesión.
- Guards de autenticación y rol en rutas protegidas; el docente queda limitado a sus propios cursos y reportes.
- DTOs con lista permitida de campos, transformación y rechazo de propiedades no declaradas.
- Validación de UUID, rangos de créditos, puntajes y ponderaciones.
- Límite general de solicitudes y límite más estricto para inicio de sesión.
- CORS limitado a `FRONTEND_ORIGIN`; Helmet para cabeceras HTTP.
- Contraseñas y cadenas de conexión gestionadas mediante variables de entorno fuera del repositorio.
- Desactivación lógica en vez de eliminar cuentas, alumnos y cursos, para conservar trazabilidad.
- Eventos de creación y actualización de cuentas, cursos, alumnos, inscripciones y punteos registrados en `AuditLog`.
- Descarga CSV con neutralización de fórmulas para evitar inyección de código en hojas de cálculo.

### Seguridad a nivel de base de datos (RLS)

La instancia de PostgreSQL en Supabase tiene políticas de Row-Level Security (RLS) activas en las tablas principales (`users`, `students`, `courses`, `enrollments`, `grades` y `audit_logs`). Su función es impedir la exposición pública de los registros ante accesos directos a la base de datos por vías distintas a la API (por ejemplo, la API pública de Supabase).

El aislamiento de datos por rol (administración/docente) lo aplica la API NestJS mediante guards de autenticación JWT, validación estricta por DTOs y control de acceso basado en roles.

### Consideraciones de seguridad conocidas

- El token JWT dura 15 minutos y no hay refresh token: la sesión debe reiniciarse al expirar.
- Almacenar el token en `sessionStorage` lo hace accesible ante un eventual ataque XSS; es una decisión de simplicidad para esta versión.
- La documentación Swagger (`/api/docs`) está publicada en producción por fines académicos y de demostración.
- La recuperación de contraseña envía por correo una contraseña nueva en lugar de un enlace de restablecimiento con vencimiento. Es una solución simple para esta versión; además, quien conozca el correo de un docente podría solicitar el cambio y reemplazar su contraseña actual.

## 9. Instalación y ejecución local

1. Configurar PostgreSQL y crear en `backend/` un archivo `.env` (puedes partir de `.env.example`) con `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_ORIGIN`, `ADMIN_EMAIL` y `ADMIN_PASSWORD`.
2. Ejecutar `npm install` y `npx prisma contract emit` en `backend/`.
3. Inicializar el esquema de base de datos con `npx prisma db init`.
4. Crear el usuario administrador inicial con `npm run seed:admin`.
5. Iniciar la API (`npm run start:dev`) y Angular (`npm start`) en terminales separadas.
6. Verificar `http://localhost:3000/api/docs` y `http://localhost:4200`.


## 10. Despliegue y operación en producción

El sistema opera en entorno productivo bajo una arquitectura distribuida en la nube:

- **Base de datos (Supabase):** instancia PostgreSQL con RLS habilitado y conexión segura mediante `DATABASE_URL` hacia el pooler de Supabase.
- **Backend (Render):** API REST en NestJS publicada en https://gester-academico-backend.onrender.com/api/v1, con variables de entorno seguras (`JWT_SECRET`, `FRONTEND_ORIGIN`) y Swagger en `/api/docs`.
- **Frontend (Vercel):** aplicación Angular con despliegue continuo conectado a la rama `main` del repositorio en GitHub (`erickvela/gester_academico`). Directorio raíz `frontend`, comando de compilación `npm run build` y salida en `dist/aulabase/browser`.

## 11. Criterios de aceptación funcional

- Un usuario no autenticado no accede al panel ni a rutas protegidas del API.
- Una cuenta desactivada no inicia sesión; un docente no administra accesos ni ve cursos ajenos.
- Un docente registrado puede recuperar el acceso con su correo registrado y recibe una contraseña nueva por correo.
- El código de curso, el carné y el correo de alumno no se duplican.
- Un alumno solo recibe punteos después de inscribirse al curso.
- La validación no permite puntajes negativos ni superiores al máximo.
- Desactivar un curso o cuenta conserva los registros relacionados.
- Reportes y CSV coinciden con los datos que devuelve el API para los permisos del usuario.
- Los proyectos de frontend y backend compilan y superan sus pruebas automatizadas.

## 12. Limitaciones y evolución sugerida

- Definir períodos académicos y asociarlos con cursos e inscripciones.
- Implementar la fórmula institucional de nota final acumulada según ponderaciones.
- Añadir paginación visible, filtros avanzados y edición directa de evaluaciones desde la interfaz.
- Habilitar un portal de autoservicio para consulta de notas por parte de los estudiantes.
- Reemplazar el envío de contraseña nueva por un enlace de restablecimiento con vencimiento y obligar el cambio de contraseña en el siguiente ingreso.
- Incorporar auditoría de inicios de sesión y pruebas end-to-end (e2e).
- Incorporar refresh token y evaluar cookies `HttpOnly` en lugar de `sessionStorage`.
- Restringir la edición de alumnos por docente a los inscritos en sus cursos, si la institución lo requiere.

## Licencia y autoría

Proyecto académico desarrollado por Erick Vela en la Universidad Mariano Gálvez de Guatemala (Sede Amatitlán), bajo la asesoría del Ing. Isaías Och. `< "Uso académico, todos los derechos reservados">`