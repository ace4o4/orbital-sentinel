import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, X, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotifyAuthorities: () => void;
  location?: string;
  riskLevel?: number;
}

const EmergencyModal = ({ 
  isOpen, 
  onClose, 
  onNotifyAuthorities,
  location = "Sector 7-Alpha",
  riskLevel = 92 
}: EmergencyModalProps) => {
  
  // Play alert sound when modal opens
  useEffect(() => {
    if (isOpen) {
      // Create a subtle alert sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      // Play two-tone alert
      playTone(880, audioContext.currentTime, 0.2);
      playTone(660, audioContext.currentTime + 0.25, 0.2);
      
      return () => {
        audioContext.close();
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Red dimming overlay */}
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-void-deep/80" />
            <motion.div 
              className="absolute inset-0 bg-alert/10"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg glass-panel rounded-2xl border border-alert/30 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Animated radar waves background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-96 h-96 border border-alert/20 rounded-full"
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.75,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative p-6">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Alert Icon */}
                <motion.div 
                  className="flex justify-center mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-alert/20 flex items-center justify-center glow-alert">
                      <AlertTriangle className="w-10 h-10 text-alert" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-alert"
                      animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-center font-display text-2xl md:text-3xl text-alert tracking-wider mb-2"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  CRITICAL FLOOD WARNING
                </motion.h2>
                <p className="text-center text-muted-foreground mb-6">
                  Immediate action required for affected region
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-panel rounded-lg p-4 text-center border border-alert/20">
                    <div className="text-muted-foreground text-xs uppercase mb-1">Risk Level</div>
                    <div className="font-mono text-3xl text-alert">{riskLevel}%</div>
                  </div>
                  <div className="glass-panel rounded-lg p-4 text-center border border-glass-border">
                    <div className="text-muted-foreground text-xs uppercase mb-1">Location</div>
                    <div className="font-mono text-sm text-foreground">{location}</div>
                  </div>
                </div>

                {/* Warning details */}
                <div className="glass-panel rounded-lg p-4 mb-6 border border-alert/20">
                  <div className="flex items-start gap-3">
                    <Radio className="w-5 h-5 text-alert flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-foreground text-sm mb-2">
                        <span className="text-alert font-semibold">AUTOMATED DETECTION:</span> SAR imagery confirms 
                        rapidly rising water levels in the monitored sector.
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Estimated 45,000 residents in immediate danger zone. Critical infrastructure 
                        including hospitals and power stations at risk.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={onNotifyAuthorities}
                    className="w-full h-14 bg-alert hover:bg-alert/90 text-white font-display text-lg tracking-wider glow-alert"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    NOTIFY AUTHORITIES
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full border-glass-border text-muted-foreground hover:text-foreground hover:bg-glass-highlight"
                  >
                    Dismiss Warning
                  </Button>
                </div>

                {/* Footer note */}
                <p className="text-center text-muted-foreground text-xs mt-4">
                  This alert was triggered automatically based on AI analysis of satellite data.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmergencyModal;
