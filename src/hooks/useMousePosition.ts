'use client';
import { useState, useEffect } from 'react';

/**
 * Hook to track mouse position
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<{ x?: number; y?: number }>({});
  
  useEffect(() => {
    // Skip in SSR environment
    if (typeof window === 'undefined') return;
    
    const updateMousePosition = (e: MouseEvent) => {
      // Return actual pixel coordinates for the custom cursor
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Use passive option for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
}