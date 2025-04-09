'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function InteractiveBackground() {
  const { x: mouseX, y: mouseY } = useMousePosition();
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reactive motion values to animate based on mouse and scroll
  const mouseXSpring = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  
  // Update mouse motion values
  useEffect(() => {
    if (mouseX != null && mouseY != null) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Normalize coordinates to range -1 to 1
      const normalizedX = (mouseX / windowWidth) * 2 - 1;
      const normalizedY = (mouseY / windowHeight) * 2 - 1;
      
      mouseXSpring.set(normalizedX);
      mouseYSpring.set(normalizedY);
    }
  }, [mouseX, mouseY, mouseXSpring, mouseYSpring]);
  
  // Transform mouse position into gradient rotation
  const mouseMotionValues = [mouseXSpring, mouseYSpring];
  const gradientRotation = useTransform(
    mouseMotionValues,
    (latest: number[]) => {
      // Convert mouse position to angle
      return Math.atan2(latest[1], latest[0]) * (180 / Math.PI);
    }
  );
  
  // Transform scroll progress into color intensity
  const primaryOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.5, 0.3, 0.7, 0.5]
  );
  
  // Transform scroll progress into gradient size
  const gradientSize = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['120%', '150%', '130%', '140%']
  );
  
  // Noise pattern movement based on scroll
  const noiseTranslateX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '-5%']
  );
  
  const noiseTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '-8%']
  );
  
  return (
    <div ref={containerRef} className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      {/* Dynamic gradient background */}
      <motion.div 
        className="absolute inset-0 z-[-1]"
        style={{
          background: `radial-gradient(
            circle at ${useTransform(mouseXSpring, x => ((x + 1) / 2) * 100)}% ${useTransform(mouseYSpring, y => ((y + 1) / 2) * 100)}%, 
            rgba(var(--color-primary), ${primaryOpacity}) 0%, 
            rgba(var(--color-secondary), 0.2) 50%, 
            rgba(0, 0, 0, 0) 80%
          )`,
          rotate: gradientRotation,
          scale: 1.5,
          opacity: 0.8
        }}
      />
      
      {/* Secondary reactive gradient */}
      <motion.div 
        className="absolute inset-0 z-[-2]"
        style={{
          background: `radial-gradient(
            ${gradientSize} at ${useTransform(mouseXSpring, x => ((1 - x) / 2) * 100)}% ${useTransform(mouseYSpring, y => ((1 - y) / 2) * 100)}%, 
            rgba(var(--color-secondary), 0.2) 0%, 
            rgba(var(--color-primary), 0.1) 40%, 
            rgba(0, 0, 0, 0) 80%
          )`,
          opacity: 0.6
        }}
      />
      
      {/* Subtle noise texture */}
      <motion.div 
        className="absolute inset-0 z-[-3] bg-noise opacity-[0.03]"
        style={{
          x: noiseTranslateX,
          y: noiseTranslateY,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-[-4] bg-grid opacity-[0.03]" />
      
      {/* Animated shapes that follow mouse */}
      <AnimatedShapes 
        mouseX={mouseXSpring} 
        mouseY={mouseYSpring}
        scrollY={scrollYProgress}
      />
    </div>
  );
}

interface AnimatedShapesProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollY: MotionValue<number>;
}

function AnimatedShapes({ mouseX, mouseY, scrollY }: AnimatedShapesProps) {
  // Create transformations based on mouse position and scroll
  const shape1X = useTransform(mouseX, [-1, 1], ['10%', '-10%']);
  const shape1Y = useTransform(mouseY, [-1, 1], ['5%', '-5%']);
  const shape1Scale = useTransform(scrollY, [0, 1], [0.8, 1.2]);
  const shape1Rotate = useTransform(scrollY, [0, 1], [0, 45]);
  
  const shape2X = useTransform(mouseX, [-1, 1], ['-15%', '15%']);
  const shape2Y = useTransform(mouseY, [-1, 1], ['-10%', '10%']);
  const shape2Scale = useTransform(scrollY, [0, 1], [1.2, 0.8]);
  const shape2Rotate = useTransform(scrollY, [0, 1], [0, -30]);
  
  const shape3X = useTransform(mouseX, [-1, 1], ['5%', '-5%']);
  const shape3Y = useTransform(mouseY, [-1, 1], ['-5%', '5%']);
  const shape3Scale = useTransform(scrollY, [0, 1], [0.9, 1.1]);
  const shape3Rotate = useTransform(scrollY, [0, 1], [0, 15]);
  
  return (
    <>
      {/* Abstract shape 1 */}
      <motion.div 
        className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-[rgba(var(--color-primary),0.05)] to-transparent opacity-30 blur-lg"
        style={{
          x: shape1X,
          y: shape1Y,
          scale: shape1Scale,
          rotate: shape1Rotate
        }}
      />
      
      {/* Abstract shape 2 */}
      <motion.div 
        className="absolute bottom-[15%] left-[5%] w-[25vw] h-[25vw] rounded-full bg-gradient-to-tr from-[rgba(var(--color-secondary),0.05)] to-transparent opacity-20 blur-lg"
        style={{
          x: shape2X,
          y: shape2Y,
          scale: shape2Scale,
          rotate: shape2Rotate
        }}
      />
      
      {/* Abstract shape 3 */}
      <motion.div 
        className="absolute top-[40%] left-[25%] w-[20vw] h-[20vw] rounded-full bg-gradient-to-bl from-[rgba(255,255,255,0.05)] to-transparent opacity-10 blur-lg"
        style={{
          x: shape3X,
          y: shape3Y,
          scale: shape3Scale,
          rotate: shape3Rotate
        }}
      />
    </>
  );
}