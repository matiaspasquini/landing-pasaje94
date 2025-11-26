import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Archive = () => {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const { t } = useTranslation()

  // Estructura de artistas del archivo
  const artists = [
    {
      id: 'angel-tausia',
      name: 'Angel Tausia Objects',
      description: t('angelTausiaDescription')
    },
    {
      id: 'fer-figueroa', 
      name: 'Fer Figueroa',
      description: t('ferFigueroaDescription')
    },
    {
      id: 'bama-archive',
      name: 'Bama',
      subtitle: 'BAMA — Between Art & Material Atmospheres',
      description: t('bamaArchiveDescription')
    },
    {
      id: 'bruno-archive',
      name: 'Bruno Mespulet',
      subtitle: 'Encender para recordar, contemplar para permanecer.',
      description: t('brunoArchiveDescription')
    },
    {
      id: 'objetos-decorativos',
      name: 'Los objetos decorativos',
      description: t('objetosDecorativosDescription')
    }
  ]

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

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden h-full scrollbar-hide pt-20"
        style={{ scrollSnapType: 'none' }}
      >
        <div className="flex h-full gap-12 px-12" style={{ width: 'max-content' }}>
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 flex items-start py-12 md:items-center md:py-0"
              style={{ width: '90vw', maxWidth: '1400px' }}
            >
              <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-center">
                <div className="text-center max-w-4xl">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter font-light mb-4 md:mb-6">
                    {artist.name}
                  </h1>
                  {artist.subtitle && (
                    <h2 className="text-lg md:text-2xl lg:text-3xl tracking-wide font-light mb-8 md:mb-12 italic text-gray-600">
                      {artist.subtitle}
                    </h2>
                  )}
                  <div className="text-sm md:text-base leading-relaxed text-gray-700 max-w-3xl mx-auto text-left space-y-4 md:space-y-6">
                    {artist.description.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
          <p className="text-xs text-gray-600 mt-2">{t('archiveScrollText')}</p>
        </div>
      </div>
    </div>
  )
}

export default Archive