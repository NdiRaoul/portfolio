'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/data/constants';

export default function WhatIDo() {
  // Show 4 cards on web, 3 on mobile
  const visibleServices = SERVICES.slice(0, 4);

  return (
    <section id="what-i-do" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">What I Do</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            I specialize in creating digital experiences that combine beautiful design with powerful functionality
          </p>
        </motion.div>

        {/* Services Grid - Limited to 4 on web, 3 on tablet, 2 on mobile */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-12"
        >
          {visibleServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                style={{ perspective: '1000px' }}
                className="group p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-xl"
              >
                {/* Background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    className="mb-2 sm:mb-3 md:mb-4 p-2 sm:p-2.5 md:p-3 w-fit rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-colors"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                  </motion.div>

                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Show More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link href="/what-i-do">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-full px-6 sm:px-8 py-4 sm:py-6 font-semibold text-sm sm:text-base">
              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
