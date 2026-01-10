import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { motion } from 'framer-motion';

interface Satellite {
  id: number;
  orbitRadius: number;
  speed: number;
  angle: number;
  tilt: number;
  size: number;
}

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const satellitesRef = useRef<Satellite[]>([]);

  // Initialize satellites
  useEffect(() => {
    satellitesRef.current = [
      { id: 1, orbitRadius: 58, speed: 0.8, angle: 0, tilt: 20, size: 3 },
      { id: 2, orbitRadius: 62, speed: 1.2, angle: 120, tilt: -15, size: 2.5 },
      { id: 3, orbitRadius: 55, speed: 0.6, angle: 240, tilt: 35, size: 3.5 },
      { id: 4, orbitRadius: 68, speed: 1.0, angle: 60, tilt: -45, size: 2 },
      { id: 5, orbitRadius: 52, speed: 1.5, angle: 180, tilt: 10, size: 2.5 },
      { id: 6, orbitRadius: 72, speed: 0.4, angle: 300, tilt: -30, size: 3 },
    ];
  }, []);

  useEffect(() => {
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 2.5,
      mapSamples: 24000,
      mapBrightness: 6,
      baseColor: [0.15, 0.4, 0.7], // Blue ocean color
      markerColor: [0, 0.94, 1],
      glowColor: [0.2, 0.5, 0.8],
      markers: [
        // Major cities with flood monitoring
        { location: [28.6139, 77.2090], size: 0.06 },
        { location: [19.0760, 72.8777], size: 0.06 },
        { location: [23.8103, 90.4125], size: 0.08 },
        { location: [13.7563, 100.5018], size: 0.05 },
        { location: [31.2304, 121.4737], size: 0.06 },
        { location: [35.6762, 139.6503], size: 0.05 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [40.7128, -74.0060], size: 0.06 },
        { location: [-23.5505, -46.6333], size: 0.06 },
        { location: [6.5244, 3.3792], size: 0.05 },
        { location: [55.7558, 37.6173], size: 0.05 },
        { location: [-33.8688, 151.2093], size: 0.05 },
        { location: [1.3521, 103.8198], size: 0.04 },
        { location: [25.2048, 55.2708], size: 0.05 },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.003;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    const handlePointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grabbing';
      }
    };

    const handlePointerUp = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab';
      }
    };

    const handlePointerOut = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab';
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta / 200;
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerout', handlePointerOut);
    canvas.addEventListener('pointermove', handlePointerMove);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerout', handlePointerOut);
      canvas.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
      {/* Atmospheric glow */}
      <div className="absolute inset-[-10%] rounded-full bg-gradient-radial from-cyan/20 via-cyan/5 to-transparent blur-3xl" />
      
      {/* Canvas container */}
      <div className="relative w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab"
          style={{
            contain: 'layout paint size',
            opacity: 1,
          }}
        />
      </div>

      {/* Satellite Orbits */}
      {[
        { radius: 58, tilt: 20, duration: 8 },
        { radius: 62, tilt: -15, duration: 10 },
        { radius: 55, tilt: 35, duration: 6 },
        { radius: 68, tilt: -45, duration: 12 },
        { radius: 52, tilt: 10, duration: 5 },
        { radius: 72, tilt: -30, duration: 15 },
      ].map((orbit, index) => (
        <div
          key={index}
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: `${orbit.radius}%`,
            height: `${orbit.radius}%`,
            transform: `translate(-50%, -50%) rotateX(${75 + orbit.tilt}deg) rotateZ(${index * 30}deg)`,
          }}
        >
          {/* Orbit ring */}
          <div 
            className="absolute inset-0 border border-cyan/10 rounded-full"
          />
          
          {/* Satellite */}
          <motion.div
            className="absolute"
            style={{
              width: '100%',
              height: '100%',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: orbit.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {/* Satellite body */}
              <div className="relative">
                <div className="w-2 h-2 bg-cyan rounded-sm glow-cyan" />
                {/* Solar panels */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                  <div className="w-3 h-1 bg-cyan/60 rounded-sm" />
                  <div className="w-1 h-1" />
                  <div className="w-3 h-1 bg-cyan/60 rounded-sm" />
                </div>
                {/* Signal pulse */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-cyan/40 rounded-full"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      ))}

      {/* Connection lines between satellites (data streams) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="dataStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(186, 100%, 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Outer glow ring decoration */}
      <motion.div 
        className="absolute inset-[-5%] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div 
          className="absolute inset-0 border border-cyan/5 rounded-full"
          style={{ transform: 'rotateX(80deg)' }}
        />
      </motion.div>

      {/* Status indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 glass-panel rounded-full px-3 py-1.5">
        <motion.div 
          className="w-2 h-2 bg-cyan rounded-full"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-xs text-cyan">6 SATELLITES ACTIVE</span>
      </div>
    </div>
  );
};

export default Globe;
