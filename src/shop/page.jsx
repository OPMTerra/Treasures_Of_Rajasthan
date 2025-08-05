import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import AuthModal from '../components/AuthModal';
import { products, categories, materials, priceRanges } from '../data/products';
import { useUser } from '../context/UserContext';

export default function Shop() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: '',
    materials: []
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { login } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedFilters.categories.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.categories.includes(product.category)
      );
    }

    if (selectedFilters.materials.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.materials.includes(product.material)
      );
    }

    if (selectedFilters.priceRange) {
      const range = priceRanges.find(r => r.label === selectedFilters.priceRange);
      if (range) {
        filtered = filtered.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
    }

    setFilteredProducts(filtered);
  }, [selectedFilters]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAuth = (email, isSignUp) => {
    login(email);
  };

  return (
    <>
      <Header onAuthModal={() => setIsAuthModalOpen(true)} />
      
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        <div className="relative bg-gradient-to-r from-primary/10 via-neutral/20 to-primary/10 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-accent mb-4">
              Handicraft Collection
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover authentic handcrafted treasures from skilled artisans across India
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center justify-center w-full bg-white border-2 border-primary text-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-md"
            >
              <i className="ri-filter-3-line w-5 h-5 flex items-center justify-center mr-2"></i>
              {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className={`lg:block ${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
              <FilterSidebar
                filters={{
                  categories,
                  priceRanges,
                  materials
                }}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
                <div>
                  <h2 className="text-2xl font-bold text-accent mb-2">
                    {filteredProducts.length} Products Found
                  </h2>
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {products.length} handcrafted items
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <i className="ri-award-line w-5 h-5 flex items-center justify-center text-primary"></i>
                  <span className="text-sm text-gray-600">Authenticity Guaranteed</span>
                </div>
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="transition-all duration-300 bg-white rounded-xl shadow-xl"
                    style={{ 
                      transitionDelay: `${index * 50}ms`,
                      opacity: isVisible ? 1 : 0
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <div className="text-8xl mb-6 opacity-20">🔍</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Try adjusting your filters or browse our full collection to discover amazing handcrafted items
                  </p>
                  <button
                    onClick={() => {
                      setSelectedFilters({
                        categories: [],
                        priceRange: '',
                        materials: []
                      });
                    }}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300 shadow-md"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
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