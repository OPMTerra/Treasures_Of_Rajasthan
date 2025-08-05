import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import AuthModal from '../components/AuthModal';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Cart() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { state, dispatch } = useCart();
  const { login } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleAuth = (email, isSignUp) => {
    login(email);
  };

  const subtotal = state.total;
  const shipping = 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax + shipping;

  return (
    <>
      <Header onAuthModal={() => setIsAuthModalOpen(true)} />
      
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <BackButton href="/shop" label="Continue Shopping" />
          </div>
          
          <ProgressBar 
            currentStep={1}
            totalSteps={3}
            stepLabels={['Cart', 'Checkout', 'Confirmation']}
          />
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">Shopping Cart</h1>
            <p className="text-xl text-gray-600">
              Review your handcrafted treasures before checkout
            </p>
          </div>

          {state.items.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
              <div className="text-8xl mb-8 opacity-20">🛒</div>
              <h3 className="text-3xl font-bold mb-4 text-accent">
                Your cart is empty
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Discover amazing handcrafted treasures and add them to your cart
              </p>
              <Link 
                to="/shop" 
                className="bg-blue-600 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className={`grid lg:grid-cols-3 gap-8 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {state.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      transitionDelay: `${index * 100}ms`,
                      opacity: isVisible ? 1 : 0
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl shadow-md"
                        />
                        {item.customization && (
                          <div 
                            className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white shadow-lg"
                            style={{ backgroundColor: item.customization.color }}
                          />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-accent mb-2">{item.name}</h3>
                        <div className="text-lg font-semibold text-primary mb-2">
                          ₹{item.price.toLocaleString()} each
                        </div>
                        {item.customization && (
                          <div className="text-sm text-gray-600 mb-3">
                            <span className="font-medium">Customization:</span> {item.customization.pattern}
                          </div>
                        )}
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                            <button
                              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <i className="ri-subtract-line w-4 h-4 flex items-center justify-center"></i>
                            </button>
                            <span className="w-12 text-center font-bold text-lg">
                              {item.quantity}
                            </span>
                            <button
                              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-300"
                          >
                            <i className="ri-delete-bin-line w-5 h-5 flex items-center justify-center"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total for this item
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-3xl shadow-xl sticky top-8">
                  <h3 className="text-2xl font-bold mb-6 text-accent">Order Summary</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-lg">Subtotal ({state.itemCount} items)</span>
                      <span className="text-lg font-semibold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-lg">Shipping</span>
                      <span className="text-lg font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-lg">Tax (18%)</span>
                      <span className="text-lg font-semibold">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">Total</span>
                        <span className="text-2xl font-bold text-primary">₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Link 
                    to="/checkout"
                    className="w-full bg-blue-600 hover:bg-blue-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <i className="ri-secure-payment-line w-6 h-6 flex items-center justify-center"></i>
                    Proceed to Checkout
                  </Link>
                  
                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <i className="ri-shield-check-line w-4 h-4 flex items-center justify-center text-green-500"></i>
                      <span>Secure checkout guaranteed</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <i className="ri-truck-line w-6 h-6 flex items-center justify-center text-primary mx-auto mb-1"></i>
                      <div className="text-xs font-medium text-gray-700">Free Shipping</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <i className="ri-customer-service-line w-6 h-6 flex items-center justify-center text-primary mx-auto mb-1"></i>
                      <div className="text-xs font-medium text-gray-700">24/7 Support</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <i className="ri-refresh-line w-6 h-6 flex items-center justify-center text-primary mx-auto mb-1"></i>
                      <div className="text-xs font-medium text-gray-700">Easy Returns</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <i className="ri-shield-check-line w-6 h-6 flex items-center justify-center text-primary mx-auto mb-1"></i>
                      <div className="text-xs font-medium text-gray-700">Secure Payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />
    </>
  );
}