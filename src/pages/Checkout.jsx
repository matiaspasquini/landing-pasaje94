import { useState } from 'react'
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

  // Costos de envío por zona (precios competitivos para Europa)
  const shippingCosts = {
    spain: {
      standard: 4.90,    // 2-3 días laborables
      express: 9.90,     // 24-48h
      pickup: 0.00,      // Recoger en tienda
    },
    'europe-core': {
      standard: 12.90,   // 4-6 días laborables  
      express: 24.90,    // 2-3 días laborables
      pickup: null,      // No disponible
    },
    'europe-extended': {
      standard: 18.90,   // 5-8 días laborables
      express: 34.90,    // 3-5 días laborables
      pickup: null,      // No disponible
    },
    international: {
      standard: 45.00,   // 10-15 días laborables
      express: 65.00,    // 5-8 días laborables
      pickup: null,      // No disponible
    }
  }

  // Detectar zona de envío según país
  const detectShippingZone = (country) => {
    // Países de la zona euro principal (envío más económico)
    const euCoreCountries = ['FR', 'IT', 'PT', 'DE', 'NL', 'BE', 'AT', 'LU']
    
    // Países europeos extendidos (envío moderado)
    const euExtendedCountries = ['UK', 'IE', 'CH', 'NO', 'SE', 'DK', 'FI', 'PL', 'CZ', 'GR']
    
    if (country === 'ES') return 'spain'
    if (euCoreCountries.includes(country)) return 'europe-core'
    if (euExtendedCountries.includes(country)) return 'europe-extended'
    return 'international'
  }

  // Obtener provincias según país (enfocado en Europa)
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
        { value: 'Las Palmas', label: 'Las Palmas' },
        { value: 'Palma', label: 'Palma' },
        { value: 'Vigo', label: 'Vigo' },
        { value: 'A Coruña', label: 'A Coruña' },
        { value: 'Granada', label: 'Granada' },
        { value: 'Alicante', label: 'Alicante' },
        { value: 'Córdoba', label: 'Córdoba' },
        { value: 'Santander', label: 'Santander' }
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
        { value: 'Centre-Val de Loire', label: 'Centre-Val de Loire' },
        { value: 'Bourgogne-Franche-Comté', label: 'Bourgogne-Franche-Comté' }
      ],
      'IT': [
        { value: 'Lombardia', label: 'Lombardia' },
        { value: 'Lazio', label: 'Lazio (Roma)' },
        { value: 'Campania', label: 'Campania (Napoli)' },
        { value: 'Veneto', label: 'Veneto (Venezia)' },
        { value: 'Emilia-Romagna', label: 'Emilia-Romagna (Bologna)' },
        { value: 'Piemonte', label: 'Piemonte (Torino)' },
        { value: 'Puglia', label: 'Puglia (Bari)' },
        { value: 'Toscana', label: 'Toscana (Firenze)' },
        { value: 'Sicilia', label: 'Sicilia (Palermo)' },
        { value: 'Sardegna', label: 'Sardegna (Cagliari)' },
        { value: 'Liguria', label: 'Liguria (Genova)' },
        { value: 'Marche', label: 'Marche (Ancona)' },
        { value: 'Umbria', label: 'Umbria (Perugia)' },
        { value: 'Calabria', label: 'Calabria (Catanzaro)' }
      ],
      'PT': [
        { value: 'Lisboa', label: 'Lisboa' },
        { value: 'Porto', label: 'Porto' },
        { value: 'Braga', label: 'Braga' },
        { value: 'Coimbra', label: 'Coimbra' },
        { value: 'Faro', label: 'Faro (Algarve)' },
        { value: 'Aveiro', label: 'Aveiro' },
        { value: 'Évora', label: 'Évora' },
        { value: 'Viseu', label: 'Viseu' },
        { value: 'Setúbal', label: 'Setúbal' },
        { value: 'Leiria', label: 'Leiria' }
      ],
      'DE': [
        { value: 'Bayern', label: 'Bayern (München)' },
        { value: 'Baden-Württemberg', label: 'Baden-Württemberg (Stuttgart)' },
        { value: 'Nordrhein-Westfalen', label: 'Nordrhein-Westfalen (Düsseldorf)' },
        { value: 'Hessen', label: 'Hessen (Wiesbaden)' },
        { value: 'Niedersachsen', label: 'Niedersachsen (Hannover)' },
        { value: 'Berlin', label: 'Berlin' },
        { value: 'Hamburg', label: 'Hamburg' },
        { value: 'Sachsen', label: 'Sachsen (Dresden)' },
        { value: 'Rheinland-Pfalz', label: 'Rheinland-Pfalz (Mainz)' }
      ],
      'NL': [
        { value: 'Noord-Holland', label: 'Noord-Holland (Amsterdam)' },
        { value: 'Zuid-Holland', label: 'Zuid-Holland (Den Haag)' },
        { value: 'Noord-Brabant', label: 'Noord-Brabant (Eindhoven)' },
        { value: 'Utrecht', label: 'Utrecht' },
        { value: 'Gelderland', label: 'Gelderland (Arnhem)' },
        { value: 'Overijssel', label: 'Overijssel (Zwolle)' },
        { value: 'Limburg', label: 'Limburg (Maastricht)' },
        { value: 'Groningen', label: 'Groningen' }
      ],
      'BE': [
        { value: 'Brussels', label: 'Brussels-Capital' },
        { value: 'Antwerp', label: 'Antwerp (Vlaanderen)' },
        { value: 'East Flanders', label: 'East Flanders (Gent)' },
        { value: 'West Flanders', label: 'West Flanders (Brugge)' },
        { value: 'Walloon Brabant', label: 'Walloon Brabant (Wavre)' },
        { value: 'Liège', label: 'Liège (Wallonia)' },
        { value: 'Namur', label: 'Namur (Wallonia)' }
      ],
      'AT': [
        { value: 'Vienna', label: 'Vienna (Wien)' },
        { value: 'Lower Austria', label: 'Lower Austria (Niederösterreich)' },
        { value: 'Upper Austria', label: 'Upper Austria (Oberösterreich)' },
        { value: 'Salzburg', label: 'Salzburg' },
        { value: 'Tyrol', label: 'Tyrol (Tirol)' },
        { value: 'Styria', label: 'Styria (Steiermark)' },
        { value: 'Carinthia', label: 'Carinthia (Kärnten)' }
      ],
      'CH': [
        { value: 'Zürich', label: 'Zürich' },
        { value: 'Geneva', label: 'Geneva (Genève)' },
        { value: 'Basel', label: 'Basel' },
        { value: 'Bern', label: 'Bern' },
        { value: 'Vaud', label: 'Vaud (Lausanne)' },
        { value: 'Ticino', label: 'Ticino (Bellinzona)' },
        { value: 'Valais', label: 'Valais (Sion)' }
      ],
      'UK': [
        { value: 'England', label: 'England' },
        { value: 'Scotland', label: 'Scotland' },
        { value: 'Wales', label: 'Wales' },
        { value: 'Northern Ireland', label: 'Northern Ireland' }
      ],
      'IE': [
        { value: 'Dublin', label: 'Dublin' },
        { value: 'Cork', label: 'Cork' },
        { value: 'Galway', label: 'Galway' },
        { value: 'Limerick', label: 'Limerick' },
        { value: 'Waterford', label: 'Waterford' }
      ]
    }

    // Para países sin provincias específicas definidas, usar valor genérico
    return provinces[country] || [
      { value: 'region', label: 'Region/State' }
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

  if (cartItems.length === 0) {
    navigate('/shop')
    return null
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 md:px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl tracking-tight font-light mb-8 md:mb-10">{t('checkout.title')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h2 className="text-xl md:text-2xl tracking-tight font-light mb-5">
                    {t('checkout.contactInformation')}
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                          {t('checkout.firstName')}
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full border-b ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          } px-0 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent`}
                          placeholder={t('checkout.firstName')}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                          {t('checkout.lastName')}
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full border-b ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          } px-0 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent`}
                          placeholder={t('checkout.lastName')}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                        {t('checkout.company')}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 px-0 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent"
                        placeholder={t('checkout.company')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                          {t('checkout.email')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full border-b ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } px-0 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                          {t('checkout.phone')}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full border-b ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          } px-0 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Newsletter checkbox */}
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="w-3.5 h-3.5 border border-gray-400 focus:ring-1 focus:ring-black"
                      />
                      <label htmlFor="newsletter" className="text-xs text-gray-700">
                        {t('checkout.newsletter')}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl md:text-2xl tracking-tight font-light mb-5">
                    {t('checkout.delivery')}
                  </h2>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                        {t('checkout.countryRegion')}
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full border-b ${
                          errors.country ? 'border-red-500' : 'border-gray-300'
                        } px-0 py-2 text-sm focus:outline-none focus:border-black bg-transparent`}
                      >
                        <option value="ES">Spain</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="PT">Portugal</option>
                        <option value="DE">Germany</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                        <option value="AT">Austria</option>
                        <option value="CH">Switzerland</option>
                        <option value="UK">United Kingdom</option>
                        <option value="IE">Ireland</option>
                        <option value="NO">Norway</option>
                        <option value="SE">Sweden</option>
                        <option value="DK">Denmark</option>
                        <option value="FI">Finland</option>
                        <option value="PL">Poland</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="GR">Greece</option>
                      </select>
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                        {t('checkout.address')}
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full border-b ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        } px-0 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent`}
                        placeholder={t('checkout.address')}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                        {t('checkout.apartment')}
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 px-0 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent"
                        placeholder={t('checkout.apartment')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                          {t('checkout.postalCode')}
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`w-full border-b ${
                            errors.postalCode ? 'border-red-500' : 'border-gray-300'
                          } px-0 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent`}
                          placeholder={t('checkout.postalCode')}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                          {t('checkout.city')}
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full border-b ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          } px-0 py-2 text-sm focus:outline-none focus:border-black transition-colors bg-transparent`}
                          placeholder={t('checkout.city')}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                          {t('checkout.province')}
                        </label>
                        <select
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          className={`w-full border-b ${
                            errors.province ? 'border-red-500' : 'border-gray-300'
                          } px-0 py-2 text-sm focus:outline-none focus:border-black bg-transparent`}
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
                    <div className="bg-gray-50 p-3 text-xs text-gray-600 border-l-2 border-gray-300">
                      <p className="font-medium mb-1">{t('checkout.b2bNoticeTitle')}</p>
                      <p>{t('checkout.b2bNoticeText')}</p>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1.5">
                        {t('checkout.additionalNotes')}
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        className="w-full border-b border-gray-300 px-0 py-2 text-sm focus:outline-none focus:border-black resize-none bg-transparent"
                        placeholder="Special instructions or comments..."
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl md:text-2xl tracking-tight font-light mb-5">
                    {t('checkout.shippingMethod')}
                  </h2>
                  
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 border border-gray-300 cursor-pointer hover:border-black transition-colors">
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
                          <p className="font-medium">{t('checkout.standardShipping')}</p>
                          <p className="text-sm text-gray-600">
                            {shippingZone === 'spain' && `2-3 ${t('businessDays')}`}
                            {shippingZone === 'europe-core' && `4-6 ${t('businessDays')}`}
                            {shippingZone === 'europe-extended' && `5-8 ${t('businessDays')}`}
                            {shippingZone === 'international' && `10-15 ${t('businessDays')}`}
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
                          <p className="font-medium">{t('checkout.expressShipping')}</p>
                          <p className="text-sm text-gray-600">
                            {shippingZone === 'spain' && '24-48h'}
                            {shippingZone === 'europe-core' && `2-3 ${t('businessDays')}`}
                            {shippingZone === 'europe-extended' && `3-5 ${t('businessDays')}`}
                            {shippingZone === 'international' && `5-8 ${t('businessDays')}`}
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
                            <p className="font-medium">{t('checkout.pickupAtStore')}</p>
                            <p className="text-sm text-gray-600">Pasaje 94, Valencia</p>
                          </div>
                        </div>
                        <span className="font-medium">{t('free')}</span>
                      </label>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-black text-white hover:bg-gray-800 transition-colors text-xs uppercase tracking-widest font-medium"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-black p-6 sticky top-32">
                <h2 className="text-lg md:text-xl tracking-tight font-light mb-5 uppercase text-xs tracking-wider text-gray-600">Order Summary</h2>
                
                <div className="space-y-3 mb-5">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <div>
                        <p className="font-normal text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">€{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping ({shippingZone === 'spain' ? 'Spain' : shippingZone === 'europe-core' ? 'EU Core' : shippingZone === 'europe-extended' ? 'EU Extended' : 'International'})</span>
                    <span className="font-medium">
                      {formData.shippingMethod === 'pickup' 
                        ? t('free') 
                        : `€${shippingCosts[shippingZone][formData.shippingMethod].toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-3 border-t border-gray-200">
                    <span className="tracking-wider uppercase">Total</span>
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