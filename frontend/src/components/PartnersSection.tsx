import { useEffect, useState } from "react";
import { partners } from "@/data/partners";
import { ExternalLink } from "lucide-react";

const PartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('partners-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Duplicate the partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section 
      id="partners-section" 
      className="py-20 bg-gradient-to-br from-background via-industrial/20 to-background overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-accent mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent"></div>
            <span className="text-sm font-semibold tracking-wide uppercase">
              Trusted Partners
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              Industry Leaders
            </span>
            <br />
            <span className="text-accent">Trust Our Solutions</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're proud to work with industry-leading companies who trust our 
            electrical solutions for their critical operations and projects.
          </p>
        </div>

        {/* Infinite Scrolling Partners */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
          
          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div 
              className={`flex space-x-12 ${isVisible ? 'animate-infinite-scroll' : ''}`}
              style={{
                width: `${duplicatedPartners.length * 240}px`,
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-56 group"
                >
                  <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:bg-card/90 transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer relative">
                    {partner.website && partner.website !== "#" && (
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="h-4 w-4 text-accent" />
                      </div>
                    )}
                    <div className="flex items-center justify-center h-20 mb-4 bg-gradient-to-br from-muted/20 to-muted/10 rounded-lg">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'block';
                        }}
                      />
                      <div className="text-center p-2 hidden">
                        <div className="text-2xl font-bold text-accent mb-1">
                          {partner.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {partner.name.split(' ').length > 1 ? partner.name.split(' ').slice(-1)[0] : partner.name}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-center text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                      {partner.name}
                    </h3>
                    {partner.industry && (
                      <p className="text-center text-xs text-muted-foreground mt-1">
                        {partner.industry}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
