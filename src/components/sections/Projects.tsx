'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import ProjectModal from '@/components/modals/ProjectModal';
import { PROJECTS } from '@/data/constants';
import { Project } from '@/types/project'; // Declare the Project variable before using it

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const projectsWithImages: Project[] = PROJECTS.map((proj) => ({
    ...proj,
    image: '/images/avatar.jpeg',
    longDescription:
      proj.description +
      ' Built with modern web technologies for optimal performance and user experience.',
  }));

  // Infinite loop carousel with responsive width calculation
  useEffect(() => {
    if (!carouselRef.current) return;

    const timeline = gsap.timeline({ repeat: -1, paused: isPaused });
    
    // Calculate responsive scroll distance
    const cardWidth = window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 300 : 384;
    const scrollDistance = -(cardWidth + 24); // card width + gap

    timeline.to(carouselRef.current, {
      x: scrollDistance,
      duration: 35,
      ease: 'none',
    });

    return () => {
      timeline.kill();
    };
  }, [isPaused]);

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            A selection of projects showcasing expertise in full-stack development
          </p>
        </motion.div>

        {/* Horizontal Scrolling Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-2xl sm:rounded-3xl border border-primary/20 bg-card/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 overflow-hidden h-80 sm:h-96 md:h-[500px]"
        >
          {/* Carousel Container */}
          <div className="overflow-x-hidden h-full">
            <motion.div
              ref={carouselRef}
              className="flex gap-4 sm:gap-6 h-full"
              initial={{ x: 0 }}
            >
              {/* Double the projects for infinite loop effect */}
              {[...projectsWithImages, ...projectsWithImages].map((project, idx) => (
                <motion.div
                  key={`${project.id}-${idx}`}
                  whileHover={{ scale: 1.02, y: -8 }}
                  onClick={() => setSelectedProject(project)}
                  className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-full rounded-xl sm:rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden bg-muted">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                      <Image
                        src={project.image || '/placeholder.svg'}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-3 sm:p-4 md:p-6 flex flex-col justify-between h-[calc(100%-8rem)] sm:h-[calc(100%-10rem)] md:h-[calc(100%-12rem)]">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/60 line-clamp-2 mb-2 sm:mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Link Button */}
                    <motion.a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.1, x: 3 }}
                      className="self-start p-2 sm:p-2.5 md:p-3 rounded-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-shadow"
                    >
                      <ArrowUpRight className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicators */}
          <div className="absolute bottom-3 right-3 text-xs text-foreground/50 pointer-events-none hidden sm:block">
            Hover to pause
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
