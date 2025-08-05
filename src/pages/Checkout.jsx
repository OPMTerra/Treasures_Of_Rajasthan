import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import ProgressBar from '../components/ProgressBar';
import AuthModal from '../components/AuthModal';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Checkout() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const { state } = useCart();
  const { user, login, setGuestUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.items.length === 0) {
      const timer = setTimeout(() => {
        navigate('/shop');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.items, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zipCode) errors.zipCode = 'ZIP code is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate order processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to confirmation page
    navigate('/confirmation');
  };

  const handleGuestCheckout = () => {
    setGuestUser();
  };

  const handleAuth = (email, isSignUp) => {
    login(email);
  };

  const subtotal = state.total;
  const shipping = 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax + shipping;

  // Loading state
  if (state.items.length === 0) {
    return (
      <>
        <Header onAuthModal={() => setIsAuthModalOpen(true)} />
        <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex items-center justify-center">
          <div className="text-center bg-white p-12 rounded-3xl shadow-xl">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Loading your cart...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header onAuthModal={() => setIsAuthModalOpen(true)} />
      
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <BackButton href="/cart" label="Edit Cart" />
          </div>
          
          <ProgressBar 
            currentStep={2}
            totalSteps={3}
            stepLabels={['Cart', 'Checkout', 'Confirmation']}
          />
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">Secure Checkout</h1>
            <p className="text-xl text-gray-600">
              Complete your order to get your handcrafted treasures
            </p>
          </div>

          <div className={`grid lg:grid-cols-3 gap-8 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                {/* Guest Checkout Option */}
                {!user && (
                  <div className="mb-8 p-6 rounded-2xl" style={{ background: 'linear-gradient(90deg, #e0f7fa 60%, #f3e8ff 100%)' }}>
                    <h3 className="text-xl font-bold text-accent mb-4">
                      Quick Checkout Options
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleGuestCheckout}
                        className="flex-1 bg-white border-2 border-cyan-400 hover:bg-cyan-50 text-cyan-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
                      >
                        <i className="ri-user-line w-5 h-5 flex items-center justify-center mr-2"></i>
                        Continue as Guest
                      </button>
                      <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="flex-1 bg-white border-2 border-indigo-400 hover:bg-indigo-50 text-indigo-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
                      >
                        <i className="ri-login-box-line w-5 h-5 flex items-center justify-center mr-2"></i>
                        Sign In / Sign Up
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-accent flex items-center gap-3">
                      <i className="ri-contacts-line w-6 h-6 flex items-center justify-center"></i>
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your email"
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                              formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="First name"
                          />
                          {formErrors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                              formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Last name"
                          />
                          {formErrors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                            formErrors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your phone number"
                        />
                        {formErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-accent flex items-center gap-3">
                      <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center"></i>
                      Shipping Address
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                            formErrors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your address"
                        />
                        {formErrors.address && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                              formErrors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="City"
                          />
                          {formErrors.city && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                            State *
                          </label>
                          <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 pr-8 ${
                              formErrors.state ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select State</option>
                            <option value="rajasthan">Rajasthan</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="gujarat">Gujarat</option>
                            <option value="delhi">Delhi</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="uttar-pradesh">Uttar Pradesh</option>
                          </select>
                          {formErrors.state && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                              formErrors.zipCode ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="ZIP Code"
                          />
                          {formErrors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-accent flex items-center gap-3">
                      <i className="ri-secure-payment-line w-6 h-6 flex items-center justify-center"></i>
                      Payment Method
                    </h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-300 hover:border-primary">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-primary"
                        />
                        <div className="flex items-center gap-3">
                          <i className="ri-bank-card-line w-6 h-6 flex items-center justify-center text-primary"></i>
                          <span className="font-semibold">Credit / Debit Card</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-300 hover:border-primary">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-primary"
                        />
                        <div className="flex items-center gap-3">
                          <i className="ri-smartphone-line w-6 h-6 flex items-center justify-center text-primary"></i>
                          <span className="font-semibold">UPI Payment</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-300 hover:border-primary">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-primary"
                        />
                        <div className="flex items-center gap-3">
                          <i className="ri-money-dollar-circle-line w-6 h-6 flex items-center justify-center text-primary"></i>
                          <span className="font-semibold">Cash on Delivery</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-xl font-bold py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl ${
                      isSubmitting 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-800 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Order...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <i className="ri-secure-payment-line w-6 h-6 flex items-center justify-center"></i>
                        Complete Order - ₹{total.toLocaleString()}
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-xl sticky top-8">
                <h3 className="text-2xl font-bold mb-6 text-accent">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-accent text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-primary">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t-2 border-gray-200 pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Subtotal</span>
                    <span className="text-lg font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Shipping</span>
                    <span className="text-lg font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Tax (18%)</span>
                    <span className="text-lg font-semibold">₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <i className="ri-shield-check-line w-6 h-6 flex items-center justify-center text-green-600 mx-auto mb-1"></i>
                    <div className="text-xs font-medium text-green-700">256-bit SSL</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <i className="ri-customer-service-line w-6 h-6 flex items-center justify-center text-blue-600 mx-auto mb-1"></i>
                    <div className="text-xs font-medium text-blue-700">24/7 Support</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <i className="ri-refresh-line w-6 h-6 flex items-center justify-center text-yellow-600 mx-auto mb-1"></i>
                    <div className="text-xs font-medium text-yellow-700">Easy Returns</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <i className="ri-truck-line w-6 h-6 flex items-center justify-center text-purple-600 mx-auto mb-1"></i>
                    <div className="text-xs font-medium text-purple-700">Free Shipping</div>
                  </div>
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
    </>
  );

}
