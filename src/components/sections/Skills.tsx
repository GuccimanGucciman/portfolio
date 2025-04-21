'use client';

import { JSX, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

// Define the WebService interface
interface WebService {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  features: string[];
  image: string;
}

// Website services data
const websiteServices: WebService[] = [
  {
    id: 'core-website',
    title: 'Core Website Development',
    description: 'Modern, responsive websites built with the latest technologies to provide an exceptional user experience that drives conversions and supports your business goals.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
    ),
    features: [
      'Custom, responsive design for all devices',
      'Optimized for conversion and lead generation',
      'SEO fundamentals included',
      'Interactive elements to engage visitors',
      'Performance-optimized loading speed'
    ],
    image: '/window.svg'
  },
  {
    id: 'business-solutions',
    title: 'Business Website Solutions',
    description: 'Tailored websites for specific industries and business needs that showcase your services and help potential customers find exactly what they need.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    features: [
      'Industry-specific design templates',
      'Service showcase sections',
      'Customer testimonial displays',
      'Integrated contact forms',
      'Location and service area maps'
    ],
    image: '/window.svg'
  },
  {
    id: 'support',
    title: 'Website Maintenance',
    description: 'Keep your website running smoothly with professional maintenance services, ensuring your marketing site remains secure, up-to-date, and performing at its best.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    features: [
      'Regular security updates',
      'Performance optimization',
      'Content updates',
      'Technical support',
    ],
    image: '/window.svg'
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });
  
  return (
    <section 
      id="services" 
      ref={containerRef}
      className="py-24 md:py-32 bg-white"
    >
      <div className="container-fluid relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--text-primary))]">Our <span className="text-gradient">Services</span></h2>
          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            We design and develop custom websites that help businesses connect with customers, 
            showcase their value, and drive meaningful results.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {websiteServices.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              {/* Service icon/header */}
              <div className="bg-[rgb(var(--color-primary))]/5 p-4 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center mb-3">
                  <div className="text-[rgb(var(--color-primary))]">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-center text-[rgb(var(--text-primary))]">{service.title}</h3>
              </div>
              
              {/* Service details */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-[rgb(var(--text-secondary))] mb-4">
                  {service.description}
                </p>
                
                <h4 className="text-xs font-semibold text-[rgb(var(--text-primary))] mb-2">
                  What&apos;s Included:
                </h4>
                
                <ul className="space-y-1.5 mb-5 flex-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[rgb(var(--color-primary))] flex-shrink-0 mr-1.5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-[rgb(var(--text-secondary))]">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <Link href="#contact" className="text-[rgb(var(--color-primary))] text-sm font-medium hover:underline inline-flex items-center">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <motion.div 
          className="max-w-3xl mx-auto mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[rgb(var(--text-primary))]">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-6 mt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-2 text-[rgb(var(--text-primary))]">How long does it take to build a website?</h4>
              <p className="text-[rgb(var(--text-secondary))]">The timeframe largely depends on the scope of the website, we&apos;ll provide a detailed timeline during our initial consultation based on your specific needs.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-2 text-[rgb(var(--text-primary))]">Do I need to provide the content?</h4>
              <p className="text-[rgb(var(--text-secondary))]">
                While you know your business best, we offer content strategy and copywriting services to help craft compelling messaging.
                We can work with existing content or help you create new content that resonates with your audience.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-2 text-[rgb(var(--text-primary))]">What happens after my website launches?</h4>
              <p className="text-[rgb(var(--text-secondary))]">
                We don&apos;t disappear after launch! We offer ongoing maintenance and support packages to ensure your site remains 
                secure, up-to-date, and optimized for performance. We&apos;ll help you grow your online presence over time.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[rgb(var(--text-primary))]">
            Ready to Boost Your Online Presence?
          </h3>
          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto mb-8">
            Let&apos;s discuss how we can help your business grow with a custom website that converts visitors into customers.
          </p>
          <Link 
            href="#contact" 
            className="btn-primary px-8 py-3 text-lg"
          >
            Get a Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}