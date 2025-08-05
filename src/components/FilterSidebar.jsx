import React from 'react';

export default function FilterSidebar({ filters, selectedFilters, onFilterChange }) {
  const handleCategoryChange = (category) => {
    const newCategories = selectedFilters.categories.includes(category)
      ? selectedFilters.categories.filter(c => c !== category)
      : [...selectedFilters.categories, category];
    onFilterChange('categories', newCategories);
  };

  const handleMaterialChange = (material) => {
    const newMaterials = selectedFilters.materials.includes(material)
      ? selectedFilters.materials.filter(m => m !== material)
      : [...selectedFilters.materials, material];
    onFilterChange('materials', newMaterials);
  };

  return (
    <div className="lg:w-80 w-full bg-white rounded-xl shadow-lg p-6 h-fit lg:sticky lg:top-6">
      <div className="flex items-center gap-3 mb-6">
        <i className="ri-filter-3-line w-6 h-6 flex items-center justify-center text-primary"></i>
        <h2 className="text-2xl font-bold text-accent">Filters</h2>
      </div>
      
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
          <i className="ri-apps-2-line w-5 h-5 flex items-center justify-center text-primary"></i>
          Categories
        </h3>
        <div className="space-y-3">
          {filters.categories.map(category => (
            <label key={category} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="checkbox"
                checked={selectedFilters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="capitalize text-gray-700 font-medium">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
          <i className="ri-money-rupee-circle-line w-5 h-5 flex items-center justify-center text-primary"></i>
          Price Range
        </h3>
        <div className="space-y-3">
          {filters.priceRanges.map(range => (
            <label key={range.label} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="radio"
                name="priceRange"
                checked={selectedFilters.priceRange === range.label}
                onChange={() => onFilterChange('priceRange', range.label)}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300"
              />
              <span className="text-gray-700 font-medium">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
          <i className="ri-hammer-line w-5 h-5 flex items-center justify-center text-primary"></i>
          Materials
        </h3>
        <div className="space-y-3">
          {filters.materials.map(material => (
            <label key={material} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="checkbox"
                checked={selectedFilters.materials.includes(material)}
                onChange={() => handleMaterialChange(material)}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="capitalize text-gray-700 font-medium">{material}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          onFilterChange('categories', []);
          onFilterChange('priceRange', '');
          onFilterChange('materials', []);
        }}
        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <i className="ri-refresh-line w-5 h-5 flex items-center justify-center"></i>
        Clear All Filters
      </button>
    </div>
  );
}