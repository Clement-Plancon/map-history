import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import historicalEras, { HistoricalEra, Nation } from '../../data/worldMapData';

interface Props {
  initialYear?: number;
}

const WorldMap = ({ initialYear = 1936 }: Props) => {
  const [currentEra, setCurrentEra] = useState<HistoricalEra>(() =>
    historicalEras.find(e => e.year === initialYear) || historicalEras[0]
  );
  const [hoveredNation, setHoveredNation] = useState<Nation | null>(null);
  const [selectedNation, setSelectedNation] = useState<Nation | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play timeline
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentEra(prev => {
          const currentIndex = historicalEras.findIndex(e => e.year === prev.year);
          if (currentIndex < historicalEras.length - 1) {
            return historicalEras[currentIndex + 1];
          }
          setIsPlaying(false);
          return prev;
        });
      }, 2000);
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  // Zoom handlers
  const handleZoomIn = useCallback(() => setZoom(z => Math.min(z * 1.3, 5)), []);
  const handleZoomOut = useCallback(() => setZoom(z => Math.max(z / 1.3, 0.5)), []);
  const handleResetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(z => Math.min(Math.max(z * delta, 0.5), 5));
  }, []);

  // Pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  // Era selection
  const selectEra = useCallback((year: number) => {
    const era = historicalEras.find(e => e.year === year);
    if (era) setCurrentEra(era);
  }, []);

  const stepForward = useCallback(() => {
    const idx = historicalEras.findIndex(e => e.year === currentEra.year);
    if (idx < historicalEras.length - 1) setCurrentEra(historicalEras[idx + 1]);
  }, [currentEra]);

  const stepBackward = useCallback(() => {
    const idx = historicalEras.findIndex(e => e.year === currentEra.year);
    if (idx > 0) setCurrentEra(historicalEras[idx - 1]);
  }, [currentEra]);

  // Count nations by type
  const nationStats = useMemo(() => {
    return currentEra.nations.length;
  }, [currentEra]);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-pax-gold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              World History Map
            </h2>
            <p className="text-sm text-slate-400">{currentEra.name} - {currentEra.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomOut} className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button onClick={handleZoomIn} className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button onClick={handleResetView} className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={containerRef}
        className="relative h-[500px] cursor-grab active:cursor-grabbing overflow-hidden bg-[#1a3a5c]"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Definitions */}
          <defs>
            {/* Paper texture pattern */}
            <pattern id="paper-texture" patternUnits="userSpaceOnUse" width="100" height="100">
              <rect width="100" height="100" fill="#1a3a5c"/>
              <circle cx="10" cy="10" r="0.5" fill="#143050" opacity="0.5"/>
              <circle cx="30" cy="50" r="0.5" fill="#143050" opacity="0.5"/>
              <circle cx="70" cy="30" r="0.5" fill="#143050" opacity="0.5"/>
              <circle cx="90" cy="80" r="0.5" fill="#143050" opacity="0.5"/>
            </pattern>

            {/* Grid pattern */}
            <pattern id="map-grid" patternUnits="userSpaceOnUse" width="50" height="50">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#234567" strokeWidth="0.3" opacity="0.5"/>
            </pattern>

            {/* Nation border glow */}
            <filter id="nation-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Drop shadow */}
            <filter id="drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.4"/>
            </filter>

            {/* Highlight for selected */}
            <filter id="highlight">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feFlood floodColor="#f3c969" floodOpacity="0.6"/>
              <feComposite in2="blur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Ocean background */}
          <rect x="-500" y="-300" width="2000" height="1200" fill="url(#paper-texture)"/>
          <rect x="-500" y="-300" width="2000" height="1200" fill="url(#map-grid)"/>

          {/* Latitude/Longitude lines */}
          <g stroke="#2a4a6a" strokeWidth="0.5" opacity="0.4">
            {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(x => (
              <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2="600"/>
            ))}
            {[0, 100, 200, 300, 400, 500, 600].map(y => (
              <line key={`lat-${y}`} x1="0" y1={y} x2="1000" y2={y}/>
            ))}
          </g>

          {/* Nations */}
          {currentEra.nations.map((nation) => {
            const isHovered = hoveredNation?.id === nation.id;
            const isSelected = selectedNation?.id === nation.id;

            return (
              <g key={nation.id}>
                {/* Nation territory */}
                <path
                  d={nation.path}
                  fill={nation.color}
                  fillOpacity={isHovered ? 1 : 0.85}
                  stroke={isSelected ? '#f3c969' : isHovered ? '#ffffff' : '#1a1a1a'}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 1.5 : 1}
                  filter={isSelected ? 'url(#highlight)' : isHovered ? 'url(#nation-glow)' : undefined}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredNation(nation)}
                  onMouseLeave={() => setHoveredNation(null)}
                  onClick={() => setSelectedNation(nation === selectedNation ? null : nation)}
                />

                {/* Nation name label */}
                {nation.labelPos && (
                  <text
                    x={nation.labelPos.x}
                    y={nation.labelPos.y}
                    className="pointer-events-none select-none"
                    fill="#ffffff"
                    fontSize={isHovered || isSelected ? "9" : "7"}
                    fontWeight={isHovered || isSelected ? "bold" : "normal"}
                    textAnchor="middle"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8)' }}
                  >
                    {nation.name.length > 15 ? nation.name.substring(0, 12) + '...' : nation.name}
                  </text>
                )}

                {/* Capital marker */}
                {nation.capital && (
                  <g className="pointer-events-none">
                    <circle
                      cx={nation.capital.x}
                      cy={nation.capital.y}
                      r={isHovered || isSelected ? 4 : 3}
                      fill="#f3c969"
                      stroke="#1a1a1a"
                      strokeWidth={1}
                    />
                    {(isHovered || isSelected) && (
                      <text
                        x={nation.capital.x}
                        y={nation.capital.y - 8}
                        fill="#f3c969"
                        fontSize="6"
                        textAnchor="middle"
                        style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.9)' }}
                      >
                        {nation.capital.name}
                      </text>
                    )}
                  </g>
                )}
              </g>
            );
          })}

          {/* Compass Rose */}
          <g transform="translate(940, 540)">
            <circle cx="0" cy="0" r="30" fill="rgba(15,23,42,0.8)" stroke="#64748b" strokeWidth="1"/>
            <polygon points="0,-25 4,-8 0,-12 -4,-8" fill="#f3c969"/>
            <polygon points="0,25 4,8 0,12 -4,8" fill="#64748b"/>
            <polygon points="25,0 8,4 12,0 8,-4" fill="#64748b"/>
            <polygon points="-25,0 -8,4 -12,0 -8,-4" fill="#64748b"/>
            <text x="0" y="-32" fill="#f3c969" fontSize="8" textAnchor="middle" fontWeight="bold">N</text>
            <text x="0" y="40" fill="#64748b" fontSize="6" textAnchor="middle">S</text>
            <text x="32" y="3" fill="#64748b" fontSize="6" textAnchor="middle">E</text>
            <text x="-32" y="3" fill="#64748b" fontSize="6" textAnchor="middle">W</text>
          </g>

          {/* Year indicator */}
          <g transform="translate(50, 40)">
            <rect x="-30" y="-25" width="100" height="45" rx="5" fill="rgba(15,23,42,0.9)" stroke="#f3c969" strokeWidth="1"/>
            <text x="20" y="0" fill="#f3c969" fontSize="24" fontWeight="bold" textAnchor="middle">{currentEra.year}</text>
            <text x="20" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">A.D.</text>
          </g>
        </svg>

        {/* Hover tooltip */}
        {hoveredNation && (
          <div
            className="absolute pointer-events-none bg-slate-900/95 backdrop-blur-sm border border-slate-600 rounded-lg px-4 py-3 shadow-xl z-50"
            style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded border border-white/20"
                style={{ backgroundColor: hoveredNation.color }}
              />
              <div>
                <p className="font-bold text-white">{hoveredNation.name}</p>
                {hoveredNation.capital && (
                  <p className="text-xs text-pax-gold">Capital: {hoveredNation.capital.name}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-slate-700 p-3 max-w-[220px]">
          <p className="text-xs uppercase tracking-wider text-pax-gold mb-2 font-semibold">Nations ({nationStats})</p>
          <div className="grid grid-cols-2 gap-1 max-h-[150px] overflow-y-auto scrollbar">
            {currentEra.nations.slice(0, 12).map(nation => (
              <button
                key={nation.id}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-left transition-colors ${
                  selectedNation?.id === nation.id ? 'bg-slate-700' : 'hover:bg-slate-800'
                }`}
                onClick={() => setSelectedNation(nation === selectedNation ? null : nation)}
              >
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: nation.color }}
                />
                <span className="text-[10px] text-slate-300 truncate">
                  {nation.name.length > 12 ? nation.name.substring(0, 10) + '..' : nation.name}
                </span>
              </button>
            ))}
          </div>
          {currentEra.nations.length > 12 && (
            <p className="text-[10px] text-slate-500 mt-1">+{currentEra.nations.length - 12} more</p>
          )}
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-4 border-t border-slate-700">
        <div className="flex items-center gap-4">
          {/* Playback controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={stepBackward}
              disabled={currentEra.year === historicalEras[0].year}
              className="p-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 rounded text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-pax-gold hover:bg-pax-gold/80 rounded text-slate-900 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <button
              onClick={stepForward}
              disabled={currentEra.year === historicalEras[historicalEras.length - 1].year}
              className="p-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 rounded text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>

          {/* Timeline */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              {historicalEras.map((era, idx) => (
                <button
                  key={era.year}
                  onClick={() => selectEra(era.year)}
                  className={`flex flex-col items-center transition-all ${
                    currentEra.year === era.year
                      ? 'text-pax-gold scale-110'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-lg font-bold">{era.year}</span>
                  <span className="text-[10px]">{era.name}</span>
                </button>
              ))}
            </div>
            <div className="relative h-2 bg-slate-700 rounded-full">
              <div
                className="absolute h-full bg-pax-gold rounded-full transition-all duration-500"
                style={{
                  width: `${((historicalEras.findIndex(e => e.year === currentEra.year)) / (historicalEras.length - 1)) * 100}%`
                }}
              />
              {historicalEras.map((era, idx) => (
                <button
                  key={era.year}
                  onClick={() => selectEra(era.year)}
                  className={`absolute w-4 h-4 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/4 transition-all ${
                    currentEra.year === era.year
                      ? 'bg-pax-gold border-white scale-125'
                      : historicalEras.findIndex(e => e.year === currentEra.year) >= idx
                        ? 'bg-pax-gold border-slate-600'
                        : 'bg-slate-600 border-slate-500 hover:bg-slate-500'
                  }`}
                  style={{ left: `${(idx / (historicalEras.length - 1)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Era description */}
        <p className="text-sm text-slate-400 mt-3 text-center italic">
          "{currentEra.description}"
        </p>
      </div>
    </div>
  );
};

export default WorldMap;
