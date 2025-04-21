'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900/80 py-12 border-t border-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Company Information */}
          <div className="col-span-1">
            <Link href="#home" className="inline-block">
              <span className="text-2xl font-bold text-gradient">WebCraft</span>
            </Link>
            <p className="mt-4 !text-white text-base leading-relaxed">
              Custom website development services focused on creating beautiful, functional websites 
              that drive business results.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.linkedin.com/in/gustavbrochmann/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-5 !text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#home" className="text-gray-300 hover:text-white transition-colors text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-300 hover:text-white transition-colors text-base">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="text-gray-300 hover:text-white transition-colors text-base">
                  Website Features
                </Link>
              </li>
              <li>
                <Link href="##process" className="text-gray-300 hover:text-white transition-colors text-base">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors text-base">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-5 !text-white">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#services" className="text-gray-300 hover:text-white transition-colors text-base">
                  Core Website Development
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-white transition-colors text-base">
                  Business Website Solutions
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-white transition-colors text-base">
                  Website Maintenance
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-5 !text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-base">hello@fludo.se</span>
              </li>
              <li className="flex items-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Gothenburg, Sweden</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-300 text-sm">
            © {currentYear} Fludo.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm mt-4 md:mt-0">
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}