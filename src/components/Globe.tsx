import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

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
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [0.1, 0.1, 0.12],
      markerColor: [0, 0.94, 1],
      glowColor: [0, 0.6, 0.8],
      markers: [
        // Major cities with flood monitoring
        { location: [28.6139, 77.2090], size: 0.08 }, // Delhi
        { location: [19.0760, 72.8777], size: 0.08 }, // Mumbai
        { location: [23.8103, 90.4125], size: 0.1 },  // Dhaka
        { location: [13.7563, 100.5018], size: 0.07 }, // Bangkok
        { location: [31.2304, 121.4737], size: 0.08 }, // Shanghai
        { location: [35.6762, 139.6503], size: 0.07 }, // Tokyo
        { location: [51.5074, -0.1278], size: 0.06 },  // London
        { location: [40.7128, -74.0060], size: 0.07 }, // New York
        { location: [-23.5505, -46.6333], size: 0.08 }, // São Paulo
        { location: [6.5244, 3.3792], size: 0.07 },    // Lagos
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.002;
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
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-cyan/10 via-transparent to-transparent blur-3xl" />
      
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

      {/* Orbital ring decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-[10%] border border-cyan/20 rounded-full animate-rotate-slow"
          style={{ transform: 'rotateX(75deg)' }}
        />
      </div>
    </div>
  );
};

export default Globe;
