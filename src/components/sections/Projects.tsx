'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HorizontalScroll, RevealContent } from '../ui/AppleScrollEffect';

// Define a proper interface for the Feature item type
interface FeatureItem {
  id: number;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  image: string;
  demoUrl: string;
  primaryFeature: boolean;
}

// Website features data
const websiteFeatures: FeatureItem[] = [
  {
    id: 1,
    title: 'Responsive Design & Mobile Optimization',
    category: 'Design & Usability',
    description: 'Websites that adapt perfectly to any screen size, ensuring your visitors have an exceptional experience whether they\'re on desktop, tablet, or mobile devices.',
    benefits: ['Improved user experience', 'Higher engagement rates', 'Better search engine rankings'],
    image: '/window.svg',
    demoUrl: '#responsive-demo',
    primaryFeature: true,
  },
  {
    id: 2,
    title: 'Interactive Elements & Animations',
    category: 'User Experience',
    description: 'Thoughtful animations and interactive elements that guide users through your content, highlight important information, and create memorable experiences that keep visitors engaged.',
    benefits: ['Increased time on site', 'Improved user engagement', 'Enhanced brand perception'],
    image: '/globe.svg',
    demoUrl: '#interaction-demo',
    primaryFeature: true,
  },
  {
    id: 3,
    title: 'Advanced Contact & Booking Forms',
    category: 'Conversion',
    description: 'Intelligent forms that are easy to complete, reduce friction, and capture the information you need while connecting directly to your email or CRM system.',
    benefits: ['Higher conversion rates', 'Streamlined customer acquisition', 'Automated lead collection'],
    image: '/window.svg',
    demoUrl: '#forms-demo',
    primaryFeature: false,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <div id="portfolio" ref={sectionRef} className="relative">
      {/* Intro header */}
      <div className="py-20 flex flex-col justify-center items-center text-center bg-white">
        <RevealContent>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-[rgb(var(--text-primary))]">
            Website <span className="text-gradient">Features</span>
          </h2>
        </RevealContent>
        <RevealContent delay={0.1}>
          <p className="text-xl text-[rgb(var(--text-secondary))] max-w-lg mx-auto">
            Discover the powerful capabilities we can build into your custom website
          </p>
        </RevealContent>
      </div>
      
      {/* GSAP-powered Horizontal Scroll section */}
      <HorizontalScroll width="280vw" id="portfolio-scroll">
        {websiteFeatures.map((feature) => (
          <FeatureCard 
            key={feature.id}
            feature={feature}
          />
        ))}
      </HorizontalScroll>
      
      {/* Feature showcase */}
      <div className="py-20 bg-white">
        <div className="container-fluid max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-[rgb(var(--text-primary))]">Why These Features Matter</h3>
            <p className="text-[rgb(var(--text-secondary))] max-w-lg mx-auto">
              The right features don&apos;t just make your website look good—they drive real business results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="feature-card p-6 bg-white rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center text-[rgb(var(--color-primary))] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125-1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-[rgb(var(--text-primary))]">Increased Conversions</h4>
              <p className="text-[rgb(var(--text-secondary))]">
                Strategic design elements and intuitive user flows guide visitors toward taking action, whether that&apos;s making a purchase, filling out a form, or booking an appointment.
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card p-6 bg-white rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center text-[rgb(var(--color-primary))] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-[rgb(var(--text-primary))]">Modern User Experience</h4>
              <p className="text-[rgb(var(--text-secondary))]">
                Polished interactions and intuitive navigation create a premium feel that builds trust with your visitors and sets you apart from competitors with outdated websites.
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card p-6 bg-white rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center text-[rgb(var(--color-primary))] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-[rgb(var(--text-primary))]">Performance Optimized</h4>
              <p className="text-[rgb(var(--text-secondary))]">
                Fast-loading websites keep visitors engaged, reduce bounce rates, and rank higher in search results, giving you an edge in today&apos;s competitive online landscape.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA button */}
      <div className="flex justify-center py-16 bg-gray-50 border-t border-gray-100">
        <Link href="#contact" className="pointer-events-auto">
          <motion.div 
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white shadow-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
          >
            Discuss Your Website Needs
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

// Feature card styled for horizontal scroll presentation
function FeatureCard({ feature }: { feature: FeatureItem }) {
  return (
    <div className="min-w-[85vw] h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl p-8 border border-gray-100 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Feature image */}
          <div className="w-full lg:w-1/2 aspect-video relative rounded-lg overflow-hidden shadow-md">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-700 hover:scale-105"
            />
            
            {/* Light gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-primary))]/20 to-transparent" />
            
            {/* Primary feature badge */}
            {feature.primaryFeature && (
              <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold text-[rgb(var(--color-primary))] rounded-full shadow-md">
                Premium Feature
              </div>
            )}
            
            {/* Category badge */}
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-medium text-[rgb(var(--text-secondary))] rounded-full shadow-sm">
              {feature.category}
            </div>
          </div>
          
          {/* Feature details */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-[rgb(var(--text-primary))]">
              {feature.title}
            </h3>
            
            <p className="text-[rgb(var(--text-secondary))] text-lg">
              {feature.description}
            </p>
            
            {/* Benefits display */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-medium text-[rgb(var(--text-primary))] mb-3">
                Business Benefits
              </h4>
              
              <div className="flex flex-wrap gap-3">
                {feature.benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-[rgb(var(--color-primary))]/5 text-[rgb(var(--color-primary))] text-sm font-medium px-3 py-1.5 rounded-lg"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action button */}
            <div className="pt-6">
              <Link 
                href={feature.demoUrl} 
                className="px-5 py-2 flex items-center justify-center gap-2 bg-[rgb(var(--text-primary))] text-white font-medium rounded-lg hover:bg-[rgb(var(--text-primary))]/90 transition-colors"
                data-cursor-hover
              >
                <span>See Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}