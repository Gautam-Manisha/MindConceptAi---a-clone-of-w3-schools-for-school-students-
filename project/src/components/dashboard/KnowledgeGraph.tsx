import React, { useEffect, useRef, useState } from 'react';
import { useGraph } from '../../context/GraphContext';
import ConceptNode from './ConceptNode';
import * as d3 from 'd3';
import { ConceptNode as ConceptNodeType } from '../../types';

const KnowledgeGraph: React.FC = () => {
  const { concepts, selectConcept, selectedConcept } = useGraph();
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [simulation, setSimulation] = useState<d3.Simulation<any, any> | null>(null);
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number, y: number }>>(new Map());

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: container.clientHeight
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Create and update simulation
  useEffect(() => {
    if (!svgRef.current || concepts.length === 0) return;

    // Create links from concepts
    const links: { source: string, target: string }[] = [];
    concepts.forEach(concept => {
      concept.relatedConcepts.forEach(relatedId => {
        // Only add links between concepts that are currently in the filtered list
        if (concepts.some(c => c.id === relatedId)) {
          links.push({
            source: concept.id,
            target: relatedId
          });
        }
      });
    });

    // Set up the simulation
    const sim = d3.forceSimulation(concepts)
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collision', d3.forceCollide().radius(60))
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(120));

    sim.on('tick', () => {
      const positions = new Map<string, { x: number, y: number }>();
      concepts.forEach(node => {
        const nodeData = sim.nodes().find((n: any) => n.id === node.id);
        if (nodeData) {
          positions.set(node.id, { 
            x: Math.max(60, Math.min(dimensions.width - 60, nodeData.x)), 
            y: Math.max(60, Math.min(dimensions.height - 60, nodeData.y)) 
          });
        }
      });
      setNodePositions(positions);
    });

    setSimulation(sim);

    return () => {
      sim.stop();
    };
  }, [concepts, dimensions]);

  // Draw lines between related concepts
  const renderLines = () => {
    return concepts.flatMap(concept => 
      concept.relatedConcepts
        .filter(relatedId => 
          // Only draw lines for visible nodes
          concepts.some(c => c.id === relatedId) &&
          // Avoid duplicate lines
          concept.id < relatedId
        )
        .map(relatedId => {
          const sourcePos = nodePositions.get(concept.id);
          const targetPos = nodePositions.get(relatedId);
          
          if (!sourcePos || !targetPos) return null;

          // Determine if this connection involves the selected concept
          const isHighlighted = selectedConcept && 
                              (concept.id === selectedConcept.id || 
                               relatedId === selectedConcept.id);
          
          return (
            <line
              key={`${concept.id}-${relatedId}`}
              x1={sourcePos.x}
              y1={sourcePos.y}
              x2={targetPos.x}
              y2={targetPos.y}
              stroke={isHighlighted ? '#4F46E5' : '#D1D5DB'}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeDasharray={isHighlighted ? 'none' : '4,4'}
              className="transition-all duration-300 ease-in-out"
            />
          );
        })
    ).filter(Boolean);
  };

  // Drag functionality
  const handleDragStart = (e: React.MouseEvent, id: string) => {
    if (!simulation) return;
    simulation.alphaTarget(0.3).restart();
    
    const dragNode = simulation.nodes().find((n: any) => n.id === id);
    if (!dragNode) return;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      dragNode.fx = moveEvent.clientX - svgRef.current!.getBoundingClientRect().left;
      dragNode.fy = moveEvent.clientY - svgRef.current!.getBoundingClientRect().top;
    };

    const handleMouseUp = () => {
      if (dragNode) {
        dragNode.fx = null;
        dragNode.fy = null;
      }
      
      simulation.alphaTarget(0);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle node click
  const handleNodeClick = (concept: ConceptNodeType) => {
    selectConcept(selectedConcept?.id === concept.id ? null : concept.id);
  };

  return (
    <div className="w-full h-full min-h-[600px] bg-gray-50 rounded-lg relative overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <g className="links">
          {renderLines()}
        </g>
        <g className="nodes">
          {concepts.map(concept => {
            const position = nodePositions.get(concept.id);
            if (!position) return null;

            return (
              <ConceptNode
                key={concept.id}
                concept={concept}
                x={position.x}
                y={position.y}
                isSelected={selectedConcept?.id === concept.id}
                onClick={() => handleNodeClick(concept)}
                onDragStart={(e) => handleDragStart(e, concept.id)}
              />
            );
          })}
        </g>
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md text-sm">
        <h4 className="font-semibold mb-2">Mastery Legend</h4>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span>Mastered</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
          <span>Needs Review</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span>Weak</span>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;