'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { ReactNode } from 'react';

export default function MagneticButton({ 
  children, 
  className = '', 
  strength = 30,
  duration = 0.4,
  buttonType = "gradient",
  onClick = () => {}
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  duration?: number;
  buttonType?: "gradient" | "outline" | "default";
  onClick?: () => void;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Reset position when not hovering
  useEffect(() => {
    if (!isHovered) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isHovered]);

  // Calculate the position based on mouse coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const element = e.currentTarget;
    const { width, height, left, top } = element.getBoundingClientRect();
    
    // Calculate center point
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (as a percentage of button size)
    const distanceX = (e.clientX - centerX) / (width / 2);
    const distanceY = (e.clientY - centerY) / (height / 2);
    
    // Apply strength factor to create magnetic effect
    const x = distanceX * strength;
    const y = distanceY * strength;
    
    setPosition({ x, y });
  };
  
  // Button style variations
  const buttonClasses = {
    gradient: "bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white",
    outline: "border-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]",
    default: "bg-[rgb(var(--color-primary))] text-white"
  };
  
  return (
    <motion.button
      className={`relative overflow-hidden px-6 py-3 rounded-full font-medium ${buttonClasses[buttonType]} ${className}`}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
        duration: duration
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      data-cursor-hover
    >
      <motion.span
        className={`absolute inset-0 ${buttonType === 'gradient' ? 'bg-gradient-to-r' : ''} 
        ${buttonClasses[buttonType]} z-0 opacity-80`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1.2 : 0,
          opacity: isHovered ? 0.15 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
      
      <motion.div 
        className="relative z-10"
        animate={{
          y: isHovered ? -2 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}
