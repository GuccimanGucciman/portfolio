'use client';
import { useState, useRef, } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    message: '',
    budget: '',
    timeline: '',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Mouse position tracking for interactive background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement to create interactive effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setMousePosition({ x, y });
  };
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus('submitting');
    
    try {
      // Send form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      setFormStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          company: '',
          phone: '',
          projectType: '',
          message: '',
          budget: '',
          timeline: '',
        });
        setFormStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      // Reset status after error
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };
  
  // Update form state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="py-24 md:py-32 relative overflow-hidden bg-gray-50"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-2/3 rounded-full bg-gradient-to-b from-[rgb(var(--color-primary))] to-transparent opacity-10 blur-3xl"
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
            scale: [1, 1.05, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 20 },
            y: { type: "spring", stiffness: 50, damping: 20 },
            scale: { duration: 8, repeat: Infinity, repeatType: "reverse" },
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-2/3 h-1/2 rounded-full bg-gradient-to-t from-[rgb(var(--color-secondary))] to-transparent opacity-10 blur-3xl"
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
            scale: [1, 1.08, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 20 },
            y: { type: "spring", stiffness: 50, damping: 20 },
            scale: { duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 },
          }}
        />
      </div>
      
      <div className="container-fluid relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[rgb(var(--text-primary))]">Get Your Free <span className="text-gradient">Quote</span></h2>
          <p className="text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            Ready to transform your online presence? Fill out the form below and we&apos;ll get back to you 
            within 24 hours with a custom proposal tailored to your business needs.
          </p>
        </motion.div>
        
        <motion.div
          className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left side content */}
          <div className="w-full lg:w-1/3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-4 text-[rgb(var(--text-primary))]">Why Work With Us</h3>
              <ul className="space-y-3">
                <BenefitItem 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text="Custom design tailored to your brand"
                />
                <BenefitItem 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text="Mobile-first responsive websites"
                />
                <BenefitItem 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text="SEO-optimized for better visibility"
                />
                <BenefitItem 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text="Fast loading speeds for better conversion"
                />
                <BenefitItem 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text="Ongoing support and maintenance"
                />
              </ul>
            </motion.div>
            
            {/* Contact information */}
            <motion.div 
              className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4 text-[rgb(var(--text-primary))]">Contact Us Directly</h3>
              
              <ContactItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                }
                title="Email"
                value="hello@fludo.se"
                link="mailto:hello@fludo.se"
              />
              
              <ContactItem 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                }
                title="Location"
                value="Gothenburg, Sweden"
              />
            </motion.div>
            
            {/* Testimonial */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center text-[rgb(var(--color-primary))]">
                  E
                </div>
                <div className="ml-3">
                  <p className="font-medium text-[rgb(var(--text-primary))]">Eirik</p>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">Lixy.no</p>
                </div>
              </div>
              <p className="text-[rgb(var(--text-secondary))] italic">
                &quot;Working with this team was the best decision we made. Our new website has completely transformed our business!&quot;
              </p>
            </motion.div>
          </div>
          
          {/* Right side form */}
          <div className="w-full lg:w-2/3">
            <motion.div
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-6 text-[rgb(var(--text-primary))] pb-2">Request a Quote</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedFormField
                    label="Your Name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === 'name'}
                    disabled={formStatus === 'submitting'}
                  />
                  
                  <AnimatedFormField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === 'email'}
                    disabled={formStatus === 'submitting'}
                  />
                  
                  <AnimatedFormField
                    label="Company Name"
                    name="company"
                    type="text"
                    value={formState.company}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === 'company'}
                    disabled={formStatus === 'submitting'}
                  />
                  
                  <AnimatedFormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    isFocused={focusedField === 'phone'}
                    disabled={formStatus === 'submitting'}
                  />
                  
                  <div className="md:col-span-2">
                    <AnimatedFormField
                      label="Project Details"
                      name="message"
                      isTextarea={true}
                      required
                      value={formState.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === 'message'}
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  
                  <div>
                    <AnimatedFormField
                      label="Budget"
                      name="budget"
                      type="text"
                      value={formState.budget}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('budget')}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === 'budget'}
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  
                  <div>
                    <AnimatedFormField
                      label="Desired Timeline"
                      name="timeline"
                      type="text"
                      value={formState.timeline}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('timeline')}
                      onBlur={() => setFocusedField(null)}
                      isFocused={focusedField === 'timeline'}
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                </div>
                
                <motion.div>
                  <AnimatePresence mode="wait">
                    {formStatus === 'idle' && (
                      <motion.button
                        key="submit"
                        type="submit"
                        className="w-full btn-primary mt-8 py-3"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        data-cursor-hover
                      >
                        Submit Request
                      </motion.button>
                    )}
                    
                    {formStatus === 'submitting' && (
                      <motion.div
                        key="submitting"
                        className="w-full btn-primary mt-8 py-3 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="w-5 h-5 rounded-full border-2 border-t-transparent border-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="ml-2">Submitting...</span>
                      </motion.div>
                    )}
                    
                    {formStatus === 'success' && (
                      <motion.div
                        key="success"
                        className="w-full bg-emerald-500/20 text-emerald-600 mt-8 py-3 rounded-lg text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span className="ml-2">Request sent successfully! We&apos;ll be in touch soon.</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {formStatus === 'error' && (
                      <motion.div
                        key="error"
                        className="w-full bg-red-500/20 text-red-600 mt-8 py-3 rounded-lg text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span className="ml-2">Something went wrong. Please try again or contact us directly.</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BenefitItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 text-[rgb(var(--color-primary))]">
        {icon}
      </div>
      <span className="ml-2 text-[rgb(var(--text-secondary))]">{text}</span>
    </div>
  );
}

