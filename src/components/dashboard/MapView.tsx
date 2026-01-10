import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MapViewProps {
  onRegionClick?: (coords: { lat: number; lng: number }) => void;
  floodZones?: Array<{ lat: number; lng: number; radius: number }>;
}

// Placeholder map component - requires Mapbox token for full functionality
const MapView = ({ onRegionClick, floodZones = [] }: MapViewProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Simulate coordinate conversion
    const lat = 20 + (y / rect.height) * 40;
    const lng = -20 + (x / rect.width) * 120;
    
    setClickPosition({ x, y });
    onRegionClick?.({ lat, lng });
    
    // Clear reticle after animation
    setTimeout(() => setClickPosition(null), 1000);
  };

  return (
    <div 
      ref={mapContainerRef}
      className="relative w-full h-full bg-void cursor-crosshair overflow-hidden"
      onClick={handleClick}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 hud-grid opacity-50" />
      
      {/* Simulated map with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-void via-void-deep to-cyan/5" />
      
      {/* Atmospheric effect */}
      <div className="absolute inset-0 particles-bg" />

      {/* Simulated landmass shapes */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(186, 50%, 15%)" />
            <stop offset="100%" stopColor="hsl(186, 40%, 10%)" />
          </linearGradient>
        </defs>
        
        {/* Simplified continent shapes */}
        <path d="M150,200 Q200,180 250,200 Q280,220 270,260 Q250,290 200,280 Q160,260 150,200 Z" fill="url(#landGradient)" />
        <path d="M400,150 Q450,130 500,150 Q550,180 540,230 Q510,270 450,260 Q400,230 400,150 Z" fill="url(#landGradient)" />
        <path d="M600,180 Q700,160 750,200 Q780,250 750,300 Q700,340 650,320 Q600,280 600,180 Z" fill="url(#landGradient)" />
        <path d="M300,350 Q350,330 400,360 Q430,400 400,440 Q350,460 300,430 Q280,390 300,350 Z" fill="url(#landGradient)" />
        <path d="M800,250 Q850,230 900,260 Q930,300 900,350 Q850,380 800,350 Q770,300 800,250 Z" fill="url(#landGradient)" />
      </svg>

      {/* Flood zone overlays */}
      {floodZones.map((zone, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-alert/40 pulse-alert"
          style={{
            left: `${((zone.lng + 20) / 120) * 100}%`,
            top: `${((zone.lat - 20) / 40) * 100}%`,
            width: zone.radius * 20,
            height: zone.radius * 20,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Click reticle animation */}
      {clickPosition && (
        <motion.div
          className="absolute pointer-events-none"
          style={{ left: clickPosition.x, top: clickPosition.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <svg width="60" height="60" viewBox="-30 -30 60 60">
            <circle r="20" fill="none" stroke="hsl(186, 100%, 50%)" strokeWidth="2" opacity="0.8" />
            <circle r="10" fill="none" stroke="hsl(186, 100%, 50%)" strokeWidth="1" opacity="0.6" />
            <line x1="-25" y1="0" x2="-12" y2="0" stroke="hsl(186, 100%, 50%)" strokeWidth="1" />
            <line x1="12" y1="0" x2="25" y2="0" stroke="hsl(186, 100%, 50%)" strokeWidth="1" />
            <line x1="0" y1="-25" x2="0" y2="-12" stroke="hsl(186, 100%, 50%)" strokeWidth="1" />
            <line x1="0" y1="12" x2="0" y2="25" stroke="hsl(186, 100%, 50%)" strokeWidth="1" />
          </svg>
        </motion.div>
      )}

      {/* Map instructions overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel rounded-full px-4 py-2">
        <p className="text-muted-foreground text-xs font-mono">
          Click anywhere to analyze region • Right-click for options
        </p>
      </div>

      {/* Coordinates display */}
      <div className="absolute top-4 right-4 glass-panel rounded-lg p-3">
        <div className="text-muted-foreground text-xs font-mono mb-1">VIEWPORT</div>
        <div className="text-cyan text-sm font-mono">LAT: 28.6139° N</div>
        <div className="text-cyan text-sm font-mono">LNG: 77.2090° E</div>
        <div className="text-muted-foreground text-xs font-mono mt-2">ZOOM: 8.5x</div>
      </div>

      {/* Mapbox token notice */}
      <div className="absolute top-4 left-20 glass-panel rounded-lg p-3 max-w-xs">
        <p className="text-muted-foreground text-xs">
          <span className="text-cyan font-mono">INFO:</span> Add MAPBOX_TOKEN to enable full map functionality
        </p>
      </div>
    </div>
  );
};

export default MapView;
