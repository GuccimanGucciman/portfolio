'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';

// Define type for navigation items
interface NavItem {
  name: string;
  path: string;
}

// Define the navigation items for a business-focused site
const navItems: NavItem[] = [
  { name: 'Home', path: '#home' },
  { name: 'Services', path: '#services' },
  { name: 'Features', path: '#portfolio' }, // Renamed from Portfolio to Features
  { name: 'Our Process', path: '#process' },
  { name: 'Contact', path: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Handle scroll direction for navbar visibility
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    
    // Determine if should hide based on scroll direction and position
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    // Update scroll position
    setLastScrollY(currentScrollY);
    
    // Update if scrolled past threshold for changing navbar style
    setIsScrolled(currentScrollY > 50);
  });
  
  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Skip for initial load
      if (typeof window === 'undefined') return;
      
      // Find all section elements
      const sections = ['home', 'services', 'portfolio', 'process', 'testimonials', 'contact'];
      
      // Find which section is currently most visible in the viewport
      let mostVisibleSectionId = 'home';
      let maxVisibleHeight = 0;
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - 
                            Math.max(rect.top, 0);
        
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          mostVisibleSectionId = sectionId;
        }
      });
      
      setActiveSection(mostVisibleSectionId);
    };
    
    // Initial check
    handleScroll();
    
    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'backdrop-blur-lg bg-white/90 shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container-fluid mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="relative z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <div className="flex items-center" data-cursor-hover>
              <div className="text-2xl font-bold tracking-tight">
                <span className={`${isScrolled ? 'text-[rgb(var(--text-primary))]' : 'text-[rgb(var(--text-primary))]'}`}>
                  WebCraft
                </span>
                <span className="text-gradient">.</span>
              </div>
            </div>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink 
                  item={item}
                  isActive={activeSection === item.path.substring(1)}
                  isScrolled={isScrolled}
                />
              </li>
            ))}
          </ul>
        </nav>
        
        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <a href="#contact" className="btn-primary">
            Get a Quote
          </a>
        </div>
        
        {/* Mobile menu button */}
        <div className="block md:hidden relative z-50">
          <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} isScrolled={isScrolled} />
        </div>
        
        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isOpen && (
            <MobileMenu 
              navItems={navItems} 
              isOpen={isOpen} 
              setIsOpen={setIsOpen}
              activeSection={activeSection}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

// Define props for NavLink component
interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  isScrolled: boolean;
}

function NavLink({ item, isActive, isScrolled }: NavLinkProps) {
  return (
    <Link 
      href={item.path}
      className={`relative group flex items-center text-sm font-medium px-1 py-2 transition-colors duration-300 ${
        isActive 
          ? isScrolled ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--text-primary))]'
          : isScrolled ? 'text-[rgb(var(--text-secondary))]' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
      }`}
      data-cursor-hover
    >
      {item.name}
      
      {/* Animated underline */}
      {isActive ? (
        <motion.div
          layoutId="navIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))]"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      ) : (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/0 group-hover:bg-[rgb(var(--color-secondary))]/20 transition-colors" />
      )}
    </Link>
  );
}

// Define props for MobileMenuButton component
interface MobileMenuButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isScrolled: boolean;
}

function MobileMenuButton({ isOpen, setIsOpen, isScrolled }: MobileMenuButtonProps) {
  return (
    <button
      className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
      onClick={() => setIsOpen(!isOpen)}
      data-cursor-hover
    >
      <div className="relative w-6 h-6">
        {/* Top bar */}
        <motion.span
          className={`absolute h-0.5 w-6 rounded-full transform ${isScrolled ? 'bg-[rgb(var(--text-primary))]' : 'bg-[rgb(var(--text-primary))]'}`}
          animate={{
            top: isOpen ? '50%' : '25%',
            rotate: isOpen ? '45deg' : '0deg',
            translateY: isOpen ? '-50%' : '0%',
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Middle bar */}
        <motion.span
          className={`absolute top-1/2 h-0.5 w-6 rounded-full transform -translate-y-1/2 ${isScrolled ? 'bg-[rgb(var(--text-primary))]' : 'bg-[rgb(var(--text-primary))]'}`}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Bottom bar */}
        <motion.span
          className={`absolute h-0.5 w-6 rounded-full transform ${isScrolled ? 'bg-[rgb(var(--text-primary))]' : 'bg-[rgb(var(--text-primary))]'}`}
          animate={{
            bottom: isOpen ? '50%' : '25%',
            rotate: isOpen ? '-45deg' : '0deg',
            translateY: isOpen ? '50%' : '0%',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </button>
  );
}

// Define props for MobileMenu component
interface MobileMenuProps {
  navItems: NavItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeSection: string;
}

function MobileMenu({ navItems, isOpen, setIsOpen, activeSection }: MobileMenuProps) {
  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <motion.nav
          className="flex flex-col space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
            >
              <Link
                href={item.path}
                className={`text-2xl font-semibold transition-colors duration-300 ${
                  activeSection === item.path.substring(1) 
                    ? 'text-gradient' 
                    : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
                }`}
                onClick={() => setIsOpen(false)}
                data-cursor-hover
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        
        {/* CTA Button - Mobile */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <a 
            href="#contact" 
            className="btn-primary"
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </a>
        </motion.div>
        
        {/* Social links */}
        <motion.div
          className="absolute bottom-12 flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {/* LinkedIn */}
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors"
            data-cursor-hover
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          
          {/* Facebook */}
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors"
            data-cursor-hover
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          
          {/* Instagram */}
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors"
            data-cursor-hover
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}