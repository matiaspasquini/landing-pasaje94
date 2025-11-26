import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-black mt-20">
      <div className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl tracking-tighter font-light">Pasaje</span>
              <div className="w-24 h-px bg-black"></div>
              <span className="text-xl tracking-tighter font-light">94</span>
            </Link>
            <p className="text-sm leading-relaxed">
              {t('footerDescription')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm tracking-wider mb-4">{t('navigate')}</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm hover:opacity-60 transition-opacity">
                About
              </Link>
              <Link to="/projects" className="text-sm hover:opacity-60 transition-opacity">
                Projects
              </Link>
              <Link to="/space" className="text-sm hover:opacity-60 transition-opacity">
                Space
              </Link>
              <Link to="/shop" className="text-sm hover:opacity-60 transition-opacity">
                Shop
              </Link>
              <Link to="/contact" className="text-sm hover:opacity-60 transition-opacity">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm tracking-wider mb-4">{t('connect')}</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a 
                href="mailto:info@pasaje94.com"
                className="hover:opacity-60 transition-opacity"
              >
                info@pasaje94.com
              </a>
              <a
                href="https://instagram.com/pasaje94"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@pasaje94"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-black flex justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} Pasaje 94. Valencia, Spain.</p>
          <p>{t('designDevelopment')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer