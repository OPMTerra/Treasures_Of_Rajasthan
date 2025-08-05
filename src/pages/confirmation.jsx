import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import AuthModal from '../components/AuthModal';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Confirmation() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [orderNumber] = useState(`HC${Date.now().toString().slice(-6)}`);
  const [showConfetti, setShowConfetti] = useState(false);
  const { state, dispatch } = useCart();
  const { login } = useUser();
  const [orderTotal, setOrderTotal] = useState(null); // Store the order total before clearing the cart

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setShowConfetti(true);
    if (orderTotal === null && state.total > 0) {
      const subtotal = state.total;
      const tax = Math.round(subtotal * 0.18);
      setOrderTotal(subtotal + tax); 
      setTimeout(() => setShowConfetti(false), 2000);
      dispatch({ type: 'CLEAR_CART' });
    } else {
      setTimeout(() => setShowConfetti(false), 2000);
    }
  }, [dispatch, state.total, orderTotal]);

  const handleAuth = (email, isSignUp) => {
    login(email);
  };

  const handleShare = (platform) => {
    const message = "Just ordered amazing handcrafted treasures from Treasures of Rajasthan! 🎉";
    const url = window.location.origin;
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`);
        break;
        default:
        // Optionally log or ignore
        break;
    }
  };

  // Removed subtotal, tax, and total calculations from here

  return (
    <>
      <Header onAuthModal={() => setIsAuthModalOpen(true)} />
      
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-10">
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    backgroundColor: ['#E07A5F', '#F4F1DE', '#81B29A', '#F2CC8F'][Math.floor(Math.random() * 4)]
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-8">
          <ProgressBar 
            currentStep={3}
            totalSteps={3}
            stepLabels={['Cart', 'Checkout', 'Confirmation']}
          />
          
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 shadow-2xl">
                <i className="ri-check-line w-12 h-12 flex items-center justify-center text-white"></i>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
                Order Confirmed! 🎉
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you for your order! Your handcrafted treasures are being prepared with love and care by our skilled artisans.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3 rounded-full mb-4">
                  <i className="ri-gift-line w-6 h-6 flex items-center justify-center text-primary"></i>
                  <span className="font-semibold text-accent">Order Details</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-bold text-primary mb-1">#{orderNumber}</div>
                    <div className="text-sm text-gray-600">Order Number</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-bold text-primary mb-1">7-10 Days</div>
                    <div className="text-sm text-gray-600">Delivery Time</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl font-bold text-primary mb-1">₹{orderTotal !== null ? orderTotal.toLocaleString() : '...'}</div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a 
                  href="/shop" 
                  className="bg-blue-600 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <i className="ri-shopping-bag-line w-6 h-6 flex items-center justify-center"></i>
                  Continue Shopping
                </a>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <i className="ri-share-line w-6 h-6 flex items-center justify-center"></i>
                  Share Your Joy
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl mb-8">
              <h3 className="text-2xl font-bold mb-8 text-accent text-center">
                Your Order Journey
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-check-line w-6 h-6 flex items-center justify-center text-white"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-accent">Order Confirmed</h4>
                      <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">Completed</span>
                    </div>
                    <p className="text-gray-600">Your order has been received and is being processed</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-hammer-line w-6 h-6 flex items-center justify-center text-white"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-accent">Artisan at Work</h4>
                      <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">In Progress</span>
                    </div>
                    <p className="text-gray-600">Your items are being handcrafted with love and care</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-truck-line w-6 h-6 flex items-center justify-center text-white"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-accent">Quality Check & Shipping</h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Pending</span>
                    </div>
                    <p className="text-gray-600">Final inspection and secure packaging for delivery</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-home-line w-6 h-6 flex items-center justify-center text-white"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-accent">Delivered to You</h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Pending</span>
                    </div>
                    <p className="text-gray-600">Your treasures arrive at your doorstep</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-3xl shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-accent">
                  Thank You for Supporting Our Artisans! 🎨
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Your purchase directly supports skilled craftspeople and helps preserve traditional Indian handicrafts for future generations.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Happy%20Indian%20artisan%20family%20celebrating%20successful%20handicraft%20sale%2C%20traditional%20workshop%20setting%2C%20warm%20lighting%2C%20skilled%20craftspeople%20working%20on%20beautiful%20handmade%20items%2C%20joy%20and%20satisfaction&width=400&height=300&seq=artisan-celebration&orientation=landscape"
                    alt="Happy Artisans"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h4 className="text-xl font-bold text-accent mb-4">Your Impact</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <i className="ri-check-line w-5 h-5 flex items-center justify-center text-green-600"></i>
                        <span className="text-gray-700">Supports artisan families directly</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <i className="ri-check-line w-5 h-5 flex items-center justify-center text-green-600"></i>
                        <span className="text-gray-700">Preserves traditional crafts</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <i className="ri-check-line w-5 h-5 flex items-center justify-center text-green-600"></i>
                        <span className="text-gray-700">Promotes sustainable livelihoods</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <i className="ri-check-line w-5 h-5 flex items-center justify-center text-green-600"></i>
                        <span className="text-gray-700">Encourages cultural heritage</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">Share your support for traditional crafts:</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <i className="ri-twitter-fill w-5 h-5 flex items-center justify-center"></i>
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <i className="ri-facebook-fill w-5 h-5 flex items-center justify-center"></i>
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <i className="ri-whatsapp-fill w-5 h-5 flex items-center justify-center"></i>
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />

      <style>
        {`
        .confetti-container {
          position: fixed;
          top: -10px;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }
        
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #E07A5F;
          animation: confetti-fall 3s linear infinite;
        }
        
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}
      </style>
    </>
  );

}
