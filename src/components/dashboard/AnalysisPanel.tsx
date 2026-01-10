import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Building2, School, Hospital, MapPin, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RiskGauge from './RiskGauge';


interface InfrastructureItem {
  id: string;
  name: string;
  type: 'hospital' | 'school' | 'building' | 'infrastructure';
  distance: string;
  risk: 'critical' | 'high' | 'moderate';
}

interface AnalysisPanelProps {
  isOpen: boolean;
  onClose: () => void;
  riskLevel: number;
  location?: string;
  infrastructure?: InfrastructureItem[];
  onBroadcastAlert: () => void;
}

const defaultInfrastructure: InfrastructureItem[] = [
  { id: '1', name: 'City General Hospital', type: 'hospital', distance: '0.5km', risk: 'critical' },
  { id: '2', name: 'Central Public School', type: 'school', distance: '1.2km', risk: 'high' },
  { id: '3', name: 'Power Substation Alpha', type: 'infrastructure', distance: '0.8km', risk: 'critical' },
  { id: '4', name: 'Municipal Water Plant', type: 'building', distance: '2.1km', risk: 'moderate' },
  { id: '5', name: 'Emergency Services HQ', type: 'building', distance: '1.5km', risk: 'high' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'hospital': return Hospital;
    case 'school': return School;
    case 'building': return Building2;
    default: return MapPin;
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'critical': return 'text-alert';
    case 'high': return 'text-orange-400';
    default: return 'text-yellow-400';
  }
};

const AnalysisPanel = ({ 
  isOpen, 
  onClose, 
  riskLevel,
  location = "Sector 7-Alpha",
  infrastructure = defaultInfrastructure,
  onBroadcastAlert 
}: AnalysisPanelProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-void-deep/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 glass-panel border-l border-glass-border overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Animated border effect */}
            <div className="absolute inset-0 border-beam rounded-none" />
            
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-glass-border">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
                  <div>
                    <h2 className="font-display text-lg text-foreground">ANALYSIS RESULTS</h2>
                    <p className="text-muted-foreground text-xs font-mono">{location}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Risk Gauge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <RiskGauge value={riskLevel} label="Flood Risk Assessment" />
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  className="grid grid-cols-2 gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    { label: 'Water Level', value: '2.4m', trend: '+0.3m/hr' },
                    { label: 'Rainfall', value: '45mm', trend: 'Heavy' },
                    { label: 'Affected Area', value: '12.5km²', trend: 'Expanding' },
                    { label: 'Population', value: '~45,000', trend: 'At Risk' },
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel rounded-lg p-3">
                      <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                        {stat.label}
                      </div>
                      <div className="font-mono text-lg text-foreground">{stat.value}</div>
                      <div className="text-cyan text-xs font-mono">{stat.trend}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Infrastructure Impact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-alert" />
                    <h3 className="font-display text-sm text-foreground">CRITICAL INFRASTRUCTURE AT RISK</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {infrastructure.map((item, index) => {
                      const Icon = getIcon(item.type);
                      return (
                        <motion.div
                          key={item.id}
                          className="flex items-center gap-3 glass-panel rounded-lg p-3 hover:bg-glass-highlight transition-colors"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div className={`p-2 rounded-lg bg-void ${getRiskColor(item.risk)}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-foreground text-sm truncate">{item.name}</div>
                            <div className="text-muted-foreground text-xs font-mono">{item.distance} from flood zone</div>
                          </div>
                          <div className={`text-xs font-display uppercase ${getRiskColor(item.risk)}`}>
                            {item.risk}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-display text-sm text-foreground mb-3">ESTIMATED IMPACT TIMELINE</h3>
                  <div className="glass-panel rounded-lg p-4">
                    <div className="space-y-3">
                      {[
                        { time: '+1hr', event: 'Low-lying areas begin flooding' },
                        { time: '+3hr', event: 'Hospital access roads compromised' },
                        { time: '+6hr', event: 'Power infrastructure at risk' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="font-mono text-alert text-sm w-12">{item.time}</span>
                          <div className="w-2 h-2 rounded-full bg-alert mt-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{item.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-glass-border space-y-3">
                <Button
                  onClick={onBroadcastAlert}
                  className="w-full h-12 bg-alert hover:bg-alert/90 text-white font-display text-lg tracking-wider glow-alert"
                >
                  <Radio className="w-5 h-5 mr-2" />
                  BROADCAST ALERT
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full border-glass-border text-muted-foreground hover:text-foreground"
                >
                  Dismiss Analysis
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnalysisPanel;
