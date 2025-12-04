import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useCart } from '../contexts/CartContext'

const Cart = () => {
  const { t } = useTranslation()
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl md:text-4xl tracking-tighter font-light mb-6">
            {t('checkout.yourCartIsEmpty')}
          </h1>
          <Link
            to="/space"
            className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            {t('checkout.continueShopping')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <Link 
            to="/"
            className="text-3xl md:text-5xl tracking-tighter font-normal hover:opacity-60 transition-opacity"
          >
            Pasaje
          </Link>
          <span className="text-3xl md:text-5xl tracking-tighter font-normal">94</span>
        </div>

        <h1 className="text-3xl md:text-4xl tracking-tighter font-light mb-12">
          {t('cart')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-6 border-b pb-6"
              >
                {/* Product Image */}
                <div className="w-32 h-32 bg-gray-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.designer}</p>
                  <p className="text-lg font-medium">€{item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Eliminar
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 sticky top-24">
              <h2 className="text-xl font-medium mb-6">{t('checkout.orderSummary')}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>{t('checkout.subtotal')}</span>
                  <span>€{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('checkout.shipping')}</span>
                  <span className="text-sm text-gray-600">Calculado en checkout</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-medium">
                  <span>{t('checkout.total')}</span>
                  <span>€{getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full px-6 py-3 bg-black text-white text-center hover:bg-gray-800 transition-colors mb-4"
              >
                {t('checkout.checkoutButton')}
              </Link>

              <Link
                to="/space"
                className="block w-full px-6 py-3 border border-black text-center hover:bg-gray-100 transition-colors"
              >
                {t('checkout.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart