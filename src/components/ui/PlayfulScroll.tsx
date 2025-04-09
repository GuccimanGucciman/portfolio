'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function PlayfulScroll() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 50, 
    damping: 15 
  });
  
  const lineHeight = useTransform(
    smoothProgress, 
    [0, 1], 
    ['0%', '100%']
  );
  
  const scrollButtonOpacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.1],
    [0, 0, 1]
  );

  // Check for scrollable content
  useEffect(() => {
    const checkScrollableContent = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      setIsVisible(scrollHeight > viewportHeight + 100);
    };
    
    checkScrollableContent();
    window.addEventListener('resize', checkScrollableContent);
    
    return () => window.removeEventListener('resize', checkScrollableContent);
  }, []);
  
  // Scroll to top with smooth animation
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <>
      {isVisible && (
        <motion.div 
          className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Minimalist progress indicator */}
          <div className="h-24 w-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full w-full bg-white/30"
              style={{ height: lineHeight, originY: 0 }}
            />
          </div>
        </motion.div>
      )}
      
      {/* Floating back to top button */}
      <motion.button
        onClick={handleScrollToTop}
        className="fixed right-8 bottom-8 z-40 rounded-full p-2.5 bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
        style={{ opacity: scrollButtonOpacity }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </motion.button>
      
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </>
  );
}