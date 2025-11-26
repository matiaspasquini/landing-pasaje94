import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Menu = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Productos de café
  const coffeeProducts = [
    { name: t('coffeeProducts.espresso'), price: '2.50' },
    { name: t('coffeeProducts.cortado'), price: '2.80' },
    { name: t('coffeeProducts.cafeConLeche'), price: '3.20' },
    { name: t('coffeeProducts.cappuccino'), price: '3.50' },
    { name: t('coffeeProducts.flatWhite'), price: '3.80' },
    { name: t('coffeeProducts.v60Filter'), price: '4.50' },
    { name: t('coffeeProducts.chemex'), price: '5.00' },
    { name: t('coffeeProducts.coldBrew'), price: '4.20' },
  ]

  // Productos de comida
  const foodProducts = [
    { name: t('foodProducts.tostadaAguacate'), price: '6.50' },
    { name: t('foodProducts.croissantNatural'), price: '2.80' },
    { name: t('foodProducts.croissantAlmendra'), price: '3.20' },
    { name: t('foodProducts.tartaDelDia'), price: '4.50' },
    { name: t('foodProducts.bananaBread'), price: '3.80' },
    { name: t('foodProducts.ensaladaTemporada'), price: '8.50' },
    { name: t('foodProducts.sandwichVegetal'), price: '7.20' },
    { name: t('foodProducts.bagelSalmon'), price: '9.50' },
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

        {/* Section 2: Proveedor FOC - Café */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-w-full h-screen flex flex-col justify-center px-6 md:px-16 snap-start py-20 md:py-0"
        >
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-7xl tracking-tighter font-light mb-3 md:mb-6 italic leading-none">
              {t('focTitle')}
            </h2>
            <p className="text-sm md:text-xl leading-tight mb-6 md:mb-12 text-gray-600">
              {t('focDescription')}
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
              {t('artisanalProductsTitle')}
            </h2>
            <p className="text-sm md:text-xl leading-tight mb-6 md:mb-12 text-gray-600">
              {t('artisanalProductsDescription')}
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
              {t('digitalMenuTitle')}
            </h2>
            <p className="text-sm md:text-xl leading-tight mb-6 md:mb-12 text-gray-600">
              {t('digitalMenuDescription')}
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
