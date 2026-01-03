import Navbar from "@/components/Navbar";
import { MapPin, Clock, Users, Award, Zap, ShieldCheck, ShieldAlert, HeartPulse, Flame, Siren } from "lucide-react";

const Feed = () => {
  const handleAction = (title: string) => {
    const confirmJoin = confirm(`CONFIRM: Do you wish to deploy as a Guardian for "${title}"? \n\nYour location will be shared with the victim.`);
    if (confirmJoin) {
      alert("DEPLOYED: You are now connected to the Live Mesh. Proceed with caution.");
    }
  };

  // UPDATED DATA: Added 'category' and 'reason' for AI Triage
  const reports = [
    {
      id: 1,
      type: "CRITICAL SOS",
      category: "Police",
      title: "Personal Safety - Urban Sector 4",
      desc: "Female user walking alone reported being followed. Needs 2 verified Guardians for intercept.",
      loc: "Near Central Mall",
      time: "2 min ago",
      volunteers: 3,
      points: "+50 Credits",
      btnText: "Respond",
      btnColor: "bg-red-600",
      reason: "Threat detection high; User pulse elevated. Police bridge established."
    },
    {
      id: 2,
      type: "MAJOR ACCIDENT",
      category: "Medical",
      title: "Bus Collision: NH-16 Junction",
      desc: "Multiple injuries reported. Medical volunteers needed for immediate stabilization.",
      loc: "NH-16 Junction",
      time: "8 min ago",
      volunteers: 12,
      points: "+100 Credits",
      btnText: "Join Team",
      btnColor: "bg-orange-500",
      reason: "Impact detected via accelerometer. 108 Ambulance dispatched automatically."
    },
    {
      id: 3,
      type: "FIRE ALERT",
      category: "Fire",
      title: "Structural Fire: Sector 2",
      desc: "Smoke detected in residential complex. Automated extinguishers active. Need perimeter control.",
      loc: "Sector 2 Residential",
      time: "5 min ago",
      volunteers: 8,
      points: "+80 Credits",
      btnText: "Assist",
      btnColor: "bg-orange-600",
      reason: "Thermal sensors triggered at 180°C. Local fire station notified."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white font-sans">
      <Navbar />
      <main className="container mx-auto pt-28 px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-8">Live Activity Feed</h1>
            <div className="space-y-6">
              {reports.map((report) => (
                <div key={report.id} className="bg-[#111827]/50 border border-white/10 rounded-3xl p-6 hover:border-red-500/50 transition-all shadow-xl">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded font-bold uppercase">{report.type}</span>
                        <span className="text-[10px] text-green-500 font-bold uppercase flex items-center gap-1"><Zap size={10} /> {report.points}</span>
                        <span className="text-[10px] text-blue-400 font-bold uppercase border border-blue-400/20 px-2 py-0.5 rounded">✓ AI VERIFIED</span>
                      </div>
                      
                      <h3 className="text-xl font-bold">{report.title}</h3>
                      <p className="text-sm text-slate-400">{report.desc}</p>

                      {/* NEW: AUTOMATED RESPONSE PROTOCOL BAR */}
                      <div className="mt-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">System Response Protocol</p>
                        <div className="flex flex-wrap gap-4">
                          <div className={`flex items-center gap-2 ${report.category === 'Medical' ? 'opacity-100' : 'opacity-30'}`}>
                            <HeartPulse size={14} className="text-red-500" />
                            <span className="text-[10px] font-bold">108 Medical Notified</span>
                          </div>
                          <div className={`flex items-center gap-2 ${report.category === 'Fire' ? 'opacity-100' : 'opacity-30'}`}>
                            <Flame size={14} className="text-orange-500" />
                            <span className="text-[10px] font-bold">Fire Dept. Alerted</span>
                          </div>
                          <div className={`flex items-center gap-2 ${report.category === 'Police' ? 'opacity-100' : 'opacity-30'}`}>
                            <Siren size={14} className="text-blue-500" />
                            <span className="text-[10px] font-bold">Police Bridge Active</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500"><MapPin size={12} className="text-red-500" /> {report.loc}</div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500"><Clock size={12} className="text-red-500" /> {report.time}</div>
                        <div className="flex items-center gap-2 text-[10px] text-sky-400 font-bold uppercase"><Users size={12} /> {report.volunteers} Responders</div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end gap-4">
                       <div className="bg-black/30 p-3 rounded-xl border border-white/5 w-full md:w-48">
                          <p className="text-[9px] font-bold text-orange-400 uppercase mb-1">AI Reasoning</p>
                          <p className="text-[9px] text-slate-400 italic">"{report.reason}"</p>
                       </div>
                       <button 
                        onClick={() => handleAction(report.title)} 
                        className={`${report.btnColor} w-full md:w-auto text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95`}
                      >
                        {report.btnText}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-gradient-to-b from-slate-900 to-[#111827] border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-sky-500/20 rounded-lg"><Award className="text-sky-400 h-6 w-6" /></div>
                <div>
                  <h3 className="font-bold">Guardian Profile</h3>
                  <p className="text-[10px] text-slate-500 uppercase">Rank: Elite Tier</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                    <p className="text-xl font-bold">14</p>
                    <p className="text-[8px] text-slate-500 uppercase">Rescues Helped</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                    <p className="text-xl font-bold">4.9</p>
                    <p className="text-[8px] text-slate-500 uppercase">Trust Score</p>
                  </div>
                </div>

                {/* NEW: SYSTEM STATUS SIDEBAR BOX */}
                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-[9px] font-bold text-orange-500 uppercase mb-3 flex items-center gap-2">
                    <ShieldAlert size={12} /> Global Node Status
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">108 Emergency Relay</span>
                      <span className="text-green-500">ACTIVE</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Fire Grid Sync</span>
                      <span className="text-green-500">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default Feed;