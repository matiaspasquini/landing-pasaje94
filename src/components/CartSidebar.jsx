import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CartSidebar = () => {
  const { t } = useTranslation()
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart()

  const navigate = useNavigate()

  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-[90vw] sm:w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-black p-4 md:p-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl tracking-tighter font-light">YOUR CART</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-3xl md:text-2xl hover:opacity-60 transition-opacity w-10 h-10 flex items-center justify-center"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">{t('yourCartIsEmpty')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-6">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="font-light mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.artist}</p>
                        <p className="text-sm font-light">€{item.price}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-xs hover:opacity-60 transition-opacity"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Total and Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-black p-6">
                <div className="flex justify-between mb-4">
                  <span className="tracking-wider">TOTAL</span>
                  <span className="text-xl font-light">€{getCartTotal().toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors tracking-wider text-sm"
                >
                  {t('checkoutButton')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar