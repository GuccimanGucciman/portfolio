'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to track window scroll position with performance optimizations
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollYPercentage, setScrollYPercentage] = useState(0);

  useEffect(() => {
    // Skip in SSR environment
    if (typeof window === 'undefined') return;
    
    // Use requestAnimationFrame for performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);

          // Calculate how far we've scrolled as a percentage
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollHeight > 0) {
            setScrollYPercentage(currentScrollY / scrollHeight);
          }

          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Initial position
    handleScroll();
    
    // Use passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollY, scrollYPercentage };
}