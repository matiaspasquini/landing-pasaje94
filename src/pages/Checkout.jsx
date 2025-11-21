import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import StripeCheckout from '../components/StripeCheckout'

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [showStripeCheckout, setShowStripeCheckout] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    shippingMethod: 'standard', // Nuevo campo para método de envío
  })

  const [errors, setErrors] = useState({})

  // Costos de envío
  const shippingCosts = {
    standard: 5.00,    // 3-5 días
    express: 12.00,    // 1-2 días
    pickup: 0.00,      // Recoger en tienda
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const shippingCost = shippingCosts[formData.shippingMethod]
    const subtotal = getCartTotal()
    const total = subtotal + shippingCost

    // Guardar datos de envío en localStorage para usarlos en Stripe
    localStorage.setItem('checkoutData', JSON.stringify(formData))
    
    // Guardar también el resumen del pedido completo en sessionStorage
    sessionStorage.setItem('orderData', JSON.stringify({
      ...formData,
      cartItems: cartItems,
      subtotal: subtotal,
      shippingCost: shippingCost,
      total: total,
      date: new Date().toISOString(),
    }))
    
    // Mostrar modal de Stripe
    setShowStripeCheckout(true)
  }

  if (cartItems.length === 0) {
    navigate('/shop')
    return null
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl tracking-tighter font-light mb-12">CHECKOUT</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h2 className="text-2xl tracking-tighter font-light mb-6">
                    Contact Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm tracking-wider mb-2">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full border ${
                          errors.name ? 'border-red-500' : 'border-black'
                        } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          EMAIL *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.email ? 'border-red-500' : 'border-black'
                          } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          PHONE *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.phone ? 'border-red-500' : 'border-black'
                          } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-2xl tracking-tighter font-light mb-6">
                    Shipping Address
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm tracking-wider mb-2">
                        ADDRESS *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full border ${
                          errors.address ? 'border-red-500' : 'border-black'
                        } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          CITY *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.city ? 'border-red-500' : 'border-black'
                          } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          POSTAL CODE *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.postalCode ? 'border-red-500' : 'border-black'
                          } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm tracking-wider mb-2">
                        ADDITIONAL NOTES
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border border-black p-3 focus:outline-none focus:ring-1 focus:ring-black resize-none"
                        placeholder="Special instructions or comments..."
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h2 className="text-2xl tracking-tighter font-light mb-6">
                    Shipping Method
                  </h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-black cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-gray-600">3-5 business days</p>
                        </div>
                      </div>
                      <span className="font-medium">€5.00</span>
                    </label>

                    <label className="flex items-center justify-between p-4 border border-black cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-gray-600">1-2 business days</p>
                        </div>
                      </div>
                      <span className="font-medium">€12.00</span>
                    </label>

                    <label className="flex items-center justify-between p-4 border border-black cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="pickup"
                          checked={formData.shippingMethod === 'pickup'}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-medium">Pick up at Store</p>
                          <p className="text-sm text-gray-600">Pasaje 94, Valencia</p>
                        </div>
                      </div>
                      <span className="font-medium">FREE</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider"
                >
                  PROCEED TO PAYMENT
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-black p-6 sticky top-32">
                <h2 className="text-2xl tracking-tighter font-light mb-6">ORDER SUMMARY</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-light">{item.name}</p>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p>€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>€{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {formData.shippingMethod === 'pickup' 
                        ? 'FREE' 
                        : `€${shippingCosts[formData.shippingMethod].toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-medium pt-2 border-t border-gray-300">
                    <span className="tracking-wider">TOTAL</span>
                    <span>€{(getCartTotal() + shippingCosts[formData.shippingMethod]).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-600 pt-2">
                    Secure payment powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stripe Checkout Modal */}
      <AnimatePresence>
        {showStripeCheckout && (
          <StripeCheckout
            isOpen={showStripeCheckout}
            onClose={() => setShowStripeCheckout(false)}
            cart={cartItems}
            total={getCartTotal() + shippingCosts[formData.shippingMethod]}
            shippingCost={shippingCosts[formData.shippingMethod]}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Checkout