import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RiskGaugeProps {
  value: number; // 0-100
  label?: string;
}

const RiskGauge = ({ value, label = "Risk Level" }: RiskGaugeProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Animate the value
  useEffect(() => {
    const timer = setTimeout(() => setDisplayValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  // Calculate the arc path
  const radius = 80;
  const strokeWidth = 12;
  const center = 100;
  const startAngle = -180;
  const endAngle = 0;
  const angleRange = endAngle - startAngle;
  const currentAngle = startAngle + (angleRange * displayValue) / 100;

  const polarToCartesian = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian),
    };
  };

  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(currentAngle);
  const largeArc = currentAngle - startAngle > 180 ? 1 : 0;

  const pathD = displayValue > 0 
    ? `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`
    : '';

  const bgPathD = `M ${polarToCartesian(startAngle).x} ${polarToCartesian(startAngle).y} A ${radius} ${radius} 0 1 1 ${polarToCartesian(endAngle).x} ${polarToCartesian(endAngle).y}`;

  // Color based on risk level
  const getColor = (val: number) => {
    if (val < 30) return 'hsl(186, 100%, 50%)'; // Cyan - Low risk
    if (val < 60) return 'hsl(45, 100%, 50%)';  // Yellow - Medium risk
    if (val < 80) return 'hsl(25, 100%, 50%)';  // Orange - High risk
    return 'hsl(0, 85%, 60%)';                   // Red - Critical
  };

  const getRiskLabel = (val: number) => {
    if (val < 30) return 'LOW';
    if (val < 60) return 'MODERATE';
    if (val < 80) return 'HIGH';
    return 'CRITICAL';
  };

  const color = getColor(displayValue);

  return (
    <div className="relative w-full max-w-[240px] mx-auto">
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Background arc */}
        <path
          d={bgPathD}
          fill="none"
          stroke="hsl(0, 0%, 20%)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Animated value arc */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const tickAngle = startAngle + (angleRange * tick) / 100;
          const innerPos = polarToCartesian(tickAngle);
          const outerRadius = radius + 15;
          const outerPos = {
            x: center + outerRadius * Math.cos((tickAngle * Math.PI) / 180),
            y: center + outerRadius * Math.sin((tickAngle * Math.PI) / 180),
          };
          return (
            <g key={tick}>
              <line
                x1={innerPos.x}
                y1={innerPos.y}
                x2={outerPos.x}
                y2={outerPos.y}
                stroke="hsl(0, 0%, 40%)"
                strokeWidth={1}
              />
              <text
                x={outerPos.x}
                y={outerPos.y + 12}
                textAnchor="middle"
                className="fill-muted-foreground text-[8px] font-mono"
              >
                {tick}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center value display */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
        <motion.div
          className="font-mono text-4xl font-bold"
          style={{ color }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {Math.round(displayValue)}%
        </motion.div>
        <div 
          className="font-display text-sm tracking-wider mt-1"
          style={{ color }}
        >
          {getRiskLabel(displayValue)}
        </div>
      </div>

      {/* Label */}
      <div className="text-center mt-4">
        <span className="text-muted-foreground text-xs uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
};

export default RiskGauge;
