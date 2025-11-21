import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart()
  
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl tracking-tighter font-light mb-4">Your cart is empty</h2>
          <Link
            to="/shop"
            className="inline-block px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors text-sm tracking-wider"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl tracking-tighter font-light mb-12">YOUR CART</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 border-b border-gray-200 pb-8">
                  {/* Image */}
                  <div className="w-32 h-32 bg-gray-100 flex-shrink-0">
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
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-xl font-light mb-1 hover:opacity-60">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-4">{item.artist}</p>
                    <p className="text-lg font-light mb-4">€{item.price.toFixed(2)}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm hover:opacity-60 transition-opacity"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-lg font-light">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="border border-black p-6 sticky top-32">
                <h2 className="text-2xl tracking-tighter font-light mb-6">ORDER SUMMARY</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>€{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="tracking-wider">TOTAL</span>
                    <span className="font-light">€{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider mb-4"
                >
                  PROCEED TO CHECKOUT
                </button>

                <Link
                  to="/shop"
                  className="block text-center text-sm hover:opacity-60 transition-opacity"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Cart