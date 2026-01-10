import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BorderBeamProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

const BorderBeam = ({
  children,
  className = '',
  duration = 3,
  delay = 0,
  colorFrom = 'hsl(186 100% 50%)',
  colorTo = 'hsl(200 100% 45%)',
}: BorderBeamProps) => {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Border container */}
      <div className="absolute inset-0 rounded-xl">
        {/* Animated beam */}
        <motion.div
          className="absolute h-[2px] w-[100px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
            filter: 'blur(1px)',
          }}
          initial={{ left: '-100px', top: 0 }}
          animate={{
            left: ['calc(-100px)', 'calc(100% + 100px)'],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Right side beam */}
        <motion.div
          className="absolute w-[2px] h-[100px]"
          style={{
            background: `linear-gradient(180deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
            filter: 'blur(1px)',
            right: 0,
          }}
          initial={{ top: '-100px' }}
          animate={{
            top: ['calc(-100px)', 'calc(100% + 100px)'],
          }}
          transition={{
            duration,
            delay: delay + duration / 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Bottom beam */}
        <motion.div
          className="absolute h-[2px] w-[100px]"
          style={{
            background: `linear-gradient(270deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
            filter: 'blur(1px)',
            bottom: 0,
          }}
          initial={{ right: '-100px' }}
          animate={{
            right: ['calc(-100px)', 'calc(100% + 100px)'],
          }}
          transition={{
            duration,
            delay: delay + duration / 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Left side beam */}
        <motion.div
          className="absolute w-[2px] h-[100px]"
          style={{
            background: `linear-gradient(0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
            filter: 'blur(1px)',
            left: 0,
          }}
          initial={{ bottom: '-100px' }}
          animate={{
            bottom: ['calc(-100px)', 'calc(100% + 100px)'],
          }}
          transition={{
            duration,
            delay: delay + (duration * 3) / 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Static border */}
      <div className="absolute inset-0 rounded-xl border border-glass-border" />

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default BorderBeam;
