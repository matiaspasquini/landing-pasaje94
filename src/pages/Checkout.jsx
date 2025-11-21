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
    country: 'ES', // País por defecto España
    notes: '',
    shippingMethod: 'standard',
  })

  const [errors, setErrors] = useState({})
  const [shippingZone, setShippingZone] = useState('spain') // spain, europe, international

  // Costos de envío por zona
  const shippingCosts = {
    spain: {
      standard: 5.00,    // 3-5 días
      express: 12.00,    // 1-2 días
      pickup: 0.00,      // Recoger en tienda
    },
    europe: {
      standard: 15.00,   // 5-7 días
      express: 30.00,    // 2-3 días
      pickup: null,      // No disponible
    },
    international: {
      standard: 35.00,   // 7-14 días
      express: 60.00,    // 3-5 días
      pickup: null,      // No disponible
    }
  }

  // Detectar zona de envío según país
  const detectShippingZone = (country) => {
    const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'SE']
    
    if (country === 'ES') return 'spain'
    if (euCountries.includes(country)) return 'europe'
    return 'international'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Detectar zona de envío cuando cambia el país
    if (name === 'country') {
      const newZone = detectShippingZone(value)
      setShippingZone(newZone)
      
      // Si no es España, resetear a standard (pickup no disponible)
      if (newZone !== 'spain' && formData.shippingMethod === 'pickup') {
        setFormData(prev => ({ ...prev, shippingMethod: 'standard' }))
      }
    }
    
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
    if (!formData.country.trim()) newErrors.country = 'Country is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const currentShippingCosts = shippingCosts[shippingZone]
    const shippingCost = currentShippingCosts[formData.shippingMethod]
    const subtotal = getCartTotal()
    const total = subtotal + shippingCost

    const orderDataToSave = {
      ...formData,
      cartItems: cartItems,
      subtotal: subtotal,
      shippingCost: shippingCost,
      total: total,
      date: new Date().toISOString(),
    }

    // Guardar datos de envío en localStorage para usarlos en Stripe
    localStorage.setItem('checkoutData', JSON.stringify(formData))
    
    // Guardar el pedido completo en AMBOS lugares para mayor seguridad
    sessionStorage.setItem('orderData', JSON.stringify(orderDataToSave))
    localStorage.setItem('orderData', JSON.stringify(orderDataToSave))
    
    console.log('💾 Order data saved:', orderDataToSave)
    
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
                        COUNTRY *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full border ${
                          errors.country ? 'border-red-500' : 'border-black'
                        } p-3 focus:outline-none focus:ring-1 focus:ring-black bg-white`}
                      >
                        <option value="ES">España</option>
                        <optgroup label="European Union">
                          <option value="AT">Austria</option>
                          <option value="BE">Belgium</option>
                          <option value="BG">Bulgaria</option>
                          <option value="HR">Croatia</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="EE">Estonia</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                          <option value="GR">Greece</option>
                          <option value="HU">Hungary</option>
                          <option value="IE">Ireland</option>
                          <option value="IT">Italy</option>
                          <option value="LV">Latvia</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MT">Malta</option>
                          <option value="NL">Netherlands</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="RO">Romania</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SE">Sweden</option>
                        </optgroup>
                        <optgroup label="International">
                          <option value="US">United States</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AR">Argentina</option>
                          <option value="BR">Brazil</option>
                          <option value="CA">Canada</option>
                          <option value="CL">Chile</option>
                          <option value="MX">Mexico</option>
                          <option value="OTHER">Other</option>
                        </optgroup>
                      </select>
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                      )}
                      
                      {/* Mensaje de zona de envío */}
                      {shippingZone === 'europe' && (
                        <p className="text-xs text-blue-600 mt-2">
                          📦 European Union shipping available
                        </p>
                      )}
                      {shippingZone === 'international' && (
                        <p className="text-xs text-orange-600 mt-2">
                          🌍 International shipping - longer delivery times and higher costs apply
                        </p>
                      )}
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
                          <p className="text-sm text-gray-600">
                            {shippingZone === 'spain' && '3-5 business days'}
                            {shippingZone === 'europe' && '5-7 business days'}
                            {shippingZone === 'international' && '7-14 business days'}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">€{shippingCosts[shippingZone].standard.toFixed(2)}</span>
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
                          <p className="text-sm text-gray-600">
                            {shippingZone === 'spain' && '1-2 business days'}
                            {shippingZone === 'europe' && '2-3 business days'}
                            {shippingZone === 'international' && '3-5 business days'}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">€{shippingCosts[shippingZone].express.toFixed(2)}</span>
                    </label>

                    {shippingZone === 'spain' && (
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
                    )}
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
                    <span>Shipping ({shippingZone === 'spain' ? 'Spain' : shippingZone === 'europe' ? 'EU' : 'International'})</span>
                    <span>
                      {formData.shippingMethod === 'pickup' 
                        ? 'FREE' 
                        : `€${shippingCosts[shippingZone][formData.shippingMethod].toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-medium pt-2 border-t border-gray-300">
                    <span className="tracking-wider">TOTAL</span>
                    <span>€{(getCartTotal() + shippingCosts[shippingZone][formData.shippingMethod]).toFixed(2)}</span>
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
            total={getCartTotal() + shippingCosts[shippingZone][formData.shippingMethod]}
            shippingCost={shippingCosts[shippingZone][formData.shippingMethod]}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Checkout