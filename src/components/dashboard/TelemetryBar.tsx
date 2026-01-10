import { motion } from 'framer-motion';
import { Search, Command } from 'lucide-react';
import { useState, useEffect } from 'react';

const statusItems = [
  { label: 'SENTINEL-1B', status: 'ONLINE', color: 'text-cyan' },
  { label: 'GEE API', status: 'CONNECTED', color: 'text-cyan' },
  { label: 'SAR FEED', status: 'STREAMING', color: 'text-cyan' },
  { label: 'LATENCY', status: '45ms', color: 'text-cyan' },
  { label: 'DATA SYNC', status: 'REAL-TIME', color: 'text-cyan' },
  { label: 'ACTIVE REGIONS', status: '12', color: 'text-cyan' },
];

interface TelemetryBarProps {
  onSearch?: (query: string) => void;
}

const TelemetryBar = ({ onSearch }: TelemetryBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-14 z-50 glass-panel border-b border-glass-border">
      <div className="h-full flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan/20 flex items-center justify-center border border-cyan/30">
            <span className="font-display text-cyan text-sm font-bold">OS</span>
          </div>
          <div className="hidden md:block">
            <span className="font-display text-foreground tracking-widest">ORBITAL</span>
            <span className="font-display text-cyan tracking-widest ml-2">//</span>
            <span className="font-display text-muted-foreground tracking-widest ml-2">SENTINEL</span>
          </div>
        </div>

        {/* Status Ticker */}
        <div className="flex-1 mx-8 overflow-hidden hidden lg:block">
          <motion.div
            className="flex items-center gap-6 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...statusItems, ...statusItems].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${item.color === 'text-cyan' ? 'bg-cyan' : 'bg-alert'}`} />
                <span className="font-mono text-xs text-muted-foreground">{item.label}:</span>
                <span className={`font-mono text-xs ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center gap-2 glass-panel rounded-lg px-3 py-2 border border-glass-border focus-within:border-cyan/30 transition-colors">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter coordinates or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-48 font-mono"
            />
            <div className="flex items-center gap-1 text-muted-foreground">
              <Command className="w-3 h-3" />
              <span className="text-xs">K</span>
            </div>
          </div>
        </form>

        {/* Time Display */}
        <div className="hidden md:flex items-center gap-4 ml-4">
          <div className="text-right">
            <div className="font-mono text-xs text-muted-foreground">UTC</div>
            <div className="font-mono text-sm text-foreground">
              {currentTime.toISOString().slice(11, 19)}
            </div>
          </div>
          <div className="w-px h-8 bg-glass-border" />
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-cyan rounded-full"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-display text-xs text-cyan tracking-wider">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemetryBar;
