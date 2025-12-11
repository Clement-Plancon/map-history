import { Faction } from '../../types';

interface Props {
  factions: Faction[];
  regionStats: Record<string, number>;
}

const MapLegend = ({ factions, regionStats }: Props) => {
  const totalRegions = Object.values(regionStats).reduce((a, b) => a + b, 0);

  return (
    <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-slate-700 p-3 max-w-[200px]">
      <p className="text-[10px] uppercase tracking-wider text-pax-muted mb-2">Legend</p>
      <div className="space-y-1.5">
        {factions.map((faction) => {
          const count = regionStats[faction.id] || 0;
          const percentage = totalRegions > 0 ? Math.round((count / totalRegions) * 100) : 0;

          return (
            <div key={faction.id} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: faction.color }}
              />
              <span className="text-[11px] text-slate-300 flex-1 truncate">
                {faction.name}
              </span>
              <span className="text-[10px] text-pax-muted">
                {count} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 pt-2 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-slate-600 flex-shrink-0" />
          <span className="text-[11px] text-slate-400">Uncontrolled</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
