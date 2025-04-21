'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GlowTextProps {
  text: string;
  className?: string;
  glowColor?: string;
  delay?: number;
}

export default function GlowText({ 
  text,
  className = "",
  glowColor = "rgba(var(--color-primary), 0.8)",
  delay = 0
}: GlowTextProps) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  // Initialize array with the correct length
  useEffect(() => {
    letterRefs.current = Array(text.length).fill(null);
  }, [text]);
  
  // Split text into individual letters for animation
  const letters = text.split('');
  
  // Apply glow effect on hover
  const handleMouseMove = (e: React.MouseEvent) => {
    letterRefs.current.forEach((letter) => {
      if (!letter) return;
      
      // Calculate distance between mouse and letter
      const rect = letter.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const letterCenterY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to letter center
      const distanceX = e.clientX - letterCenterX;
      const distanceY = e.clientY - letterCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Maximum distance for glow effect
      const maxDistance = 100;
      
      // Calculate glow intensity based on distance
      let intensity = 1 - Math.min(distance / maxDistance, 1);
      intensity = Math.max(intensity, 0);
      
      // Apply glow effect to letters
      letter.style.textShadow = intensity > 0 
        ? `0 0 ${intensity * 10}px ${glowColor}, 0 0 ${intensity * 15}px ${glowColor}`
        : 'none';
      
      // Subtle scale effect
      letter.style.transform = `scale(${1 + intensity * 0.05})`;
      
      // Adjust color brightness with intensity
      letter.style.transition = 'transform 0.2s ease';
    });
  };
  
  // Reset effects
  const handleMouseLeave = () => {
    letterRefs.current.forEach(letter => {
      if (!letter) return;
      letter.style.textShadow = 'none';
      letter.style.transform = 'scale(1)';
    });
  };
  
  return (
    <motion.span 
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      data-cursor-hover
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          ref={el => { letterRefs.current[index] = el; }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: delay + index * 0.04,
            ease: [0.215, 0.61, 0.355, 1]
          }}
          className="inline-block relative"
          style={{ 
            willChange: 'transform, text-shadow'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
