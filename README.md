# Tu Mano Derecha — Landing comercial

Landing construida con Next.js (App Router), TypeScript y CSS propio. Textos derivados de la propuesta comercial V2; no se incluyen testimonios ni métricas de clientes inventadas.

## Instalación local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir http://localhost:3000. Validar producción con `npm run lint` y `npm run build`.

## Configuración indispensable antes de publicar

1. **Google Calendar**: crear una página real de horarios para citas en Google Calendar. Copiar su enlace público completo en `NEXT_PUBLIC_BOOKING_URL`. Si está vacío, los botones de cita llevan al formulario de la misma página, sin enlaces inventados.
2. **Correo del formulario**: registrar y verificar el dominio de envío con Resend (o adaptar `app/api/leads/route.ts` a otro proveedor). Definir `RESEND_API_KEY`, `LEAD_TO_EMAIL=info@tumanoderecha.mx`, `LEAD_FROM_EMAIL` con una dirección verificada. Sin estos valores el formulario **no envía mensajes** y devuelve un aviso; no se simula un envío exitoso.
3. **Aviso de privacidad**: completar y revisar legalmente `app/aviso-de-privacidad/page.tsx` **antes** de permitir solicitudes reales. El documento actual está marcado como preliminar y no es un aviso jurídico definitivo. Para LATAM revisar países atendidos y transferencias a proveedores.
4. **Logo**: sustituir el monograma tipográfico `TM.D` en `components/Navigation.tsx` y el footer de `app/page.tsx` con el SVG/PNG autorizado. No se recibió el archivo de logo en este turno.
5. **Fotografía**: sustituir el recuadro de iniciales `AS` en la sección `#fundador` por una imagen optimizada con texto alternativo. No se utiliza imagen falsa del fundador.
6. **Ajustes legales y comerciales**: validar nombre del responsable legal, identificación fiscal, términos, condiciones de precio y cualquier derecho sobre la marca.

## Deploy Vercel (recomendado)

1. Subir esta carpeta a un repositorio privado de GitHub (no subir `.env.local`).
2. En Vercel, importar el repositorio como proyecto Next.js.
3. Configurar variables de entorno de producción; desplegar.
4. Añadir `tumanoderecha.mx` y `www.tumanoderecha.mx` en Vercel → Domains.
5. En Wix (registrador/gestor DNS) **copiar exactamente** los registros DNS que Vercel indique para ambos dominios. No sustituir ni eliminar registros MX, SPF, DKIM y DMARC del correo.
6. Revisar HTTPS, redirección entre www y dominio raíz, formulario, enlace del calendario, páginas y vistas móviles.

## Deploy Render alternativo

Usar un servicio web Node con build `npm ci && npm run build`, start `npm run start`, Node >= 20, variables de entorno equivalentes y dominio personalizado según la pantalla de Render. En Wix copiar los registros requeridos por Render, conservando DNS del correo.

## Operación y seguridad

- La API valida campos en servidor, incluye un honeypot y escapa el HTML en las notificaciones.
- La API **no cuenta** con protección anti-spam distribuida persistente. Para abrir el formulario públicamente se recomienda agregar Turnstile o reCAPTCHA con validación en servidor y limitación de solicitudes mediante Redis/WAF.
- El formulario solo envía correo transaccional, no almacena directamente leads. Si se integra un CRM, especificar consentimiento, retención, seguridad y acceso.
- Los datos de inicio son una solicitud, **no** una cita confirmada.
- No se cargaron píxeles publicitarios ni analítica por defecto; agregar solo después de definir consentimiento y política.
