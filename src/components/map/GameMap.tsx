import { MouseEvent, useCallback, useMemo, useRef, useState, WheelEvent } from 'react';
import MAP_REGIONS from '../../data/mapRegions';
import { Faction, GameState, MapRegion, Scenario } from '../../types';
import RegionTooltip from './RegionTooltip';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import TimelineSlider from './TimelineSlider';

interface Props {
  scenario: Scenario | null;
  gameState: GameState | null;
}

const neutralFill = '#1f2937';
const seaColor = '#0c4a6e';
const landBaseColor = '#374151';

const pathFromPolygon = (points: [number, number][]) =>
  points.reduce((acc, [x, y], index) => `${acc}${index === 0 ? 'M' : 'L'}${x},${y} `, '') + 'Z';

const computeLabelPosition = (region: MapRegion) => {
  if (region.labelPosition) return region.labelPosition;
  const total = region.polygon.reduce(
    (acc, [x, y]) => ({ x: acc.x + x, y: acc.y + y }),
    { x: 0, y: 0 }
  );
  const count = region.polygon.length || 1;
  return { x: total.x / count, y: total.y / count };
};

// Historical snapshots - region control at different years
const historicalSnapshots: Record<number, Record<string, string>> = {
  1936: {
    'western-isles': 'allied',
    'northern-shield': 'allied',
    'fjord-coast': 'allied',
    'northern-kingdom': 'allied',
    'lowland-marches': 'neutral',
    'central-plains': 'axis',
    'riverheart': 'axis',
    'alpine-league': 'neutral',
    'coastal-reaches': 'allied',
    'sunlit-basin': 'allied',
    'southern-coast': 'axis',
    'peninsula-realm': 'axis',
    'alabaster-isles': 'allied',
    'dune-coast': 'allied',
    'eastern-steppe': 'soviet',
    'northern-frontier': 'soviet',
    'amber-coast': 'neutral',
    'great-ridge': 'neutral',
    'central-arch': 'neutral',
    'southern-passes': 'neutral',
    'burnt-desert': 'neutral',
    'southern-deltas': 'neutral',
    'mirror-sea': 'neutral',
    'crescent-gulf': 'neutral',
    'desert-throne': 'neutral',
    'eastern-hinterlands': 'soviet',
    'oriental-trade': 'neutral'
  },
  1939: {
    'western-isles': 'allied',
    'northern-shield': 'allied',
    'fjord-coast': 'allied',
    'northern-kingdom': 'allied',
    'lowland-marches': 'axis',
    'central-plains': 'axis',
    'riverheart': 'axis',
    'alpine-league': 'axis',
    'coastal-reaches': 'allied',
    'sunlit-basin': 'allied',
    'southern-coast': 'axis',
    'peninsula-realm': 'axis',
    'alabaster-isles': 'allied',
    'dune-coast': 'allied',
    'eastern-steppe': 'soviet',
    'northern-frontier': 'soviet',
    'amber-coast': 'axis',
    'great-ridge': 'soviet',
    'central-arch': 'neutral',
    'southern-passes': 'neutral',
    'burnt-desert': 'neutral',
    'southern-deltas': 'neutral',
    'mirror-sea': 'neutral',
    'crescent-gulf': 'neutral',
    'desert-throne': 'neutral',
    'eastern-hinterlands': 'soviet',
    'oriental-trade': 'neutral'
  },
  1941: {
    'western-isles': 'allied',
    'northern-shield': 'axis',
    'fjord-coast': 'axis',
    'northern-kingdom': 'axis',
    'lowland-marches': 'axis',
    'central-plains': 'axis',
    'riverheart': 'axis',
    'alpine-league': 'axis',
    'coastal-reaches': 'axis',
    'sunlit-basin': 'axis',
    'southern-coast': 'axis',
    'peninsula-realm': 'axis',
    'alabaster-isles': 'allied',
    'dune-coast': 'axis',
    'eastern-steppe': 'axis',
    'northern-frontier': 'soviet',
    'amber-coast': 'axis',
    'great-ridge': 'axis',
    'central-arch': 'axis',
    'southern-passes': 'axis',
    'burnt-desert': 'neutral',
    'southern-deltas': 'axis',
    'mirror-sea': 'axis',
    'crescent-gulf': 'axis',
    'desert-throne': 'axis',
    'eastern-hinterlands': 'soviet',
    'oriental-trade': 'neutral'
  },
  1943: {
    'western-isles': 'allied',
    'northern-shield': 'axis',
    'fjord-coast': 'axis',
    'northern-kingdom': 'axis',
    'lowland-marches': 'axis',
    'central-plains': 'axis',
    'riverheart': 'axis',
    'alpine-league': 'axis',
    'coastal-reaches': 'axis',
    'sunlit-basin': 'allied',
    'southern-coast': 'allied',
    'peninsula-realm': 'allied',
    'alabaster-isles': 'allied',
    'dune-coast': 'allied',
    'eastern-steppe': 'soviet',
    'northern-frontier': 'soviet',
    'amber-coast': 'axis',
    'great-ridge': 'soviet',
    'central-arch': 'neutral',
    'southern-passes': 'neutral',
    'burnt-desert': 'neutral',
    'southern-deltas': 'allied',
    'mirror-sea': 'allied',
    'crescent-gulf': 'neutral',
    'desert-throne': 'allied',
    'eastern-hinterlands': 'soviet',
    'oriental-trade': 'neutral'
  },
  1945: {
    'western-isles': 'allied',
    'northern-shield': 'allied',
    'fjord-coast': 'allied',
    'northern-kingdom': 'allied',
    'lowland-marches': 'allied',
    'central-plains': 'soviet',
    'riverheart': 'soviet',
    'alpine-league': 'allied',
    'coastal-reaches': 'allied',
    'sunlit-basin': 'allied',
    'southern-coast': 'allied',
    'peninsula-realm': 'allied',
    'alabaster-isles': 'allied',
    'dune-coast': 'allied',
    'eastern-steppe': 'soviet',
    'northern-frontier': 'soviet',
    'amber-coast': 'soviet',
    'great-ridge': 'soviet',
    'central-arch': 'soviet',
    'southern-passes': 'soviet',
    'burnt-desert': 'neutral',
    'southern-deltas': 'allied',
    'mirror-sea': 'allied',
    'crescent-gulf': 'neutral',
    'desert-throne': 'allied',
    'eastern-hinterlands': 'soviet',
    'oriental-trade': 'neutral'
  }
};

