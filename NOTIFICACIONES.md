# Configuración de Notificaciones de Ventas

## 📧 Cómo recibir notificaciones cuando haya una venta

### Opción 1: Emails automáticos de Stripe (Ya configurado ✅)

Stripe ya está configurado para enviar un recibo automáticamente al cliente (`receipt_email` en el Payment Intent). 

Para recibir TÚ también un email de cada venta:

1. Ve a tu Dashboard de Stripe: https://dashboard.stripe.com
2. Ve a **Settings** → **Emails**
3. En la sección **Receipts**, activa "Send receipt emails to customers"
4. En **Payment notifications**, añade tu email en "Also send payment notifications to these emails"

### Opción 2: Dashboard de Stripe (Recomendado)

Ve al dashboard de Stripe donde verás todas las ventas en tiempo real:
- https://dashboard.stripe.com/payments

Cada pago incluirá TODA la información del cliente en la sección **Metadata**:
- Nombre, email, teléfono
- Dirección completa
- Productos comprados
- Método de envío
- Notas adicionales

### Opción 3: Webhooks + Email personalizado (Avanzado)

Ya creé un webhook handler en `netlify/functions/stripe-webhook.js` que registra cada venta.

Para activar notificaciones por email automáticas:

1. **Configura el Webhook en Stripe:**
   - Ve a https://dashboard.stripe.com/webhooks
   - Clic en "Add endpoint"
   - URL: `https://tu-sitio.netlify.app/.netlify/functions/stripe-webhook`
   - Selecciona eventos: `payment_intent.succeeded`
   - Copia el "Signing secret" (empieza con `whsec_...`)

2. **Añade la variable de entorno en Netlify:**
   - Site configuration → Environment variables
   - Key: `STRIPE_WEBHOOK_SECRET`
   - Value: el signing secret que copiaste

3. **Instala un servicio de email** (elige uno):
   
   **A) Resend (Recomendado - gratis hasta 3000 emails/mes):**
   ```bash
   npm install resend
   ```
   - Regístrate en https://resend.com
   - Verifica tu dominio
   - Obtén tu API key
   - Añade `RESEND_API_KEY` a las variables de entorno de Netlify
   
   **B) SendGrid:**
   ```bash
   npm install @sendgrid/mail
   ```
   
   **C) Mailgun:**
   ```bash
   npm install mailgun.js
   ```

4. **Actualiza el webhook para enviar emails:**
   En `stripe-webhook.js`, descomenta y añade código para enviar email usando el servicio que elegiste.

### Opción 4: Notificaciones por WhatsApp (Opcional)

Si prefieres recibir notificaciones por WhatsApp, puedo integrar:
- Twilio WhatsApp Business API
- O un webhook que envíe un mensaje a un bot de Telegram

---

## 🔔 Por ahora (sin configuración extra):

1. ✅ El cliente recibe un email de Stripe automáticamente con su recibo
2. ✅ Puedes ver todas las ventas en https://dashboard.stripe.com/payments
3. ✅ Cada venta incluye TODA la info del cliente en el metadata
4. ✅ Puedes activar notificaciones de email en Settings → Emails de Stripe

¿Quieres que configure alguna de estas opciones?
