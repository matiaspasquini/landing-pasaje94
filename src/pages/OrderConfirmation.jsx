import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'

const OrderConfirmation = () => {
  const location = useLocation()
  const { clearCart } = useCart()
  const [orderData, setOrderData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOrderData = () => {
      console.log('🔍 Loading order data...')
      
      // Verificar si venimos de Stripe (parámetros en la URL)
      const searchParams = new URLSearchParams(location.search)
      const paymentIntent = searchParams.get('payment_intent')
      const redirectStatus = searchParams.get('redirect_status')

      console.log('Payment Intent:', paymentIntent)
      console.log('Redirect Status:', redirectStatus)

      // Si venimos de Stripe con pago exitoso
      if (paymentIntent && redirectStatus === 'succeeded') {
        // Intentar obtener datos de múltiples fuentes
        const sessionOrderData = sessionStorage.getItem('orderData')
        const localOrderData = localStorage.getItem('orderData') // También buscar en localStorage
        const checkoutData = localStorage.getItem('checkoutData')
        
        console.log('SessionStorage data:', sessionOrderData)
        console.log('LocalStorage data:', localOrderData)
        console.log('Checkout data:', checkoutData)
        
        if (sessionOrderData) {
          console.log('✅ Found data in sessionStorage')
          setOrderData(JSON.parse(sessionOrderData))
          clearCart()
          sessionStorage.removeItem('orderData')
          localStorage.removeItem('checkoutData')
          localStorage.removeItem('orderData')
        } else if (localOrderData) {
          console.log('✅ Found data in localStorage')
          setOrderData(JSON.parse(localOrderData))
          clearCart()
          localStorage.removeItem('orderData')
          localStorage.removeItem('checkoutData')
        } else {
          console.log('❌ No order data found in storage')
          // Si no hay datos guardados, mostrar mensaje que el pago fue exitoso
          // pero sin detalles (ya que Stripe confirma el pago)
          setOrderData({ 
            paymentOnly: true,
            paymentIntent: paymentIntent 
          })
        }
      } else {
        // Intentar obtener datos del pedido desde location.state (fallback)
        const stateOrderData = location.state?.orderData
        if (stateOrderData) {
          console.log('✅ Found data in location.state')
          setOrderData(stateOrderData)
          clearCart()
        }
      }
      
      setIsLoading(false)
    }

    loadOrderData()
  }, [location.search, location.state, clearCart])

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-sm tracking-wider">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-3xl tracking-tighter font-light mb-4">Payment Successful!</h2>
          <p className="text-sm mb-6 text-gray-600">
            Tu pago fue procesado correctamente. Recibirás un email de Stripe con el recibo 
            y los detalles de tu compra. Si tienes alguna pregunta, contáctanos.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/space" className="text-sm tracking-wider hover:opacity-60 border-b border-black pb-1">
              Continue Shopping
            </Link>
            <Link to="/" className="text-sm tracking-wider hover:opacity-60 border-b border-black pb-1">
              Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Si solo tenemos el payment intent pero no los detalles del pedido
  if (orderData.paymentOnly) {
    return (
      <div className="min-h-screen pt-32 px-6 pb-20">
        <div className="max-w-screen-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-5xl tracking-tighter font-light mb-4">
              ¡PAGO EXITOSO!
            </h1>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Tu pago ha sido procesado correctamente. 
              Recibirás un email de Stripe con el recibo completo y los detalles de tu pedido.
            </p>

            <div className="border border-black p-8 mb-8 text-left max-w-md mx-auto">
              <h2 className="text-xl tracking-tighter font-light mb-4">Confirmación</h2>
              <p className="text-sm mb-2">
                <strong>Payment ID:</strong> {orderData.paymentIntent}
              </p>
              <p className="text-sm text-gray-600">
                Tu pedido está siendo procesado. Te enviaremos actualizaciones por email.
              </p>
            </div>

            <div className="bg-gray-50 p-6 mb-8">
              <h3 className="text-sm tracking-wider mb-4">WHAT'S NEXT?</h3>
              <ol className="text-left space-y-2 text-sm max-w-md mx-auto">
                <li>1. Recibirás un email de Stripe con el recibo de tu compra</li>
                <li>2. Prepararemos tu pedido para el envío</li>
                <li>3. Te contactaremos para confirmar los detalles</li>
                <li>4. Tu pedido será enviado o estará listo para recoger</li>
              </ol>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                to="/space"
                className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors text-sm tracking-wider"
              >
                CONTINUE SHOPPING
              </Link>
              <Link
                to="/"
                className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider"
              >
                HOME
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-screen-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-5xl tracking-tighter font-light mb-4">
            ¡PAGO EXITOSO!
          </h1>
          
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Tu pago ha sido procesado correctamente. 
            Te enviaremos un email con los detalles del pedido y la información de seguimiento.
          </p>

          {/* Order Details */}
          <div className="border border-black p-8 text-left mb-8">
            <h2 className="text-2xl tracking-tighter font-light mb-6">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-sm tracking-wider mb-3">CONTACT</h3>
                <p className="text-sm">{orderData.name}</p>
                <p className="text-sm">{orderData.email}</p>
                <p className="text-sm">{orderData.phone}</p>
              </div>
              
              <div>
                <h3 className="text-sm tracking-wider mb-3">SHIPPING ADDRESS</h3>
                <p className="text-sm">{orderData.address}</p>
                <p className="text-sm">{orderData.city}, {orderData.postalCode}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm tracking-wider mb-4">PRODUCTS</h3>
              <div className="space-y-3">
                {orderData.cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-light">{item.name}</p>
                      <p className="text-gray-600 text-xs">
                        {item.artist} × {item.quantity}
                      </p>
                    </div>
                    <p>€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>€{orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping ({orderData.shippingMethod})</span>
                  <span>{orderData.shippingCost === 0 ? 'FREE' : `€${orderData.shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t">
                  <span className="tracking-wider">TOTAL</span>
                  <span>€{orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 p-6 mb-8">
            <h3 className="text-sm tracking-wider mb-4">WHAT'S NEXT?</h3>
            <ol className="text-left space-y-2 text-sm max-w-md mx-auto">
              <li>1. Recibirás un email de Stripe con el recibo de tu compra</li>
              <li>2. {orderData.shippingMethod === 'pickup' 
                  ? 'Puedes recoger tu pedido en Pasaje 94, Valencia' 
                  : 'Prepararemos tu pedido para el envío'}</li>
              <li>3. {orderData.shippingMethod !== 'pickup' && 'Te enviaremos un número de seguimiento cuando se envíe'}</li>
              <li>4. {orderData.shippingMethod === 'express' 
                  ? 'Tu pedido llegará en 1-2 días hábiles' 
                  : orderData.shippingMethod === 'standard'
                  ? 'Tu pedido llegará en 3-5 días hábiles'
                  : 'Te esperamos en la tienda'}</li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Link
              to="/space"
              className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors text-sm tracking-wider"
            >
              CONTINUE SHOPPING
            </Link>
            <Link
              to="/"
              className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider"
            >
              HOME
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderConfirmation