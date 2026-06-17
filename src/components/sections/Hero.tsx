'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Download, Github, Linkedin, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PERSONAL, SOCIAL_LINKS, MISSION_VISION, CV_PATH, CV_FILENAME } from '@/data/constants';

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % MISSION_VISION.animatedWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = CV_PATH;
    link.download = CV_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto max-w-6xl w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
        >
          {/* Avatar - First on Mobile (order-1 md:order-2) */}
          <motion.div variants={itemVariants} className="flex justify-center order-1 md:order-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72"
              style={{ perspective: '1000px' }}
            >
              {/* Animated glow */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-3xl"
              />

              {/* Avatar */}
              <motion.div
                className="relative w-full h-full rounded-full border-4 border-primary/40 overflow-hidden shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Image
                  src="/images/avatar.jpeg"
                  alt={PERSONAL.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, 288px"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-0 rounded-full"
                  whileHover={{ opacity: 0.15 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content - Second on Mobile (order-2 md:order-1) */}
          <motion.div variants={itemVariants} className="space-y-6 md:space-y-8 order-2 md:order-1">
            {/* Name & Title */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent bg-clip-text text-transparent leading-tight">
                {PERSONAL.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70">{PERSONAL.title}</p>
            </motion.div>

            {/* Experience Badge */}
            <motion.div variants={itemVariants} className="flex items-baseline gap-2 md:gap-3">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent bg-clip-text text-transparent">
                {PERSONAL.yearsExperience}+
              </span>
              <span className="text-sm sm:text-base md:text-lg text-foreground/60">Years of Experience</span>
            </motion.div>

            {/* Vision - Merged with Mission (Only Vision Text with Different Font Sizes) */}
            <motion.div variants={itemVariants} className="space-y-4 py-4">
              <div className="p-3 sm:p-3 md:p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:border-primary/40 transition-all">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Mission</p>
                <div className="space-y-4">
                  <motion.div className="text-xl sm:text-xl font-bold leading-tight">
                    {MISSION_VISION.part1}{' '}
                    <motion.span
                      key={currentWordIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="inline-block bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent bg-clip-text text-transparent"
                    >
                      {MISSION_VISION.animatedWords[currentWordIndex]}
                    </motion.span>
                  </motion.div>

                  <motion.p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-medium">
                    {MISSION_VISION.part2}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent hover:opacity-90 rounded-full px-6 sm:px-8 py-5 sm:py-6 font-semibold text-sm sm:text-base w-full sm:w-auto"
              >
                Let's Connect
              </Button>
              <Button
                onClick={handleDownloadCV}
                variant="outline"
                className="rounded-full px-6 sm:px-8 py-5 sm:py-6 font-semibold border-primary/50 text-sm sm:text-base w-full sm:w-auto bg-transparent"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-2 sm:gap-3 pt-2">
              <motion.a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 sm:p-3 rounded-full bg-primary/10 dark:bg-gradient-to-br dark:from-primary/10 dark:to-primary/20 dark:hover:from-primary/20 dark:hover:to-primary/30 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all shadow-lg"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 sm:p-3 rounded-full bg-accent/10 dark:bg-gradient-to-br dark:from-accent/10 dark:to-accent/20 dark:hover:from-accent/20 dark:hover:to-accent/30 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 transition-all shadow-lg"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent text-white shadow-2xl hover:shadow-3xl transition-shadow"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
