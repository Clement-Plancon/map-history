interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  zoom: number;
}

const MapControls = ({ onZoomIn, onZoomOut, onReset, zoom }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-pax-muted mr-2">{Math.round(zoom * 100)}%</span>
      <button
        onClick={onZoomOut}
        className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-white transition-colors"
        title="Zoom out"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <button
        onClick={onZoomIn}
        className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-white transition-colors"
        title="Zoom in"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button
        onClick={onReset}
        className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-white transition-colors"
        title="Reset view"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
        </svg>
      </button>
    </div>
  );
};

export default MapControls;
