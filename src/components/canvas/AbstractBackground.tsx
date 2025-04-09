'use client';

import { useRef, useEffect } from 'react';

export default function AbstractBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!ctx || !canvas) {
      console.error('Canvas or context is null');
      return;
    }
    
    // Business-friendly colors
    const primaryColor = '41, 128, 185'; // Professional blue
    const secondaryColor = '26, 188, 156'; // Fresh teal
    
    // Resize handling with proper pixel ratio support
    const handleResize = () => {
      if (!ctx || !canvas) {
        console.error('Canvas or context is null');
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Reset scaling to avoid cumulative scaling
      
      drawBackground(); // Redraw after resizing
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    function drawBackground() {
      if (!ctx || !canvas) {
        console.error('Canvas or context is null');
        return;
      }

      // Fill with a solid white background
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // White background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Draw subtle grid lines
      drawGrid(width, height);
      
      // Draw light accent shapes
      drawAccentShapes(width, height);
      
      // Add some very light dots for texture
      drawDots(width, height);
    }
    
    function drawGrid(width: number, height: number) {
      if (!ctx || !canvas) {
        console.error('Canvas or context is null');
        return;
      }

      ctx.strokeStyle = 'rgba(236, 240, 241, 0.5)'; // Very light gray
      ctx.lineWidth = 1;
      
      // Draw horizontal lines
      const gridSize = 50;
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    }
    
    function drawAccentShapes(width: number, height: number) {
      if (!ctx || !canvas) {
        console.error('Canvas or context is null');
        return;
      }

      // Draw a few subtle accent shapes
      const shapes = [
        {
          type: 'circle',
          x: width * 0.85,
          y: height * 0.15,
          radius: width * 0.2,
          color: primaryColor,
          opacity: 0.02
        },
        {
          type: 'circle',
          x: width * 0.15,
          y: height * 0.8,
          radius: width * 0.15,
          color: secondaryColor,
          opacity: 0.02
        },
        {
          type: 'polygon',
          x: width * 0.75,
          y: height * 0.75,
          radius: width * 0.1,
          sides: 6,
          color: primaryColor,
          opacity: 0.015
        }
      ];
      
      // Draw each shape with very subtle opacity
      shapes.forEach(shape => {
        if (shape.type === 'circle') {
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${shape.color}, ${shape.opacity})`;
          ctx.fill();
        } else if (shape.type === 'polygon') {
          ctx.beginPath();
          const sides = shape.sides ?? 3; // Default to a triangle if sides is undefined
          
          for (let i = 0; i <= sides; i++) {
            const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
            const x = shape.x + shape.radius * Math.cos(angle);
            const y = shape.y + shape.radius * Math.sin(angle);
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.fillStyle = `rgba(${shape.color}, ${shape.opacity})`;
          ctx.fill();
        }
      });
    }
    
    function drawDots(width: number, height: number) {
      if (!ctx || !canvas) {
        console.error('Canvas or context is null');
        return;
      }

      // Create a texture with small dots
      const dotCount = Math.floor((width * height) / 5000);
      
      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 1 + 0.5; // 0.5-1.5px dots
        const color = Math.random() > 0.7 ? primaryColor : secondaryColor;
        const opacity = Math.random() * 0.03 + 0.01; // Very subtle dots
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      }
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-white" /> {/* Solid white background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}