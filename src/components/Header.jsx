import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'

const Header = () => {
  const location = useLocation()
  const { getCartCount, setIsCartOpen } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Space+Shop', path: '/space' },
    { name: 'Cafeteria de especialidad', path: '/menu' },
    { name: 'Archive', path: '/archive' },
  ]

  const cartCount = getCartCount()

  // Cerrar menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Ocultar header si no estamos en Home - Return early para evitar render
  if (location.pathname !== '/') {
    return <></>
  }

  return (
    <header 
      className="fixed top-1/2 left-0 right-0 z-50 -translate-y-1/2 pointer-events-none"
    >
      <div className="px-6">
        {/* Logo que se expande al hacer click - mantiene Pasaje en su posición */}
        <motion.div 
          className="flex items-center justify-between w-full pointer-events-auto cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Pasaje */}
          <span className="text-3xl md:text-5xl tracking-tighter font-normal flex-shrink-0 text-black">
            Pasaje
          </span>

          {/* Menú de navegación en el medio (cuando está abierto) o línea (cuando está cerrado) */}
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.nav
                key="menu"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-8 md:gap-16 px-4 md:px-8 overflow-x-auto scrollbar-hide flex-1"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative text-sm md:text-lg tracking-wider hover:opacity-60 transition-opacity whitespace-nowrap font-medium"
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
                  className="relative text-sm md:text-lg tracking-wider hover:opacity-60 transition-opacity whitespace-nowrap font-medium"
                >
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </motion.nav>
            ) : (
              <motion.div
                key="line"
                initial={{ width: 0 }}
                animate={{ width: '16rem' }}
                exit={{ width: 0 }}
                transition={{ duration: 0.3 }}
                className="h-[3px] bg-black mx-3 translate-y-1 flex-1 max-w-xs"
              />
            )}
          </AnimatePresence>

          {/* 94 - siempre visible al extremo derecho */}
          <span className="text-3xl md:text-5xl tracking-tighter font-normal flex-shrink-0 text-black">
            94
          </span>
        </motion.div>
      </div>
    </header>
  )
}

export default Header