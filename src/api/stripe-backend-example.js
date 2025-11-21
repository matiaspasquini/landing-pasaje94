// Este es un ejemplo de cómo configurar el endpoint en tu backend
// Puedes usar Node.js/Express, Next.js API routes, o cualquier otro backend

// Primero instala en tu backend: npm install stripe

import Stripe from 'stripe'

// Inicializa Stripe con tu SECRET KEY (NUNCA la publiques en el frontend)
const stripe = new Stripe('sk_test_YOUR_SECRET_KEY', {
  apiVersion: '2023-10-16',
})

export async function createPaymentIntent(req, res) {
  try {
    const { amount, currency, items } = req.body

    // Crea el Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // En centavos
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // Guarda info adicional sobre el pedido
        items: JSON.stringify(items),
      },
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ error: error.message })
  }
}

// Webhook para escuchar eventos de Stripe (pagos exitosos, etc.)
export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature']
  const webhookSecret = 'whsec_YOUR_WEBHOOK_SECRET'

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Maneja diferentes tipos de eventos
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('Payment succeeded:', paymentIntent.id)
      
      // Aquí puedes:
      // - Actualizar tu base de datos
      // - Enviar email de confirmación
      // - Actualizar inventario
      // - etc.
      
      break
    case 'payment_intent.payment_failed':
      console.log('Payment failed')
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  res.json({ received: true })
}
