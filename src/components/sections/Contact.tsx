'use client';

import React from "react"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2">Let's Work Together</h2>
          <p className="text-sm sm:text-base text-foreground/60 max-w-2xl mx-auto px-2">
            Have a project in mind? Get in touch and let's create something amazing together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something amazing together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
        >
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 sm:space-y-8"
            style={{ perspective: '1000px' }}
          >
            <motion.div whileHover={{ y: -4 }}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contact Information</h3>
              <p className="text-sm sm:text-base text-foreground/60 mb-6 sm:mb-8 leading-relaxed">
                Feel free to reach out to me through any of the following channels. I'm always happy to discuss new opportunities and ideas.
              </p>
            </motion.div>

            {/* Contact Items */}
            <div className="space-y-4 sm:space-y-6">
              {/* Email */}
              <motion.div
                whileHover={{ x: 10, y: -4, rotateX: 5 }}
                style={{ perspective: '1000px' }}
                className="flex gap-3 sm:gap-4 items-start group cursor-pointer p-3 sm:p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-colors flex-shrink-0"
                >
                  <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-foreground mb-1">Email</p>
                  <a
                    href="mailto:ndiraoul83@gmail.com"
                    className="text-sm sm:text-base text-foreground/60 hover:text-primary transition-colors break-all"
                  >
                    ndiraoul83@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ x: 10 }}
                className="flex gap-3 sm:gap-4 items-start group cursor-pointer"
              >
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-foreground mb-1">Phone</p>
                  <a
                    href="tel:+237683435813"
                    className="text-sm sm:text-base text-foreground/60 hover:text-primary transition-colors"
                  >
                    +237 683 435 813
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                whileHover={{ x: 10 }}
                className="flex gap-3 sm:gap-4 items-start group cursor-pointer"
              >
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-foreground mb-1">Location</p>
                  <p className="text-sm sm:text-base text-foreground/60">
                    Buea, Cameroon <br />
                    Available for Remote Work
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            style={{ perspective: '1000px' }}
            whileHover={{ rotateX: 2, y: -4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-primary/10 bg-card/30 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`rounded-lg bg-card/50 ${errors.name ? 'border-red-500' : 'border-primary/20'}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`rounded-lg bg-card/50 ${errors.email ? 'border-red-500' : 'border-primary/20'}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Phone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+237 671 234 567"
                  className={`rounded-lg bg-card/50 ${errors.phone ? 'border-red-500' : 'border-primary/20'}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className={`rounded-lg bg-card/50 resize-none ${errors.message ? 'border-red-500' : 'border-primary/20'}`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-lg py-6 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
