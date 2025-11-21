import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import CartSidebar from './components/CartSidebar'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Space from './pages/Space'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Archive from './pages/Archive'
import Menu from './pages/Menu'

function App() {
  const location = useLocation()
  
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header key={`header-${location.pathname}`} />
        <CartSidebar />
        <main className="flex-1" key={`main-${location.pathname}`}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/space" element={<Space />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  )
}

export default App