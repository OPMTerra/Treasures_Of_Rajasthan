import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AuthModal from '../components/AuthModal';
import { useUser } from '../context/UserContext';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAuth = (email, isSignUp) => {
    login(email);
  };

  return (
    <>
      <Header onAuthModal={() => setIsAuthModalOpen(true)} />
      <Hero />

      {/* Featured Collections */}
      <section className="py-20 texture-overlay" style={{ backgroundColor: 'var(--neutral)' }}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>
              Featured Collections
            </h2>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--accent)' }}>
              Explore our curated selection of authentic handicrafts from master artisans
            </p>
            <div className="w-24 h-1 rounded-full mx-auto mt-6" style={{ 
              background: `linear-gradient(135deg, var(--primary), var(--primary-light))` 
            }}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
              <Link to="/product/1" className="block">
                <div className="card transition-all duration-300 cursor-pointer hover:transform hover:scale-105 shadow-xl">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Beautiful%20traditional%20Rajasthani%20pottery%20collection%20with%20terracotta%20pots%2C%20colorful%20ceramic%20bowls%2C%20and%20decorative%20vessels%2C%20warm%20lighting%2C%20simple%20clean%20background%2C%20artisan%20craftsmanship&width=400&height=300&seq=pottery-collection&orientation=landscape"
                    alt="Pottery Collection"
                    className="w-full h-48 object-cover object-top"
                    style={{ borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0' }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--indigo)' }}>
                      Pottery & Ceramics
                    </h3>
                    <p className="mb-4 leading-relaxed" style={{ color: 'var(--accent-light)' }}>
                      Handcrafted pottery with traditional glazing techniques
                    </p>
                    <div className="font-bold" style={{ color: 'var(--primary)' }}>
                      Starting from ₹3,200
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <Link to="/product/2" className="block">
                <div className="card transition-all duration-300 cursor-pointer hover:transform hover:scale-105 shadow-xl">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Exquisite%20traditional%20Indian%20textile%20collection%20with%20colorful%20embroidered%20fabrics%2C%20mirror%20work%2C%20and%20intricate%20patterns%2C%20vibrant%20colors%2C%20simple%20background%2C%20authentic%20craftsmanship&width=400&height=300&seq=textile-collection&orientation=landscape"
                    alt="Textile Collection"
                    className="w-full h-48 object-cover object-top"
                    style={{ borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0' }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--indigo)' }}>
                      Textiles & Fabrics
                    </h3>
                    <p className="mb-4 leading-relaxed" style={{ color: 'var(--accent-light)' }}>
                      Intricate embroidery and mirror work on premium fabrics
                    </p>
                    <div className="font-bold" style={{ color: 'var(--primary)' }}>
                      Starting from ₹2,800
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
              <Link to="/product/3" className="block">
                <div className="card transition-all duration-300 cursor-pointer hover:transform hover:scale-105 shadow-xl">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Traditional%20wooden%20handicrafts%20including%20carved%20sculptures%2C%20decorative%20items%2C%20and%20furniture%20pieces%2C%20rich%20wood%20tones%2C%20simple%20background%2C%20skilled%20craftsmanship&width=400&height=300&seq=wood-collection&orientation=landscape"
                    alt="Wood Collection"
                    className="w-full h-48 object-cover object-top"
                    style={{ borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0' }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--indigo)' }}>
                      Wood Crafts
                    </h3>
                    <p className="mb-4 leading-relaxed" style={{ color: 'var(--accent-light)' }}>
                      Hand-carved wooden sculptures and decorative pieces
                    </p>
                    <div className="font-bold" style={{ color: 'var(--primary)' }}>
                      Starting from ₹2,200
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 texture-overlay" style={{ 
        background: `linear-gradient(135deg, var(--neutral-light), var(--neutral))` 
      }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>
              Why Choose Our Handicrafts
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--accent)' }}>
              Every piece is a testament to authentic craftsmanship and cultural heritage
            </p>
            <div className="w-24 h-1 rounded-full mx-auto mt-6" style={{ 
              background: `linear-gradient(135deg, var(--primary), var(--primary-light))` 
            }}></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div 
                  className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 texture-overlay"
                  style={{
                    background: `linear-gradient(135deg, var(--primary), var(--primary-light))`
                  }}
                >
                  <i className="ri-hand-heart-line text-3xl" style={{ color: 'var(--neutral-light)' }}></i>
                </div>
                <div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, var(--primary), var(--primary-light))`
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--indigo)' }}>
                100% Authentic
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--accent-light)' }}>
                Directly from skilled artisans using traditional methods passed down through generations
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div 
                  className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 texture-overlay"
                  style={{
                    background: `linear-gradient(135deg, var(--success), #10B981)`
                  }}
                >
                  <i className="ri-truck-line text-3xl" style={{ color: 'var(--neutral-light)' }}></i>
                </div>
                <div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, var(--success), #10B981)`
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--indigo)' }}>
                Free Shipping
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--accent-light)' }}>
                Complimentary delivery across India on all orders with secure packaging
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div 
                  className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 texture-overlay"
                  style={{
                    background: `linear-gradient(135deg, var(--indigo), var(--indigo-light))`
                  }}
                >
                  <i className="ri-shield-check-line text-3xl" style={{ color: 'var(--neutral-light)' }}></i>
                </div>
                <div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, var(--indigo), var(--indigo-light))`
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--indigo)' }}>
                Quality Assured
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--accent-light)' }}>
                Each piece inspected for craftsmanship excellence and authenticity
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div 
                  className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 texture-overlay"
                  style={{
                    background: `linear-gradient(135deg, var(--error), #EF4444)`
                  }}
                >
                  <i className="ri-heart-line text-3xl" style={{ color: 'var(--neutral-light)' }}></i>
                </div>
                <div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, var(--error), #EF4444)`
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--indigo)' }}>
                Supports Artisans
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--accent-light)' }}>
                Your purchase directly supports artisan communities and preserves traditions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Spotlight */}
      <section className="py-20 texture-overlay" style={{ backgroundColor: 'var(--neutral)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>
              Meet Our Master Artisans
            </h2>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--accent)' }}>
              The skilled hands behind every beautiful creation
            </p>
            <div className="w-24 h-1 rounded-full mx-auto mt-6" style={{ 
              background: `linear-gradient(135deg, var(--primary), var(--primary-light))` 
            }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <img 
                src="https://readdy.ai/api/search-image?query=Portrait%20of%20skilled%20Indian%20female%20artisan%20working%20on%20traditional%20embroidery%2C%20concentrated%20expression%2C%20colorful%20threads%20around%2C%20warm%20lighting%2C%20authentic%20workshop%20setting&width=300&height=300&seq=artisan-portrait-1&orientation=squarish"
                alt="Artisan Kamala"
                className="w-48 h-48 object-cover rounded-full mx-auto mb-6 shadow-xl"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--indigo)' }}>
                Smt. Kamala Devi
              </h3>
              <p className="font-medium mb-4" style={{ color: 'var(--primary)' }}>
                Master Embroiderer, Kutch
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--accent-light)' }}>
                "Each stitch carries the wisdom of generations. I'm proud to share our heritage with the world."
              </p>
            </div>

            <div className="text-center">
              <img 
                src="https://readdy.ai/api/search-image?query=Portrait%20of%20experienced%20Indian%20male%20artisan%20carving%20wood%2C%20skilled%20hands%20at%20work%2C%20traditional%20tools%2C%20focused%20expression%2C%20workshop%20environment&width=300&height=300&seq=artisan-portrait-2&orientation=squarish"
                alt="Artisan Ramesh"
                className="w-48 h-48 object-cover rounded-full mx-auto mb-6 shadow-xl"
              />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--indigo)' }}>
                Masterji Ramesh Kumar
              </h3>
              <p className="font-medium mb-4" style={{ color: 'var(--primary)' }}>
                Wood Carver, Saharanpur
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--accent-light)' }}>
                "Every piece of wood tells a story. I listen and help it become something beautiful."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 texture-overlay" style={{ backgroundColor: 'var(--neutral-light)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-dark)' }}>
              Stay Connected
            </h2>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: 'var(--accent)' }}>
              Get updates on new collections and artisan stories
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                style={{
                  backgroundColor: '#fff',
                  color: 'var(--text-dark)',
                  borderRadius: '0.75rem',
                  border: '2px solid #4F46E5'
                }}
              />
              <button 
                className="px-6 py-3 whitespace-nowrap shadow-lg rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #F2CC8F)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: '600'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 texture-overlay" style={{ background: 'linear-gradient(135deg, #23272F, #2D3748)', color: '#F4F1DE' }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
            <div className="text-3xl font-extrabold mb-4 tracking-wide" style={{ 
              fontFamily: 'Playfair Display, serif',
              color: '#F2CC8F'
            }}>
              Treasure of Rajasthan
            </div>
            <p className="leading-relaxed" style={{ color: '#F4F1DE' }}>
              Connecting authentic artisans with art lovers worldwide
            </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--neutral-light)' }}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li><Link to="/shop" className="transition-colors duration-300" style={{ color: 'var(--neutral)' }}>Shop</Link></li>
                <li><Link to="/about" className="transition-colors duration-300" style={{ color: 'var(--neutral)' }}>About</Link></li>
                <li><Link to="/cart" className="transition-colors duration-300" style={{ color: 'var(--neutral)' }}>Cart</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--neutral-light)' }}>
                Categories
              </h3>
              <ul className="space-y-2">
                <li><Link to="/shop" className="transition-colors duration-300" style={{ color: 'var(--neutral)' }}>Pottery</Link></li>
                <li><Link to="/shop" className="transition-colors duration-300" style={{ color: 'var(--neutral)' }}>Textiles</Link></li>
                <li><Link to="/shop" className="transition-colors duration-300" style={{ color: 'var(--neutral)' }}>Wood Crafts</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--neutral-light)' }}>
                Connect
              </h3>
              <div className="flex gap-4">
                <span className="transition-all duration-300 hover:transform hover:scale-110" style={{ color: 'var(--neutral)' }}>
                  <i className="ri-facebook-fill text-xl"></i>
                </span>
                <span className="transition-all duration-300 hover:transform hover:scale-110" style={{ color: 'var(--neutral)' }}>
                  <i className="ri-instagram-line text-xl"></i>
                </span>
                <span className="transition-all duration-300 hover:transform hover:scale-110" style={{ color: 'var(--neutral)' }}>
                  <i className="ri-twitter-fill text-xl"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center" style={{ 
            borderColor: 'var(--accent)',
            color: 'var(--neutral)'
          }}>
            <p>&copy; 2025 Handicrafts Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />
    </>
  );

}
