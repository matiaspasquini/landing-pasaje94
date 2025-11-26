import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'

// Publicable key de Stripe desde las variables de entorno
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = stripePublishableKey && stripePublishableKey !== 'pk_test_development_placeholder' 
  ? loadStripe(stripePublishableKey) 
  : null

const CheckoutForm = ({ onSuccess, onCancel, total }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setIsProcessing(false)
    } else {
      // El pago fue exitoso, onSuccess manejará la limpieza
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        <h3 className="text-2xl tracking-tighter font-light mb-2">Payment Details</h3>
        <p className="text-lg font-medium">Total: €{total.toFixed(2)}</p>
      </div>

      <PaymentElement />

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 border border-black hover:bg-gray-50 transition-colors text-sm tracking-wider"
          disabled={isProcessing}
        >
          CANCEL
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider disabled:opacity-50"
        >
          {isProcessing ? 'PROCESSING...' : 'PAY NOW'}
        </button>
      </div>
    </form>
  )
}

const StripeCheckout = ({ isOpen, onClose, cart, total, shippingCost = 0 }) => {
  const [clientSecret, setClientSecret] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInitiateCheckout = async () => {
    setIsLoading(true)
    
    try {
      // Obtener datos del cliente desde localStorage
      const checkoutData = JSON.parse(localStorage.getItem('checkoutData') || '{}')
      
      // Llamar a la función de Netlify para crear el PaymentIntent
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'eur',
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            artist: item.artist,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingCost: shippingCost,
          shippingMethod: checkoutData.shippingMethod || 'standard',
          customerInfo: {
            firstName: checkoutData.firstName,
            lastName: checkoutData.lastName,
            company: checkoutData.company,
            email: checkoutData.email,
            phone: checkoutData.phone,
            address: checkoutData.address,
            apartment: checkoutData.apartment,
            city: checkoutData.city,
            postalCode: checkoutData.postalCode,
            province: checkoutData.province,
            country: checkoutData.country,
            notes: checkoutData.notes,
            newsletter: checkoutData.newsletter,
          },
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error creating payment intent')
      }
      
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.error('Error creating payment intent:', error)
      alert('Error al iniciar el pago. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#000000',
      colorBackground: '#ffffff',
      colorText: '#000000',
      colorDanger: '#df1b41',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '0px',
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-4xl tracking-tighter font-light">Checkout</h2>
            <button
              onClick={onClose}
              className="text-2xl hover:opacity-60 transition-opacity"
            >
              ×
            </button>
          </div>

          {/* Order Summary */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="text-lg tracking-wider mb-4">ORDER SUMMARY</h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stripe Checkout */}
          {!clientSecret ? (
            <button
              onClick={handleInitiateCheckout}
              disabled={isLoading}
              className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider disabled:opacity-50"
            >
              {isLoading ? 'LOADING...' : 'PROCEED TO PAYMENT'}
            </button>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
              <CheckoutForm
                onSuccess={() => {
                  onClose()
                  window.location.href = '/order-confirmation'
                }}
                onCancel={onClose}
                total={total}
              />
            </Elements>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StripeCheckout
