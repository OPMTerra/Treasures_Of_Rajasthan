import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SessionProvider } from './context/SessionContext';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Shop from './shop/page';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ProductContent from './product/[id]/ProductContent';
import Confirmation from './pages/confirmation'; // Add this import

function App() {
  return (
    <UserProvider>
      <SessionProvider>
        <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<ProductContent />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </CartProvider>
      </SessionProvider>
    </UserProvider>
  );
}

export default App;