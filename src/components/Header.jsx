import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const location = useLocation()
  const { getCartCount, setIsCartOpen } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()

  const navItems = [
    { name: t('about'), path: '/about' },
    { name: t('projects'), path: '/projects' },
    { name: t('spaceShop'), path: '/space' },
    { name: t('menu'), path: '/menu' },
    { name: t('archive'), path: '/archive' },
  ]

  const cartCount = getCartCount()

  // Cerrar menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Ocultar header si no estamos en Home
  if (location.pathname !== '/') {
    return <></>
  }

  return (
    <header 
      className="fixed top-1/2 left-0 right-0 z-50 -translate-y-1/2 pointer-events-none"
    >
      <div className="px-6">
        <motion.div 
          layout // Importante para que el contenedor anime sus cambios de tamaño/posición si los hubiera
          className="flex items-center w-full pointer-events-auto cursor-pointer"
          // Mantenemos tu lógica exacta de padding para Pasaje
          style={{ paddingLeft: 'calc(7% - 6rem)' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          data-header-clickable="true"
        >
          {/* 1. Pasaje (Izquierda) - Se queda quieto gracias a tu paddingLeft */}
          <span className="text-3xl md:text-5xl tracking-tighter font-normal flex-shrink-0 text-black">
            Pasaje
          </span>

          {/* 2. Elemento Central (Nav o Línea) */}
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.nav
                key="menu"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-16 px-8 overflow-x-auto scrollbar-hide mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Selector de idioma dentro del menú */}
                <div className="flex gap-2 items-center">
                  <button onClick={() => i18n.changeLanguage('es')} className={`px-2 py-1 text-xs ${i18n.language === 'es' ? 'font-bold underline' : ''}`}>ES</button>
                  <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 text-xs ${i18n.language === 'en' ? 'font-bold underline' : ''}`}>EN</button>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative text-base md:text-lg tracking-wider hover:opacity-60 transition-opacity whitespace-nowrap font-medium"
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-black"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                ))}
                
                {/* Cart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsCartOpen(true)
                  }}
                  className="relative text-base md:text-lg tracking-wider hover:opacity-60 transition-opacity whitespace-nowrap font-medium"
                >
                  {t('cart')}
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                
                {/* ELIMINADO: Aquí estaba antes el 94 duplicado */}
              </motion.nav>
            ) : (
              <motion.div
                key="line"
                initial={{ width: 0 }}
                animate={{ width: '16rem' }}
                exit={{ width: 0 }}
                transition={{ duration: 0.3 }}
                className="h-[3px] bg-black ml-3 mr-2 translate-y-1"
              />
            )}
          </AnimatePresence>

          {/* 3. 94 (Derecha) - Único elemento para ambos estados */}
          <motion.span 
            layout // Esto permite que el elemento se anime suavemente hacia la derecha
            className={`text-3xl md:text-5xl tracking-tighter font-normal flex-shrink-0 text-black transition-all duration-300 ${
              isMenuOpen ? 'ml-auto' : '' // CAMBIO CLAVE: ml-auto lo empuja al final cuando está abierto
            }`}
            transition={{ duration: 0.3 }}
          >
            94
          </motion.span>
        </motion.div>
      </div>
    </header>
  )
}

export default Header