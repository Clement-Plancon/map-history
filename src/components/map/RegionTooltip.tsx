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
      style={{ left: mousePosition.x + 12, top: mousePosition.y + 12 }}
    >
      <div className="bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 shadow-lg max-w-xs">
        <p className="text-xs uppercase tracking-[0.16em] text-pax-muted mb-1">Region</p>
        <p className="font-semibold text-white leading-tight">{region.name}</p>
        <p className="text-xs text-slate-300 mt-1">
          {controllingFaction ? `Controlled by ${controllingFaction.name}` : 'Unassigned territory'}
        </p>
      </div>
    </div>
  );
};

export default RegionTooltip;
