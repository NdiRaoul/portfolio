'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SERVICES } from '@/data/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function WhatIDoPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link href="/#what-i-do">
              <Button
                variant="outline"
                className="rounded-full gap-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              What I Do
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              A comprehensive overview of all the services I offer to help bring your digital vision to life
            </p>
          </motion.div>

          {/* Services Grid - All Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8"
          >
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -8, rotateX: 5 }}
                  style={{ perspective: '1000px' }}
                  className="group p-8 rounded-2xl border-2 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-2xl"
                >
                  {/* Background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                  />

                  <div className="relative z-10 space-y-4">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.2 }}
                      className="p-4 w-fit rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-base text-foreground/60 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 p-10 sm:p-12 rounded-3xl border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
              Let's collaborate to bring your next project to life with innovative solutions and cutting-edge technologies.
            </p>
            <Link href="/#contact">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-full px-8 py-6 font-semibold text-base">
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
