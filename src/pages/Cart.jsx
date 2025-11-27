import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Cart = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl tracking-tighter font-light mb-8">
            {t('presaleOnly')}
          </h1>
          
          <div className="bg-gray-50 p-8 rounded-lg border mb-8">
            <h2 className="text-xl md:text-2xl tracking-tighter font-light mb-6">
              💝 Preventa Exclusiva
            </h2>
            
            <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-700">
              {t('presaleMessage')}
            </p>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-medium">Ubicación</p>
                  <p className="text-gray-600">C/ dels Trinitaris, 13</p>
                  <p className="text-gray-600">Ciutat Vella, Valencia</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-lg">⏰</span>
                <div>
                  <p className="font-medium">Horarios</p>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-lg">☎️</span>
                <div>
                  <p className="font-medium">Contacto</p>
                  <p className="text-gray-600">info@pasaje94.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/space"
              className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider"
            >
              Ver Productos
            </Link>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors text-sm tracking-wider"
            >
              Contactar
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Cart