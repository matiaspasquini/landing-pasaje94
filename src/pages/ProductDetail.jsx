import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { mockProducts } from '../utils/mockData'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  
  const product = mockProducts.find((p) => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl tracking-tighter font-light mb-4">Product not found</h2>
          <Link to="/shop" className="text-sm tracking-wider hover:opacity-60">
            ← Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-screen-2xl mx-auto">
        <Link to="/shop" className="text-sm tracking-wider hover:opacity-60 inline-block mb-8">
          ← Back to Shop
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Image */}
          <div className="aspect-square bg-gray-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                {product.name}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl tracking-tighter font-light mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{product.artist}</p>
            <p className="text-3xl font-light mb-8">€{product.price.toFixed(2)}</p>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm tracking-wider mb-3">DESCRIPTION</h3>
              <p className="leading-relaxed">{product.description}</p>
            </div>

            {/* Process */}
            <div className="mb-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm tracking-wider mb-3">CREATIVE PROCESS</h3>
              <p className="leading-relaxed">{product.process}</p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className={`w-full py-3 border border-black text-sm tracking-wider transition-colors ${
                product.inStock
                  ? 'hover:bg-black hover:text-white'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
            </button>

            {/* Stock Status */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              {product.inStock ? 'In stock' : 'Currently unavailable'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail