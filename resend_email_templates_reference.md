# Referencia de Mensajes de Correo (Resend) y Flujo de Actualización (Upgrade)

Este documento sirve como referencia central para todos los correos electrónicos operativos (transaccionales) que se enviarán usando Resend, así como la estrategia recomendada para manejar los cambios de plan de forma manual.

---

## 📧 1. Registro de Usuario (Welcome Email)
**Cuándo se envía:** Cuando un usuario se registra por primera vez en la plataforma.
**Asunto:** ¡Bienvenido a Beautify Channel! 🎉
**Contenido sugerido:**
- **Saludo:** Hola [Nombre],
- **Mensaje:** ¡Gracias por unirte a Beautify Channel! Estamos muy emocionados de tenerte aquí.
- **Llamado a la acción (CTA):** Botón para "Ir a mi Panel" o "Completar mi Perfil".
- **Pie de página:** Soporte técnico y contacto.

## 📧 2. Recuperación de Contraseña
**Cuándo se envía:** Cuando el usuario hace clic en "Olvidé mi contraseña".
**Asunto:** Recuperación de tu contraseña - Beautify Channel
**Contenido sugerido:**
- **Mensaje:** Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.
- **CTA:** Botón seguro "Restablecer Contraseña" (Enlace temporal mágico).
- **Advertencia:** "Si no solicitaste esto, puedes ignorar este correo de forma segura."

## 📧 3. Inicio de Prueba Gratis (Free Trial)
**Cuándo se envía:** Cuando el usuario activa la creación de su canal de prueba (Free).
**Asunto:** Tu prueba gratis en Beautify Channel ha comenzado 🚀
**Contenido sugerido:**
- **Mensaje:** ¡Tu canal de prueba ya está activo y listo para transmitir! Tienes acceso temporal a nuestras funciones básicas.
- **Detalles:** Recordatorio de la duración de la prueba (ej. 7 o 14 días).
- **CTA:** "Ir a mi Canal ahora".

---

## 📧 4. Solicitud de Cambio de Plan (Upgrade Request)
Dado que actualmente el proceso de pago es manual (sin Stripe directo), el usuario llenará un formulario con sus datos de facturación. Esto genera **dos** correos automáticos.

### A. Para el Usuario (Confirmación de Recepción)
**Cuándo se envía:** Inmediatamente después de enviar el formulario de solicitud de Upgrade.
**Asunto:** Hemos recibido tu solicitud para pasar a [Nombre del Plan] 🌟
**Contenido sugerido:**
- **Mensaje:** Hola [Nombre], hemos recibido correctamente tus datos para hacer el upgrade a **[Plan Premium / Basic]**.
- **Próximos pasos:** "Nuestro equipo está revisando tus datos y te contactará a la brevedad con las instrucciones de pago y los detalles para proceder. No te preocupes, ¡tu canal actual sigue funcionando mientras tanto!"

### B. Para el Equipo / Administrador (Alerta Interna)
**Cuándo se envía:** Al mismo tiempo que el anterior.
**Asunto:** 🔔 NUEVA SOLICITUD DE UPGRADE - [Nombre del Usuario]
**Contenido sugerido:**
- **Mensaje:** El usuario [Nombre del Usuario] ([Email]) ha solicitado un cambio al plan [Nombre del Plan].
- **Datos de Facturación:** [Mostrar RUT/DNI, Razón Social, Dirección, etc., recolectados en el form].
- **Acción requerida:** Contactar al cliente para enviarle el método de pago y luego activar su plan desde el Panel de Admin.

## 📧 5. Confirmación de Pago y Activación (Manual)
**Cuándo se envía:** Una vez que el administrador valida que el pago manual (transferencia, link de pago externo, etc.) ha sido recibido y le habilita el nivel Premium en el dashboard.
**Asunto:** ¡Tu plan [Nombre del Plan] ya está activo! 💎
**Contenido sugerido:**
- **Mensaje:** ¡Felicidades! Hemos confirmado tu pago. Tu cuenta ha sido actualizada con éxito al nivel **[Plan Premium / Basic]**.
- **Beneficios:** Pequeño recordatorio de lo que ahora puede hacer (ej. Canal único personalizado, sin interrupciones, etc.).
- **CTA:** "Acceder a mi nuevo Canal Premium".

---

# 🛠️ Plan Estratégico Recomendado (Flujo Manual)

Para gestionar este proceso de forma eficiente y profesional sin tener implementado Stripe directamente en el código por ahora, te recomiendo el siguiente flujo:

### 1. Interfaz de Usuario (El Formulario de Upgrade)
Crea una página o un módulo modal (ej. `/area-riservata/upgrade`) al que el usuario pueda acceder cuando es `FREE_TRIAL`.
- **Qué pedir:** Tipo de plan deseado (Premium, Basic), Datos de Persona Física o Empresa (Razón Social, CIF/NIF/RUT, Dirección Fiscal), y un campo opcional para "Comentarios o requerimientos especiales para el canal".
- **UX:** Que quede muy claro que *no se les cobrará en ese momento*, sino que es una **solicitud formal**.

### 2. Base de Datos (Supabase)
Crea una tabla llamada `upgrade_requests`:
- `id`, `user_id`, `requested_plan` (enum: basic, premium), `billing_details` (jsonb), `status` (pending, contacted, approved, rejected), `created_at`.

### 3. El Disparador (Server Action)
Cuando el usuario envía el formulario:
1. Se guarda el registro en la tabla `upgrade_requests` con estado `pending`.
2. Se disparan los dos emails de Resend (Sección 4A para tranquilizar al cliente, 4B para alertarte a ti). *Opcional: Si tienes n8n configurado (como vimos en leads), puedes mandar también un WhatsApp al equipo de admin.*

### 4. La Gestión en el Área de Admin (Tu Trabajo)
En tu `/admin`, añade una pestaña de **"Solicitudes de Upgrade"**.
- Verás las solicitudes pendientes.
- Contactarás al cliente manualmente (por email o enviándole un enlace de pago de Stripe pre-generado por ti de forma externa, o los datos de transferencia bancaria).
- Puedes cambiar el estado a `contacted`.

### 5. La Activación Final (Paso a Premium)
Una vez el cliente te confirma el pago y ves el dinero:
1. Entras al admin, cambias el role/plan del usuario a `PREMIUM`.
2. Creas o le asignas su canal final.
3. Esto dispara (o se pulsa un botón para disparar) el correo de la Sección 5 (Activación).

**¿Por qué este plan es bueno?**
- **Control Total:** Al ser manual al inicio, evitas problemas de facturación automática errónea si el producto aún está iterando.
- **Relación con el cliente:** Tienes la oportunidad de darle un trato VIP, "Hola, vi que quieres pasarte a Premium, aquí tienes cómo hacerlo... ¿qué música te gustaría para tu canal?".
- **Fácil transición:** Cuando más adelante quieras automatizar con Stripe de verdad, ya tendrás la UI del formulario hecha, solo cambiarás el botón de "Solicitar" por un checkout de Stripe.
