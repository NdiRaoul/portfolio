'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GripHorizontal } from 'lucide-react';

interface TimeData {
  time: string;
  date: string;
  timezone: string;
  location: string;
  gmtOffset: string;
}

export default function FloatingTimeCard() {
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          weekday: 'short',
        });

        // Calculate GMT offset
        const offsetMinutes = -now.getTimezoneOffset();
        const offsetHours = Math.floor(offsetMinutes / 60);
        const gmtOffset = `GMT${offsetHours >= 0 ? '+' : ''}${offsetHours}`;

        // Get user's timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const location = timezone.split('/').pop()?.replace(/_/g, ' ') || 'Your Location';

        setTimeData({
          time: formatter.format(now),
          date: dateFormatter.format(now),
          timezone: timezone,
          location: location,
          gmtOffset: gmtOffset,
        });
      } catch (error) {
        console.error('Error getting time:', error);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeData) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={{ x: position.x, y: position.y, opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed z-40 cursor-grab active:cursor-grabbing"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <motion.div
        className="bg-gradient-to-br from-primary/80 to-accent/80 backdrop-blur-md border border-primary/30 rounded-lg sm:rounded-2xl p-2 sm:p-4 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-start gap-2 sm:gap-3 min-w-max">
          <GripHorizontal className="w-3 sm:w-4 h-3 sm:h-4 text-white/50 mt-1 flex-shrink-0" />
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <div className="text-xs sm:text-sm font-light text-white/60 flex items-center gap-1.5">
                <span>{timeData.location}</span>
                <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-white/40 font-medium">
                  {timeData.gmtOffset}
                </span>
              </div>
              <div className="text-lg sm:text-2xl font-bold text-white">{timeData.time}</div>
              <div className="text-xs font-light text-white/70">{timeData.date}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
