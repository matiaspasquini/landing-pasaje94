import Stripe from 'stripe'

export const handler = async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  const sig = event.headers['stripe-signature']
  let stripeEvent

  try {
    // Verificar el webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
    }
  }

  // Manejar diferentes tipos de eventos
  switch (stripeEvent.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = stripeEvent.data.object
      
      // Aquí puedes enviar un email al vendedor
      console.log('🎉 NUEVA VENTA!')
      console.log('Cliente:', paymentIntent.metadata.customer_name)
      console.log('Email:', paymentIntent.metadata.customer_email)
      console.log('Total:', `€${paymentIntent.metadata.order_total}`)
      console.log('Productos:', paymentIntent.metadata.items)
      console.log('Dirección:', paymentIntent.metadata.customer_address)
      console.log('Ciudad:', paymentIntent.metadata.customer_city)
      console.log('Teléfono:', paymentIntent.metadata.customer_phone)
      console.log('Método envío:', paymentIntent.metadata.shipping_method)
      console.log('Costo envío:', paymentIntent.metadata.shipping_cost)
      console.log('Notas:', paymentIntent.metadata.customer_notes)
      
      // TODO: Aquí puedes integrar un servicio de email como SendGrid, Mailgun, o Resend
      // para enviar un email al vendedor con todos los detalles
      
      break
      
    case 'payment_intent.payment_failed':
      console.log('❌ Pago fallido')
      break
      
    default:
      console.log(`Evento no manejado: ${stripeEvent.type}`)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true })
  }
}
