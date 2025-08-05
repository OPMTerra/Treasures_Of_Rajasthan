import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';
import { useUser } from '../context/UserContext';

export default function About() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAuth = (email, isSignUp) => {
    login(email);
  };

  return (
    <>
      <Header onAuthModal={() => setIsAuthModalOpen(true)} />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section 
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Traditional%20Indian%20artisan%20workshop%20with%20skilled%20craftspeople%20working%20on%20beautiful%20handicrafts%2C%20warm%20lighting%2C%20cultural%20heritage%2C%20authentic%20craftsmanship%20scene%20with%20pottery%2C%20textiles%2C%20and%20woodwork&width=1920&height=1080&seq=about-hero&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <div className={`slide-in ${isVisible ? 'visible' : ''}`}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Preserving centuries-old traditions while empowering artisan communities across India
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                We believe that every handicraft tells a story of tradition, passion, and skilled craftsmanship. 
                Our mission is to bridge the gap between authentic artisans and art lovers worldwide, ensuring 
                that these beautiful traditions continue to thrive for future generations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-hand-heart-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Authentic Craftsmanship</h3>
                  <p className="text-gray-600">
                    Every piece is handcrafted by skilled artisans using traditional techniques passed down through generations.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-community-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Community Support</h3>
                  <p className="text-gray-600">
                    We work directly with artisan communities, ensuring fair wages and sustainable livelihoods.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-leaf-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Sustainable Practices</h3>
                  <p className="text-gray-600">
                    We promote eco-friendly materials and sustainable production methods in all our crafts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Artisan Stories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Meet Our Artisans</h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <img 
                  src="https://readdy.ai/api/search-image?query=Skilled%20Indian%20female%20artisan%20working%20on%20traditional%20textile%20embroidery%2C%20concentrated%20expression%2C%20workshop%20setting%2C%20colorful%20threads%20and%20fabrics%2C%20authentic%20craftsmanship%20portrait&width=400&height=300&seq=artisan-1&orientation=landscape"
                  alt="Artisan Kamala"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Smt. Kamala Devi</h3>
                <p className="text-primary font-medium mb-4">Master Embroiderer, Kutch</p>
                <p className="text-gray-600 leading-relaxed">
                  "My grandmother taught me the art of mirror work when I was just eight years old. 
                  Now, I'm passing these skills to my daughter and other young women in our village. 
                  Through this platform, our work reaches people who truly appreciate handmade beauty."
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <img 
                  src="https://readdy.ai/api/search-image?query=Experienced%20Indian%20male%20artisan%20carving%20intricate%20wooden%20sculpture%2C%20skilled%20hands%20at%20work%2C%20traditional%20woodworking%20tools%2C%20workshop%20environment%2C%20master%20craftsman%20portrait&width=400&height=300&seq=artisan-2&orientation=landscape"
                  alt="Artisan Ramesh"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Masterji Ramesh Kumar</h3>
                <p className="text-primary font-medium mb-4">Wood Carver, Saharanpur</p>
                <p className="text-gray-600 leading-relaxed">
                  "Every piece of wood speaks to me. I've been carving for 30 years, and each creation 
                  carries a piece of my soul. When customers appreciate our work, it motivates us to 
                  preserve these ancient techniques for future generations."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">
                Craftsmanship in Action
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Watch our skilled artisans bring beautiful handicrafts to life through their expert hands
              </p>
              
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                  poster="https://readdy.ai/api/search-image?query=Indian%20artisan%20workshop%20scene%20with%20multiple%20craftspeople%20working%20on%20different%20handicrafts%2C%20pottery%20wheel%2C%20loom%2C%20carving%20tools%2C%20vibrant%20colors%2C%20cultural%20heritage&width=800&height=450&seq=workshop-video&orientation=landscape"
                >
                  <source 
                    src="https://readdy.ai/api/search-image?query=Video%20of%20Indian%20artisans%20working%20in%20traditional%20workshop%2C%20hands%20crafting%20pottery%2C%20weaving%20textiles%2C%20carving%20wood%2C%20authentic%20cultural%20scene&width=800&height=450&seq=workshop-loop&orientation=landscape" 
                    type="video/mp4" 
                  />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-12 text-gray-800">Our Impact</h2>
              
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-gray-600">Artisans Supported</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">25</div>
                  <p className="text-gray-600">States Covered</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">95%</div>
                  <p className="text-gray-600">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Collections Button */}
        <div className="py-12 text-center">
          <Link
            to="/shop"
            className="inline-block px-10 py-5 rounded-full text-lg font-extrabold shadow-lg bg-blue-600 hover:bg-blue-800 hover:scale-105 transition-all duration-300"
            style={{
              color: '#fff',
              boxShadow: '0 4px 16px rgba(79,70,229,0.15)',
              letterSpacing: '0.03em',
              textShadow: '0 2px 8px rgba(0,0,0,0.18)'
            }}
          >
            Explore Collections
          </Link>
        </div>
        {/* Call to Action */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Join Our Journey</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
              Every purchase you make helps preserve traditional crafts and supports artisan families. 
              Be part of something meaningful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="btn btn-ghost text-lg px-8 py-4 border-2 border-white rounded-full"
              >
                Join Our Community
              </button>
            </div>
          </div>
        </section>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />
    </>
  );
}