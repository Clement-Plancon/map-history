import { useMemo } from 'react';
import scenarios from '../../data/scenarios';
import { Scenario } from '../../types';

interface Props {
  selectedId: string | null;
  onSelect: (scenario: Scenario) => void;
  onStart: () => void;
  onContinue?: () => void;
  hasSave: boolean;
}

const ScenarioSelector = ({ selectedId, onSelect, onStart, onContinue, hasSave }: Props) => {
  const selected = useMemo(() => scenarios.find((s) => s.id === selectedId) ?? scenarios[0], [selectedId]);

  const cardClass = (scenario: Scenario) =>
    `text-left rounded-lg border transition-colors p-3 ${
      selected.id === scenario.id ? 'border-pax-gold/80 bg-pax-gold/10' : 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
    }`;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Scenario</p>
          <h2 className="text-lg font-semibold text-white">Choose your timeline</h2>
        </div>
        <div className="flex gap-2">
          {hasSave && onContinue && (
            <button
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-sm"
              onClick={onContinue}
            >
              Continue last game
            </button>
          )}
          <button className="px-3 py-2 bg-pax-gold text-slate-900 font-semibold rounded-md text-sm" onClick={onStart}>
            Start game
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {scenarios.map((scenario) => (
          <button key={scenario.id} onClick={() => onSelect(scenario)} className={cardClass(scenario)}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-pax-muted uppercase tracking-[0.2em]">{scenario.era}</p>
                <h3 className="text-white font-semibold">{scenario.title}</h3>
                <p className="text-sm text-slate-300">{scenario.description}</p>
              </div>
              <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Turn limit: {scenario.turnLimit}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {scenario.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-1 bg-slate-800 text-pax-muted rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioSelector;