const defaultFactions: Faction[] = [
  { id: 'allied', name: 'Allied Powers', color: '#3b82f6', description: 'Western democracies', relations: 0 },
  { id: 'axis', name: 'Axis Powers', color: '#ef4444', description: 'Fascist regimes', relations: 0 },
  { id: 'soviet', name: 'Soviet Union', color: '#dc2626', description: 'Communist bloc', relations: 0 },
  { id: 'neutral', name: 'Neutral', color: '#6b7280', description: 'Non-aligned nations', relations: 0 }
];

const timelineYears = [1936, 1939, 1941, 1943, 1945];

const GameMap = ({ scenario, gameState }: Props) => {
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [timelineYear, setTimelineYear] = useState(1939);
  const [showTimeline, setShowTimeline] = useState(true);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeScenario = scenario && gameState && gameState.scenario.id === scenario.id ? scenario : null;

  // Use game state control if active, otherwise use historical timeline
  const control = useMemo(() => {
    if (activeScenario && gameState) {
      return gameState.regionsControl;
    }
    // Find closest year in snapshots
    const years = Object.keys(historicalSnapshots).map(Number).sort((a, b) => a - b);
    const closestYear = years.reduce((prev, curr) =>
      Math.abs(curr - timelineYear) < Math.abs(prev - timelineYear) ? curr : prev
    );
    return historicalSnapshots[closestYear] || {};
  }, [activeScenario, gameState, timelineYear]);

  const factions = activeScenario?.factions ?? defaultFactions;

  const hoveredRegion = useMemo(
    () => MAP_REGIONS.find((r) => r.id === hoveredRegionId) ?? null,
    [hoveredRegionId]
  );

  const hoveredFaction: Faction | undefined = useMemo(() => {
    if (!hoveredRegion) return undefined;
    const factionId = control[hoveredRegion.id];
    if (!factionId) return undefined;
    return factions.find((f) => f.id === factionId);
  }, [hoveredRegion, factions, control]);

  const handleHover = (regionId: string, event: MouseEvent<SVGPathElement>) => {
    if (isDragging) return;
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setHoveredRegionId(regionId);
    setHoverPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const handleLeave = () => {
    setHoveredRegionId(null);
    setHoverPosition(null);
  };

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev * 1.3, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev / 1.3, 0.5));
  }, []);

  const handleResetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.min(Math.max(prev * delta, 0.5), 4));
  }, []);

  // Pan controls
  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Calculate region statistics
  const regionStats = useMemo(() => {
    const stats: Record<string, number> = {};
    factions.forEach(f => { stats[f.id] = 0; });
    MAP_REGIONS.forEach(region => {
      const factionId = control[region.id];
      if (factionId && stats[factionId] !== undefined) {
        stats[factionId]++;
      }
    });
    return stats;
  }, [control, factions]);

  const viewBox = `0 0 1000 600`;
  const transform = `translate(${pan.x}, ${pan.y}) scale(${zoom})`;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-white relative overflow-hidden" ref={wrapperRef}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Political Map</p>
          <h3 className="text-lg font-semibold">
            {activeScenario ? 'Strategic Regions' : `World in ${timelineYear}`}
          </h3>
        </div>
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleResetView}
          zoom={zoom}
        />
      </div>

      <div
        className="relative cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="w-full h-[400px] rounded-lg bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800"
          style={{ overflow: 'hidden' }}
        >
          {/* Background patterns */}
          <defs>
            <pattern id="sea-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <circle cx="10" cy="10" r="1" fill="#164e63" opacity="0.3"/>
            </pattern>
            <pattern id="grid-pattern" patternUnits="userSpaceOnUse" width="50" height="50">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="shadow">
              <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3"/>
            </filter>
            <linearGradient id="ocean-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c4a6e"/>
              <stop offset="50%" stopColor="#0e7490"/>
              <stop offset="100%" stopColor="#0c4a6e"/>
            </linearGradient>
          </defs>

          <g transform={transform}>
            {/* Ocean background */}
            <rect x="-100" y="-100" width="1200" height="800" fill="url(#ocean-gradient)" />
            <rect x="-100" y="-100" width="1200" height="800" fill="url(#sea-pattern)" />
            <rect x="-100" y="-100" width="1200" height="800" fill="url(#grid-pattern)" />

            {/* Regions */}
            {MAP_REGIONS.map((region) => {
              const factionId = control[region.id];
              const faction = factions.find((f) => f.id === factionId);
              const fill = faction ? faction.color : landBaseColor;
              const path = pathFromPolygon(region.polygon);
              const selected = selectedRegionId === region.id;
              const hovered = hoveredRegionId === region.id;
              const labelPos = computeLabelPosition(region);

              return (
                <g key={region.id} className="transition-all duration-300">
                  {/* Region shadow */}
                  <path
                    d={path}
                    fill="#000"
                    fillOpacity={0.3}
                    transform="translate(2, 2)"
                  />
                  {/* Region fill */}
                  <path
                    d={path}
                    className="transition-all duration-200"
                    fill={fill}
                    fillOpacity={faction ? 0.85 : 0.6}
                    stroke={hovered || selected ? '#f3c969' : '#1e293b'}
                    strokeWidth={selected ? 3 : hovered ? 2 : 1}
                    filter={hovered ? 'url(#glow)' : undefined}
                    style={{
                      transform: hovered ? 'scale(1.01)' : 'scale(1)',
                      transformOrigin: `${labelPos.x}px ${labelPos.y}px`
                    }}
                    onMouseEnter={(e) => handleHover(region.id, e)}
                    onMouseMove={(e) => handleHover(region.id, e)}
                    onMouseLeave={handleLeave}
                    onClick={() => setSelectedRegionId(region.id === selectedRegionId ? null : region.id)}
                  />
                  {/* Region border highlight */}
                  <path
                    d={path}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="0.5"
                    strokeOpacity={0.1}
                    pointerEvents="none"
                  />
                  {/* Region label */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    className="fill-white text-[8px] uppercase tracking-[0.1em] pointer-events-none select-none"
                    textAnchor="middle"
                    filter="url(#shadow)"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                  >
                    {region.name}
                  </text>
                  {/* Capital marker for controlled regions */}
                  {faction && (
                    <circle
                      cx={labelPos.x}
                      cy={labelPos.y + 12}
                      r={3}
                      fill={faction.color}
                      stroke="#fff"
                      strokeWidth={1}
                      opacity={0.8}
                      className="pointer-events-none"
                    />
                  )}
                </g>
              );
            })}

            {/* Compass rose */}
            <g transform="translate(920, 520)" opacity="0.6">
              <circle cx="0" cy="0" r="25" fill="none" stroke="#64748b" strokeWidth="1"/>
              <path d="M0,-20 L3,-5 L0,-8 L-3,-5 Z" fill="#f3c969"/>
              <path d="M0,20 L3,5 L0,8 L-3,5 Z" fill="#64748b"/>
              <path d="M20,0 L5,3 L8,0 L5,-3 Z" fill="#64748b"/>
              <path d="M-20,0 L-5,3 L-8,0 L-5,-3 Z" fill="#64748b"/>
              <text x="0" y="-30" textAnchor="middle" className="fill-pax-gold text-[8px]">N</text>
            </g>
          </g>
        </svg>

        {/* Legend overlay */}
        <MapLegend factions={factions} regionStats={regionStats} />

        {/* No scenario overlay */}
        {!activeScenario && !showTimeline && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-300 bg-slate-950/60 backdrop-blur-[1px] rounded-lg">
            Start a game to see control of regions
          </div>
        )}
      </div>

      {/* Timeline slider - only show when no active game */}
      {!activeScenario && (
        <TimelineSlider
          years={timelineYears}
          currentYear={timelineYear}
          onChange={setTimelineYear}
          visible={showTimeline}
          onToggle={() => setShowTimeline(!showTimeline)}
        />
      )}

      {/* Tooltip */}
      {hoveredRegion && (
        <RegionTooltip
          region={hoveredRegion}
          controllingFaction={hoveredFaction}
          mousePosition={hoverPosition}
        />
      )}
    </div>
  );
};

export default GameMap;
