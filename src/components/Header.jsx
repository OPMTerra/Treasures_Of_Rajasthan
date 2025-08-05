import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Header({ onAuthModal }) {
  const { state } = useCart();
  const { user, logout } = useUser();

  return (
    <header className="z-50 texture-overlay" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold transition-colors duration-300" style={{ 
            fontFamily: '"Pacifico", serif',
            color: 'var(--neutral-light)'
          }}>
            Treasures of Rajasthan
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium transition-all duration-300 hover:transform hover:scale-105" style={{ 
              color: 'var(--neutral-light)'
            }}>
              Home
            </Link>
            <Link to="/shop" className="font-medium transition-all duration-300 hover:transform hover:scale-105" style={{ 
              color: 'var(--neutral-light)'
            }}>
              Shop
            </Link>
            <Link to="/about" className="font-medium transition-all duration-300 hover:transform hover:scale-105" style={{ 
              color: 'var(--neutral-light)'
            }}>
              About
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="font-medium" style={{ color: 'var(--neutral-light)' }}>
                  Welcome, {user.email}
                </span>
                <button
                  onClick={logout}
                  className="font-medium transition-all duration-300 hover:transform hover:scale-105"
                  style={{ color: 'var(--neutral-light)' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthModal}
                className="font-medium transition-all duration-300 hover:transform hover:scale-105"
                style={{ color: 'var(--neutral-light)' }}
              >
                Sign In
              </button>
            )}
            
            {/* Cart Icon with Badge */}
            <Link to="/cart" className="relative">
              <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110" style={{ color: 'var(--neutral-light)' }}>
                <i className="ri-shopping-cart-line w-6 h-6 flex items-center justify-center"></i>
              </div>
              {state.itemCount > 0 && (
                <div className="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--error)' }}>
                  {state.itemCount}
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}