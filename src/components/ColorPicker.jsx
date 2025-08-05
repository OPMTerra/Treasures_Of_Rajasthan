import React, { useState } from 'react';

export default function ColorPicker({ colors, selectedColor, onColorSelect }) {
  const [hoveredColor, setHoveredColor] = useState('');

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <h4 className="text-lg font-semibold text-accent">Choose Color</h4>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div 
            className="w-5 h-5 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="font-medium">{selectedColor}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor('')}
            className={`relative w-12 h-12 rounded-full border-4 transition-all duration-300 transform hover:scale-110 ${
              selectedColor === color
                ? 'border-primary shadow-lg scale-110'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            style={{ backgroundColor: color }}
          >
            {selectedColor === color && (
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <i className="ri-check-line w-5 h-5 flex items-center justify-center text-white drop-shadow-lg"></i>
              </div>
            )}
            
            {/* Hover tooltip */}
            {hoveredColor === color && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap z-10">
                {color}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}