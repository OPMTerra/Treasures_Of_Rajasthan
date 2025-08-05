import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20traditional%20Rajasthani%20handicrafts%20workshop%20with%20warm%20golden%20lighting%2C%20skilled%20artisans%20working%20on%20colorful%20textiles%20and%20pottery%2C%20rich%20cultural%20heritage%20setting%20with%20intricate%20patterns%2C%20warm%20amber%20and%20terracotta%20tones%2C%20inviting%20atmosphere%20that%20celebrates%20traditional%20craftsmanship&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
      }}
    >
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            padding: '2.5rem 2rem',
            margin: '0 auto',
            maxWidth: '90vw'
          }}>
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-wide"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              fontWeight: '800',
              color: 'var(--text-dark)',
              textShadow: '0 4px 8px rgba(0,0,0,0.2), 0 2px 4px rgba(255,255,255,0.8)',
              letterSpacing: '0.02em'
            }}
          >
            Handcrafted Treasures
            <br />
            <span 
              className="text-4xl md:text-6xl"
              style={{ 
                fontFamily: 'Cinzel, serif',
                fontWeight: '600',
                color: 'var(--terracotta)',
                textShadow: '0 3px 6px rgba(0,0,0,0.15), 0 1px 3px rgba(255,255,255,0.7)'
              }}
            >
              of Rajasthan
            </span>
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ 
              color: 'var(--accent-dark)',
              fontWeight: '600',
              textShadow: '0 2px 4px rgba(0,0,0,0.15), 0 1px 2px rgba(255,255,255,0.7)'
            }}
          >
            Discover authentic handcrafted masterpieces from skilled artisans. Each piece tells a story of tradition, passion, and timeless beauty.
          </p>
          <Link 
            to="/shop"
            className="text-lg px-8 py-4 inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 rounded-full font-semibold"
            style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #4F46E5, #F2CC8F)', // Indigo to gold
              color: '#fff',
              border: 'none',
              boxShadow: '0 8px 24px rgba(79, 70, 229, 0.3), 0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <span>Shop Collection</span>
            <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(248, 245, 240, 0.9)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <i className="ri-arrow-down-line text-2xl" style={{ color: 'var(--accent)' }}></i>
        </div>
      </div>
    </section>
  );
}