# Configuración de Stripe para Pasaje 94

## 📋 Pasos para completar la integración

### 1. Crear cuenta en Stripe
1. Ve a https://dashboard.stripe.com/register
2. Completa el registro con los datos de Pasaje 94
3. Activa tu cuenta (necesitarás verificar identidad y cuenta bancaria)

### 2. Obtener las claves de API

**En modo TEST (para desarrollo):**
1. Ve a https://dashboard.stripe.com/test/apikeys
2. Copia la "Publishable key" (empieza con `pk_test_`)
3. Copia la "Secret key" (empieza con `sk_test_`)

**En modo LIVE (producción):**
1. Activa tu cuenta completamente
2. Ve a https://dashboard.stripe.com/apikeys
3. Copia las claves de producción

### 3. Configurar las claves en tu proyecto

**Frontend (StripeCheckout.jsx):**
```javascript
// Línea 8 del archivo src/components/StripeCheckout.jsx
const stripePromise = loadStripe('pk_test_TU_PUBLISHABLE_KEY_AQUI')

// Para producción, usa una variable de entorno:
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
```

**Backend:**
Necesitas crear un servidor backend. Opciones:

#### Opción A: Usar Netlify/Vercel Functions (Recomendado)
```javascript
// netlify/functions/create-payment-intent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { amount, currency, items } = JSON.parse(event.body)
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(items)
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
```

#### Opción B: Servidor Node.js/Express separado
```javascript
// server.js
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, items } = req.body
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(items)
      }
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3001, () => console.log('Server running on port 3001'))
```

### 4. Actualizar la URL del endpoint

En `src/components/StripeCheckout.jsx`, línea ~89:
```javascript
const response = await fetch('/api/create-payment-intent', {
  // Cambia esto por la URL de tu backend
  // Ejemplo: 'https://tu-sitio.netlify.app/.netlify/functions/create-payment-intent'
```

### 5. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_tu_key_aqui
```

Y en tu backend (Netlify/Vercel):
```
STRIPE_SECRET_KEY=sk_test_tu_secret_key_aqui
```

### 6. Configurar Webhooks (Importante para producción)

Los webhooks te notifican cuando un pago es exitoso:

1. Ve a https://dashboard.stripe.com/webhooks
2. Crea un nuevo endpoint
3. URL: `https://tu-sitio.com/api/webhook`
4. Selecciona eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copia el "Signing secret" (empieza con `whsec_`)

### 7. Testing

**Tarjetas de prueba de Stripe:**
- Éxito: `4242 4242 4242 4242`
- Falla: `4000 0000 0000 0002`
- Requiere 3D Secure: `4000 0027 6000 3184`

Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
ZIP: Cualquier 5 dígitos

### 8. Ir a producción

1. Completa la activación de tu cuenta en Stripe
2. Cambia las claves TEST por las claves LIVE
3. Actualiza las variables de entorno
4. Prueba todo el flujo completo
5. Configura los webhooks en producción

### 📊 Costos de Stripe en Europa
- **Por transacción**: 1.5% + €0.25
- **Sin costos mensuales fijos**
- **Sin costos de setup**

Ejemplo: Una venta de €50
- Comisión: €1.00 (1.5% + €0.25)
- Recibes: €49.00

### 🔒 Seguridad
- Nunca expongas tu SECRET KEY en el frontend
- Usa variables de entorno para todas las claves
- Stripe maneja los datos de tarjetas (no tocan tu servidor)
- Certificado PCI compliant automático

### 📧 Emails de confirmación
Stripe puede enviar emails automáticos:
1. Ve a Settings > Emails en tu dashboard
2. Activa "Successful payments"
3. Personaliza el email con tu branding

### 🛠️ Próximos pasos recomendados
1. Integrar con base de datos para guardar pedidos
2. Sistema de envío de emails con detalles del pedido
3. Panel de administración para ver pedidos
4. Gestión de inventario automática

¿Necesitas ayuda con algún paso específico?
