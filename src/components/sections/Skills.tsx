'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Services data
const services = [
  {
    id: 'webdesign',
    title: 'Website Design',
    description: 'Custom, responsive websites that represent your brand perfectly and create a memorable user experience.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    ),
    features: [
      'Custom design tailored to your brand',
      'Responsive for all devices',
      'Intuitive user experience',
      'Fast loading performance',
      'SEO-friendly structure'
    ],
    image: '/window.svg'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'Powerful online stores that drive sales with secure payment processing and inventory management.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
    features: [
      'Secure payment processing',
      'Inventory management',
      'Product catalog',
      'Customer accounts',
      'Order tracking and history'
    ],
    image: '/window.svg'
  },
  {
    id: 'seo',
    title: 'SEO & Performance',
    description: 'Optimize your website to rank higher in search engines and provide a lightning-fast experience.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12 12 0 0 1 21.75 7.5" />
      </svg>
    ),
    features: [
      'Search engine optimization',
      'Lightning-fast loading times',
      'Core Web Vitals optimization',
      'Mobile performance',
      'Analytics and reporting'
    ],
    image: '/window.svg'
  },
  {
    id: 'branding',
    title: 'Digital Branding',
    description: 'Establish a strong online presence with cohesive branding that resonates with your target audience.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    features: [
      'Logo and identity design',
      'Brand style guidelines',
      'Visual content creation',
      'Brand voice development',
      'Consistent implementation'
    ],
    image: '/window.svg'
  },
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });
  const [activeService, setActiveService] = useState(services[0].id);
  
  return (
    <section 
      id="services" 
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[rgb(var(--color-primary))] to-transparent opacity-5 blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-[rgb(var(--color-secondary))] to-transparent opacity-5 blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>
      
      <div className="container-fluid relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[rgb(var(--text-primary))]">Our <span className="text-gradient">Services</span></h2>
          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            We provide comprehensive web design and development services to help your business 
            stand out online and convert visitors into customers.
          </p>
        </motion.div>
        
        {/* Services Navigation */}
        <div className="flex justify-center mb-16 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-4">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`whitespace-nowrap px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeService === service.id
                    ? 'bg-white shadow-lg border border-gray-200 text-[rgb(var(--text-primary))]'
                    : 'bg-transparent border border-gray-200 text-[rgb(var(--text-secondary))] hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <div className="flex items-center">
                  <span className="mr-2">{service.icon}</span>
                  <span>{service.title}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Service Details */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {services.map((service) => (
              service.id === activeService && (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Service Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-[rgb(var(--text-primary))]">{service.title}</h3>
                    <p className="text-lg mb-8 text-[rgb(var(--text-secondary))]">{service.description}</p>
                    
                    <h4 className="text-lg font-semibold mb-4 text-[rgb(var(--text-primary))]">What&apos;s included:</h4>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3 feature-item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                        >
                          <span className="feature-icon mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-[rgb(var(--text-secondary))]">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.button
                      className="btn-primary px-8 py-3 mt-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                    </motion.button>
                  </motion.div>
                  
                  {/* Service Image */}
                  <motion.div
                    className="relative h-96 rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-primary))]/5 to-[rgb(var(--color-secondary))]/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full max-w-md p-4">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                          <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                              <span className="text-[rgb(var(--color-primary))]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  {service.icon}
                                </svg>
                              </span>
                            </div>
                            <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* Statistics Showcase */}
        <motion.div
          className="mt-32 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">250+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3x</div>
              <div className="stat-label">Average Conversion Rate Increase</div>
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[rgb(var(--text-primary))]">
            Ready to take your business online?
          </h3>
          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto mb-8">
            Get in touch today for a free consultation and quote for your project.
          </p>
          <a 
            href="#contact" 
            className="btn-primary px-8 py-3 text-lg"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}