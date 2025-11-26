import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useCart } from '../contexts/CartContext'

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
  const indexRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const { t } = useTranslation()
  const { addToCart } = useCart()
  const [showIndex, setShowIndex] = useState(false)

  // Efecto para cerrar el índice al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (indexRef.current && !indexRef.current.contains(event.target)) {
        setShowIndex(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Función para navegar a un autor específico
  const scrollToDesigner = (designerId) => {
    const element = document.getElementById(designerId)
    if (element && containerRef.current) {
      const container = containerRef.current
      const elementLeft = element.offsetLeft
      const containerWidth = container.clientWidth
      const elementWidth = element.clientWidth
      
      // Centrar el elemento en el viewport
      const scrollPosition = elementLeft - (containerWidth / 2) + (elementWidth / 2)
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
    setShowIndex(false)
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
      price: 94.00,
      image: brunoImg1,
      category: 'lighting'
    },
    {
      id: 'bruno-2',
      type: 'product',
      name: 'C 07 10 S1 (alt)',
      artist: t('brunoMespuletName'),
      collection: t('brunoMespuletCollection'),
      price: 94.00,
      image: brunoImg2,
      category: 'lighting'
    },
    {
      id: 'bruno-3',
      type: 'product',
      name: 'C 07 10 S2',
      artist: t('brunoMespuletName'),
      collection: t('brunoMespuletCollection'),
      price: 280.00,
      image: brunoImg3,
      category: 'lighting'
    },
    {
      id: 'bruno-4',
      type: 'product',
      name: 'C 07 10 S2 (alt)',
      artist: t('brunoMespuletName'),
      collection: t('brunoMespuletCollection'),
      price: 280.00,
      image: brunoImg4,
      category: 'lighting'
    },
    {
      id: 'bruno-5',
      type: 'product',
      name: 'C 07 10 S3',
      artist: t('brunoMespuletName'),
      collection: t('brunoMespuletCollection'),
      price: 188.00,
      image: brunoImg5,
      category: 'lighting'
    },
    {
      id: 'bruno-6',
      type: 'product',
      name: 'C 07 10 S3 (alt)',
      artist: t('brunoMespuletName'),
      collection: t('brunoMespuletCollection'),
      price: 188.00,
      image: brunoImg6,
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
    {
      id: 'alberto-4',
      type: 'product',
      name: 'BRICK Vase 05',
      artist: t('albertoDesignName'),
      collection: t('albertoDesignCollection'),
      price: 135.00,
      image: albertoImg4,
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
      id: 'giov-1',
      type: 'product',
      name: 'Candleholder I',
      artist: t('giovName'),
      collection: t('giovCollection'),
      price: 55.00,
      image: giovImg1,
      category: 'ceramics'
    },
    {
      id: 'giov-2',
      type: 'product',
      name: 'Candleholder II',
      artist: t('giovName'),
      collection: t('giovCollection'),
      price: 55.00,
      image: giovImg2,
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
    },
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
      id: 'giov-6',
      type: 'product',
      name: 'Studio Objects',
      artist: t('giovName'),
      collection: t('giovCollection'),
      price: 65.00,
      image: giovImg6,
      category: 'objects'
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
          {allItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 flex items-start py-12 md:items-center md:py-0"
              style={{ width: '90vw', maxWidth: '1400px' }}
            >
              {item.type === 'intro' ? (
                <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-center">
                  <div className="text-center max-w-4xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter font-light mb-6 md:mb-8 flex items-center justify-center gap-8">
                      <span>Holy</span>
                      <span className="flex-1 h-0.5 bg-black max-w-40"></span>
                      <span>days</span>
                    </h1>
                    <h2 className="text-lg md:text-2xl lg:text-3xl tracking-wide font-light mb-8 md:mb-12 italic">
                      {item.subtitle}
                    </h2>
                    <p className="text-sm md:text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto mb-8">
                      {item.description}
                    </p>
                    
                    {/* Botón del índice de autores */}
                    <div ref={indexRef} className="relative">
                      <button
                        onClick={() => setShowIndex(!showIndex)}
                        className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors"
                      >
                        {t('designersIndex')} {showIndex ? '−' : '+'}
                      </button>
                      
                      {/* Dropdown del índice */}
                      {showIndex && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 shadow-lg z-50 min-w-80"
                        >
                          <div className="py-4 px-6">
                            <h3 className="text-sm tracking-wider text-gray-600 mb-4">SALTAR A:</h3>
                            {designers.map((designer, index) => (
                              <button
                                key={designer.id}
                                onClick={() => scrollToDesigner(designer.id)}
                                className="block w-full text-left py-3 px-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                              >
                                <div className="text-sm font-medium text-gray-900">{designer.name}</div>
                                <div className="text-xs text-gray-500 mt-1">{designer.collection}</div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
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
                    <p className="text-lg md:text-2xl font-medium mb-6 md:mb-8">
                      €{item.price.toFixed(2)}
                    </p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 md:px-6 md:py-3 bg-black text-white hover:bg-gray-800 transition-colors w-fit text-xs md:text-base"
                    >
                      {t('addToCart')}
                    </button>
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
