import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // <-- Add this import
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import ColorPicker from '../../components/ColorPicker';
import PatternPicker from '../../components/PatternPicker';
import AuthModal from '../../components/AuthModal';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useSession, AIDA_HEADLINES, PAS_HEADLINES } from '../../context/SessionContext';
import { useUser } from '../../context/UserContext';

export default function ProductContent() {
  const { id: productId } = useParams(); // <-- Get productId from URL
  const product = products.find(p => p.id === productId);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [currentHeadline, setCurrentHeadline] = useState('');
  const [showGif, setShowGif] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showMiniSuccess, setShowMiniSuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { dispatch } = useCart();
  const { session, setHeadline } = useSession();
  const { login } = useUser();

  const productImages = [
    product?.image
  ];

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedPattern(product.patterns[0].id);
      
      if (session.headlines[productId]) {
        setCurrentHeadline(session.headlines[productId]);
      } else {
        const useAIDA = Math.random() > 0.5;
        const headlines = useAIDA ? AIDA_HEADLINES : PAS_HEADLINES;
        const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
        setCurrentHeadline(randomHeadline);
        setHeadline(productId, randomHeadline);
      }
    }
  }, [product, productId, session.headlines, setHeadline]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const shouldShowGif = Math.random() > 0.8;
    if (shouldShowGif) {
      const timer = setTimeout(() => {
        setShowGif(true);
        setTimeout(() => setShowGif(false), 4000);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    
    await new Promise(resolve => setTimeout(resolve, 600));

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      customization: {
        color: selectedColor,
        pattern: selectedPattern
      }
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    
    setIsAdding(false);
    setShowMiniSuccess(true);
    
    setTimeout(() => setShowMiniSuccess(false), 1500);
  };

  const handleAuth = (email, isSignUp) => {
    login(email);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral/20 to-white">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <div className="text-6xl mb-6 opacity-30">🔍</div>
          <h1 className="text-3xl font-bold mb-6 text-accent">Product Not Found</h1>
          <BackButton href="/shop" label="Back to Shop" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header onAuthModal={() => setIsAuthModalOpen(true)} />
      
      <main className="min-h-screen bg-gradient-to-br from-neutral/10 via-white to-neutral/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <BackButton href="/shop" label="Back to Shop" />
          </div>
          
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12 bg-gradient-to-r from-primary/5 via-neutral/10 to-primary/5 py-12 px-6 rounded-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-accent leading-tight">
                {currentHeadline}
              </h1>
              <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
                <i className="ri-award-line w-6 h-6 flex items-center justify-center text-primary"></i>
                <span className="text-lg font-semibold text-accent">Handcrafted Excellence</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img 
                      src={productImages[currentImageIndex]} 
                      alt={`${product.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <i className="ri-arrow-left-line w-6 h-6 flex items-center justify-center text-accent"></i>
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <i className="ri-arrow-right-line w-6 h-6 flex items-center justify-center text-accent"></i>
                    </button>

                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {productImages.length}
                    </div>
                  </div>
                  
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl">
                    <div className="text-sm font-semibold text-accent mb-3">Live Preview</div>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full border-3 border-white shadow-lg"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <div className="text-sm font-medium text-gray-700">
                        {product.patterns.find(p => p.id === selectedPattern)?.name}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-full shadow-xl">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 via-green-400 to-green-700 px-6 py-3 rounded-full shadow-xl" style={{ color: '#fff' }}>
                      <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center"></i>
                      <span className="font-semibold">100% Authentic</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'border-primary shadow-lg' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-white p-4 rounded-2xl shadow-lg">
                    <i className="ri-hand-heart-line w-8 h-8 flex items-center justify-center text-primary mx-auto mb-2"></i>
                    <div className="text-sm font-semibold text-accent">Handcrafted</div>
                  </div>
                  <div className="text-center bg-white p-4 rounded-2xl shadow-lg">
                    <i className="ri-earth-line w-8 h-8 flex items-center justify-center text-primary mx-auto mb-2"></i>
                    <div className="text-sm font-semibold text-accent">Eco-Friendly</div>
                  </div>
                  <div className="text-center bg-white p-4 rounded-2xl shadow-lg">
                    <i className="ri-award-line w-8 h-8 flex items-center justify-center text-primary mx-auto mb-2"></i>
                    <div className="text-sm font-semibold text-accent">Premium Quality</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-accent">You might also like</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {products.filter(p => p.id !== productId).slice(0, 4).map((relatedProduct) => (
                      <a
                        key={relatedProduct.id} 
                        href={`/product/${relatedProduct.id}`}
                        className="group"
                      >
                        <div className="relative overflow-hidden rounded-lg">
                          <img 
                            src={relatedProduct.image} 
                            alt={relatedProduct.name}
                            className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="text-white text-sm font-medium truncate">
                              {relatedProduct.name}
                            </div>
                            <div className="text-white text-xs">
                              ₹{relatedProduct.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-xl">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-accent">{product.name}</h2>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-primary">₹{product.price.toLocaleString()}</div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="ri-star-fill w-5 h-5 flex items-center justify-center"></i>
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">{product.description}</p>
                  
                  <div className="bg-gradient-to-r from-neutral/30 to-neutral/20 p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold mb-4 text-accent flex items-center gap-2">
                      <i className="ri-star-line w-6 h-6 flex items-center justify-center"></i>
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <i className="ri-check-line w-5 h-5 flex items-center justify-center text-primary"></i>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold mb-4 text-accent flex items-center gap-2">
                      <i className="ri-user-heart-line w-6 h-6 flex items-center justify-center"></i>
                      Meet Your Artisan
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                        <i className="ri-user-line w-8 h-8 flex items-center justify-center text-primary"></i>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent">{product.artisan.name}</div>
                        <div className="text-gray-600">{product.artisan.location}</div>
                        <div className="text-sm text-gray-500">{product.artisan.experience} of mastery</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 text-accent">Customize Your Piece</h3>
                  
                  <ColorPicker
                    colors={product.colors}
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                  />

                  <PatternPicker
                    patterns={product.patterns}
                    selectedPattern={selectedPattern}
                    onPatternSelect={setSelectedPattern}
                  />

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-accent">Quantity</h4>
                    <div className="flex items-center gap-4">
                      <button
                        className="w-12 h-12 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <i className="ri-subtract-line w-5 h-5 flex items-center justify-center"></i>
                      </button>
                      <div className="w-16 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-lg">
                        {quantity}
                      </div>
                      <button
                        className="w-12 h-12 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <i className="ri-add-line w-5 h-5 flex items-center justify-center"></i>
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className={`w-full text-xl font-bold py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl whitespace-nowrap ${
                        isAdding 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-800 text-white'
                      }`}
                    >
                      {isAdding ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Adding to Cart...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <i className="ri-shopping-cart-line w-6 h-6 flex items-center justify-center"></i>
                          <span>Add to Cart - ₹{(product.price * quantity).toLocaleString()}</span>
                        </div>
                      )}
                    </button>

                    {showMiniSuccess && (
                      <div className="absolute inset-0 bg-green-500 rounded-2xl flex items-center justify-center transition-opacity duration-300">
                        <div className="text-white text-xl font-bold flex items-center gap-3">
                          <i className="ri-check-line w-6 h-6 flex items-center justify-center"></i>
                          <span>Added to Cart!</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <i className="ri-truck-line w-4 h-4 flex items-center justify-center text-primary"></i>
                      Free Shipping
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center text-primary"></i>
                      Secure Payment
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <i className="ri-refresh-line w-4 h-4 flex items-center justify-center text-primary"></i>
                      Easy Returns
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <i className="ri-customer-service-line w-4 h-4 flex items-center justify-center text-primary"></i>
                      24/7 Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showGif && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-4">
              <img 
                src="https://readdy.ai/api/search-image?query=Happy%20customers%20celebrating%20beautiful%20handicraft%20purchase%2C%20artisan%20workshop%20celebration%2C%20joyful%20shopping%20experience%2C%20warm%20lighting%2C%20traditional%20crafts&width=400&height=300&seq=celebration-moment&orientation=landscape"
                alt="Celebration"
                className="w-full h-60 object-cover rounded-2xl mb-6"
              />
              <div className="text-center">
                <h3 className="text-2xl font-bold text-accent mb-2">
                  You're Supporting Real Artisans! 🎨
                </h3>
                <p className="text-gray-600">
                  Every purchase helps preserve traditional craftsmanship
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />
    </>
  );
}