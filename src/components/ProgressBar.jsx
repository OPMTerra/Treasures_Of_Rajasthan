import React from 'react';

export default function ProgressBar({ currentStep, totalSteps, stepLabels }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-12 bg-white p-6 rounded-2xl shadow-lg">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <i className="ri-shopping-cart-line w-4 h-4 flex items-center justify-center text-white"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-accent">Checkout Process</h3>
            <p className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">{stepLabels[currentStep - 1]}</div>
          <div className="text-sm text-gray-600">{Math.round(progress)}% Complete</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-green-600 via-green-400 to-green-700 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between items-center">
          {stepLabels.map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-primary text-white' 
                  : index === currentStep - 1 
                  ? 'bg-primary-light text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {index < currentStep ? (
                  <i className="ri-check-line w-3 h-3 flex items-center justify-center"></i>
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors duration-300 ${
                index < currentStep 
                  ? 'text-primary' 
                  : index === currentStep - 1 
                  ? 'text-primary-light' 
                  : 'text-gray-500'
              }`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}