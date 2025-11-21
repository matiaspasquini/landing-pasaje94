import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'

const About = () => {
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
          {/* About Section */}
          <div className="flex-shrink-0 flex items-center" style={{ width: '90vw', maxWidth: '1400px' }}>
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center"
              >
                <div>
                  <h2 className="text-3xl md:text-5xl tracking-tighter font-light mb-4 md:mb-8">About</h2>
                  <p className="text-sm md:text-lg leading-relaxed mb-3 md:mb-6">
                    Hace menos de un año decidimos abrir nuestro espacio en el centro de Valencia, 
                    como una propuesta de apostar a quedarnos en una ciudad que no es nuestro origen.
                  </p>
                  <p className="text-sm md:text-lg leading-relaxed mb-3 md:mb-6">
                    Decidimos abrir un espacio abierto a la comunidad, con un café de especialidad 
                    y un espacio diáfano para exposición de productos de diseño.
                  </p>
                  <p className="text-sm md:text-lg leading-relaxed">
                    Llevar el diseño a la vida diaria de las personas.
                  </p>
                </div>
                
                <div className="bg-gray-100 aspect-[4/3]">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Imagen del espacio
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex-shrink-0 flex items-center" style={{ width: '90vw', maxWidth: '1400px' }}>
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl tracking-tighter font-light mb-8 md:mb-16">Contact</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24">
                  {/* Left Side - Contact Info */}
                  <div className="space-y-6 md:space-y-12">
                    <div>
                      <h3 className="text-xs tracking-[0.2em] uppercase mb-2 md:mb-3 text-gray-600">Email</h3>
                      <a
                        href="mailto:info@pasaje94.com"
                        className="text-lg md:text-2xl tracking-tight hover:opacity-60 transition-opacity"
                      >
                        info@pasaje94.com
                      </a>
                    </div>

                    <div>
                      <h3 className="text-xs tracking-[0.2em] uppercase mb-2 md:mb-3 text-gray-600">Location</h3>
                      <p className="text-lg md:text-2xl tracking-tight leading-relaxed">
                        Centro de Valencia<br />
                        Valencia, España
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs tracking-[0.2em] uppercase mb-2 md:mb-3 text-gray-600">Social</h3>
                      <div className="flex gap-6 md:gap-8">
                        <a
                          href="https://instagram.com/pasaje94"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base md:text-xl tracking-tight hover:opacity-60 transition-opacity"
                        >
                          Instagram
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Map */}
                  <div className="bg-gray-100 aspect-[4/3] overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.6669291712387!2d-0.37458822390351953!3d39.4768526123064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6049577aa76e89%3A0xa138113a98c17b0d!2sPasaje%2094!5e0!3m2!1ses!2sar!4v1763401760836!5m2!1ses!2sar" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Pasaje 94"
                    />
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