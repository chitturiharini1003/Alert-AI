import { Brain, AlertTriangle, Activity, ShieldCheck, Clock, Sparkles, Zap } from "lucide-react";

interface Insight {
  id: number;
  type: "warning" | "spike" | "info";
  title: string;
  description: string;
  time: string;
}

const insights: Insight[] = [
  {
    id: 1,
    type: "warning",
    title: "Predictive Risk Modeling: Sector 4",
    description: "Gemini 1.5 Pro cross-referenced 'Street Light Outage' with 'Low Pedestrian Density.' Risk index elevated by 65%. Automated Guardian patrol re-routed for visibility.",
    time: "Live Analysis",
  },
  {
    id: 2,
    type: "spike",
    title: "Multimodal Incident Triaging",
    description: "Detected high-frequency audio signature + 3 SOS triggers on NH-16. Gemini verified a 'Major Road Incident' and identified the nearest medical-certified volunteers.",
    time: "3m ago",
  },
  {
    id: 3,
    type: "info",
    title: "Autonomous Network Optimization",
    description: "Analyzing 247 active nodes. Gemini optimized Guardian distribution to cover 'Blind Spots' near the North Gate. Mesh integrity: 100%.",
    time: "Updated 15m ago",
  },
];

const AIInsights = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "spike": return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case "warning": return "border-l-amber-500";
      case "spike": return "border-l-blue-500";
      default: return "border-l-emerald-500";
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Header Section with Pro Branding */}
      <div className="flex items-center gap-3 mb-4 p-2">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
          <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg text-white tracking-tight">Gemini AI Insights</h2>
            <span className="text-[8px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full border border-blue-500/30 font-black">PRO</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Predictive Safety Mesh</p>
        </div>
      </div>

      {/* AI Thinking/Heartbeat Indicator */}
      <div className="mx-2 mb-6 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
          </div>
          <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">
            Gemini 1.5 Pro Reasoning...
          </span>
        </div>
        <span className="text-[8px] text-slate-600 font-mono">LATENCY: 142ms</span>
      </div>

      {/* Insights List */}
      <div className="space-y-4 flex-grow px-2">
        {insights.map((insight, index) => (
          <div
            key={insight.id}
            className={`bg-white/5 border-l-4 ${getBorderColor(insight.type)} rounded-r-xl p-4 transition-all hover:bg-white/10 group animate-in fade-in slide-in-from-right-4 duration-500`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getIcon(insight.type)}
                <h3 className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
                  {insight.title}
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3 italic">
              "{insight.description}"
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
              <Clock className="h-3 w-3" />
              <span>{insight.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Analysis Stat */}
      <div className="mt-6 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/10 backdrop-blur-sm mx-2">
        <div className="flex items-center gap-3">
          <Zap className="h-4 w-4 text-yellow-500" />
          <p className="text-[10px] text-sky-300/80 font-medium">
            Analyzing <span className="text-sky-400 font-bold text-xs">247 Live Nodes</span> via Vertex AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;