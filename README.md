# NuevaDent - PERN + TypeScript

Sistema de reservas para clinica dental con:
- Backend: Node.js + Express + PostgreSQL + TypeScript
- Frontend: React + Vite + TypeScript + Tailwind
- Panel admin: login, dashboard, filtros, cambio de estado y eliminacion de citas

## Estructura

```
nuevadent/
|-- backend/
|   |-- .env.example
|   |-- src/
|   |   |-- config/database.ts
|   |   |-- middleware/auth.ts
|   |   |-- routes/admin.ts
|   |   |-- routes/appointments.ts
|   |   |-- scripts/init-db.ts
|   |   |-- scripts/seed.ts
|   |   |-- types/index.ts
|   |   `-- index.ts
|   |-- package.json
|   `-- tsconfig.json
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- services/api.ts
|   |   |-- types/index.ts
|   |   |-- App.tsx
|   |   |-- main.tsx
|   |   |-- index.css
|   |   `-- vite-env.d.ts
|   |-- package.json
|   `-- vite.config.ts
|-- implementation_plan.md
`-- task.md
```

## Requisitos

- Node.js 20+
- npm 10+
- PostgreSQL instalado y ejecutandose localmente

## Configuracion de base de datos

Por defecto el backend usa:
- DB_HOST=localhost
- DB_PORT=5432
- DB_NAME=dental
- DB_USER=postgres
- DB_PASSWORD=postgres

Puedes sobreescribirlos con variables de entorno del sistema (o archivo .env si lo usas en tu entorno).

La base de datos se crea automaticamente si no existe, y la tabla appointments tambien se crea automaticamente.

## Inicializacion de DB y seeder

Setup completo en un paso (crea DB/tabla y luego inserta datos demo):

```bash
npm run db:setup --prefix backend
```

Crear base de datos + tabla:

```bash
npm run db:init --prefix backend
```

Insertar datos de prueba (solo si la tabla esta vacia):

```bash
npm run db:seed --prefix backend
```

Verificar base activa, tabla y cantidad de filas:

```bash
npm run db:status --prefix backend
```

Listar objetos appointments en esquema public (tabla, secuencia, indice):

```bash
npm run db:objects --prefix backend
```

Nota: al usar `SERIAL` para `id`, PostgreSQL crea automaticamente una secuencia (`appointments_id_seq`). Es normal ver ambos objetos: la tabla y la secuencia.

## Instalacion

```bash
npm install --prefix backend
npm install --prefix frontend
```

## Ejecutar en desarrollo

Terminal 1 (backend):

```bash
npm run dev --prefix backend
```

Terminal 2 (frontend):

```bash
npm run dev --prefix frontend
```

Frontend: http://localhost:5173
Backend API: http://localhost:3001

## Build de produccion

```bash
npm run build --prefix backend
npm run build --prefix frontend
```

## Endpoints principales

Publicos:
- POST /api/appointments (crear cita)
- GET /api/appointments/check (disponibilidad por fecha/profesional)
- POST /api/admin/login (login admin)
- GET /api/health (health check)

Protegidos (requieren Bearer token admin):
- GET /api/appointments
- GET /api/appointments/stats
- PATCH /api/appointments/:id/status
- DELETE /api/appointments/:id

## Credenciales admin demo

- Password: admin123

El token se guarda en localStorage con la llave admin_token.

## Flujo principal

1. Usuario agenda desde el modal de reservas.
2. Frontend envia la cita al backend.
3. Backend guarda en PostgreSQL.
4. Admin ingresa al dashboard para gestionar estados y eliminaciones.

## Estado

La migracion PERN + TypeScript y el panel admin estan implementados y validados con build exitoso de backend y frontend.
