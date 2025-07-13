import React from 'react';
import { ConceptNode as ConceptNodeType } from '../../types';

interface ConceptNodeProps {
  concept: ConceptNodeType;
  x: number;
  y: number;
  isSelected: boolean;
  onClick: () => void;
  onDragStart: (e: React.MouseEvent) => void;
}

const ConceptNode: React.FC<ConceptNodeProps> = ({ concept, x, y, isSelected, onClick, onDragStart }) => {
  // Determine background color based on mastery
  const getBgColor = () => {
    switch (concept.mastery) {
      case 'mastered':
        return 'bg-green-500';
      case 'review':
        return 'bg-yellow-500';
      case 'weak':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  // Determine node size
  const getNodeSize = () => {
    const baseSize = 50;
    // Larger node for selected node
    return isSelected ? baseSize + 10 : baseSize;
  };

  const nodeSize = getNodeSize();
  const textLength = concept.title.length;
  const fontSize = textLength > 15 ? 'text-xs' : 'text-sm';

  return (
    <g
      transform={`translate(${x},${y})`}
      onMouseDown={onDragStart}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 ease-in-out ${isSelected ? 'scale-110' : ''}`}
    >
      {/* Shadow */}
      <circle
        r={nodeSize + 2}
        fill="rgba(0,0,0,0.2)"
        className="transition-all duration-300"
        cx={2}
        cy={2}
      />
      
      {/* Main circle */}
      <circle
        r={nodeSize}
        className={`${getBgColor()} transition-all duration-300 ${
          isSelected ? 'stroke-purple-600 stroke-[3px]' : 'stroke-white stroke-2'
        }`}
        fill={isSelected ? `url(#selected-gradient-${concept.id})` : undefined}
      />
      
      {/* Gradient for selected nodes */}
      <defs>
        <radialGradient
          id={`selected-gradient-${concept.id}`}
          cx="0.5"
          cy="0.5"
          r="0.5"
          fx="0.5"
          fy="0.5"
        >
          <stop
            offset="0%"
            stopColor={
              concept.mastery === 'mastered'
                ? '#10B981' // green-500 lighter
                : concept.mastery === 'review'
                ? '#F59E0B' // yellow-500 lighter
                : '#EF4444' // red-500 lighter
            }
          />
          <stop
            offset="100%"
            stopColor={
              concept.mastery === 'mastered'
                ? '#047857' // green-700 darker
                : concept.mastery === 'review'
                ? '#B45309' // yellow-700 darker
                : '#B91C1C' // red-700 darker
            }
          />
        </radialGradient>
      </defs>
      
      {/* Text */}
      <text
        textAnchor="middle"
        dy=".3em"
        className={`fill-white font-medium ${fontSize} select-none pointer-events-none`}
      >
        {concept.title.length > 20 
          ? `${concept.title.substring(0, 18)}...` 
          : concept.title}
      </text>
      
      {/* Subject badge - only if not selected to avoid clutter */}
      {!isSelected && (
        <foreignObject
          width="80"
          height="20"
          x="-40"
          y={nodeSize + 5}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="px-2 py-0.5 bg-white bg-opacity-90 rounded-full text-xs shadow-sm">
              {concept.subject}
            </div>
          </div>
        </foreignObject>
      )}
      
      {/* Pulsing animation for selected nodes */}
      {isSelected && (
        <circle
          r={nodeSize + 5}
          className="fill-none stroke-purple-500 stroke-2 opacity-0 animate-pulse-ring"
        />
      )}
    </g>
  );
};

export default ConceptNode;