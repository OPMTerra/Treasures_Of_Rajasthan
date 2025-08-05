import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  // Use only the first image from product.images if available, else fallback to product.image
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : product.image;

  return (
    <div 
      className="card transition-all duration-300 shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: 'var(--neutral-light)',
        boxShadow: 'var(--shadow)',
        borderRadius: 'var(--border-radius-lg)'
      }}
    >
      <div className="relative overflow-hidden" style={{ borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0' }}>
        <img 
          src={mainImage} 
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          style={{ objectPosition: 'top' }}
        />
        
        {/* Category Badge */}
        <div 
          className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
          style={{
            background: 'rgba(30, 41, 59, 0.85)', // dark semi-transparent
            color: '#fff',
            letterSpacing: '0.04em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            border: '2px solid #F2CC8F'
          }}
        >
          {product.category}
        </div>

        {/* Hover Overlay */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(135deg, rgba(74, 85, 104, 0.8), rgba(79, 70, 229, 0.7))'
          }}
        >
          <Link 
            to={`/product/${product.id}`}
            className="px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-xl hover:transform hover:scale-105"
            style={{
              backgroundColor: 'var(--neutral-light)',
              color: 'var(--accent-dark)'
            }}
          >
            <i className="ri-eye-line w-5 h-5 flex items-center justify-center"></i>
            <span>View Details</span>
          </Link>
        </div>

        {/* Heart Icon */}
        <button 
          className="absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:transform hover:scale-110"
          style={{
            backgroundColor: 'rgba(248, 245, 240, 0.9)',
            color: 'var(--accent)'
          }}
        >
          <i className="ri-heart-line w-5 h-5 flex items-center justify-center"></i>
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight" style={{ color: 'var(--indigo)' }}>
          {product.name}
        </h3>
        
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed" style={{ color: 'var(--accent-light)' }}>
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
            ₹{product.price.toLocaleString()}
          </div>
          <div className="flex items-center gap-1" style={{ color: 'var(--warning)' }}>
            <i className="ri-star-fill w-4 h-4 flex items-center justify-center"></i>
            <i className="ri-star-fill w-4 h-4 flex items-center justify-center"></i>
            <i className="ri-star-fill w-4 h-4 flex items-center justify-center"></i>
            <i className="ri-star-fill w-4 h-4 flex items-center justify-center"></i>
            <i className="ri-star-fill w-4 h-4 flex items-center justify-center"></i>
            <span className="text-sm ml-1" style={{ color: 'var(--accent-light)' }}>(4.9)</span>
          </div>
        </div>

        <Link 
          to={`/product/${product.id}`}
          className="w-full text-center py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg whitespace-nowrap hover:transform hover:scale-105 bg-blue-600 hover:bg-blue-800"
          style={{
            color: '#fff'
          }}
        >
          <i className="ri-shopping-cart-line w-5 h-5 flex items-center justify-center"></i>
          <span>Customize & Buy</span>
        </Link>
      </div>
    </div>
  );
}