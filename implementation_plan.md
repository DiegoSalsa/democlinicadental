# Integración Puragenda + Sistema de Seguridad Headless

## Contexto

Reemplazar el agendador de citas local de **nuevadent** con el widget embebible de **Puragenda** (SaaS), y habilitar el sistema de seguridad para integraciones headless en Puragenda.

---

## Parte A — nuevadent: Reemplazar Booking por Widget Puragenda

### Cambios

#### [DELETE] BookingContext.tsx, BookingModal.tsx, DentistSelector.tsx, ServiceSelector.tsx, StepIndicator.tsx

Se eliminan todos los componentes del booking local (ya no se usarán).

#### [MODIFY] BookingSection.tsx

Reescribir completamente. En lugar del CTA con modal, ahora embebe un **iframe** de Puragenda. Mantener el diseño visual de la sección (gradientes, iconos, texto) pero el card derecho ahora contiene el iframe del widget en vez de un botón CTA.

#### [MODIFY] App.tsx

- Eliminar imports de `BookingProvider`, `BookingModal`
- Quitar el wrapper `<BookingProvider>` y el `<BookingModal />`
- `BookingSection` se mantiene (ahora es el iframe)

---

## Parte B — Puragenda (agenda): Sistema de Seguridad Headless

### 1. UI de Seguridad en Dashboard Settings

#### [NEW] security-settings.tsx

Componente `"use client"` con:
- **API Key:** Ocultar/revelar/copiar/regenerar
- **Allowed Origins:** Lista de dominios con agregar/eliminar

#### [MODIFY] page.tsx (settings)

Reemplazar tarjeta estática de API Key por componente interactivo.

### 2. Server Actions

#### [NEW] business-security.actions.ts

- `regenerateApiKeyAction()` — genera `pg_` + UUID
- `updateAllowedOriginsAction(origins)` — valida y actualiza

### 3. Protección de Rutas API

#### [NEW] api-guard.ts

Helper que valida API Key + Origin en cada route handler.

#### [MODIFY] 3 rutas API del negocio

Agregar `validateApiRequest()` al inicio.

### 4. CORS

#### [MODIFY] middleware.ts + next.config.ts

CORS permisivo en preflight, validación real en route handlers.

---

## Preguntas Abiertas

1. **¿Cuál es el slug del negocio en Puragenda para la clínica dental?**
2. **¿La URL de producción de Puragenda es `https://puragenda.vercel.app`?**
