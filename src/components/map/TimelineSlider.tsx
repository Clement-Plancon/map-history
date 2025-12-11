import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  years: number[];
  currentYear: number;
  onChange: (year: number) => void;
  visible: boolean;
  onToggle: () => void;
}

const TimelineSlider = ({ years, currentYear, onChange, visible, onToggle }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Snap to nearest available year
    const closest = years.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    onChange(closest);
  }, [years, onChange]);

  const playTimeline = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pauseTimeline = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stepForward = useCallback(() => {
    const currentIndex = years.indexOf(currentYear);
    if (currentIndex < years.length - 1) {
      onChange(years[currentIndex + 1]);
    }
  }, [years, currentYear, onChange]);

  const stepBackward = useCallback(() => {
    const currentIndex = years.indexOf(currentYear);
    if (currentIndex > 0) {
      onChange(years[currentIndex - 1]);
    }
  }, [years, currentYear, onChange]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const currentIndex = years.indexOf(currentYear);
        if (currentIndex < years.length - 1) {
          onChange(years[currentIndex + 1]);
        } else {
          setIsPlaying(false);
        }
      }, 1500);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentYear, years, onChange]);

  if (!visible) {
    return (
      <button
        onClick={onToggle}
        className="mt-3 text-xs text-pax-gold hover:text-pax-gold/80 flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Show Timeline
      </button>
    );
  }

  return (
    <div className="mt-4 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-pax-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs uppercase tracking-wider text-pax-muted">Historical Timeline</span>
        </div>
        <button
          onClick={onToggle}
          className="text-slate-400 hover:text-white transition-colors"
          title="Hide timeline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Playback controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={stepBackward}
            disabled={currentYear === minYear}
            className="w-7 h-7 flex items-center justify-center bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 rounded text-white transition-colors"
            title="Previous year"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            onClick={isPlaying ? pauseTimeline : playTimeline}
            className="w-8 h-8 flex items-center justify-center bg-pax-gold hover:bg-pax-gold/80 rounded text-slate-900 transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            onClick={stepForward}
            disabled={currentYear === maxYear}
            className="w-7 h-7 flex items-center justify-center bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 rounded text-white transition-colors"
            title="Next year"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>

        {/* Year display */}
        <div className="text-center min-w-[60px]">
          <span className="text-xl font-bold text-pax-gold">{currentYear}</span>
        </div>

        {/* Slider */}
        <div className="flex-1 relative">
          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={currentYear}
            onChange={handleSliderChange}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #f3c969 0%, #f3c969 ${((currentYear - minYear) / (maxYear - minYear)) * 100}%, #334155 ${((currentYear - minYear) / (maxYear - minYear)) * 100}%, #334155 100%)`
            }}
          />
          {/* Year markers */}
          <div className="flex justify-between mt-1 px-0.5">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => onChange(year)}
                className={`text-[10px] transition-colors ${
                  year === currentYear ? 'text-pax-gold font-semibold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Historical context */}
      <div className="mt-3 pt-2 border-t border-slate-700">
        <p className="text-xs text-slate-400">
          {currentYear === 1936 && 'Pre-war tensions rise across Europe. Germany remilitarizes the Rhineland.'}
          {currentYear === 1939 && 'World War II begins. Germany invades Poland.'}
          {currentYear === 1941 && 'Operation Barbarossa. Axis powers at peak expansion.'}
          {currentYear === 1943 && 'Turning point. Allied invasion of Italy. Stalingrad falls.'}
          {currentYear === 1945 && 'War ends. Allied victory. Europe divided.'}
        </p>
      </div>
    </div>
  );
};

export default TimelineSlider;
