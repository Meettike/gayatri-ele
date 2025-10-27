import { useEffect, useState } from "react";

const TransformerAnimation = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const stages = [1, 2, 3, 4, 5];
    stages.forEach((stage, index) => {
      setTimeout(() => {
        setAnimationStage(stage);
      }, index * 600);
    });

    // Add continuous rotation after assembly
    setTimeout(() => {
      setIsRotating(true);
    }, 3500);
  }, []);

  return (
    <div className="relative w-full h-96 flex items-center justify-center perspective-1000">
      <div className={`relative w-80 h-80 transition-transform duration-2000 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
        {/* Base/Core */}
        <div 
          className={`absolute inset-x-12 bottom-8 h-32 metallic-surface rounded-lg transformer-part transition-all duration-500 ${
            animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ animationDelay: '0ms' }}
        >
          <div className="w-full h-full bg-gradient-to-t from-metallic to-metallic-light rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <div className="absolute inset-2 bg-gradient-to-br from-industrial to-secondary rounded border border-metallic-light/30"></div>
            {/* Core breathing effect */}
            <div className={`absolute inset-3 bg-accent/20 rounded transition-all duration-1000 ${animationStage >= 5 ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>

        {/* Primary Coils */}
        <div 
          className={`absolute inset-x-8 bottom-12 h-40 transformer-part transition-all duration-700 ${
            animationStage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
          style={{ animationDelay: '200ms' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-primary to-primary-glow rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="absolute inset-1 rounded-xl border-2 border-accent/30">
              {/* Coil windings visual effect */}
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className={`absolute inset-x-2 h-1 bg-electric/60 rounded-full transition-all duration-300 ${
                    animationStage >= 5 ? 'animate-pulse' : ''
                  }`}
                  style={{ 
                    top: `${12 + i * 18}px`,
                    animationDelay: `${i * 100}ms`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Coils */}
        <div 
          className={`absolute inset-x-6 bottom-16 h-48 transformer-part transition-all duration-700 ${
            animationStage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
          }`}
          style={{ animationDelay: '400ms' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-accent to-electric rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="absolute inset-1 rounded-xl border-2 border-accent/50">
              {/* Secondary windings */}
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i}
                  className={`absolute inset-x-2 h-1 bg-accent-foreground/40 rounded-full transition-all duration-200 ${
                    animationStage >= 5 ? 'animate-pulse' : ''
                  }`}
                  style={{ 
                    top: `${16 + i * 20}px`,
                    animationDelay: `${i * 150}ms`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Terminals */}
        <div 
          className={`absolute top-4 left-4 right-4 h-12 transformer-part transition-all duration-500 ${
            animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          style={{ animationDelay: '600ms' }}
        >
          <div className="flex justify-between items-center h-full">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className={`w-8 h-8 bg-gradient-to-br from-metallic-light to-accent rounded-full shadow-md border-2 border-accent/50 transform transition-all duration-300 hover:scale-110 ${
                  animationStage >= 5 ? 'animate-bounce' : ''
                }`}
                style={{ animationDelay: `${i * 200}ms` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Outer Casing */}
        <div 
          className={`absolute inset-0 border-4 border-metallic rounded-2xl transformer-part transition-all duration-800 ${
            animationStage >= 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ animationDelay: '800ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-industrial/10 to-metallic/20 rounded-2xl">
            {/* Ventilation grilles */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 space-y-1">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-0.5 bg-metallic-light/60 rounded-full transition-all duration-300 ${
                    animationStage >= 5 ? 'animate-pulse' : ''
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                ></div>
              ))}
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 space-y-1">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-4 h-0.5 bg-metallic-light/60 rounded-full transition-all duration-300 ${
                    animationStage >= 5 ? 'animate-pulse' : ''
                  }`}
                  style={{ animationDelay: `${i * 100 + 600}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Energy Flow Indicators */}
        {animationStage >= 5 && (
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-accent rounded-full animate-ping"></div>
            <div className="absolute top-1/2 right-0 w-2 h-2 bg-electric rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        )}
      </div>

      {/* Dynamic floating particles */}
      {animationStage >= 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full animate-bounce"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Magnetic field visualization */}
      {animationStage >= 5 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
          <div className="absolute inset-8 border-2 border-dashed border-accent/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        </div>
      )}
    </div>
  );
};

export default TransformerAnimation;