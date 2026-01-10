import { motion } from 'framer-motion';
import Globe from './Globe';
import TypewriterEffect from './TypewriterEffect';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background effects */}
      <div className="absolute inset-0 particles-bg" />
      <div className="absolute inset-0 hud-grid opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Status tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
            >
              <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground tracking-wider">
                SYSTEMS OPERATIONAL
              </span>
            </motion.div>

            {/* Main heading with typewriter */}
            <div className="mb-6">
              <TypewriterEffect
                words={["Predicting", "the", "Unpredictable."]}
                className="text-foreground"
              />
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              AI-powered orbital analysis for real-time flood monitoring. 
              Protecting communities with satellite precision.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-lg bg-gradient-cyan overflow-hidden transition-all duration-300 glow-cyan-subtle hover:glow-cyan"
              >
                <span className="relative z-10 font-display text-sm font-bold tracking-wider text-void-deep">
                  ACCESS CONSOLE
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 rounded-lg border border-glass-border bg-glass transition-all duration-300 hover:border-cyan/30"
              >
                <span className="font-display text-sm font-semibold tracking-wider text-muted-foreground group-hover:text-cyan transition-colors">
                  VIEW DOCUMENTATION
                </span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              <Stat value="99.9%" label="Uptime" />
              <Stat value="<200ms" label="Latency" />
              <Stat value="180+" label="Countries" />
            </motion.div>
          </motion.div>

          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <Globe />
            
            {/* Floating data cards */}
            <FloatingCard 
              className="absolute top-10 -left-4 md:left-0"
              delay={1.5}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
                <span className="font-mono text-xs text-cyan">SAT-1B ACTIVE</span>
              </div>
            </FloatingCard>

            <FloatingCard 
              className="absolute bottom-20 -right-4 md:right-0"
              delay={2}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-alert rounded-full pulse-alert" />
                <span className="font-mono text-xs text-alert">3 ZONES MONITORED</span>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-muted-foreground tracking-widest">
            SCROLL
          </span>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-cyan rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center lg:text-left">
    <div className="font-mono text-2xl font-bold text-cyan text-glow-cyan">
      {value}
    </div>
    <div className="font-mono text-xs text-muted-foreground tracking-wider mt-1">
      {label.toUpperCase()}
    </div>
  </div>
);

const FloatingCard = ({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`glass-panel rounded-lg px-4 py-3 breathing-glow ${className}`}
  >
    {children}
  </motion.div>
);

export default HeroSection;
