import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Importar imágenes
import fachadaImg from '../assets/About/Pasaje 94 Fachada.jpg'
import arquitectasImg from '../assets/About/Pasaje 94 Arquitectas.jpeg'

const About = () => {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const { t } = useTranslation()

  return (
    <div className="h-screen overflow-hidden">
      {/* Header fijo con Pasaje y 94 */}
      <div className="fixed top-0 left-0 right-0 z-[60] px-6 py-6 bg-white">
        <div className="flex justify-between items-center">
          <Link 
            to="/"
            className="text-3xl md:text-5xl tracking-tighter font-normal hover:opacity-60 transition-opacity"
          >
            Pasaje
          </Link>
          <span className="text-3xl md:text-5xl tracking-tighter font-normal">94</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden h-full scrollbar-hide pt-20"
        style={{ scrollSnapType: 'none' }}
      >
        <div className="flex h-full gap-12 px-12" style={{ width: 'max-content' }}>
          {/* Sección 1: Descripción de Pasaje 94 */}
          <div className="flex-shrink-0 flex items-center" style={{ width: '90vw', maxWidth: '1400px' }}>
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center"
              >
                <div>
                  <p className="text-sm md:text-lg leading-relaxed mb-3 md:mb-6">
                    {t('aboutSection1Text1')}
                  </p>
                  <p className="text-sm md:text-lg leading-relaxed">
                    {t('aboutSection1Text2')}
                  </p>
                </div>
                
                <div className="bg-gray-100 aspect-[4/3]">
                  <img
                    src={fachadaImg}
                    alt="Pasaje 94 Fachada"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sección 2: Ubicación y reforma */}
          <div className="flex-shrink-0 flex items-center" style={{ width: '90vw', maxWidth: '1400px' }}>
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center"
              >
                <div>
                  <p className="text-sm md:text-lg leading-relaxed mb-3 md:mb-6">
                    {t('aboutSection2Text1')}
                  </p>
                  <p className="text-sm md:text-lg leading-relaxed">
                    {t('aboutSection2Text2')}
                  </p>
                </div>
                
                <div className="bg-gray-100 aspect-[4/3]">
                  <img
                    src={arquitectasImg}
                    alt="Pasaje 94 Arquitectas"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sección 3: Servicios y contacto */}
          <div className="flex-shrink-0 flex items-center" style={{ width: '90vw', maxWidth: '1400px' }}>
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl tracking-tighter font-bold mb-3 md:mb-4">
                    {t('aboutSection3MainTitle')}
                  </h2>
                  <h3 className="text-xl md:text-2xl tracking-tighter font-semibold mb-4 md:mb-6">
                    {t('aboutSection3Subtitle')}
                  </h3>
                  <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                    {t('aboutSection3Text1')}
                  </p>
                  <ul className="text-sm md:text-base leading-relaxed space-y-2 list-disc pl-5">
                    <li>{t('aboutServices1')}</li>
                    <li>{t('aboutServices2')}</li>
                    <li>{t('aboutServices3')}</li>
                    <li>{t('aboutServices4')}</li>
                    <li>{t('aboutServices5')}</li>
                  </ul>
                </div>
                
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h4 className="text-xs tracking-[0.2em] uppercase mb-2 md:mb-3 text-gray-600">{t('email')}</h4>
                    <a
                      href="mailto:info@pasaje94.com"
                      className="text-lg md:text-xl tracking-tight hover:opacity-60 transition-opacity"
                    >
                      info@pasaje94.com
                    </a>
                  </div>

                  <div>
                    <h4 className="text-xs tracking-[0.2em] uppercase mb-2 md:mb-3 text-gray-600">{t('location')}</h4>
                    <p className="text-lg md:text-xl tracking-tight leading-relaxed">
                      {t('contactAddress')}<br />
                      C/ dels Trinitaris, 13, Ciutat Vella, Valencia, España
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs tracking-[0.2em] uppercase mb-2 md:mb-3 text-gray-600">{t('social')}</h4>
                    <a
                      href="https://instagram.com/pasaje94_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base md:text-lg tracking-tight hover:opacity-60 transition-opacity"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed bottom-8 left-6 right-6 pointer-events-none">
        <div className="max-w-screen-2xl mx-auto">
          <div className="w-full h-px bg-gray-300">
            <motion.div
              className="h-full bg-black"
              style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">Scroll horizontally →</p>
        </div>
      </div>
    </div>
  )
}

export default About