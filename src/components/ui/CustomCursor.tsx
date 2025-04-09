'use client';

import { useState, useEffect, } from 'react';
import { motion, } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [visible, setVisible] = useState(false);
  const [hoveringClickable, setHoveringClickable] = useState(false);
  const [cursorText, setCursorText] = useState<string>('');
  
  // Force visible cursor on first render
  useEffect(() => {
    // Make cursor visible immediately if we have coordinates
    if (x !== undefined && y !== undefined) {
      setVisible(true);
    }
  }, [x, y]);

  // Handle cursor visibility and interaction states
  useEffect(() => {
    // Track interactive elements - fixed type casting for TypeScript
    const handleElementMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.hasAttribute('data-cursor-hover')) {
        setHoveringClickable(true);
      }
      
      // Get custom text if specified
      const text = target.getAttribute('data-cursor-text');
      if (text) {
        setCursorText(text);
      }
    };
    
    const handleElementMouseLeave = () => {
      setHoveringClickable(false);
      setCursorText('');
    };
    
    // Attach listeners to interactive elements
    const clickableElements = document.querySelectorAll('[data-cursor-hover]');
    clickableElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementMouseEnter);
      element.addEventListener('mouseleave', handleElementMouseLeave);
    });
    
    // Add class to body for native cursor hiding - add !important to ensure it works
    document.body.style.cursor = 'none';
    
    return () => {
      // Cleanup
      clickableElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementMouseEnter);
        element.removeEventListener('mouseleave', handleElementMouseLeave);
      });
      
      document.body.style.cursor = '';
    };
  }, []);

  // For debugging - log cursor coordinates
  useEffect(() => {
    console.log(`Cursor position: x=${x}, y=${y}, visible=${visible}`);
  }, [x, y, visible]);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Simple dot cursor - minimal implementation for reliability */}
      <motion.div
        className="fixed rounded-full bg-white pointer-events-none z-[100]"
        style={{
          width: hoveringClickable ? '24px' : '16px',
          height: hoveringClickable ? '24px' : '16px',
          top: y ? y - (hoveringClickable ? 12 : 8) : 0, 
          left: x ? x - (hoveringClickable ? 12 : 8) : 0,
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 250, 
          damping: 25,
          opacity: { duration: 0.15 }
        }}
      />
      
      {/* Optional text label */}
      {visible && cursorText && (
        <motion.div
          className="fixed flex items-center justify-center px-3 py-1 bg-white text-black text-xs font-medium rounded-full pointer-events-none z-[100]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            top: (y || 0) + 16,
            left: (x || 0) - 16,
          }}
          exit={{ opacity: 0, y: 10 }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
}