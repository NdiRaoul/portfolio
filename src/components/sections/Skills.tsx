'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SKILLS, SKILL_LOGOS, SKILL_COLORS } from '@/data/constants';

// Static, deterministic list — derived once at module scope so it doesn't need
// state or an effect (avoids cascading renders).
const SKILLS_LIST = Array.from(
  new Set([
    ...SKILLS.languages,
    ...SKILLS.frontend,
    ...SKILLS.backend,
    ...SKILLS.tools,
  ])
).map((skill) => ({
  name: skill,
  logo: SKILL_LOGOS[skill],
  color: SKILL_COLORS[skill],
}));

export default function Skills() {
  const [isPaused, setIsPaused] = useState(false);
  const rowRef = useRef(null);

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
  }, [isPaused]);

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

        {/* Animated Carousel - Single Row.
            Only the horizontal axis is clipped (overflow-x-hidden) so off-screen
            items disappear, while the vertical axis stays visible — otherwise the
            hover scale gets cut by a clip edge and shows a line across the row.
            Generous py gives the lifted/scaled logos room to grow. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-x-hidden overflow-y-visible px-4 py-12"
        >
          <motion.div
            ref={rowRef}
            className="flex gap-10 sm:gap-14 w-max items-center"
            initial={{ x: 0 }}
          >
            {/* Render list twice for seamless loop */}
            {[...SKILLS_LIST, ...SKILLS_LIST].map((skill, idx) => (
              <SkillItem
                key={`${skill.name}-${idx}`}
                name={skill.name}
                logo={skill.logo}
                color={skill.color}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface SkillItemProps {
  name: string;
  logo?: string;
  color?: string;
}

function SkillItem({ name, logo, color }: SkillItemProps) {
  const [hovered, setHovered] = useState(false);
  const brandColor = color ?? 'var(--primary)';
  // Monochrome logos use white (#FFFFFF) as their brand color but ship as
  // near-black SVGs, so they read black in light mode and disappear in dark mode.
  // Invert them in dark mode so they turn white, and use a theme-aware label color
  // (black in light, white in dark) instead of the invisible white brand color.
  const isMonochromeLogo = brandColor.toUpperCase() === '#FFFFFF';

  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 relative cursor-pointer"
      title={name} // Tooltip for accessibility and clarity
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={`${name} logo`}
          width={56}
          height={56}
          className={`w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform duration-300 ${
            isMonochromeLogo ? 'dark:invert' : ''
          }`}
          draggable={false}
        />
      ) : (
        <div className="px-6 py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
          <p className="text-lg font-bold text-foreground/80 whitespace-nowrap">{name}</p>
        </div>
      )}

      {/* Programming language name revealed on hover */}
      {logo && (
        <motion.span
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          className={`pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 px-2 py-0.5 rounded-md text-sm font-semibold whitespace-nowrap ${
            isMonochromeLogo ? 'text-foreground' : ''
          }`}
          style={isMonochromeLogo ? undefined : { color: brandColor }}
        >
          {name}
        </motion.span>
      )}
    </motion.div>
  );
}
