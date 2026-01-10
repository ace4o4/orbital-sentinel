import { useState } from 'react';
import TelemetryBar from '@/components/dashboard/TelemetryBar';
import MissionDock from '@/components/dashboard/MissionDock';
import MapView from '@/components/dashboard/MapView';
import AnalysisPanel from '@/components/dashboard/AnalysisPanel';
import EmergencyModal from '@/components/dashboard/EmergencyModal';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState('layers');
  const [isAnalysisPanelOpen, setIsAnalysisPanelOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [currentRiskLevel, setCurrentRiskLevel] = useState(65);
  const [analysisLocation, setAnalysisLocation] = useState('Sector 7-Alpha');
  const [floodZones, setFloodZones] = useState<Array<{ lat: number; lng: number; radius: number }>>([]);
  
  const { toast } = useToast();

  const handleRegionClick = (coords: { lat: number; lng: number }) => {
    // Simulate risk analysis with random values
    const risk = Math.floor(Math.random() * 60) + 40; // 40-100
    setCurrentRiskLevel(risk);
    setAnalysisLocation(`${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E`);
    
    // Add flood zone visualization
    setFloodZones(prev => [...prev, { ...coords, radius: 2 + Math.random() * 3 }]);
    
    // Open analysis panel
    setIsAnalysisPanelOpen(true);
    
    // If risk is critical, trigger emergency modal
    if (risk >= 80) {
      setTimeout(() => {
        setIsEmergencyModalOpen(true);
      }, 1500);
    }
  };

  const handleBroadcastAlert = () => {
    setIsAnalysisPanelOpen(false);
    setIsEmergencyModalOpen(true);
  };

  const handleNotifyAuthorities = () => {
    toast({
      title: "Alert Broadcasted",
      description: "Emergency services have been notified. ETA: 12 minutes.",
    });
    setIsEmergencyModalOpen(false);
  };

  const handleSearch = (query: string) => {
    toast({
      title: "Searching...",
      description: `Looking up coordinates for: ${query}`,
    });
  };

  return (
    <div className="h-screen w-screen bg-void overflow-hidden">
      {/* Top Telemetry Bar */}
      <TelemetryBar onSearch={handleSearch} />
      
      {/* Left Mission Dock */}
      <MissionDock 
        activeItem={activeNavItem} 
        onItemClick={setActiveNavItem} 
      />
      
      {/* Main Map View */}
      <div className="absolute inset-0 pt-14">
        <MapView 
          onRegionClick={handleRegionClick}
          floodZones={floodZones}
        />
      </div>
      
      {/* Analysis Panel */}
      <AnalysisPanel
        isOpen={isAnalysisPanelOpen}
        onClose={() => setIsAnalysisPanelOpen(false)}
        riskLevel={currentRiskLevel}
        location={analysisLocation}
        onBroadcastAlert={handleBroadcastAlert}
      />
      
      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onNotifyAuthorities={handleNotifyAuthorities}
        location={analysisLocation}
        riskLevel={currentRiskLevel}
      />
    </div>
  );
};

export default Dashboard;
