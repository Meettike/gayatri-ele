// Smooth scroll utility for navigation
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Handle hash navigation on page load
export const handleHashNavigation = () => {
  const hash = window.location.hash;
  if (hash) {
    const sectionId = hash.replace('#', '');
    // Small delay to ensure page is loaded
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  }
};

// Navigate to homepage section
export const navigateToHomeSection = (sectionId: string) => {
  // If we're already on homepage, just scroll
  if (window.location.pathname === '/') {
    scrollToSection(sectionId);
  } else {
    // Navigate to homepage with hash
    window.location.href = `/#${sectionId}`;
  }
};
