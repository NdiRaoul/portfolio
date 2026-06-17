'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Ndi_Raoul_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:ndi.raoul@example.com', label: 'Email' },
  ];

  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-muted/20 to-background border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Social Links */}
          <motion.div
            className="flex items-center gap-2 sm:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 sm:p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                  title={social.label}
                >
                  <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Download CV Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={handleDownloadCV}
              className="bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent hover:opacity-90 rounded-full px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base flex items-center gap-2 w-full sm:w-auto"
            >
              <Download className="w-3 sm:w-4 h-3 sm:h-4" />
              Download CV
            </Button>
          </motion.div>

          {/* Footer Text */}
          <motion.div
            className="text-center space-y-1 sm:space-y-2 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-foreground/60 text-xs sm:text-sm px-2">
              © {currentYear} Ndi Raoul. All rights reserved.
            </p>
            <p className="text-foreground/50 text-xs px-2">
              Designed & Developed with passion | Built with Next.js, React, Three.js & Framer Motion
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
