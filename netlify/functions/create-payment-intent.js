import Stripe from 'stripe'

export const handler = async (event) => {
  // Configurar headers CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Manejar preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    }
  }

  // Inicializar Stripe con la clave secreta
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  
  // Solo acepta POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  try {
    const { amount, currency, items, customerInfo, shippingCost = 0, shippingMethod = 'standard' } = JSON.parse(event.body)

    // Validación básica
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        headers,
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
      description: `Pedido de ${customerInfo?.firstName} ${customerInfo?.lastName}: ${itemsDescription}`,
      receipt_email: customerInfo?.email, // Stripe enviará recibo automáticamente (solo en LIVE mode)
      metadata: {
        // Información del cliente
        customer_first_name: customerInfo?.firstName || '',
        customer_last_name: customerInfo?.lastName || '',
        customer_company: customerInfo?.company || '',
        customer_email: customerInfo?.email || '',
        customer_phone: customerInfo?.phone || '',
        customer_address: customerInfo?.address || '',
        customer_apartment: customerInfo?.apartment || '',
        customer_city: customerInfo?.city || '',
        customer_postal_code: customerInfo?.postalCode || '',
        customer_province: customerInfo?.province || '',
        customer_country: customerInfo?.country || '',
        customer_notes: customerInfo?.notes || '',
        customer_newsletter: customerInfo?.newsletter || false,
        // Información de envío
        shipping_method: shippingMethod,
        shipping_cost: shippingCost.toFixed(2),
        // Información de productos (Stripe metadata acepta strings)
        items: JSON.stringify(items),
        items_count: items.length.toString(),
        order_total: amount.toFixed(2),
        timestamp: new Date().toISOString(),
      },
    })

    console.log('✅ Payment Intent created:', paymentIntent.id)
    console.log('📧 Receipt will be sent to:', customerInfo?.email)
    console.log('💰 Amount:', amount, 'EUR')

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      })
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Internal server error'
      })
    }
  }
}
