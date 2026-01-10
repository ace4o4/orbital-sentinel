import { motion } from 'framer-motion';
import { Satellite, Radio, Shield } from 'lucide-react';

const GlassNavbar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4">
        <nav className="glass-panel rounded-2xl px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Satellite className="w-8 h-8 text-cyan" />
              <div className="absolute inset-0 blur-md bg-cyan/30" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-wider text-foreground">
                ORBITAL
              </span>
              <span className="text-cyan/60">//</span>
              <span className="font-display text-xl font-bold tracking-wider text-cyan">
                SENTINEL
              </span>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center gap-6">
            <StatusIndicator icon={<Radio className="w-4 h-4" />} label="SAR ONLINE" status="active" />
            <StatusIndicator icon={<Shield className="w-4 h-4" />} label="SECURE" status="active" />
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group px-6 py-2.5 rounded-lg border border-cyan/50 bg-transparent overflow-hidden transition-all duration-300 hover:border-cyan hover:glow-cyan-subtle"
          >
            <span className="relative z-10 font-display text-sm font-semibold tracking-wider text-cyan group-hover:text-foreground transition-colors">
              LAUNCH CONSOLE
            </span>
            <div className="absolute inset-0 bg-gradient-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
};

interface StatusIndicatorProps {
  icon: React.ReactNode;
  label: string;
  status: 'active' | 'warning' | 'error';
}

const StatusIndicator = ({ icon, label, status }: StatusIndicatorProps) => {
  const statusColors = {
    active: 'text-cyan',
    warning: 'text-yellow-400',
    error: 'text-alert',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${statusColors[status]}`}>
        {icon}
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan rounded-full animate-pulse" />
      </div>
      <span className="font-mono text-xs text-muted-foreground tracking-wide">
        {label}
      </span>
    </div>
  );
};

export default GlassNavbar;
