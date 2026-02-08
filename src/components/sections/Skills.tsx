'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SKILLS, SKILL_ICONS } from '@/data/constants';
import { IconType } from 'react-icons';

export default function Skills() {
  const [isPaused, setIsPaused] = useState(false);
  const rowRef = useRef(null);
  const [skillsList, setSkillsList] = useState<Array<{ name: string; Icon?: IconType }>>([]);

  useEffect(() => {
    // Combine all skills into one list
    const allSkills = [
      ...SKILLS.languages,
      ...SKILLS.frontend,
      ...SKILLS.backend,
      ...SKILLS.tools,
    ];

    // Create unique list to avoid duplicates if any
    const uniqueSkills = Array.from(new Set(allSkills));

    // Map to objects with icon component
    const mappedSkills = uniqueSkills.map((skill) => ({
      name: skill,
      Icon: SKILL_ICONS[skill],
    }));

    setSkillsList(mappedSkills);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, paused: isPaused });

    if (rowRef.current) {
      const containerWidth = (rowRef.current as HTMLElement).scrollWidth / 2; // Half because we duplicate list
      
      tl.to(rowRef.current, {
        x: -containerWidth,
        duration: 40, // Slower speed for better visibility
        ease: 'none',
      });
    }

    return () => {
      tl.kill();
    };
  }, [isPaused, skillsList]);

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">My Skills</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Animated Carousel - Single Row */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative overflow-hidden p-4"
          >
            <div className="overflow-hidden">
              <motion.div
                ref={rowRef}
                className="flex gap-8 sm:gap-12 w-max items-center"
                initial={{ x: 0 }}
              >
                {/* Render list twice for seamless loop */}
                {[...skillsList, ...skillsList].map((skill, idx) => (
                  <SkillItem
                    key={`${skill.name}-${idx}`}
                    name={skill.name}
                    Icon={skill.Icon}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface SkillItemProps {
  name: string;
  Icon?: IconType;
}

function SkillItem({ name, Icon }: SkillItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="flex-shrink-0 relative group cursor-pointer"
      title={name} // Tooltip for accessibility and clarity
    >
      {Icon ? (
        <div className="text-5xl sm:text-6xl text-foreground/50 group-hover:text-primary transition-colors filter grayscale group-hover:grayscale-0">
          <Icon />
        </div>
      ) : (
        <div className="px-6 py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
          <p className="text-lg font-bold text-foreground/80 group-hover:text-primary transition-colors whitespace-nowrap">
            {name}
          </p>
        </div>
      )}
    </motion.div>
  );
}
