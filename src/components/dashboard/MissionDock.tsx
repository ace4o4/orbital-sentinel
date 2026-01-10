import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  AlertTriangle, 
  Settings, 
  History, 
  Satellite, 
  Radar,
  ChevronRight,
  ChevronLeft 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  alert?: boolean;
}

const navItems: NavItem[] = [
  { id: 'layers', icon: Layers, label: 'Map Layers' },
  { id: 'alerts', icon: AlertTriangle, label: 'Active Alerts', alert: true },
  { id: 'satellites', icon: Satellite, label: 'Satellite Feed' },
  { id: 'radar', icon: Radar, label: 'Radar Systems' },
  { id: 'history', icon: History, label: 'Analysis History' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

interface MissionDockProps {
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

const MissionDock = ({ activeItem = 'layers', onItemClick }: MissionDockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        className="glass-panel border-r border-glass-border rounded-r-xl overflow-hidden"
        animate={{ width: isExpanded ? 240 : 64 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onItemClick?.(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group relative",
                  isActive 
                    ? "bg-cyan/10 text-cyan" 
                    : "text-muted-foreground hover:text-foreground hover:bg-glass-highlight"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan rounded-r-full glow-cyan"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative flex-shrink-0">
                  <Icon className="w-5 h-5" />
                  {item.alert && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 bg-alert rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      className="font-display text-sm tracking-wide whitespace-nowrap overflow-hidden"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Expand/Collapse indicator */}
        <div className="p-2 border-t border-glass-border">
          <div className="flex items-center justify-center text-muted-foreground">
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MissionDock;
