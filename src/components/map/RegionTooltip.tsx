import { Faction, MapRegion } from '../../types';

interface Props {
  region: MapRegion;
  controllingFaction?: Faction;
  mousePosition?: { x: number; y: number } | null;
}

const RegionTooltip = ({ region, controllingFaction, mousePosition }: Props) => {
  if (!mousePosition) return null;

  return (
    <div
      className="absolute z-20 pointer-events-none text-sm text-white"
      style={{ left: mousePosition.x + 16, top: mousePosition.y + 16 }}
    >
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-600 rounded-lg px-4 py-3 shadow-xl max-w-xs">
        <div className="flex items-start gap-3">
          {controllingFaction && (
            <div
              className="w-4 h-4 rounded-sm flex-shrink-0 mt-0.5 border border-white/20"
              style={{ backgroundColor: controllingFaction.color }}
            />
          )}
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.18em] text-pax-muted mb-0.5">Region</p>
            <p className="font-semibold text-white leading-tight text-base">{region.name}</p>
            {controllingFaction ? (
              <div className="mt-2 space-y-1">
                <p className="text-xs text-slate-300">
                  Controlled by <span className="font-medium text-white">{controllingFaction.name}</span>
                </p>
                <p className="text-[11px] text-slate-400">{controllingFaction.description}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 mt-1.5">Uncontrolled territory</p>
            )}
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center gap-2 text-[10px] text-slate-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Click to select
        </div>
      </div>
    </div>
  );
};

export default RegionTooltip;
