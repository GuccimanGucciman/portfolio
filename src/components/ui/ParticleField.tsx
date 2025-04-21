'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

interface ParticleFieldProps {
  particleCount?: number;
  speed?: number;
  minSize?: number;
  maxSize?: number;
  responsiveness?: number;
}

export default function ParticleField({
  particleCount = 40,
  speed = 0.2,
  minSize = 2,
  maxSize = 5,
  responsiveness = 100,
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    color: string;
    opacity: number;
  }>>([]);

  // Initialize particles on mount and when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });

        const colorOptions = [
          'rgba(var(--color-primary), 0.7)',
          'rgba(var(--color-secondary), 0.5)',
          'rgba(var(--color-accent), 0.6)',
          'rgba(255, 255, 255, 0.3)'
        ];

        // Generate random particles
        const newParticles = Array.from({ length: particleCount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          size: minSize + Math.random() * (maxSize - minSize),
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
          opacity: 0.1 + Math.random() * 0.4
        }));

        setParticles(newParticles);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [particleCount, minSize, maxSize, speed]);

  // Animation frame for particle movement
  useEffect(() => {
    if (!containerRef.current || particles.length === 0) return;

    let animationFrameId: number;
    const { width, height } = dimensions;

    const animate = () => {
      setParticles(currentParticles => {
        return currentParticles.map(particle => {
          let { x, y, vx, vy } = particle;
          const { size, color, opacity } = particle;
          
          // Move particle
          x += vx;
          y += vy;
          
          // Bounce off edges
          if (x < 0 || x > width) vx = -vx;
          if (y < 0 || y > height) vy = -vy;
          
          // Mouse influence - gentle attraction/repulsion
          if (mousePosition.x && mousePosition.y) {
            const dx = mousePosition.x - x;
            const dy = mousePosition.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < responsiveness) {
              // Normalize direction vector
              const nx = dx / distance;
              const ny = dy / distance;
              
              // Apply subtle attraction
              vx += nx * 0.02;
              vy += ny * 0.02;
              
              // Limit max velocity
              const maxVel = 2;
              const vel = Math.sqrt(vx * vx + vy * vy);
              if (vel > maxVel) {
                vx = (vx / vel) * maxVel;
                vy = (vy / vel) * maxVel;
              }
            }
          }
          
          return { x, y, vx, vy, size, color, opacity };
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, mousePosition, particles, responsiveness]);

  if (particles.length === 0) return null;

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          animate={{
            x: particle.x,
            y: particle.y,
            scale: [1, 1.1, 1],
            opacity: particle.opacity
          }}
          transition={{
            x: { duration: 0.01, ease: "linear" },
            y: { duration: 0.01, ease: "linear" },
            scale: { 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity,
              repeatType: "reverse" 
            },
          }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
}
