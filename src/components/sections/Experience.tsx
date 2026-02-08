'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { EXPERIENCE } from '@/data/constants';

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState<(typeof EXPERIENCE)[0] | null>(null);

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Professional Experience</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            A journey through roles that shaped my expertise as a full-stack developer
          </p>
        </motion.div>

        {/* Timeline Layout - Alternating cards above and below line on MD+, stacked on mobile */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 transform -translate-x-1/2" />

          {/* Experience Cards */}
          <div className="space-y-8 md:space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.position}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedExperience(exp)}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start md:items-center cursor-pointer`}
              >
                {/* Left side card - Full width on mobile, left half on desktop */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`p-5 sm:p-6 rounded-2xl border-2 bg-card/50 backdrop-blur-sm hover:border-primary/60 transition-all shadow-lg hover:shadow-xl ${
                    index % 2 === 0 ? 'border-primary/30' : 'hidden md:block border-primary/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-primary font-semibold text-sm sm:text-base">{exp.company}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-1 text-foreground/70">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="line-clamp-1">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/70">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground/60 line-clamp-2">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Center dot - Hidden on mobile */}
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="hidden md:block absolute left-1/2 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg transform -translate-x-1/2 z-10"
                />

                {/* Right side card - Full width on mobile, right half on desktop */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`p-5 sm:p-6 rounded-2xl border-2 bg-card/50 backdrop-blur-sm hover:border-accent/60 transition-all shadow-lg hover:shadow-xl ${
                    index % 2 === 1 ? 'border-accent/30' : 'hidden md:block border-accent/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-accent font-semibold text-sm sm:text-base">{exp.company}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-1 text-foreground/70">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="line-clamp-1">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/70">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground/60 line-clamp-2">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto"
            >
              <motion.div className="bg-card border-2 border-primary/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="float-right mb-4 p-2 hover:bg-muted rounded-full transition-colors text-xl"
                >
                  ✕
                </button>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      {selectedExperience.position}
                    </h3>
                    <p className="text-lg text-primary font-semibold">
                      {selectedExperience.company} • {selectedExperience.period}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {selectedExperience.location}
                        {selectedExperience.isRemote && ' (Remote)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="font-medium">
                        {selectedExperience.yearsWorked} year
                        {selectedExperience.yearsWorked > 1 && 's'}
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="font-semibold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="font-semibold mb-3">Responsibilities</h4>
                    <ul className="space-y-2">
                      {selectedExperience.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex gap-3 text-foreground/70">
                          <span className="text-primary min-w-fit">▸</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {selectedExperience.achievements.map((ach, idx) => (
                        <li key={idx} className="flex gap-3 text-foreground/70">
                          <span className="text-accent min-w-fit">★</span>
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
