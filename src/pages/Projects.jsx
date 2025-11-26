import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { mockProjects } from '../utils/mockData'

const Projects = () => {
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

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden h-full scrollbar-hide pt-20"
        style={{ scrollSnapType: 'none' }}
      >
        <div className="flex h-full gap-12 px-12" style={{ width: 'max-content' }}>
          {/* Proyectos */}
          {[1, 2, 3, 4, 5].map((projectNum, index) => (
            <motion.div
              key={projectNum}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 flex items-center"
              style={{ width: '90vw', maxWidth: '1400px' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 w-full max-w-screen-2xl mx-auto">
                {/* Image */}
                <div className="aspect-[4/3] bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    {t(`project${projectNum}Title`)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                  {t(`project${projectNum}Category`) && (
                    <p className="text-xs md:text-sm tracking-wider text-gray-600 mb-1 md:mb-2">
                      {t(`project${projectNum}Category`)}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-4xl tracking-tighter font-light mb-2 md:mb-4">
                    {t(`project${projectNum}Title`)}
                  </h2>
                  {(t(`project${projectNum}Location`) || t(`project${projectNum}Year`)) && (
                    <p className="text-sm md:text-lg mb-2 md:mb-4">
                      {t(`project${projectNum}Location`)}{t(`project${projectNum}Location`) && t(`project${projectNum}Year`) && ' — '}{t(`project${projectNum}Year`)}
                    </p>
                  )}
                  <p className="text-xs md:text-lg leading-relaxed mb-3 md:mb-6 line-clamp-4">
                    {t(`project${projectNum}Description`)}
                  </p>
                  <div className="text-xs md:text-sm text-gray-600">
                    {t('projectOf')} {index + 1} {t('of')} 5
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-6 right-6 pointer-events-none">
        <div className="max-w-screen-2xl mx-auto">
          <div className="w-full h-px bg-gray-300">
            <motion.div
              className="h-full bg-black"
              style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">{t('projectsScrollText')}</p>
        </div>
      </div>
    </div>
  )
}

export default Projects