'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define types
interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  pinned?: boolean;
  height?: string;
  as?: React.ElementType;
  fadeIn?: boolean;
  fadeThreshold?: [number, number];
  scaleOnScroll?: boolean;
  parallaxFactor?: number;
}

interface HorizontalScrollProps {
  children: React.ReactNode;
  id?: string;
  width?: string;
  backgroundColor?: string;
}

// AppleSection component
export function AppleSection({ 
  children, 
  id, 
  className = "", 
  pinned = false,
  height = "100vh", 
  as: Component = "section",
  fadeIn = false,
  fadeThreshold = [0, 0.2],
  scaleOnScroll = false,
  parallaxFactor = 0
}: SectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Calculate opacity based on scroll position
  const opacity = useTransform(
    scrollYProgress,
    fadeThreshold,
    [0, 1]
  );
  
  // Calculate scale based on scroll position
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleOnScroll ? [0.95, 1, 1] : [1, 1, 1]
  );
  
  // Calculate parallax effect
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxFactor, 0]
  );
  
  // Intersection observer to detect when element is in view
  useEffect(() => {
    if (!fadeIn) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, [fadeIn]);
  
  const containerStyles = pinned 
    ? { height, position: "relative" as const } 
    : {};
  
  const sectionStyles = pinned
    ? { 
        position: "sticky" as const, 
        top: 0, 
        height: "100vh", 
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center" 
      }
    : {};
    
  return (
    <div style={containerStyles} id={id}>
      <Component
        ref={sectionRef}
        className={className}
        style={sectionStyles}
      >
        <motion.div
          style={{ 
            opacity: fadeIn ? opacity : 1, 
            scale,
            y
          }}
          initial={{ opacity: fadeIn ? 0 : 1 }}
          animate={{ opacity: isVisible || !fadeIn ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </Component>
    </div>
  );
}

// RevealContent component
export function RevealContent({ 
  children, 
  delay = 0,
  direction = "up" 
}: { 
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const initialTransform = {
    up: { y: 30, opacity: 0 },
    down: { y: -30, opacity: 0 },
    left: { x: 30, opacity: 0 },
    right: { x: -30, opacity: 0 }
  };
  
  return (
    <motion.div
      initial={initialTransform[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// GSAP-powered horizontal scroll implementation with improved slide spacing and transparent background
export function HorizontalScroll({
  children,
  id,
  width = "300vw",
  backgroundColor = "transparent" // Changed to transparent
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Wait for component to mount
    setLoaded(true);
  }, []);

  // Set up GSAP ScrollTrigger for horizontal scrolling
  useEffect(() => {
    if (!loaded) return;

    // Get current refs
    const container = containerRef.current;
    const horizontal = horizontalRef.current;

    if (!container || !horizontal) return;

    // Get the actual width of the horizontal content
    const horizontalWidth = horizontal.scrollWidth;
    const containerWidth = container.offsetWidth;
    const distanceToScroll = horizontalWidth - containerWidth;

    // Create the scroll animation with improved speed and responsiveness
    const scrollTween = gsap.to(horizontal, {
      x: -distanceToScroll,
      ease: "none", // Linear easing for direct response to scroll
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${distanceToScroll * 0.6}`, // Reduced scroll distance for faster scrolling
        pin: true, // Pin the section during scrolling
        anticipatePin: 1, // Improve pin performance
        scrub: 0.2, // Reduced scrub value for snappier response
        invalidateOnRefresh: true, // Recalculate on resize
      }
    });

    // Clean up ScrollTrigger on component unmount
    return () => {
      if (scrollTween && scrollTween.scrollTrigger) {
        scrollTween.scrollTrigger.kill();
      }
    };
  }, [loaded]);

  return (
    <div 
      ref={containerRef} 
      id={id}
      className="relative"
      style={{ 
        height: "100vh", // Ensures the container takes full viewport height
        overflow: "hidden" // Hide overflow while pinned
      }}
    >
      {/* Progress indicator for horizontal scroll */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30 pointer-events-none">
        <div className="h-1.5 bg-white/10 rounded-full w-40 overflow-hidden shadow-md">
          <motion.div 
            className="h-full bg-white/90 rounded-full"
            style={{
              scaleX: useTransform(
                useScroll({ target: containerRef }).scrollYProgress,
                [0, 1],
                [0, 1]
              ),
              transformOrigin: "left"
            }}
          />
        </div>
      </div>
      
      {/* No dark background overlay to allow abstract background to show through */}
      
      {/* Horizontal container with flex layout */}
      <div
        ref={horizontalRef}
        className="horizontal-scroll-content"
        style={{
          display: "flex",
          height: "100vh",
          position: "relative",
          width, // Set to the specified width
          gap: "0", // Remove any gap
        }}
      >
        {/* Wrap children with proper spacing */}
        {React.Children.map(children, (child) => (
          <div className="slide-wrapper" style={{ width: "85vw" }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

// Element that responds to scroll position with transform
export function ParallaxItem({
  children, 
  scrollFactor = 0.2,
  threshold = [0, 1],
  outputRange
}: { 
  children: React.ReactNode;
  scrollFactor?: number;
  threshold?: [number, number];
  outputRange?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Calculate the transform based on scroll position
  const y = useTransform(
    scrollYProgress, 
    threshold, 
    outputRange || [scrollFactor * 100, scrollFactor * -100]
  );
  
  return (
    <motion.div ref={ref} style={{ y }} className="will-change-transform">
      {children}
    </motion.div>
  );
}