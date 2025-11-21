import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { mockProjects, mockExhibitions } from '../utils/mockData'

const Archive = () => {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

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
          {/* Projects Archive */}
          <div className="flex-shrink-0 flex items-center" style={{ width: '90vw', maxWidth: '1400px' }}>
            <div className="w-full h-[75vh] md:h-[80vh] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl tracking-tighter font-light mb-6 md:mb-12">Projects</h2>
                
                <div className="space-y-4 md:space-y-6 pr-4 md:pr-8">
                  {mockProjects.map((project) => (
                    <div
                      key={project.id}
                      className="border-b border-gray-200 pb-3 md:pb-6 hover:opacity-60 transition-opacity cursor-pointer"
                    >
                      <div className="flex justify-between items-start gap-4 md:gap-8">
                        <div className="flex-1">
                          <h3 className="text-base md:text-2xl font-light mb-1 md:mb-2">{project.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">{project.location}</p>
                          <p className="text-xs md:text-sm leading-relaxed line-clamp-2">{project.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs md:text-sm tracking-wider">{project.year}</p>
                          <p className="text-[10px] md:text-xs text-gray-600 mt-1">{project.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Exhibitions Archive */}
          <div className="flex-shrink-0 flex items-center" style={{ width: '90vw', maxWidth: '1400px' }}>
            <div className="w-full h-[75vh] md:h-[80vh] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl tracking-tighter font-light mb-6 md:mb-12">Exhibitions</h2>
                
                <div className="space-y-4 md:space-y-6 pr-4 md:pr-8">
                  {mockExhibitions.map((exhibition) => (
                    <div
                      key={exhibition.id}
                      className="border-b border-gray-200 pb-3 md:pb-6 hover:opacity-60 transition-opacity cursor-pointer"
                    >
                      <div className="flex justify-between items-start gap-4 md:gap-8">
                        <div className="flex-1">
                          <h3 className="text-base md:text-2xl font-light mb-1 md:mb-2">{exhibition.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">{exhibition.artist}</p>
                          <p className="text-xs md:text-sm leading-relaxed line-clamp-2">{exhibition.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[10px] md:text-xs tracking-wider">
                            {new Date(exhibition.startDate).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                            })}
                            {' — '}
                            {new Date(exhibition.endDate).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                            })}
                          </p>
                          {exhibition.current && (
                            <span className="inline-block mt-1 md:mt-2 px-1.5 py-0.5 md:px-2 md:py-1 bg-black text-white text-[10px] md:text-xs">
                              NOW
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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

export default Archive