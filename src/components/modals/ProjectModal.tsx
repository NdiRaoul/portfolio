'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 w-auto max-w-2xl mx-auto max-h-[90vh] overflow-y-auto sm:inset-auto"
          >
            <div className="bg-card border border-primary/30 rounded-lg sm:rounded-2xl overflow-hidden">
              {/* Image */}
              <div className="relative w-full h-40 sm:h-64 md:h-96 bg-muted overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
                >
                  <X className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="mb-4 sm:mb-6">
                  {project.featured && (
                    <span className="inline-block px-2 sm:px-3 py-1 text-xs font-semibold text-primary-foreground bg-gradient-to-r from-primary to-accent rounded-full mb-2 sm:mb-3">
                      Featured Project
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-foreground">
                    {project.title}
                  </h2>
                  <p className="text-foreground/60 text-lg">{project.description}</p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">About</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium border border-primary/30 hover:border-primary/60 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 flex-wrap">
                  {project.links.demo && (
                    <motion.a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </motion.a>
                  )}
                  {project.links.github && (
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
