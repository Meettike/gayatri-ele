import { useEffect, useState } from 'react';

const Transformer3DAnimation = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const animationCycle = () => {
      // Reset and start new cycle
      setAnimationPhase(0);

      // Phase progression
      const phases = [
        { phase: 1, delay: 1000 },   // Core appears
        { phase: 2, delay: 2000 },   // Primary coil
        { phase: 3, delay: 3000 },   // Secondary coil
        { phase: 4, delay: 4000 },   // Tank/Housing
        { phase: 5, delay: 5000 },   // Bushings
        { phase: 6, delay: 6000 },   // Cooling fins
        { phase: 7, delay: 7000 },   // Connections
        { phase: 8, delay: 8000 },   // Complete assembly
        { phase: 0, delay: 10000 },  // Reset for next cycle
      ];

      phases.forEach(({ phase, delay }) => {
        setTimeout(() => setAnimationPhase(phase), delay);
      });
    };

    // Start first cycle immediately
    animationCycle();

    // Repeat every 12 seconds
    const interval = setInterval(animationCycle, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* 3D Scene Container */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        
        {/* Animated Background */}
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 60%, #1e293b 100%)
            `,
            animationDuration: '6s'
          }}
        />

        {/* 3D Transformer Assembly */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-20">
          <div 
            className="relative scale-50 md:scale-75 lg:scale-100 opacity-30 md:opacity-50 lg:opacity-100"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(10deg) rotateY(0deg)',
              animation: 'float 8s ease-in-out infinite'
            }}
          >

            {/* 1. Core Assembly (Steel Laminations) */}
            <div 
              className={`absolute transition-all duration-2000 ease-out ${
                animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                transform: `translateZ(0px) ${animationPhase >= 1 ? 'translateY(0px)' : 'translateY(-200px)'}`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Core layers */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-b from-slate-600 to-slate-800 rounded-lg border border-slate-500"
                  style={{
                    width: '120px',
                    height: '180px',
                    left: '-60px',
                    top: '-90px',
                    transform: `translateZ(${i * 4}px)`,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                    animation: `coreGlow 4s ease-in-out infinite ${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            {/* 2. Primary Coil (Inner Winding) */}
            <div 
              className={`absolute transition-all duration-2000 ease-out ${
                animationPhase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{
                transform: `translateZ(40px) ${animationPhase >= 2 ? 'translateX(0px)' : 'translateX(-300px)'}`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Coil windings */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-r from-amber-600 to-amber-800 rounded-full border-2 border-amber-500"
                  style={{
                    width: '160px',
                    height: '12px',
                    left: '-80px',
                    top: '-6px',
                    transform: `rotateX(90deg) rotateZ(${i * 30}deg) translateZ(${-60 + i * 10}px)`,
                    boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)',
                    animation: `coilSpin 6s linear infinite ${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            {/* 3. Secondary Coil (Outer Winding) */}
            <div 
              className={`absolute transition-all duration-2000 ease-out ${
                animationPhase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{
                transform: `translateZ(50px) ${animationPhase >= 3 ? 'translateX(0px)' : 'translateX(300px)'}`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Secondary coil windings */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-r from-orange-600 to-orange-800 rounded-full border-2 border-orange-500"
                  style={{
                    width: '200px',
                    height: '10px',
                    left: '-100px',
                    top: '-5px',
                    transform: `rotateX(90deg) rotateZ(${i * 36}deg) translateZ(${-50 + i * 10}px)`,
                    boxShadow: '0 0 15px rgba(249, 115, 22, 0.4)',
                    animation: `coilSpin 8s linear infinite reverse ${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            {/* 4. Tank/Housing */}
            <div 
              className={`absolute transition-all duration-2000 ease-out ${
                animationPhase >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{
                transform: `translateZ(60px) ${animationPhase >= 4 ? 'translateY(0px)' : 'translateY(-400px)'}`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Tank body */}
              <div
                className="absolute bg-gradient-to-b from-slate-700 to-slate-900 rounded-2xl border border-slate-600"
                style={{
                  width: '240px',
                  height: '280px',
                  left: '-120px',
                  top: '-140px',
                  transform: 'translateZ(0px)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)',
                  opacity: '0.85'
                }}
              />
              
              {/* Tank sides for 3D effect */}
              <div
                className="absolute bg-gradient-to-r from-slate-800 to-slate-700 rounded-r-2xl"
                style={{
                  width: '40px',
                  height: '280px',
                  left: '120px',
                  top: '-140px',
                  transform: 'rotateY(90deg) translateZ(20px)',
                  opacity: '0.7'
                }}
              />
            </div>

            {/* 5. Bushings (Insulators) */}
            {[0, 1, 2, 3].map((index) => {
              const angle = (index / 4) * 360;
              const radius = 130;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-2000 ease-out ${
                    animationPhase >= 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, 80px) ${
                      animationPhase >= 5 ? 'translateZ(0px)' : `translateZ(${-300 - index * 50}px)`
                    }`,
                    transformStyle: 'preserve-3d',
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  <div
                    className="bg-gradient-to-b from-white to-gray-300 rounded-full border border-gray-400 animate-bounce"
                    style={{
                      width: '12px',
                      height: '60px',
                      marginLeft: '-6px',
                      marginTop: '-30px',
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: '4s'
                    }}
                  />
                </div>
              );
            })}

            {/* 6. Cooling Fins */}
            {[...Array(12)].map((index) => {
              const angle = (index / 12) * 360;
              const radius = 150;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-2000 ease-out ${
                    animationPhase >= 6 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, 70px) rotateZ(${angle}deg) ${
                      animationPhase >= 6 ? 'translateY(0px)' : 'translateY(200px)'
                    }`,
                    transformStyle: 'preserve-3d',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div
                    className="bg-gradient-to-b from-slate-600 to-slate-800 rounded shadow-md"
                    style={{
                      width: '6px',
                      height: '120px',
                      marginLeft: '-3px',
                      marginTop: '-60px',
                      boxShadow: '0 0 5px rgba(59, 130, 246, 0.2)'
                    }}
                  />
                </div>
              );
            })}

            {/* 7. Electrical Connections */}
            {[...Array(8)].map((index) => {
              const positions = [
                { x: -100, y: -120, z: 90 },
                { x: 100, y: -120, z: 90 },
                { x: -100, y: 120, z: 90 },
                { x: 100, y: 120, z: 90 },
                { x: 0, y: -140, z: 90 },
                { x: 0, y: 140, z: 90 },
                { x: -120, y: 0, z: 90 },
                { x: 120, y: 0, z: 90 }
              ];
              
              const pos = positions[index] || { x: 0, y: 0, z: 90 };
              
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-2000 ease-out ${
                    animationPhase >= 7 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                  style={{
                    transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) ${
                      animationPhase >= 7 ? 'translateZ(0px)' : `translateZ(${-200 - index * 30}px)`
                    }`,
                    transformStyle: 'preserve-3d',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded shadow-lg border border-yellow-300 animate-pulse"
                    style={{
                      width: '20px',
                      height: '8px',
                      marginLeft: '-10px',
                      marginTop: '-4px',
                      boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
                      animationDuration: '3s',
                      animationDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
              );
            })}

          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                transform: `translateZ(${Math.random() * 100}px)`
              }}
            />
          ))}
        </div>

        {/* Electric Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500 rounded-full opacity-10 animate-ping" 
               style={{ animationDuration: '8s' }} />
          <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-cyan-400 rounded-full opacity-8 animate-ping" 
               style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-indigo-500 rounded-full opacity-12 animate-ping" 
               style={{ animationDuration: '9s', animationDelay: '1s' }} />
        </div>

      </div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: rotateX(10deg) rotateY(0deg) translateY(0px); }
          25% { transform: rotateX(15deg) rotateY(5deg) translateY(-10px); }
          50% { transform: rotateX(10deg) rotateY(10deg) translateY(0px); }
          75% { transform: rotateX(5deg) rotateY(5deg) translateY(-5px); }
        }
        
        @keyframes coreGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); }
        }
        
        @keyframes coilSpin {
          from { transform: rotateX(90deg) rotateZ(0deg); }
          to { transform: rotateX(90deg) rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Transformer3DAnimation;
