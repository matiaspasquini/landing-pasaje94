import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import StripeCheckout from '../components/StripeCheckout'
import { useTranslation } from 'react-i18next'

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [showStripeCheckout, setShowStripeCheckout] = useState(false)
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    province: '',
    country: 'ES', // País por defecto España
    notes: '',
    shippingMethod: 'standard',
    newsletter: false,
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

  // Obtener provincias según país
  const getProvincesByCountry = (country) => {
    const provinces = {
      'ES': [
        { value: 'Valencia', label: 'Valencia' },
        { value: 'Madrid', label: 'Madrid' },
        { value: 'Barcelona', label: 'Barcelona' },
        { value: 'Sevilla', label: 'Sevilla' },
        { value: 'Bilbao', label: 'Bilbao' },
        { value: 'Zaragoza', label: 'Zaragoza' },
        { value: 'Málaga', label: 'Málaga' },
        { value: 'Murcia', label: 'Murcia' },
        { value: 'other', label: 'Other' }
      ],
      'FR': [
        { value: 'Île-de-France', label: 'Île-de-France (Paris)' },
        { value: 'Provence-Alpes-Côte d\'Azur', label: 'Provence-Alpes-Côte d\'Azur' },
        { value: 'Auvergne-Rhône-Alpes', label: 'Auvergne-Rhône-Alpes' },
        { value: 'Nouvelle-Aquitaine', label: 'Nouvelle-Aquitaine' },
        { value: 'Occitanie', label: 'Occitanie' },
        { value: 'Hauts-de-France', label: 'Hauts-de-France' },
        { value: 'Grand Est', label: 'Grand Est' },
        { value: 'Pays de la Loire', label: 'Pays de la Loire' },
        { value: 'Bretagne', label: 'Bretagne' },
        { value: 'Normandie', label: 'Normandie' },
        { value: 'other', label: 'Other' }
      ],
      'IT': [
        { value: 'Lombardia', label: 'Lombardia' },
        { value: 'Lazio', label: 'Lazio' },
        { value: 'Campania', label: 'Campania' },
        { value: 'Veneto', label: 'Veneto' },
        { value: 'Emilia-Romagna', label: 'Emilia-Romagna' },
        { value: 'Piemonte', label: 'Piemonte' },
        { value: 'Puglia', label: 'Puglia' },
        { value: 'Toscana', label: 'Toscana' },
        { value: 'Calabria', label: 'Calabria' },
        { value: 'Sicilia', label: 'Sicilia' },
        { value: 'other', label: 'Other' }
      ],
      'PT': [
        { value: 'Lisboa', label: 'Lisboa' },
        { value: 'Porto', label: 'Porto' },
        { value: 'Braga', label: 'Braga' },
        { value: 'Coimbra', label: 'Coimbra' },
        { value: 'Faro', label: 'Faro' },
        { value: 'Aveiro', label: 'Aveiro' },
        { value: 'other', label: 'Other' }
      ],
      'DE': [
        { value: 'Bayern', label: 'Bayern' },
        { value: 'Baden-Württemberg', label: 'Baden-Württemberg' },
        { value: 'Nordrhein-Westfalen', label: 'Nordrhein-Westfalen' },
        { value: 'Hessen', label: 'Hessen' },
        { value: 'Niedersachsen', label: 'Niedersachsen' },
        { value: 'Berlin', label: 'Berlin' },
        { value: 'Hamburg', label: 'Hamburg' },
        { value: 'other', label: 'Other' }
      ],
      'NL': [
        { value: 'Noord-Holland', label: 'Noord-Holland' },
        { value: 'Zuid-Holland', label: 'Zuid-Holland' },
        { value: 'Noord-Brabant', label: 'Noord-Brabant' },
        { value: 'Utrecht', label: 'Utrecht' },
        { value: 'Gelderland', label: 'Gelderland' },
        { value: 'other', label: 'Other' }
      ],
      'BE': [
        { value: 'Brussels', label: 'Brussels' },
        { value: 'Antwerp', label: 'Antwerp' },
        { value: 'East Flanders', label: 'East Flanders' },
        { value: 'West Flanders', label: 'West Flanders' },
        { value: 'Walloon Brabant', label: 'Walloon Brabant' },
        { value: 'other', label: 'Other' }
      ]
    }

    // Para países sin provincias específicas, usar región/estado genérico
    return provinces[country] || [
      { value: 'region', label: 'Region/State' },
      { value: 'other', label: 'Other' }
    ]
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value
    
    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }))
    
    // Detectar zona de envío cuando cambia el país
    if (name === 'country') {
      const newZone = detectShippingZone(value)
      setShippingZone(newZone)
      
      // Resetear provincia cuando cambia el país
      setFormData(prev => ({ 
        ...prev, 
        [name]: fieldValue,
        province: '' // Resetear provincia
      }))
      
      // Si no es España, resetear a standard (pickup no disponible)
      if (newZone !== 'spain' && formData.shippingMethod === 'pickup') {
        setFormData(prev => ({ ...prev, shippingMethod: 'standard' }))
      }
      
      return // Salir temprano para evitar el setFormData de abajo
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

    if (!formData.firstName.trim()) newErrors.firstName = t('checkout.errors.firstName')
    if (!formData.lastName.trim()) newErrors.lastName = t('checkout.errors.lastName')
    if (!formData.email.trim()) {
      newErrors.email = t('checkout.errors.email')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('checkout.errors.emailInvalid')
    }
    if (!formData.phone.trim()) newErrors.phone = t('checkout.errors.phone')
    if (!formData.address.trim()) newErrors.address = t('checkout.errors.address')
    if (!formData.city.trim()) newErrors.city = t('checkout.errors.city')
    if (!formData.postalCode.trim()) newErrors.postalCode = t('checkout.errors.postalCode')
    if (!formData.province.trim()) newErrors.province = t('checkout.errors.province')
    if (!formData.country.trim()) newErrors.country = t('checkout.errors.country')

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

  // Redireccionar si el carrito está vacío
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/shop')
    }
  }, [cartItems.length, navigate])

  // Si el carrito está vacío, mostrar loading mientras redirige
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-6 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Redirecting to shop...</p>
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
          <h1 className="text-5xl tracking-tighter font-light mb-12">{t('checkout.title')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h2 className="text-2xl tracking-tighter font-light mb-6">
                    {t('checkout.contactInformation')}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          {t('checkout.firstName')}
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.firstName ? 'border-red-500' : 'border-black'
                          } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                          placeholder={t('checkout.firstName')}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          {t('checkout.lastName')}
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.lastName ? 'border-red-500' : 'border-black'
                          } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                          placeholder={t('checkout.lastName')}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm tracking-wider mb-2">
                        {t('checkout.company')}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border border-black p-3 focus:outline-none focus:ring-1 focus:ring-black"
                        placeholder={t('checkout.company')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          {t('checkout.email')}
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
                          {t('checkout.phone')}
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

                    {/* Newsletter checkbox */}
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="w-4 h-4 border border-black focus:ring-1 focus:ring-black"
                      />
                      <label htmlFor="newsletter" className="text-sm tracking-wider">
                        {t('checkout.newsletter')}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-2xl tracking-tighter font-light mb-6">
                    {t('checkout.delivery')}
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm tracking-wider mb-2">
                        {t('checkout.countryRegion')}
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full border ${
                          errors.country ? 'border-red-500' : 'border-black'
                        } p-3 focus:outline-none focus:ring-1 focus:ring-black bg-white`}
                      >
                        <option value="ES">Spain</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="PT">Portugal</option>
                        <option value="DE">Germany</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                        <option value="UK">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm tracking-wider mb-2">
                        {t('checkout.address')}
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full border ${
                          errors.address ? 'border-red-500' : 'border-black'
                        } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                        placeholder={t('checkout.address')}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm tracking-wider mb-2">
                        {t('checkout.apartment')}
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="w-full border border-black p-3 focus:outline-none focus:ring-1 focus:ring-black"
                        placeholder={t('checkout.apartment')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          {t('checkout.postalCode')}
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.postalCode ? 'border-red-500' : 'border-black'
                          } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                          placeholder={t('checkout.postalCode')}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          {t('checkout.city')}
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.city ? 'border-red-500' : 'border-black'
                          } p-3 focus:outline-none focus:ring-1 focus:ring-black`}
                          placeholder={t('checkout.city')}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm tracking-wider mb-2">
                          {t('checkout.province')}
                        </label>
                        <select
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          className={`w-full border ${
                            errors.province ? 'border-red-500' : 'border-black'
                          } p-3 focus:outline-none focus:ring-1 focus:ring-black bg-white`}
                        >
                          <option value="">{t('checkout.selectProvince')}</option>
                          {getProvincesByCountry(formData.country).map((province) => (
                            <option key={province.value} value={province.value}>
                              {province.label}
                            </option>
                          ))}
                        </select>
                        {errors.province && (
                          <p className="text-red-500 text-xs mt-1">{errors.province}</p>
                        )}
                      </div>
                    </div>

                    {/* B2B Customer Notice */}
                    <div className="bg-gray-100 p-4 rounded border flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-1">{t('checkout.b2bNoticeTitle')}</p>
                        <p>{t('checkout.b2bNoticeText')}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm tracking-wider mb-2">
                        {t('checkout.additionalNotes')}
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