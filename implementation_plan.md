# Reestructuración Completa: PERN Stack + TypeScript + Admin Panel

Migrar el proyecto de una SPA con JSX a una arquitectura **PERN (PostgreSQL, Express, React, Node.js)** con TypeScript, organizada en carpetas `backend/` y `frontend/`, eliminando todos los emojis y añadiendo un panel de administración para gestionar reservas.

## ⚠️ User Review Required

**Base de datos PostgreSQL**: Se necesita que tengas PostgreSQL instalado y corriendo localmente. El backend se conectará a una BD llamada `dental_clinic`. Usaré credenciales por defecto (`postgres` / `postgres`) a menos que indiques otras.

**Cambio destructivo**: Se reestructurará completamente el proyecto. Los archivos `.jsx` actuales en `src/` se eliminarán y serán reemplazados por `.tsx` dentro de `frontend/src/`.

## Estructura Final del Proyecto

```
nuevadent/
├── backend/
│   ├── src/
│   │   ├── config/database.ts        # Conexión a PostgreSQL + auto-create tablas
│   │   ├── routes/appointments.ts     # CRUD citas
│   │   ├── routes/admin.ts            # Login admin
│   │   ├── middleware/auth.ts         # Auth middleware
│   │   ├── types/index.ts            # Interfaces
│   │   └── index.ts                  # Express entry point (puerto 3001)
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/layout/        # Header.tsx, Footer.tsx
│   │   ├── components/sections/      # Hero, Features, Services, Team, Testimonials, FAQ (.tsx)
│   │   ├── components/booking/       # Sistema de reservas completo (.tsx)
│   │   ├── components/admin/         # AdminLogin, Dashboard, AppointmentTable (.tsx)
│   │   ├── components/ui/Button.tsx
│   │   ├── services/api.ts           # Fetch helpers para el backend
│   │   ├── types/index.ts
│   │   ├── App.tsx, main.tsx, index.css
│   ├── index.html
│   ├── package.json, tsconfig.json, vite.config.ts, tailwind.config.js
│
└── README.md
```

## Cambios Principales

### 1. Backend (Express + PostgreSQL)
- API REST con endpoints: crear cita, listar, cambiar estado, eliminar, estadísticas
- Tabla `appointments` se crea automáticamente
- Login admin simple (demo: `admin123`)

### 2. Frontend (React + TypeScript + Vite)
- Todos los `.jsx` → `.tsx` con interfaces tipadas
- **Emojis eliminados** → reemplazados por iconos Lucide
- Booking se conecta al API backend (no localStorage)
- React Router para rutas `/`, `/admin`, `/admin/dashboard`

### 3. Panel de Administración
- Login con glassmorphism
- Dashboard con estadísticas (total, pendientes, confirmadas, canceladas)
- Tabla de citas con filtros, búsqueda, y acciones (confirmar/cancelar/eliminar)

## Pregunta
**¿Tienes PostgreSQL instalado? ¿Qué usuario/contraseña usas?** (por defecto usaré `postgres`/`postgres`)

## ¿Apruebas este plan?
