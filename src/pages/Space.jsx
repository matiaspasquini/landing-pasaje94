import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { mockExhibitions, mockProducts } from '../utils/mockData'
import { useCart } from '../contexts/CartContext'

// Importar imágenes
import slider4 from '../assets/sliderprincipal/slider4.jpeg'
import slider5 from '../assets/sliderprincipal/slider5.jpeg'
import slider6 from '../assets/sliderprincipal/slider6.jpeg'
import slider7 from '../assets/sliderprincipal/slider7.jpeg'
import slider8 from '../assets/sliderprincipal/slider8.jpeg'
import slider9 from '../assets/sliderprincipal/slider9.jpeg'
import slider10 from '../assets/sliderprincipal/slider10.jpeg'
import slider11 from '../assets/sliderprincipal/slider11.jpeg'

const Space = () => {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const { addToCart } = useCart()

  // Imágenes para asignar
  const images = [slider4, slider5, slider6, slider7, slider8, slider9, slider10, slider11]

  // Combinar exhibiciones y productos con imágenes
  const items = [
    ...mockExhibitions.map((ex, index) => ({ type: 'exhibition', data: { ...ex, image: images[index % images.length] } })),
    ...mockProducts.map((prod, index) => ({ type: 'product', data: { ...prod, image: images[(index + mockExhibitions.length) % images.length] } }))
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
          {items.map((item, index) => (
            <motion.div
              key={`${item.type}-${item.data.id}`}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 flex items-start py-12 md:items-center md:py-0"
              style={{ width: '90vw', maxWidth: '1400px' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 w-full max-w-screen-2xl mx-auto items-start">
                <div className="aspect-[4/3] md:aspect-[4/3] bg-gray-100">
                  {item.data.image ? (
                    <img
                      src={item.data.image}
                      alt={item.data.title || item.data.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      {item.data.title || item.data.name}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-start md:justify-center">
                  {item.type === 'exhibition' ? (
                    <>
                      <p className="text-xs md:text-sm tracking-wider text-gray-600 mb-1 md:mb-2">
                        EXHIBITION
                      </p>
                      <h2 className="text-2xl md:text-4xl tracking-tighter font-light mb-2 md:mb-4 leading-none italic">
                        {item.data.title}
                      </h2>
                      <p className="text-sm md:text-lg mb-2 md:mb-4 leading-tight">
                        {item.data.artist}
                      </p>
                      <p className="text-xs md:text-lg leading-tight mb-3 md:mb-6 line-clamp-3">
                        {item.data.description}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        {new Date(item.data.startDate).toLocaleDateString()} — {new Date(item.data.endDate).toLocaleDateString()}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs md:text-sm tracking-wider text-gray-600 mb-1 md:mb-2">
                        PRODUCT
                      </p>
                      <h2 className="text-2xl md:text-4xl tracking-tighter font-light mb-2 md:mb-4 leading-none italic">
                        {item.data.name}
                      </h2>
                      <p className="text-sm md:text-lg mb-2 md:mb-4 leading-tight">
                        {item.data.artist}
                      </p>
                      <p className="text-lg md:text-2xl font-medium mb-2 md:mb-4">
                        €{item.data.price.toFixed(2)}
                      </p>
                      <p className="text-xs md:text-lg leading-tight mb-3 md:mb-6 line-clamp-2">
                        {item.data.description}
                      </p>
                      <button 
                        onClick={() => addToCart(item.data)}
                        className="px-4 py-2 md:px-6 md:py-3 bg-black text-white hover:bg-gray-800 transition-colors w-fit text-xs md:text-base"
                      >
                        Add to Cart
                      </button>
                    </>
                  )}
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
          <p className="text-xs text-gray-600 mt-2">Scroll horizontally →</p>
        </div>
      </div>
    </div>
  )
}

export default Space
