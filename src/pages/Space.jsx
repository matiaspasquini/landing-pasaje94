import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useCart } from '../contexts/CartContext'

// Importar imágenes de Cowork
import cowork1 from '../assets/COWORK/IMG_0374.webp'
import cowork2 from '../assets/COWORK/IMG_0683.webp'
import cowork3 from '../assets/COWORK/744484FD-ADE1-44C0-AF5D-8DC594F8055D.JPEG'
import cowork4 from '../assets/COWORK/D4029253-DC86-4946-A871-2A01DDFE66E2.JPEG'

const CoworkGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] group overflow-hidden bg-[#f4f4f4] mt-8 md:mt-0">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-95"
        />
      </AnimatePresence>
      
      {/* Invisible Navigation Areas */}
      <div className="absolute inset-0 flex z-20">
        <div 
          onClick={prev} 
          className="w-1/2 h-full cursor-w-resize md:cursor-none"
        />
        <div 
          onClick={next} 
          className="w-1/2 h-full cursor-e-resize md:cursor-none"
        />
      </div>

      {/* Styled Navigation Arrows (Visible only on desktop hover) */}
      <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-between px-8 text-black/20 group-hover:text-black/60 transition-colors duration-500">
         <span className="text-4xl font-light">←</span>
         <span className="text-4xl font-light">→</span>
      </div>

      {/* Modern Counter */}
      <div className="absolute bottom-6 left-6 md:left-auto md:right-6 font-mono text-xs tracking-widest text-gray-500">
        <span className="text-black">{(currentIndex + 1).toString().padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{images.length.toString().padStart(2, '0')}</span>
      </div>
    </div>
  )
}

const Space = () => {
  const { t } = useTranslation()
  const { getCartCount, setIsCartOpen } = useCart()
  const coworkImages = [cowork1, cowork2, cowork3, cowork4]

  return (
    <div className="h-screen overflow-hidden bg-white selection:bg-black selection:text-white">
      {/* Header fijo con Pasaje y 94 */}
      <div className="fixed top-0 left-0 right-0 z-[60] px-6 py-6 bg-white/90 backdrop-blur-sm">
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

      {/* Content Container - Split Layout like Projects */}
      <div className="h-full pt-20 flex flex-col md:flex-row">
        
        {/* Text Column */}
        <div className="w-full md:w-[40%] h-auto md:h-full flex flex-col justify-center px-6 md:px-16 overflow-y-auto scrollbar-hide py-12">
            <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-xl mx-auto md:mx-0"
            >
              <div className="flex items-center gap-4 mb-6 font-mono text-xs tracking-widest text-gray-500 uppercase">
                  <span>SEASON 01</span>
                  <div className="h-px w-8 bg-gray-300"></div>
                  <span>Jan — Feb</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic mb-2 leading-[0.9] -ml-1">
                {t('coworkingTitle')}
              </h1>
              
              <p className="font-mono text-xs tracking-widest mb-8 text-black border-l border-black pl-4 py-1 mt-6">
                {t('coworkingDates')}
              </p>

              <h2 className="text-xl md:text-2xl font-light mb-6 leading-tight">
                {t('coworkingSubtitle')}
              </h2>

              <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-600 font-sans tracking-wide text-justify md:text-left">
                <p>{t('coworkingText1')}</p>
                <p>{t('coworkingText2')}</p>
              </div>

               <div className="mt-12">
                <a 
                  href="#" // Link to PDF or page
                  className="font-mono text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
                >
                   ↓ {t('downloadBrochure')}
                </a>
              </div>
            </motion.div>
        </div>

        {/* Image Gallery Column */}
        <div className="w-full md:w-[60%] h-[50vh] md:h-full bg-white flex items-center justify-center p-4 md:p-12 md:pl-0">
             <CoworkGallery images={coworkImages} />
        </div>
      </div>
    </div>
  )
}

export default Space

