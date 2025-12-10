import { MouseEvent, useMemo, useRef, useState } from 'react';
import MAP_REGIONS from '../../data/mapRegions';
import { Faction, GameState, MapRegion, Scenario } from '../../types';
import RegionTooltip from './RegionTooltip';

interface Props {
  scenario: Scenario | null;
  gameState: GameState | null;
}

const neutralFill = '#1f2937';

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

const GameMap = ({ scenario, gameState }: Props) => {
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const activeScenario = scenario && gameState && gameState.scenario.id === scenario.id ? scenario : null;
  const control = activeScenario && gameState ? gameState.regionsControl : {};

  const hoveredRegion = useMemo(
    () => MAP_REGIONS.find((r) => r.id === hoveredRegionId) ?? null,
    [hoveredRegionId]
  );

  const hoveredFaction: Faction | undefined = useMemo(() => {
    if (!hoveredRegion || !activeScenario) return undefined;
    const factionId = control[hoveredRegion.id];
    if (!factionId) return undefined;
    return activeScenario.factions.find((f) => f.id === factionId);
  }, [hoveredRegion, activeScenario, control]);

  const handleHover = (regionId: string, event: MouseEvent<SVGPathElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setHoveredRegionId(regionId);
    setHoverPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const handleLeave = () => {
    setHoveredRegionId(null);
    setHoverPosition(null);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-white relative" ref={wrapperRef}>
      <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Political Map</p>
      <h3 className="text-lg font-semibold mb-2">Strategic Regions</h3>
      <div className="relative">
        <svg viewBox="0 0 1000 600" className="w-full h-[360px] rounded-lg bg-slate-950 border border-slate-800">
          {MAP_REGIONS.map((region) => {
            const factionId = control[region.id];
            const faction = activeScenario?.factions.find((f) => f.id === factionId);
            const fill = faction ? faction.color : neutralFill;
            const path = pathFromPolygon(region.polygon);
            const selected = selectedRegionId === region.id;
            const labelPos = computeLabelPosition(region);
            return (
              <g key={region.id}>
                <path
                  d={path}
                  className="transition transform hover:scale-[1.01]"
                  fill={fill}
                  fillOpacity={faction ? 0.9 : 0.5}
                  stroke="#0f172a"
                  strokeWidth={selected ? 3 : 1.5}
                  onMouseEnter={(e) => handleHover(region.id, e)}
                  onMouseMove={(e) => handleHover(region.id, e)}
                  onMouseLeave={handleLeave}
                  onClick={() => setSelectedRegionId(region.id)}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  className="fill-white text-[10px] uppercase tracking-[0.14em] pointer-events-none select-none"
                  textAnchor="middle"
                >
                  {region.name}
                </text>
              </g>
            );
          })}
        </svg>
        {!activeScenario && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-300 bg-slate-950/60 backdrop-blur-[1px] rounded-lg">
            Start a game to see control of regions
          </div>
        )}
      </div>
      {hoveredRegion && (
        <RegionTooltip region={hoveredRegion} controllingFaction={hoveredFaction} mousePosition={hoverPosition} />
      )}
    </div>
  );
};

export default GameMap;
