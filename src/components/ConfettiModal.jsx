import React, { useEffect, useState } from 'react';

export default function ConfettiModal({ isOpen, onClose }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Dopamine hack: Trigger confetti animation
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleShare = (platform) => {
    const message = "Just ordered amazing handcrafted items from Treasures of Rajasthan! 🎉";
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
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content text-center" onClick={(e) => e.stopPropagation()}>
        <div className={`confetti-animation ${showConfetti ? 'visible' : ''}`}>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your beautiful handcrafted items are on their way!
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Share your excitement!
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleShare('twitter')}
              className="btn btn-primary flex items-center gap-2"
            >
              <i className="ri-twitter-fill"></i>
              Twitter
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="btn btn-primary flex items-center gap-2"
            >
              <i className="ri-facebook-fill"></i>
              Facebook
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="btn btn-primary flex items-center gap-2"
            >
              <i className="ri-whatsapp-fill"></i>
              WhatsApp
            </button>
          </div>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-500 mb-4">
            Refer a friend and get 20% off your next order!
          </p>
          <button 
            onClick={onClose}
            className="btn btn-secondary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}