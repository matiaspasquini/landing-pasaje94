import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { mockProjects } from '../utils/mockData'

// Importar imágenes de Pasaje 94
import p94_1 from '../assets/pasaje94/PASAJE 94 - 11.webp'
import p94_2 from '../assets/pasaje94/PASAJE 94 - 13.webp'
import p94_3 from '../assets/pasaje94/PASAJE 94 - 14.webp'
import p94_4 from '../assets/pasaje94/PASAJE 94 - 19.webp'
import p94_5 from '../assets/pasaje94/PASAJE 94 - 27.webp'
import p94_6 from '../assets/pasaje94/PASAJE 94 - 34.webp'
import p94_7 from '../assets/pasaje94/PASAJE 94 - 35.webp'
import p94_8 from '../assets/pasaje94/PASAJE 94 - 37.webp'

// Importar imágenes de Osnova
import osnova_1 from '../assets/osnova/01-WHISPERS-IN-MY-EAR-DEC-25.jpg'
import osnova_2 from '../assets/osnova/02-WHISPERS-IN-MY-EAR-DEC-25.jpg'
import osnova_3 from '../assets/osnova/09-WHISPERS-IN-MY-EAR-DEC-25.jpg'
import osnova_4 from '../assets/osnova/15-WHISPERS-IN-MY-EAR-DEC-25.jpg'
import osnova_5 from '../assets/osnova/21-WHISPERS-IN-MY-EAR-DEC-25.jpg'
import osnova_6 from '../assets/osnova/31-WHISPERS-IN-MY-EAR-DEC-25.jpg'

const ProjectGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] group overflow-hidden bg-[#f4f4f4]">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-95"
        />
      </AnimatePresence>
      
      {/* Invisible Navigation Areas */}
      <div className="absolute inset-0 flex z-20">
        <div 
          onClick={prev} 
          className="w-1/2 h-full cursor-w-resize md:cursor-none"
        />
        <div 
          onClick={next} 
          className="w-1/2 h-full cursor-e-resize md:cursor-none"
        />
      </div>

      {/* Styled Navigation Arrows (Visible only on desktop hover) */}
      <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-between px-8 text-black/20 group-hover:text-black/60 transition-colors duration-500">
         <span className="text-4xl font-light">←</span>
         <span className="text-4xl font-light">→</span>
      </div>

      {/* Modern Counter */}
      <div className="absolute bottom-6 left-6 md:left-auto md:right-6 font-mono text-xs tracking-widest text-gray-500">
        <span className="text-black">{(currentIndex + 1).toString().padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{images.length.toString().padStart(2, '0')}</span>
      </div>
    </div>
  )
}



const Projects = () => {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const { t } = useTranslation()

  const pasajeImages = [p94_1, p94_2, p94_3, p94_4, p94_5, p94_6, p94_7, p94_8]
  const osnovaImages = [osnova_1, osnova_2, osnova_3, osnova_4, osnova_5, osnova_6]

  const projects = [
    {
      id: 1,
      images: pasajeImages,
      category: t('project1Category', 'Architecture'),
      title: t('project1Title', 'Pasaje 94'),
      location: t('project1Location', 'Valencia'),
      year: t('project1Year', '2025'),
      description: t('project1Description'),
      index: '01'
    },
    {
      id: 5,
      images: osnovaImages,
      category: t('project5Category', 'Gallery'),
      title: t('project5Title', 'Osnova Gallery'),
      location: t('project5Location', 'Valencia'),
      year: t('project5Year', '2025'),
      description: t('project5Description'),
      index: '02'
    }
  ]

  return (
    <div className="h-screen overflow-hidden bg-white selection:bg-black selection:text-white">
      {/* Header fijo minimalista */}
      <div className="fixed top-0 left-0 right-0 z-[60] px-6 py-6 bg-white/90 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <Link 
            to="/"
            className="text-2xl md:text-3xl tracking-tighter font-light hover:opacity-50 transition-opacity"
          >
            Pasaje 94
          </Link>
          <div className="hidden md:block font-mono text-xs tracking-widest uppercase">
            Selected Works
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden h-full scrollbar-hide flex snap-x snap-mandatory"
      >
        {projects.map((project) => (
          <div 
            key={project.id}
            className="min-w-full w-full h-full flex flex-col md:flex-row snap-start relative"
          >
            {/* Project Info Panel - Like a Museum Placard */}
            <div className="w-full md:w-[35%] h-full flex flex-col justify-start px-6 pt-24 md:px-12 md:pt-32 pb-12 z-10 bg-white overflow-y-auto scrollbar-hide">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:max-w-lg"
              >
                {/* Header Metadata */}
                <div className="flex items-center gap-4 mb-6 font-mono text-xs tracking-widest text-gray-500 uppercase">
                  <span>No. {project.index}</span>
                  <div className="h-px w-8 bg-gray-300"></div>
                  <span>{project.category}</span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-6 leading-[0.9] -ml-1">
                  {project.title}
                </h2>

                {/* Technical Info */}
                <div className="font-mono text-xs tracking-widest mb-8 text-black border-l border-black pl-4 py-1">
                  <p>{project.location} — {project.year}</p>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-700 font-sans tracking-wide">
                  {project.description}
                </p>
              </motion.div>
            </div>

            {/* Gallery Area */}
            <div className="w-full md:w-[65%] h-full bg-white flex items-center justify-center p-4 md:p-12 md:pl-0">
               <ProjectGallery images={project.images} />
            </div>
          </div>
        ))}
        
        {/* End Spacer / Next cta could go here */}
        <div className="min-w-[50vw] h-full flex items-center justify-center bg-white snap-start">
             <div className="text-center">
                 <p className="font-serif italic text-4xl text-gray-300">More works coming soon.</p>
             </div>
        </div>
      </div>

      {/* Custom Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <motion.div
          className="h-full bg-black/80"
          style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}


export default Projects