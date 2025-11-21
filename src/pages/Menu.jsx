import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Menu = () => {
  const navigate = useNavigate()

  // Productos de café
  const coffeeProducts = [
    { name: 'Espresso', price: '2.50' },
    { name: 'Cortado', price: '2.80' },
    { name: 'Café con Leche', price: '3.20' },
    { name: 'Cappuccino', price: '3.50' },
    { name: 'Flat White', price: '3.80' },
    { name: 'V60 Filter', price: '4.50' },
    { name: 'Chemex', price: '5.00' },
    { name: 'Cold Brew', price: '4.20' },
  ]

  // Productos de comida
  const foodProducts = [
    { name: 'Tostada con Aguacate', price: '6.50' },
    { name: 'Croissant Natural', price: '2.80' },
    { name: 'Croissant de Almendra', price: '3.20' },
    { name: 'Tarta del Día', price: '4.50' },
    { name: 'Banana Bread', price: '3.80' },
    { name: 'Ensalada de Temporada', price: '8.50' },
    { name: 'Sandwich Vegetal', price: '7.20' },
    { name: 'Bagel con Salmón', price: '9.50' },
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
      <div className="flex overflow-x-auto overflow-y-hidden h-screen snap-x snap-mandatory scrollbar-hide">
        
        {/* Section 1: Introducción */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-w-full h-screen flex flex-col justify-center items-start px-6 md:px-16 snap-start"
        >
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-8xl tracking-tighter font-light mb-4 md:mb-8 italic leading-none">
              Menú
            </h1>
            <p className="text-base md:text-2xl leading-tight mb-3 md:mb-6">
              Una selección cuidada de café de especialidad y productos artesanales.
            </p>
            <p className="text-sm md:text-lg leading-tight text-gray-600">
              Trabajamos con proveedores locales que comparten nuestra pasión por la calidad y el detalle.
            </p>
          </div>
        </motion.div>

        {/* Section 2: Proveedor FOC - Café */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-w-full h-screen flex flex-col justify-center px-6 md:px-16 snap-start py-20 md:py-0"
        >
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-7xl tracking-tighter font-light mb-3 md:mb-6 italic leading-none">
              FOC
            </h2>
            <p className="text-sm md:text-xl leading-tight mb-6 md:mb-12 text-gray-600">
              Nuestro café de especialidad viene de FOC, tostadores valencianos comprometidos con la calidad 
              y la sostenibilidad.
            </p>

            {/* Coffee Menu */}
            <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-2 md:gap-y-4">
              {coffeeProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-baseline border-b border-gray-200 pb-1 md:pb-2"
                >
                  <span className="text-xs md:text-lg tracking-tight truncate pr-2">{product.name}</span>
                  <span className="text-xs md:text-lg font-light whitespace-nowrap">€{product.price}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 3: Proveedor de Comida (placeholder) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-w-full h-screen flex flex-col justify-center px-6 md:px-16 snap-start py-20 md:py-0"
        >
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-7xl tracking-tighter font-light mb-3 md:mb-6 italic leading-none">
              Productos Artesanales
            </h2>
            <p className="text-sm md:text-xl leading-tight mb-6 md:mb-12 text-gray-600">
              Nuestros productos de repostería y comida son elaborados diariamente con ingredientes frescos 
              y de temporada.
            </p>

            {/* Food Menu */}
            <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-2 md:gap-y-4">
              {foodProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-baseline border-b border-gray-200 pb-1 md:pb-2"
                >
                  <span className="text-xs md:text-lg tracking-tight truncate pr-2">{product.name}</span>
                  <span className="text-xs md:text-lg font-light whitespace-nowrap">€{product.price}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 4: Info adicional / QR Code */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-w-full h-screen flex flex-col justify-center items-center px-6 md:px-16 snap-start"
        >
          <div className="max-w-xl text-center">
            <h2 className="text-4xl md:text-7xl tracking-tighter font-light mb-4 md:mb-8 italic leading-none">
              Menú Digital
            </h2>
            <p className="text-sm md:text-xl leading-tight mb-6 md:mb-12 text-gray-600">
              Escanea el código QR en tu mesa para ver nuestro menú completo.
            </p>
            
            {/* Placeholder para QR Code */}
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto border-2 border-black flex items-center justify-center">
              <span className="text-xs md:text-sm text-gray-400">QR Code</span>
            </div>
            
            <p className="text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
              También puedes consultar el menú en pasaje94.com/menu
            </p>
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
