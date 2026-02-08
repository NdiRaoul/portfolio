'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/data/constants';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const testimonials = TESTIMONIALS; // Declare the testimonials variable

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getTestimonialIndex = (offset: number) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">What People Say</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Testimonials from clients and colleagues who've worked with me
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto px-0">
          {/* Main Testimonial */}
          <motion.div
            key={`main-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mb-8 sm:mb-12"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-center hover:border-primary/60 transition-all shadow-lg hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent p-[2px]">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src={TESTIMONIALS[currentIndex].image || '/images/avatar.jpeg'}
                      alt={TESTIMONIALS[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-8">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                    className="text-xl sm:text-2xl md:text-3xl text-accent"
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              {/* Quote */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-light italic text-foreground mb-5 sm:mb-8 leading-relaxed"
              >
                "{TESTIMONIALS[currentIndex].quote}"
              </motion.p>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2 sm:space-y-3"
              >
                <p className="font-bold text-base sm:text-lg text-foreground">
                  {TESTIMONIALS[currentIndex].name}
                </p>
                <p className="text-xs sm:text-sm text-foreground/60">
                  {TESTIMONIALS[currentIndex].position} at {TESTIMONIALS[currentIndex].company}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="p-2 sm:p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/30 hover:border-primary/60"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
            </motion.button>

            {/* Indicators */}
            <div className="flex gap-1.5 sm:gap-3">
              {TESTIMONIALS.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  animate={{
                    scale: idx === currentIndex ? 1.5 : 1,
                    opacity: idx === currentIndex ? 1 : 0.3,
                  }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary"
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-2 sm:p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/30 hover:border-primary/60"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="text-center text-xs sm:text-sm text-foreground/50">
            {currentIndex + 1} of {TESTIMONIALS.length}
          </div>
        </div>
      </div>
    </section>
  );
}
