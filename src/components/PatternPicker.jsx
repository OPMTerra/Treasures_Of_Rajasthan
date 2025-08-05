import React, { useState } from 'react';

export default function PatternPicker({ patterns, selectedPattern, onPatternSelect }) {
  const [hoveredPattern, setHoveredPattern] = useState('');
  const selectedPatternName = patterns.find(p => p.id === selectedPattern)?.name || '';

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <h4 className="text-lg font-semibold text-accent">Choose Pattern</h4>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <i className="ri-palette-line w-5 h-5 flex items-center justify-center text-primary"></i>
          <span className="font-medium">{selectedPatternName}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => onPatternSelect(pattern.id)}
            onMouseEnter={() => setHoveredPattern(pattern.id)}
            onMouseLeave={() => setHoveredPattern('')}
            className={`relative p-4 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 bg-white ${
              selectedPattern === pattern.id
                ? 'border-primary shadow-lg scale-105'
                : 'border-gray-200 hover:border-primary/50'
            }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <img 
                  src={pattern.preview} 
                  alt={pattern.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm font-medium text-accent">{pattern.name}</div>
            </div>
            
            {selectedPattern === pattern.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <i className="ri-check-line w-4 h-4 flex items-center justify-center text-white"></i>
              </div>
            )}
            
            {/* Hover effect */}
            {hoveredPattern === pattern.id && (
              <div className="absolute inset-0 bg-primary/10 rounded-2xl"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}