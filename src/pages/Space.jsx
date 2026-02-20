import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useCart } from '../contexts/CartContext'

// Importar imágenes de Nuevo Space (Permanent Souls)
import iranzoImg1 from '../assets/Nuevo Space/WhatsApp Image 2026-02-17 at 13.46.19.jpeg'
import iranzoImg2 from '../assets/Nuevo Space/2.jpeg'

const SpaceGallery = ({ images }) => {
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
      {images.length > 1 && (
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
      )}

      {/* Styled Navigation Arrows (Visible only on desktop hover) */}
      {images.length > 1 && (
        <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-between px-8 text-black/20 group-hover:text-black/60 transition-colors duration-500">
           <span className="text-4xl font-light">←</span>
           <span className="text-4xl font-light">→</span>
        </div>
      )}

      {/* Modern Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-6 md:left-auto md:right-6 font-mono text-xs tracking-widest text-gray-500">
          <span className="text-black">{(currentIndex + 1).toString().padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{images.length.toString().padStart(2, '0')}</span>
        </div>
      )}
    </div>
  )
}

const Space = () => {
  const { t } = useTranslation()
  const { getCartCount, setIsCartOpen } = useCart()
  const spaceImages = [iranzoImg1, iranzoImg2]

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
                  <span>SEASON 02</span>
                  <div className="h-px w-8 bg-gray-300"></div>
                  <span>Feb — Mar</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic mb-2 leading-[0.9] -ml-1">
                {t('permanentSoulsTitle')}
              </h1>
              
              <p className="font-mono text-xs tracking-widest mb-8 text-black border-l border-black pl-4 py-1 mt-6">
                Iranzo — Jordi Iranzo
              </p>

              <h2 className="text-xl md:text-2xl font-light mb-6 leading-tight">
                {t('permanentSoulsSubtitle')}
              </h2>

              <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-600 font-sans tracking-wide text-justify md:text-left">
                <p>{t('permanentSoulsText1')}</p>
                <p>{t('permanentSoulsText2')}</p>
                <p>{t('permanentSoulsText3')}</p>
                <p>{t('permanentSoulsText4')}</p>
              </div>
            </motion.div>
        </div>

        {/* Image Gallery Column */}
        <div className="w-full md:w-[60%] h-[50vh] md:h-full bg-white flex items-center justify-center p-4 md:p-12 md:pl-0">
             <SpaceGallery images={spaceImages} />
        </div>
      </div>
    </div>
  )
}

export default Space

