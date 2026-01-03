import { MapPin, Zap, Crosshair } from "lucide-react";

const SafetyMap = () => {
  // Bhaskar Bhavan, Aditya University Coordinates
  const lat = 17.0891;
  const lng = 82.0664;
  
  // Professional Google Maps Embed URL
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=18&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="glass-elevated rounded-2xl p-4 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-500 animate-bounce" />
          <h2 className="font-display font-semibold text-lg text-white">Live Safety Map</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] text-sky-400 font-bold uppercase tracking-wider">
            <Zap className="h-3 w-3" />
            AI-Powered Analysis
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-grow rounded-xl overflow-hidden border border-white/10 group shadow-inner">
        {/* The Actual Map */}
        <iframe
          title="Bhaskar Bhavan Map"
          src={mapUrl}
          className="w-full h-full min-h-[450px] border-0 grayscale-[10%] contrast-[110%] invert-[5%] hue-rotate-[180deg]"
          allowFullScreen
          loading="lazy"
        />

        {/* High-Tech Overlay UI */}
        <div className="absolute top-4 left-4 z-10 space-y-2">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mb-1">Current Node</p>
            <p className="text-sm font-bold text-white">Bhaskar Bhavan</p>
            <p className="text-[9px] text-green-400 font-mono mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              SIGNAL: 100% SECURE
            </p>
          </div>
        </div>

        {/* Floating Controls Placeholder (Visual only) */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors">
            <Crosshair size={18} />
          </button>
        </div>

        {/* Bottom Banner */}
        <div className="absolute bottom-4 left-4 right-4 bg-red-600/90 backdrop-blur-md p-3 rounded-xl border border-red-400/30 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <ShieldIcon className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">ZONE: SECURE</p>
              <p className="text-[10px] text-white/70 font-mono">17.0891° N, 82.0664° E</p>
            </div>
          </div>
          <button className="px-4 py-1.5 bg-white text-red-600 text-[10px] font-black rounded-lg uppercase tracking-tighter hover:bg-slate-100">
            Scan Area
          </button>
        </div>
      </div>
    </div>
  );
};

// Small helper component for the Shield icon
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default SafetyMap;