function ContactItem({ icon, title, value, link = null }: { icon: React.ReactNode; title: string; value: string; link?: string | null }) {
  return (
    <motion.div 
      className="flex items-center group"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center mr-4 text-[rgb(var(--color-primary))] group-hover:bg-[rgb(var(--color-primary))]/20 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-[rgb(var(--text-secondary))]">{title}</h3>
        {link ? (
          <a 
            href={link} 
            className="text-[rgb(var(--text-primary))] hover:text-[rgb(var(--color-primary))] transition-colors"
            data-cursor-hover
          >
            {value}
          </a>
        ) : (
          <p className="text-[rgb(var(--text-primary))]">{value}</p>
        )}
      </div>
    </motion.div>
  );
}


interface AnimatedFormFieldProps {
  label: string;
  name: string;
  type?: string;
  isTextarea?: boolean;
  required?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  isFocused: boolean;
  disabled?: boolean;
}

function AnimatedFormField({ 
  label, 
  name, 
  type = "text", 
  isTextarea = false, 
  required = false, 
  value, 
  onChange,
  onFocus,
  onBlur,
  isFocused,
  disabled
}: AnimatedFormFieldProps) {
  const hasValue = value !== '';
  
  return (
    <motion.div className="relative">
      <motion.label 
        htmlFor={name}
        className="absolute pointer-events-none text-[rgb(var(--text-secondary))] transition-all duration-200"
        animate={{
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.8 : 1,
          color: isFocused ? 'rgba(var(--color-primary), 1)' : 'rgba(var(--text-secondary), 1)'
        }}
      >
        {label}
        {required && <span className="text-[rgb(var(--color-primary))]">*</span>}
      </motion.label>
      
      <motion.div
        className="relative"
        animate={{
          y: isFocused || hasValue ? 0 : 0,
        }}
      >
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            rows={5}
            className="w-full bg-transparent border-b border-gray-300 p-0 focus:outline-none focus:border-[rgb(var(--color-primary))] transition-colors text-[rgb(var(--text-primary))] resize-none"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            data-cursor-hover
          />
        ) : (
          <input 
            type={type} 
            id={name}
            name={name} 
            className="w-full bg-transparent border-b border-gray-300 p-0 focus:outline-none focus:border-[rgb(var(--color-primary))] transition-colors text-[rgb(var(--text-primary))]"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            data-cursor-hover
          />
        )}
        
        <motion.div 
          className="absolute bottom-0 left-0 right=0 h-[1px] bg-[rgb(var(--color-primary))]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}