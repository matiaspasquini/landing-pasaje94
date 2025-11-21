import { Link, useLocation, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'

const OrderConfirmation = () => {
  const location = useLocation()
  const { clearCart } = useCart()
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // Intentar obtener datos del pedido desde diferentes fuentes
    const stateOrderData = location.state?.orderData
    const sessionOrderData = sessionStorage.getItem('orderData')
    
    if (stateOrderData) {
      setOrderData(stateOrderData)
    } else if (sessionOrderData) {
      setOrderData(JSON.parse(sessionOrderData))
    }

    // Limpiar el carrito después de una compra exitosa
    if (stateOrderData || sessionOrderData) {
      clearCart()
      // Limpiar sessionStorage después de usar los datos
      sessionStorage.removeItem('orderData')
      localStorage.removeItem('checkoutData')
    }
  }, [location.state, clearCart])

  if (!orderData) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl tracking-tighter font-light mb-4">No order found</h2>
          <Link to="/space" className="text-sm tracking-wider hover:opacity-60">
            Continue Shopping
          </Link>
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
              
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-lg">
                <span className="tracking-wider">TOTAL</span>
                <span className="font-light">€{orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 p-6 mb-8">
            <h3 className="text-sm tracking-wider mb-4">WHAT'S NEXT?</h3>
            <ol className="text-left space-y-2 text-sm max-w-md mx-auto">
              <li>1. Recibirás un email de confirmación con los detalles de tu compra</li>
              <li>2. Prepararemos tu pedido para el envío</li>
              <li>3. Te enviaremos un número de seguimiento cuando se envíe</li>
              <li>4. Tu pedido llegará en 3-5 días hábiles</li>
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