'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ContactModal from './modals/ContactModal';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  if (!mounted) return null;

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
  ];

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at 100% 0%)",
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at 100% 0%)",
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const itemVariants: Variants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8">
        <nav className="container mx-auto max-w-6xl rounded-full bg-background/70 backdrop-blur-xl border border-primary/20 px-4 sm:px-8 py-2.5 sm:py-4 flex items-center justify-between shadow-lg relative z-50">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity z-50">
            NR
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4 z-50">
            {/* Contact Button */}
            <Button
              onClick={() => setContactModalOpen(true)}
              className="hidden sm:inline-flex bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent hover:opacity-90 transition-opacity rounded-full px-6 font-semibold text-sm"
            >
              Contact Me
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full hover:bg-primary/10 transition-colors w-10 h-10"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full hover:bg-primary/10 transition-colors w-10 h-10 relative z-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-background/95 backdrop-blur-[20px] md:hidden cursor-pointer"
            >
              <div 
                className="flex flex-col h-full justify-center items-center gap-8 p-8 max-w-sm mx-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="flex flex-col items-center gap-6 w-full">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, x: 10 }}
                      className="w-full text-center"
                    >
                      <Link
                        href={item.href}
                        className="text-3xl font-bold text-foreground/80 hover:text-primary transition-colors block py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div
                     custom={navItems.length}
                     variants={itemVariants}
                     className="w-full pt-4"
                  >
                    <Button
                      onClick={() => {
                        setContactModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-primary dark:bg-gradient-to-r dark:from-primary dark:to-accent hover:scale-[1.02] active:scale-[0.98] transition-transform rounded-full py-6 text-lg font-semibold shadow-lg shadow-primary/25"
                    >
                      Contact Me
                    </Button>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
