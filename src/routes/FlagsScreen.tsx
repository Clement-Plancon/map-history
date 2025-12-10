import { allFactions } from '../data/scenarios';

const FlagsScreen = () => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Visual legend</p>
        <h2 className="text-xl font-semibold text-white">Factions & Colors</h2>
        <p className="text-sm text-slate-300">Every scenario includes custom factions; use these swatches as your legend.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {allFactions.map((faction) => (
          <div key={faction.id} className="border border-slate-800 rounded-lg p-3 bg-slate-900/50 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-slate-700" style={{ backgroundColor: faction.color }} />
            <div>
              <p className="text-white font-semibold">{faction.name}</p>
              <p className="text-xs text-slate-300">{faction.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlagsScreen;
