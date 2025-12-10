import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { presetGroupings } from '../data/presets';
import { PresetCategory } from '../types';

const PresetsScreen = () => {
  const [category, setCategory] = useState<PresetCategory>('Historical');
  const navigate = useNavigate();

  const grouping = useMemo(() => presetGroupings.find((g) => g.category === category), [category]);

  const handlePlay = (scenarioId: string) => {
    navigate('/game', { state: { scenarioId } });
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Browse</p>
        <h2 className="text-xl font-semibold text-white">Preset library</h2>
        <div className="flex gap-2 mt-3 flex-wrap">
          {(['Historical', 'AltHistorical', 'HistoricalFiction', 'ScienceFiction', 'Fantasy', 'CreatorTemplates'] as PresetCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-md text-sm border ${
                cat === category ? 'bg-pax-gold text-slate-900 border-pax-gold' : 'border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {grouping &&
          Object.entries(grouping.byEra)
            .filter(([, list]) => list.length > 0)
            .map(([era, list]) => (
              <div key={era} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">{category}</p>
                    <h3 className="text-lg font-semibold text-white">{era}</h3>
                  </div>
                  <span className="text-xs text-slate-400">{list.length} scenario(s)</span>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {list.map((scenario) => (
                    <div key={scenario.id} className="border border-slate-800 rounded-lg p-3 bg-slate-800/40">
                      <h4 className="text-white font-semibold">{scenario.title}</h4>
                      <p className="text-sm text-slate-300">{scenario.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[11px] px-2 py-1 rounded-full bg-slate-900 text-pax-muted">{scenario.region}</span>
                        <span className="text-[11px] px-2 py-1 rounded-full bg-slate-900 text-pax-muted">Year {scenario.yearStart}</span>
                      </div>
                      <button
                        onClick={() => handlePlay(scenario.id)}
                        className="mt-3 px-3 py-2 bg-pax-gold text-slate-900 rounded-md text-sm font-semibold"
                      >
                        Play this scenario
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        {!grouping && (
          <div className="text-slate-300">No presets available.</div>
        )}
      </div>
    </div>
  );
};

export default PresetsScreen;
