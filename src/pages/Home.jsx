import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Importar imágenes del slider principal
import slider1 from '../assets/sliderprincipal/slider1.jpeg'
import slider2 from '../assets/sliderprincipal/slider2.jpeg'
import slider3 from '../assets/sliderprincipal/slider3.jpeg'
import slider4 from '../assets/sliderprincipal/slider4.jpeg'
import slider5 from '../assets/sliderprincipal/slider5.jpeg'
import slider6 from '../assets/sliderprincipal/slider6.jpeg'
import slider7 from '../assets/sliderprincipal/slider7.jpeg'
import slider8 from '../assets/sliderprincipal/slider8.jpeg'
import slider9 from '../assets/sliderprincipal/slider9.jpeg'
import slider10 from '../assets/sliderprincipal/slider10.jpeg'
import slider11 from '../assets/sliderprincipal/slider11.jpeg'

const Home = () => {
  const scrollContainerRef = useRef(null)
  const autoScrollRef = useRef(null)
  const userScrollingRef = useRef(false)
  const userScrollTimeoutRef = useRef(null)

  // Auto-scroll automático de derecha a izquierda
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (!userScrollingRef.current) {
          container.scrollLeft += 1 // Velocidad moderada (1px por frame)
          
          // Si llega al final, volver al inicio
          if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0
          }
        }
      }, 16) // ~60fps
    }

    startAutoScroll()

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [])

  // Función para manejar click global que active el header
  const handleGlobalClick = () => {
    // Buscar el elemento del header y simular click
    const headerElement = document.querySelector('header [data-header-clickable]')
    if (headerElement) {
      headerElement.click()
    }
  }

  // Scroll horizontal acelerado con la rueda del mouse
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleWheel = (e) => {
      e.preventDefault()
      
      // Marcar que el usuario está scrolleando
      userScrollingRef.current = true
      
      // Acelerar el scroll horizontal 4x
      container.scrollLeft += e.deltaY * 4
      
      // Resetear el timeout
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current)
      }
      
      // Después de 2 segundos sin scroll, reanudar auto-scroll
      userScrollTimeoutRef.current = setTimeout(() => {
        userScrollingRef.current = false
      }, 2000)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current)
      }
    }
  }, [])

  // Array de imágenes del slider
  const sliderImages = [
    slider1, slider2, slider3, slider4, slider5, 
    slider6, slider7, slider8, slider9, slider10, slider11
  ]

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Capa invisible para click global (solo visible cuando el menú está cerrado) */}
      <div 
        className="absolute inset-0 z-40 cursor-pointer"
        onClick={handleGlobalClick}
        style={{ pointerEvents: 'auto' }}
      />
      
      {/* Carrusel horizontal de pantalla completa */}
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-x-auto overflow-y-hidden scrollbar-hide relative z-30"
      >
        <div className="flex h-full">
          {sliderImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="h-screen flex-shrink-0"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="h-full w-auto object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home