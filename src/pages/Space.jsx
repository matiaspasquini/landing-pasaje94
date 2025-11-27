import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// Importar imágenes de Bruno Mespulet
import brunoImg1 from '../assets/Bruno Mespulet/C_0710_S1_I03.jpg'
import brunoImg2 from '../assets/Bruno Mespulet/C_0710_S1_I05.jpg'
import brunoImg3 from '../assets/Bruno Mespulet/C_0710_S2_I03.jpg'
import brunoImg4 from '../assets/Bruno Mespulet/C_0710_S2_I05.jpg'
import brunoImg5 from '../assets/Bruno Mespulet/C_0710_S3_I01.jpg'
import brunoImg6 from '../assets/Bruno Mespulet/C_0710_S3_I03.jpg'

// Importar imágenes de BAMA
import bamaImg1 from '../assets/BAMA/BULTO 01—Bone—side 1.jpg'
import bamaImg2 from '../assets/BAMA/BULTO 01—Bordeaux—front.jpg'
import bamaImg3 from '../assets/BAMA/BULTO 01—Cobalt—side 2.jpg'
import bamaImg4 from '../assets/BAMA/BULTO 02—Bone—front.jpg'
import bamaImg5 from '../assets/BAMA/BULTO 02—Bordeaux—side 1.jpg'
import bamaImg6 from '../assets/BAMA/BULTO 02—Cobalt—side 2.jpg'

// Importar imágenes de Alberto Design
import albertoImg1 from '../assets/Alberto Design/BRICK 2.jpg'
import albertoImg2 from '../assets/Alberto Design/BRICK 3.jpg'
import albertoImg3 from '../assets/Alberto Design/BRICK 4.jpg'
import albertoImg4 from '../assets/Alberto Design/BRICK 5.jpg'

// Importar imágenes de LOD
import lodImg1 from '../assets/LOD/Pasaje 94 - LOD - OBJECT.jpg'
import lodImg2 from '../assets/LOD/Pasaje 94 - LOD - Shell box.jpg'
import lodImg3 from '../assets/LOD/Pasaje 94 - LOD - Shell vase.jpg'
import lodImg4 from '../assets/LOD/Pasaje 94 - LOD - Vanilla vase.jpg'
import lodImg5 from '../assets/LOD/Pasaje 94 - Tableware vidrio.jpg'

// Importar imágenes de Giov
import giovImg1 from '../assets/Giov/Pasaje 94 - Giov studio Candelholder(1).webp'
import giovImg2 from '../assets/Giov/Pasaje 94 - Giov studio Candelholder.webp'
import giovImg3 from '../assets/Giov/Pasaje 94 - Giov studio Fake lamp.JPG'
import giovImg5 from '../assets/Giov/Pasaje 94 - Giov studio candelholders.webp'
import giovImg6 from '../assets/Giov/Pasaje 94 - Giov studio objects.JPG'

