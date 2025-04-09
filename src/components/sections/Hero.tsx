'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, AnimatePresence, } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function Hero() {
  const mousePosition = useMousePosition();
  const containerRef = useRef<HTMLElement>(null);
  
  // Mouse-driven parallax effect for hero content
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  
  // Text animation state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const businessSolutions = [
    "Grow Your Online Presence", 
    "Convert Visitors Into Customers", 
    "Elevate Your Brand Experience",
    "Streamline Your Business Operations"
  ];
  
  // Smooth spring animation for mouse parallax
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const springX = useSpring(useMotionValue(0), springConfig);
  const springY = useSpring(useMotionValue(0), springConfig);
  
  // Mouse movement effect (reduced intensity)
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate offset from center (normalized between -1 and 1)
      const offsetX = ((mousePosition.x ?? 0) - centerX) / (rect.width / 2);
      const offsetY = ((mousePosition.y ?? 0) - centerY) / (rect.height / 2);
      
      // Update spring values with reduced intensity
      springX.set(offsetX * 10);
      springY.set(offsetY * 10);
    };
    
    const updateMouseParallax = () => {
      setMouseParallax({
        x: springX.get(),
        y: springY.get()
      });
      
      requestAnimationFrame(updateMouseParallax);
    };
    
    const animationFrame = requestAnimationFrame(updateMouseParallax);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [mousePosition, springX, springY]);
  
  // Text role animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);
      
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % businessSolutions.length);
        setTextVisible(true);
      }, 500); // Time between fade out and fade in
      
    }, 3000); // Total time each value is displayed
    
    return () => clearInterval(interval);
  }, [businessSolutions.length]);
  
  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background subtle effects */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white to-gray-50">
        {/* Abstract gradient blobs with subtle parallax effect */}
        <motion.div 
          className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-[rgb(var(--color-primary))] to-transparent opacity-10 rounded-full blur-3xl"
          animate={{
            x: mouseParallax.x * -0.5,
            y: mouseParallax.y * -0.5,
            scale: [1, 1.03, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 8, repeat: Infinity, repeatType: "reverse" },
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-[rgb(var(--color-secondary))] to-transparent opacity-10 rounded-full blur-3xl"
          animate={{
            x: mouseParallax.x * 0.5,
            y: mouseParallax.y * 0.5,
            scale: [1, 1.05, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 },
          }}
        />
      </div>
      
      <div className="container-fluid relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero text content */}
          <motion.div 
            className="w-full lg:w-7/12 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-[rgb(var(--text-primary))]"
              style={{
                x: mouseParallax.x * 0.3,
                y: mouseParallax.y * 0.3,
              }}
            >
              Custom Websites <br />
              That <span className="text-gradient">Drive</span> Results
            </motion.h1>
            
            <motion.div 
              className="text-xl md:text-2xl text-[rgb(var(--color-primary))] h-8 overflow-hidden"
              style={{
                x: mouseParallax.x * 0.5,
                y: mouseParallax.y * 0.5,
              }}
            >
              <AnimatePresence mode="wait">
                {textVisible && (
                  <motion.p
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="font-semibold"
                  >
                    {businessSolutions[currentTextIndex]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.p 
              className="text-lg text-[rgb(var(--text-secondary))] max-w-lg mx-auto lg:mx-0"
              style={{
                x: mouseParallax.x * 0.7,
                y: mouseParallax.y * 0.7,
              }}
            >
              We build beautiful, responsive websites with modern technologies that help your business stand out. 
              More than just a pretty design, our sites are strategically crafted to convert visitors into loyal customers.
            </motion.p>
            
            {/* CTA buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                x: mouseParallax.x * 0.9,
                y: mouseParallax.y * 0.9,
              }}
            >
              <Link href="#services" passHref>
                <motion.span
                  className="btn-primary px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor-hover
                >
                  Explore Services
                </motion.span>
              </Link>
              
              <Link href="#contact" passHref>
                <motion.span
                  className="btn-secondary px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor-hover
                >
                  Get a Free Quote
                </motion.span>
              </Link>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              className="mt-12 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">Why choose our web development services:</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[rgb(var(--color-primary))]">100%</span>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">Responsive Design</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[rgb(var(--color-primary))]">SEO</span>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">Optimized</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[rgb(var(--color-primary))]">Fast</span>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">Loading Speed</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[rgb(var(--color-primary))]">24/7</span>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">Support</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero image area - mockups of different screens */}
          <motion.div 
            className="w-full lg:w-5/12 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="perspective-container">
              <motion.div 
                className="card-3d w-full aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl"
                style={{
                  rotateY: mouseParallax.x * 0.03,
                  rotateX: mouseParallax.y * -0.03,
                  z: 100,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Main website mockup */}
                <div className="relative h-full w-full bg-white">
                  <Image 
                    src="/window.svg" 
                    alt="Website design mockup" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    className="rounded-2xl"
                  />
                  
                  {/* Website UI elements */}
                  <div className="absolute inset-0 p-4">
                    {/* Browser chrome mockup */}
                    <div className="h-full w-full rounded-lg bg-white flex flex-col">
                      <div className="h-8 bg-gray-50 rounded-t-lg flex items-center px-4 border-b border-gray-100">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="w-32 h-4 bg-gray-100 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-hidden relative">
                        <div className="h-full w-full bg-gradient-to-br from-gray-50 to-white"></div>
                        
                        {/* Website mockup content */}
                        <motion.div 
                          className="absolute inset-0 p-6 flex flex-col"
                          animate={{ 
                            y: [0, -200, 0],
                          }}
                          transition={{ 
                            duration: 20, 
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                          }}
                        >
                          {/* Hero section mockup */}
                          <div className="h-36 mb-6 rounded-lg bg-white shadow-sm flex overflow-hidden">
                            <div className="w-1/2 p-4 flex flex-col justify-center">
                              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                              <div className="h-6 w-16 bg-[rgb(var(--color-primary))]/30 rounded"></div>
                            </div>
                            <div className="w-1/2 bg-gray-100 relative">
                              <div className="absolute w-20 h-20 bg-[rgb(var(--color-secondary))]/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                          </div>
                          
                          {/* Features section mockup */}
                          <div className="flex gap-3 mb-6">
                            <div className="h-24 flex-1 rounded-lg bg-white shadow-sm p-3">
                              <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-primary))]/10 mb-2 flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-[rgb(var(--color-primary))]/30"></div>
                              </div>
                              <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div className="h-24 flex-1 rounded-lg bg-white shadow-sm p-3">
                              <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-primary))]/10 mb-2 flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-[rgb(var(--color-primary))]/30"></div>
                              </div>
                              <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div className="h-24 flex-1 rounded-lg bg-white shadow-sm p-3">
                              <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-primary))]/10 mb-2 flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-[rgb(var(--color-primary))]/30"></div>
                              </div>
                              <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                          
                          {/* Services section mockup */}
                          <div className="h-48 mb-6 rounded-lg bg-white shadow-sm p-4">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="grid grid-cols-3 gap-3 h-32">
                              <div className="bg-gray-100 rounded-lg"></div>
                              <div className="bg-gray-100 rounded-lg"></div>
                              <div className="bg-gray-100 rounded-lg"></div>
                            </div>
                          </div>
                          
                          {/* Feature showcase mockup */}
                          <div className="h-32 mb-6 rounded-lg bg-white shadow-sm p-4">
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-secondary))]/20 flex-shrink-0"></div>
                              <div className="ml-3 flex-1">
                                <div className="h-2 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-2/3 mb-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Contact form mockup */}
                          <div className="h-40 rounded-lg bg-white shadow-sm p-4">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="space-y-3">
                              <div className="h-8 bg-gray-100 rounded"></div>
                              <div className="h-8 bg-gray-100 rounded"></div>
                              <div className="h-14 bg-gray-100 rounded"></div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Mobile mockup - positioned to overlap slightly */}
            <motion.div
              className="absolute -bottom-10 -right-10 w-32 h-56 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hidden lg:block"
              style={{
                x: mouseParallax.x * -1.5,
                y: mouseParallax.y * -1.5,
              }}
            >
              {/* Mobile screen */}
              <div className="absolute inset-1 rounded-xl bg-gray-50 overflow-hidden">
                {/* Mobile header */}
                <div className="h-4 bg-white border-b border-gray-100 flex justify-center items-center">
                  <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                </div>
                
                {/* Mobile content */}
                <motion.div 
                  className="p-2"
                  animate={{ 
                    y: [0, -100, 0],
                  }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full h-12 bg-white rounded-lg shadow-sm mb-2"></div>
                  <div className="w-full h-20 bg-white rounded-lg shadow-sm mb-2"></div>
                  <div className="w-full h-16 bg-white rounded-lg shadow-sm mb-2"></div>
                  <div className="w-full h-24 bg-white rounded-lg shadow-sm"></div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Tablet mockup - positioned to the left */}
            <motion.div
              className="absolute -top-5 -left-16 w-48 h-32 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hidden lg:block"
              style={{
                x: mouseParallax.x * 1.2,
                y: mouseParallax.y * 1.2,
                rotate: -10,
              }}
            >
              {/* Tablet screen */}
              <div className="absolute inset-1 rounded-xl bg-gray-50 overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="h-8 bg-white border-b border-gray-100 flex items-center px-3">
                    <div className="w-12 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex-1 p-2 grid grid-cols-2 gap-2">
                    <div className="bg-white rounded shadow-sm"></div>
                    <div className="bg-white rounded shadow-sm"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            className="text-[rgb(var(--text-secondary))]"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}