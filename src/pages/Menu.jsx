import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Importar imágenes de café
import cafeImg1 from '../assets/Cafe/WhatsApp Image 2025-12-01 at 19.37.35.jpeg'
import cafeImg2 from '../assets/Cafe/WhatsApp Image 2025-12-01at 19.37.35.jpeg'
import cafeImg3 from '../assets/Cafe/WhatsApp Image 2025-1201 at 19.37.38.jpeg'
import cafeImg4 from '../assets/Cafe/WhatsApp Imag2025-12-01 at 19.37.41.jpeg'
import cafeImg5 from '../assets/Cafe/WhatsApp Image 202-12-01 at 19.37.41.jpeg'
import cafeImg6 from '../assets/Cafe/WhatsAppImage 2025-12-01 at 19.38.48.jpeg'

// Importar logos
import logoFoc from '../assets/Cafe/Logo - Foc.jpg'
import logoMolt from '../assets/Cafe/Logo - Molt.jpg'

const Menu = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Imagen principal (personas) - asumo que es la primera
  const mainImage = cafeImg6
  
  // Resto de imágenes para la galería alternativa
  const galleryImages = [
    cafeImg1,
    cafeImg2,
    cafeImg3,
    cafeImg4,
    cafeImg5
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-6 py-4 bg-white">
        <button
          onClick={() => navigate('/')}
          className="text-4xl md:text-5xl tracking-tighter hover:opacity-60 transition-opacity"
        >
          Pasaje
        </button>
        <div className="text-4xl md:text-5xl tracking-tighter">94</div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto h-screen snap-x snap-mandatory scrollbar-hide md:overflow-y-hidden">
        
        {/* Section 1: Introducción */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-w-full h-screen flex flex-col justify-center items-start px-6 md:px-16 snap-start"
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl tracking-tighter font-light mb-6 md:mb-12 italic leading-none">
              {t('menuTitle')}
            </h1>
            <div className="space-y-4 md:space-y-6 text-sm md:text-lg leading-relaxed text-gray-700">
              <p>{t('menuIntroText1')}</p>
              <p>{t('menuIntroText2')}</p>
              <p>{t('menuIntroText3')}</p>
            </div>
          </div>
        </motion.div>

        {/* Section 2: Imagen de personas + Logos FOC y MOLT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-12 md:py-0 snap-start"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full max-w-7xl items-center">
            {/* Imagen principal */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md mx-auto lg:max-w-none aspect-square overflow-hidden bg-gray-100"
            >
              <img
                src={mainImage}
                alt="Nuestro equipo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Logos y texto */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center space-y-8 md:space-y-12"
            >
              <div>
                <h2 className="text-3xl md:text-5xl tracking-tighter font-light mb-4 md:mb-6 italic">
                  {t('ourProvidersTitle', 'Nuestros Proveedores')}
                </h2>
                <p className="text-base md:text-xl leading-relaxed text-gray-700">
                  {t('ourProvidersDescription', 'Trabajamos con los mejores artesanos locales para ofrecerte una experiencia única.')}
                </p>
              </div>

              {/* Logo FOC */}
              <div className="space-y-3">
                <div className="w-32 md:w-40">
                  <img src={logoFoc} alt="FOC Coffee" className="w-full h-auto object-contain" />
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  {t('focDescription', 'Café de especialidad')}
                </p>
              </div>

              {/* Logo MOLT */}
              <div className="space-y-3">
                <div className="w-32 md:w-40">
                  <img src={logoMolt} alt="MOLT" className="w-full h-auto object-contain" />
                </div>
                <p className="text-sm md:text-base text-gray-600">
                  {t('moltDescription', 'Productos artesanales')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Section 3: Galería tipo mosaico asimétrico */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-w-full h-screen flex items-center justify-center px-6 md:px-12 snap-start"
        >
          <div className="w-full max-w-7xl h-[85vh] grid grid-cols-4 grid-rows-4 gap-3 md:gap-4">
            {/* Imagen 1 - Grande izquierda */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-2 row-span-2 overflow-hidden bg-gray-100"
            >
              <img
                src={galleryImages[0]}
                alt="Café 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Imagen 2 - Pequeña arriba derecha */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-2 row-span-1 overflow-hidden bg-gray-100"
            >
              <img
                src={galleryImages[1]}
                alt="Café 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Imagen 3 - Media derecha */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1 row-span-2 overflow-hidden bg-gray-100"
            >
              <img
                src={galleryImages[2]}
                alt="Café 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Imagen 4 - Media derecha abajo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-1 row-span-2 overflow-hidden bg-gray-100"
            >
              <img
                src={galleryImages[3]}
                alt="Café 4"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Imagen 5 - Grande abajo izquierda */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-2 row-span-2 overflow-hidden bg-gray-100"
            >
              <img
                src={galleryImages[4]}
                alt="Café 5"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Custom scrollbar hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default Menu