const Space = () => {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const { t } = useTranslation()

  // Función para navegar a un autor específico
  const scrollToDesigner = (designerId) => {
    console.log('Navegando a:', designerId)
    
    // Buscar el elemento después de un pequeño delay
    setTimeout(() => {
      const element = document.getElementById(designerId)
      console.log('Elemento encontrado:', element)
      
      if (element && containerRef.current) {
        const container = containerRef.current
        const rect = element.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        
        // Calcular la posición de scroll considerando el scroll actual
        const scrollPosition = container.scrollLeft + rect.left - containerRect.left - (containerRect.width / 2) + (rect.width / 2)
        
        console.log('Scrolling to position:', scrollPosition)
        
        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth'
        })
      } else {
        console.log('No se encontró el elemento o container')
        // Intentar de nuevo si no se encuentra
        setTimeout(() => {
          const retryElement = document.getElementById(designerId)
          if (retryElement && containerRef.current) {
            retryElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',
              inline: 'center'
            })
          }
        }, 500)
      }
    }, 200)
  }

  // Lista de autores para el índice
  const designers = [
    { id: 'bruno-intro', name: t('brunoMespuletName'), collection: t('brunoMespuletCollection') },
    { id: 'bama-intro', name: t('bamaName'), collection: t('bamaCollection') },
    { id: 'alberto-intro', name: t('albertoName'), collection: t('albertoCollection') },
    { id: 'lod-intro', name: t('lodName'), collection: t('lodCollection') },
    { id: 'giov-intro', name: t('giovName'), collection: t('giovCollection') }
  ]

  // Crear estructura de productos individuales con intros de diseñadores
  const allItems = [
    {
      id: 'intro',
      type: 'intro',
      title: 'Holy days',
      subtitle: t('spaceSubtitle'),
      description: t('spaceDescription')
    },
    
    // Índice de diseñadores
    {
      id: 'designers-index',
      type: 'designers-index',
      title: t('designersIndexTitle', 'Nuestros Diseñadores'),
      subtitle: t('designersIndexSubtitle', 'Explora las colecciones de cada artista')
    },
    
    // Intro Bruno Mespulet
    {
      id: 'bruno-intro',
      type: 'designer-intro',
      name: t('brunoMespuletName'),
      collection: t('brunoMespuletCollection'),
      description: t('brunoMespuletDescription')
    },
    
    // Productos Bruno Mespulet
    {
      id: 'bruno-1',
      type: 'product',
      name: 'C 07 10 S1',
      artist: t('brunoMespuletName'),
      collection: t('brunoMespuletCollection'),
      price: 84.00,
      image: brunoImg1,
      category: 'lighting'
    },
    {
      id: 'bruno-3',
      type: 'product',
      name: 'C 07 10 S2',
      artist: t('brunoMespuletName'),
      collection: t('brunoMespuletCollection'),
      price: 250.00,
      image: brunoImg3,
      category: 'lighting'
    },
    {
      id: 'bruno-5',
      type: 'product',
      name: 'C 07 10 S3',
      artist: t('brunoMespuletName'),
      collection: t('brunoMespuletCollection'),
      price: 168.00,
      image: brunoImg5,
      category: 'lighting'
    },
    
    // Intro BAMA
    {
      id: 'bama-intro',
      type: 'designer-intro',
      name: t('bamaName'),
      collection: t('bamaCollection'),
      description: t('bamaDescription')
    },
    
    // Productos BAMA
    {
      id: 'bama-1',
      type: 'product',
      name: 'BULTO 01 — Bone',
      artist: t('bamaName'),
      collection: t('bamaCollection'),
      price: 110.00,
      image: bamaImg1,
      category: 'ceramics'
    },
    {
      id: 'bama-2',
      type: 'product',
      name: 'BULTO 01 — Bordeaux',
      artist: t('bamaName'),
      collection: t('bamaCollection'),
      price: 110.00,
      image: bamaImg2,
      category: 'ceramics'
    },
    {
      id: 'bama-3',
      type: 'product',
      name: 'BULTO 01 — Cobalt',
      artist: t('bamaName'),
      collection: t('bamaCollection'),
      price: 110.00,
      image: bamaImg3,
      category: 'ceramics'
    },
    {
      id: 'bama-4',
      type: 'product',
      name: 'BULTO 02 — Bone',
      artist: t('bamaName'),
      collection: t('bamaCollection'),
      price: 110.00,
      image: bamaImg4,
      category: 'ceramics'
    },
    {
      id: 'bama-5',
      type: 'product',
      name: 'BULTO 02 — Bordeaux',
      artist: t('bamaName'),
      collection: t('bamaCollection'),
      price: 110.00,
      image: bamaImg5,
      category: 'ceramics'
    },
    {
      id: 'bama-6',
      type: 'product',
      name: 'BULTO 02 — Cobalt',
      artist: t('bamaName'),
      collection: t('bamaCollection'),
      price: 110.00,
      image: bamaImg6,
      category: 'ceramics'
    },
    
    // Intro Alberto Design
    {
      id: 'alberto-intro',
      type: 'designer-intro',
      name: t('albertoDesignName'),
      collection: t('albertoDesignCollection'),
      description: t('albertoDesignDescription')
    },
    
    // Productos Alberto Design
    {
      id: 'alberto-1',
      type: 'product',
      name: 'BRICK Vase 02',
      artist: t('albertoDesignName'),
      collection: t('albertoDesignCollection'),
      price: 120.00,
      image: albertoImg1,
      category: 'objects'
    },
    {
      id: 'alberto-2',
      type: 'product',
      name: 'BRICK Vase 03',
      artist: t('albertoDesignName'),
      collection: t('albertoDesignCollection'),
      price: 125.00,
      image: albertoImg2,
      category: 'objects'
    },
    {
      id: 'alberto-3',
      type: 'product',
      name: 'BRICK Vase 04',
      artist: t('albertoDesignName'),
      collection: t('albertoDesignCollection'),
      price: 200.00,
      image: albertoImg3,
      category: 'objects'
    },
    
    // Intro LOD
    {
      id: 'lod-intro',
      type: 'designer-intro',
      name: t('lodName'),
      collection: t('lodCollection'),
      description: t('lodDescription')
    },
    
    // Productos LOD
    {
      id: 'lod-1',
      type: 'product',
      name: 'LOD Object',
      artist: t('lodName'),
      collection: t('lodCollection'),
      price: 45.00,
      image: lodImg1,
      category: 'objects'
    },
    {
      id: 'lod-2',
      type: 'product',
      name: 'Shell Box',
      artist: t('lodName'),
      collection: t('lodCollection'),
      price: 38.00,
      image: lodImg2,
      category: 'objects'
    },
    {
      id: 'lod-3',
      type: 'product',
      name: 'Shell Vase',
      artist: t('lodName'),
      collection: t('lodCollection'),
      price: 55.00,
      image: lodImg3,
      category: 'objects'
    },
    {
      id: 'lod-4',
      type: 'product',
      name: 'Vanilla Vase',
      artist: t('lodName'),
      collection: t('lodCollection'),
      price: 48.00,
      image: lodImg4,
      category: 'objects'
    },
    {
      id: 'lod-5',
      type: 'product',
      name: 'Tableware Glass',
      artist: t('lodName'),
      collection: t('lodCollection'),
      price: 32.00,
      image: lodImg5,
      category: 'objects'
    },
    
    // Intro Giov
    {
      id: 'giov-intro',
      type: 'designer-intro',
      name: t('giovName'),
      collection: t('giovCollection'),
      description: t('giovDescription')
    },
    
    // Productos Giov
    {
      id: 'giov-5',
      type: 'product',
      name: 'Candleholders Set',
      artist: t('giovName'),
      collection: t('giovCollection'),
      price: 55.00,
      image: giovImg5,
      category: 'ceramics'
    },
    {
      id: 'giov-3',
      type: 'product',
      name: 'Fake Lamp',
      artist: t('giovName'),
      collection: t('giovCollection'),
      price: 160.00,
      image: giovImg3,
      category: 'lighting'
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
        <div className="flex h-full gap-12 px-6 md:px-12" style={{ width: 'max-content' }}>
          {allItems.map((item, index) => (
            <motion.div
              key={item.id}
              id={item.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 flex items-start py-12 md:items-center md:py-0"
              style={{ width: '90vw', maxWidth: '1400px' }}
            >
              {item.type === 'intro' ? (
                <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-center">
                  <div className="text-center max-w-4xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter font-light mb-6 md:mb-8 flex items-center justify-center gap-8" style={{ fontFamily: 'Georgia, serif' }}>
                      <span>holy</span>
                      <span className="flex-1 h-0.5 bg-black max-w-60"></span>
                      <span>days</span>
                    </h1>
                    <h2 className="text-lg md:text-2xl lg:text-3xl tracking-wide font-light mb-8 md:mb-12 italic">
                      {item.subtitle}
                    </h2>
                    <p className="text-sm md:text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto mb-8">
                      {item.description}
                    </p>
                  </div>
                </div>
              ) : item.type === 'designers-index' ? (
                <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-center px-4">
                  <div className="text-center max-w-6xl w-full">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tighter font-light mb-3 md:mb-6">
                      {item.title}
                    </h1>
                    <h2 className="text-base md:text-lg lg:text-xl tracking-wide font-light mb-8 md:mb-12 italic text-gray-600">
                      {item.subtitle}
                    </h2>
                    
                    {/* Grid de diseñadores */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                      {designers.map((designer, index) => (
                        <motion.button
                          key={designer.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          onClick={() => scrollToDesigner(designer.id)}
                          className="group text-left p-4 sm:p-5 lg:p-6 border border-gray-200 hover:border-black transition-all duration-300 bg-white hover:shadow-lg w-full"
                        >
                          <div className="mb-3">
                            <h3 className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-gray-900 group-hover:text-black transition-colors">
                              {designer.name}
                            </h3>
                            <div className="w-10 h-px bg-gray-300 group-hover:bg-black transition-colors mt-2"></div>
                          </div>
                          
                          <p className="text-xs sm:text-sm lg:text-base text-gray-600 group-hover:text-gray-800 transition-colors leading-relaxed mb-3">
                            {designer.collection}
                          </p>
                          
                          <div className="text-xs tracking-wider text-gray-500 group-hover:text-gray-700 transition-colors">
                            {t('viewCollection', 'VER COLECCIÓN')} →
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : item.type === 'designer-intro' ? (
                <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-center">
                  <div className="text-center max-w-4xl">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter font-light mb-4 md:mb-6">
                      {item.name}
                    </h1>
                    {item.collection && (
                      <h2 className="text-lg md:text-2xl lg:text-3xl tracking-wide font-light mb-8 md:mb-12 italic text-gray-600">
                        {item.collection}
                      </h2>
                    )}
                    <p className="text-sm md:text-base leading-relaxed text-gray-700 max-w-3xl mx-auto">
                      {item.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 w-full max-w-screen-2xl mx-auto items-start">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col justify-start md:justify-center">
                    <p className="text-xs md:text-sm tracking-wider text-gray-600 mb-1 md:mb-2">
                      PRODUCT
                    </p>
                    <h2 className="text-2xl md:text-4xl tracking-tighter font-light mb-2 md:mb-4 leading-none">
                      {item.name}
                    </h2>
                    <p className="text-sm md:text-lg mb-2 md:mb-4 leading-tight">
                      {item.artist}
                    </p>
                    {item.collection && (
                      <p className="text-sm md:text-base mb-4 md:mb-6 leading-tight italic text-gray-600">
                        {item.collection}
                      </p>
                    )}
                    <p className="text-lg md:text-2xl font-medium mb-4 md:mb-6">
                      €{item.price.toFixed(2)}
                    </p>
                    <div className="bg-gray-50 p-4 rounded border">
                      <p className="text-sm font-medium mb-2 text-gray-800">
                        {t('presaleOnly')}
                      </p>
                      <p className="text-xs text-gray-600 mb-3">
                        {t('presaleMessage')}
                      </p>
                      <p className="text-xs text-gray-700 font-medium">
                        📍 {t('visitStore')}: C/ dels Trinitaris, 13, Ciutat Vella, Valencia
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
          <p className="text-xs text-gray-600 mt-2">{t('spaceScrollText')}</p>
        </div>
      </div>
    </div>
  )
}

export default Space
