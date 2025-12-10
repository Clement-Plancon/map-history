import { GameChoice, GameEvent, GameState } from '../../types';

interface Props {
  currentEvent: GameEvent | null;
  onChoose: (choice: GameChoice) => void;
  gameState: GameState | null;
}

const formatImpact = (changes: GameChoice['statChanges']) =>
  Object.entries(changes)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key} ${value && value > 0 ? '+' : ''}${value}`)
    .join(', ');

const TurnActions = ({ currentEvent, onChoose, gameState }: Props) => {
  const disabled = !gameState || !currentEvent || gameState.isGameOver;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-pax-muted">Current decision</p>
        <h3 className="text-white font-semibold text-lg">{currentEvent ? currentEvent.title : 'Awaiting start'}</h3>
        <p className="text-sm text-slate-300">{currentEvent?.flavorText ?? 'Start a scenario to see events here.'}</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {currentEvent?.choices.map((choice) => (
          <button
            key={choice.id}
            disabled={disabled}
            onClick={() => onChoose(choice)}
            className={`text-left border rounded-lg px-3 py-3 transition-colors ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-pax-gold/80 hover:bg-pax-gold/10'
            } border-slate-800 bg-slate-800/40`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">{choice.label}</p>
                <p className="text-sm text-slate-300">{choice.description}</p>
              </div>
              <span className="text-xs text-pax-muted">{formatImpact(choice.statChanges)}</span>
            </div>
          </button>
        ))}
        {!currentEvent && <p className="text-sm text-slate-400">No event queued.</p>}
      </div>
    </div>
  );
};

export default TurnActions;
