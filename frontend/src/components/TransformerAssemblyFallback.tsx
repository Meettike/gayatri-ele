import { useEffect, useState } from 'react';

const TransformerAssemblyFallback = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Background Gradient */}
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
          `,
          animationDuration: '4s'
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        {/* Core Assembly Animation */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ${
            animationPhase >= 0 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <div className="w-32 h-48 bg-gradient-to-b from-slate-600 to-slate-800 rounded-lg shadow-2xl border border-slate-500 animate-pulse" 
               style={{ 
                 boxShadow: '0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)',
                 animationDuration: '3s'
               }} />
        </div>

        {/* Primary Coil */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 delay-1000 ${
            animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          <div className="w-40 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full shadow-lg border-2 border-amber-500 animate-spin" 
               style={{ 
                 animationDuration: '8s',
                 boxShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.2)'
               }} />
        </div>

        {/* Secondary Coil */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 delay-1500 ${
            animationPhase >= 2 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          <div className="w-48 h-6 bg-gradient-to-r from-orange-600 to-orange-800 rounded-full shadow-lg border-2 border-orange-500 animate-spin" 
               style={{ 
                 animationDuration: '10s', 
                 animationDirection: 'reverse',
                 boxShadow: '0 0 20px rgba(249, 115, 22, 0.5), 0 0 40px rgba(249, 115, 22, 0.2)'
               }} />
        </div>

        {/* Tank/Housing */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 delay-2000 ${
            animationPhase >= 3 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <div className="w-56 h-64 bg-gradient-to-b from-slate-700 to-slate-900 rounded-2xl shadow-2xl border border-slate-600 opacity-80" />
        </div>

        {/* Bushings/Insulators */}
        {[0, 1, 2, 3].map((index) => {
          const angle = (index / 4) * 360;
          const radius = 120;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <div
              key={index}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ${
                animationPhase >= 3 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                transitionDelay: `${2500 + index * 200}ms`
              }}
            >
              <div className="w-4 h-16 bg-gradient-to-b from-white to-gray-300 rounded-full shadow-lg border border-gray-400 animate-bounce"
                   style={{ animationDelay: `${index * 0.5}s`, animationDuration: '3s' }} />
            </div>
          );
        })}

        {/* Cooling Fins */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
          const angle = (index / 8) * 360;
          const radius = 140;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <div
              key={index}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ${
                animationPhase >= 3 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
              }`}
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                transitionDelay: `${3000 + index * 100}ms`
              }}
            >
              <div className="w-2 h-24 bg-gradient-to-b from-slate-600 to-slate-800 rounded shadow-md" />
            </div>
          );
        })}

        {/* Electrical Connections */}
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const x = (Math.random() - 0.5) * 200;
          const y = (Math.random() - 0.5) * 200;
          
          return (
            <div
              key={index}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ${
                animationPhase >= 3 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                transitionDelay: `${3500 + index * 150}ms`
              }}
            >
              <div className="w-6 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded shadow-lg border border-yellow-300 animate-pulse" />
            </div>
          );
        })}
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Electric Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-30 animate-ping" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-cyan-500 rounded-full opacity-25 animate-ping" 
             style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-indigo-500 rounded-full opacity-35 animate-ping" 
             style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        {/* Test visibility - bright moving element */}
        <div className="absolute top-10 right-10 w-8 h-8 bg-red-500 rounded-full animate-bounce opacity-80" 
             style={{ animationDuration: '2s' }}>
          <div className="w-full h-full bg-red-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default TransformerAssemblyFallback;
