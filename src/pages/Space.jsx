import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useCart } from '../contexts/CartContext'

const Space = () => {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const { t } = useTranslation()
  const { getCartCount, setIsCartOpen } = useCart()

  return (
    <div className="h-screen overflow-hidden bg-white">
      {/* Header fijo con Pasaje y 94 */}
      <div className="fixed top-0 left-0 right-0 z-[60] px-6 py-6 bg-white">
        <div className="flex justify-between items-center">
          <Link 
            to="/"
            className="text-3xl md:text-5xl tracking-tighter font-normal hover:opacity-60 transition-opacity"
          >
            Pasaje
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative group cursor-pointer"
          >
            <span className="text-3xl md:text-5xl tracking-tighter font-normal">94</span>
            {/* Ícono de carrito superpuesto */}
            <span 
              className="absolute -top-1 -right-2 text-xl opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ pointerEvents: 'none' }}
            >
              🛒
            </span>
            {/* Badge contador */}
            {getCartCount() > 0 && (
              <motion.span
                className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                {getCartCount()}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      <div className="h-full flex items-center justify-center p-6 pt-20">
        <div className="max-w-4xl mx-auto w-full">
            <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter font-light mb-4 md:mb-6">
                {t('coworkingTitle')}
              </h1>
              <p className="text-xl md:text-2xl font-light italic mb-8 md:mb-12 text-gray-600">
                {t('coworkingDates')}
              </p>

              <h2 className="text-2xl md:text-3xl font-light mb-6 md:mb-8">
                {t('coworkingSubtitle')}
              </h2>

              <div className="space-y-6 text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto text-left md:text-center">
                <p>{t('coworkingText1')}</p>
                <p>{t('coworkingText2')}</p>
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Space
