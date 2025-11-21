import Stripe from 'stripe'

export const handler = async (event) => {
  // Inicializar Stripe con la clave secreta
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  
  // Solo acepta POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  try {
    const { amount, currency, items, customerInfo } = JSON.parse(event.body)

    // Validación básica
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid amount' })
      }
    }

    // Preparar descripción de productos para Stripe
    const itemsDescription = items.map(item => 
      `${item.name} x${item.quantity}`
    ).join(', ')

    // Crear Payment Intent en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency: currency || 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      description: `Pedido de ${customerInfo?.name || 'Cliente'}: ${itemsDescription}`,
      metadata: {
        // Información del cliente
        customer_name: customerInfo?.name || '',
        customer_email: customerInfo?.email || '',
        customer_phone: customerInfo?.phone || '',
        customer_address: customerInfo?.address || '',
        customer_city: customerInfo?.city || '',
        customer_postal_code: customerInfo?.postalCode || '',
        // Información de productos (Stripe metadata acepta strings)
        items: JSON.stringify(items),
        items_count: items.length.toString(),
        order_total: amount.toFixed(2),
        timestamp: new Date().toISOString(),
      },
    })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      })
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: error.message || 'Internal server error'
      })
    }
  }
}
