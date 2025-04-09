'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HorizontalScroll, RevealContent } from '../ui/AppleScrollEffect';

// Define a proper interface for the Portfolio item type
interface PortfolioItem {
  id: number;
  title: string;
  clientName: string;
  description: string;
  businessCategory: string;
  results: string[];
  image: string;
  websiteUrl: string;
  featured: boolean;
}

// Portfolio data for business clients
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Modern E-commerce Platform',
    clientName: 'FashionBloom',
    description: 'A full-featured online store that increased sales by 175% in the first quarter after launch, with mobile-optimized checkout and personalized product recommendations.',
    businessCategory: 'Retail & Fashion',
    results: ['175% sales increase', '32% lower bounce rate', '42% higher mobile conversions'],
    image: '/window.svg',
    websiteUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Professional Services Website',
    clientName: 'Lawford & Partners',
    description: 'A sophisticated website for a law firm focused on client acquisition, featuring an appointment booking system that increased client consultations by 65%.',
    businessCategory: 'Legal Services',
    results: ['65% more consultations', '48% increase in organic traffic', '3.2x ROI on website investment'],
    image: '/globe.svg',
    websiteUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Restaurant Online Ordering',
    clientName: 'Bistro Gourmet',
    description: 'An intuitive online ordering system and website redesign that helped this restaurant thrive during challenging times, increasing their takeout orders by 220%.',
    businessCategory: 'Restaurant & Food Service',
    results: ['220% increase in online orders', '42% higher average order value', '4.9/5 customer satisfaction'],
    image: '/file.svg',
    websiteUrl: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Real Estate Property Showcase',
    clientName: 'Prime Properties',
    description: 'A premium real estate website with virtual tours, detailed property filtering, and lead capture forms that doubled monthly qualified leads.',
    businessCategory: 'Real Estate',
    results: ['2x qualified lead generation', '68% longer site visit duration', '45% more property inquiries'],
    image: '/window.svg',
    websiteUrl: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Medical Practice Website',
    clientName: 'Wellness Medical Center',
    description: 'A patient-centered medical practice website with online appointment scheduling that improved patient acquisition and reduced administrative work.',
    businessCategory: 'Healthcare',
    results: ['78% of appointments now booked online', '52% reduction in phone calls', '4.8/5 patient satisfaction rating'],
    image: '/globe.svg',
    websiteUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Fitness Studio Membership Site',
    clientName: 'Elite Fitness',
    description: 'A membership website with class scheduling, progress tracking, and online payments that streamlined operations and increased member retention.',
    businessCategory: 'Health & Fitness',
    results: ['36% increase in membership retention', '58% boost in class bookings', '27% revenue growth'],
    image: '/file.svg',
    websiteUrl: '#',
    featured: false,
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <div id="portfolio" ref={sectionRef} className="relative">
      {/* Intro header */}
      <div className="py-20 flex flex-col justify-center items-center text-center bg-white">
        <RevealContent>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-[rgb(var(--text-primary))]">
            Our <span className="text-gradient">Portfolio</span>
          </h2>
        </RevealContent>
        <RevealContent delay={0.1}>
          <p className="text-xl text-[rgb(var(--text-secondary))] max-w-lg mx-auto">
            See how we&apos;ve helped businesses like yours achieve impressive results.
          </p>
        </RevealContent>
      </div>
      
      {/* GSAP-powered Horizontal Scroll section */}
      <HorizontalScroll width="280vw" id="portfolio-scroll">
        {portfolioItems.map((item) => (
          <PortfolioCard 
            key={item.id}
            item={item}
          />
        ))}
      </HorizontalScroll>
      
      {/* Testimonial showcase */}
      <div className="py-20 bg-white">
        <div className="container-fluid max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-[rgb(var(--text-primary))]">What Our Clients Say</h3>
            <p className="text-[rgb(var(--text-secondary))] max-w-lg mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center text-[rgb(var(--color-primary))]">
                  FP
                </div>
                <div className="ml-4">
                  <p className="font-medium text-[rgb(var(--text-primary))]">Emma Johnson</p>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">FashionBloom</p>
                </div>
              </div>
              <p className="text-[rgb(var(--text-secondary))] italic">
                &quot;Our online sales have completely transformed since launching our new website. The team understood exactly what we needed and delivered beyond our expectations.&quot;
              </p>
            </motion.div>
            
            <motion.div 
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center text-[rgb(var(--color-primary))]">
                  LP
                </div>
                <div className="ml-4">
                  <p className="font-medium text-[rgb(var(--text-primary))]">Robert Lawford</p>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">Lawford & Partners</p>
                </div>
              </div>
              <p className="text-[rgb(var(--text-secondary))] italic">
                &quot;The appointment booking system has completely changed how we acquire new clients. Our firm now operates more efficiently while providing better service.&quot;
              </p>
            </motion.div>
            
            <motion.div 
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center text-[rgb(var(--color-primary))]">
                  BG
                </div>
                <div className="ml-4">
                  <p className="font-medium text-[rgb(var(--text-primary))]">Michael Chen</p>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">Bistro Gourmet</p>
                </div>
              </div>
              <p className="text-[rgb(var(--text-secondary))] italic">
                &quot;Our new website and ordering system were lifesavers during tough times. The streamlined ordering process delighted our customers and boosted our revenue.&quot;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA button */}
      <div className="flex justify-center py-16 bg-gray-50 border-t border-gray-100">
        <Link href="/portfolio" className="pointer-events-auto">
          <motion.div 
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white shadow-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
          >
            View All Case Studies
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

// Portfolio card styled for horizontal scroll presentation
function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="min-w-[85vw] h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl p-8 border border-gray-100 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Project image */}
          <div className="w-full lg:w-1/2 aspect-video relative rounded-lg overflow-hidden shadow-md">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-700 hover:scale-105"
            />
            
            {/* Light gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-primary))]/20 to-transparent" />
            
            {/* Featured badge */}
            {item.featured && (
              <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold text-[rgb(var(--color-primary))] rounded-full shadow-md">
                Featured Project
              </div>
            )}
            
            {/* Business category badge */}
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-medium text-[rgb(var(--text-secondary))] rounded-full shadow-sm">
              {item.businessCategory}
            </div>
          </div>
          
          {/* Project details */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="text-sm font-medium text-[rgb(var(--color-primary))]">
              {item.clientName}
            </div>
            
            <h3 className="text-2xl font-bold tracking-tight text-[rgb(var(--text-primary))]">
              {item.title}
            </h3>
            
            <p className="text-[rgb(var(--text-secondary))] text-lg">
              {item.description}
            </p>
            
            {/* Results display */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-medium text-[rgb(var(--text-primary))] mb-3">
                Business Results
              </h4>
              
              <div className="flex flex-wrap gap-3">
                {item.results.map((result, index) => (
                  <div 
                    key={index}
                    className="bg-[rgb(var(--color-primary))]/5 text-[rgb(var(--color-primary))] text-sm font-medium px-3 py-1.5 rounded-lg"
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action button */}
            <div className="pt-6">
              <Link 
                href={item.websiteUrl} 
                className="px-5 py-2 flex items-center justify-center gap-2 bg-[rgb(var(--text-primary))] text-white font-medium rounded-lg hover:bg-[rgb(var(--text-primary))]/90 transition-colors"
                data-cursor-hover
              >
                <span>View Website</span>
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