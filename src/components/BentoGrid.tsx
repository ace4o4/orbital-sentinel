import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import BorderBeam from './BorderBeam';
import { Radar, Clock, Globe2, Zap, Database, Shield } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  delay?: number;
  children?: ReactNode;
}

const BentoCard = ({ title, description, icon, className = '', delay = 0, children }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`group ${className}`}
    >
      <BorderBeam delay={delay * 2}>
        <div className="glass-panel rounded-xl p-6 h-full transition-all duration-300 group-hover:border-cyan/30">
          <div className="flex flex-col h-full">
            {/* Icon */}
            <div className="mb-4 relative w-fit">
              <div className="p-3 rounded-lg bg-cyan/10 text-cyan transition-all duration-300 group-hover:bg-cyan/20 group-hover:glow-cyan-subtle">
                {icon}
              </div>
            </div>

            {/* Content */}
            <h3 className="font-display text-lg font-bold tracking-wide text-foreground mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
              {description}
            </p>

            {/* Optional visual content */}
            {children && (
              <div className="mt-4">
                {children}
              </div>
            )}
          </div>
        </div>
      </BorderBeam>
    </motion.div>
  );
};

const RadarAnimation = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="relative w-24 h-24">
      {/* Radar circles */}
      <div className="absolute inset-0 rounded-full border border-cyan/20" />
      <div className="absolute inset-2 rounded-full border border-cyan/30" />
      <div className="absolute inset-4 rounded-full border border-cyan/40" />
      
      {/* Sweep */}
      <div 
        className="absolute inset-0 rounded-full radar-sweep"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, hsl(186 100% 50% / 0.4) 30deg, transparent 60deg)',
        }}
      />
      
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-cyan rounded-full glow-cyan" />
      </div>
    </div>
  </div>
);

const LiveCounter = () => {
  return (
    <div className="flex items-baseline gap-1">
      <span className="font-mono text-3xl font-bold text-cyan text-glow-cyan">
        &lt;200
      </span>
      <span className="font-mono text-lg text-muted-foreground">ms</span>
    </div>
  );
};

const MiniMap = () => (
  <div className="relative w-full h-20 rounded-lg overflow-hidden bg-void-deep/50">
    <div className="absolute inset-0 hud-grid opacity-30" />
    {/* Fake continents */}
    <div className="absolute top-4 left-8 w-16 h-8 bg-cyan/10 rounded blur-sm" />
    <div className="absolute top-6 right-10 w-12 h-10 bg-cyan/10 rounded blur-sm" />
    <div className="absolute bottom-4 left-20 w-10 h-6 bg-cyan/10 rounded blur-sm" />
    {/* Ping markers */}
    <div className="absolute top-5 left-12 w-1.5 h-1.5 bg-cyan rounded-full animate-pulse" />
    <div className="absolute top-8 right-16 w-1.5 h-1.5 bg-cyan rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
    <div className="absolute bottom-6 left-24 w-1.5 h-1.5 bg-alert rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
  </div>
);

const BentoGrid = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-cyan tracking-widest">
            &lt;SYSTEM_OVERVIEW/&gt;
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide text-foreground mt-4">
            SYSTEM CAPABILITIES
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large Card - Radar */}
          <BentoCard
            title="SYNTHETIC APERTURE RADAR"
            description="Real-time SAR imagery processing from Sentinel-1 satellites. Penetrates cloud cover for 24/7 monitoring."
            icon={<Radar className="w-6 h-6" />}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2"
            delay={0}
          >
            <RadarAnimation />
          </BentoCard>

          {/* Latency Card */}
          <BentoCard
            title="ULTRA-LOW LATENCY"
            description="Edge computing nodes ensure sub-200ms response times for critical alerts."
            icon={<Clock className="w-6 h-6" />}
            delay={0.1}
          >
            <LiveCounter />
          </BentoCard>

          {/* Global Coverage */}
          <BentoCard
            title="GLOBAL COVERAGE"
            description="Monitoring stations across 6 continents with redundant satellite links."
            icon={<Globe2 className="w-6 h-6" />}
            delay={0.2}
          >
            <MiniMap />
          </BentoCard>

          {/* AI Processing */}
          <BentoCard
            title="AI-POWERED ANALYSIS"
            description="Deep learning models trained on 10+ years of flood event data for predictive accuracy."
            icon={<Zap className="w-6 h-6" />}
            delay={0.3}
          />

          {/* Data Pipeline */}
          <BentoCard
            title="REAL-TIME DATA PIPELINE"
            description="Ingesting 50TB+ of satellite imagery daily through Google Earth Engine integration."
            icon={<Database className="w-6 h-6" />}
            delay={0.4}
          />

          {/* Security */}
          <BentoCard
            title="MILITARY-GRADE SECURITY"
            description="End-to-end encryption with zero-knowledge architecture for sensitive infrastructure data."
            icon={<Shield className="w-6 h-6" />}
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
