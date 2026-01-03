import { useState } from "react";
import Navbar from "@/components/Navbar";
import SafetyMap from "@/components/SafetyMap";
import AIInsights from "@/components/AIInsights";
import SafetyFeed from "./Deleteme"; // <--- THIS MATCHES YOUR FILENAME
import AuthModal from "@/components/AuthModal";
import { ShieldCheck, ShieldAlert, Send } from "lucide-react"; 
import { toast } from "sonner";

const Dashboard = () => {
  const [report, setReport] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [view, setView] = useState<"victim" | "guardian">("victim");

  const handlePoliceReport = () => {
    if (!report.trim()) return toast.error("Please enter details");
    
    // Sir's logic: Automating 108/Fire based on text
    const lower = report.toLowerCase();
    let protocol = "Police Bridge";
    if(lower.includes("accident") || lower.includes("blood")) protocol = "108 Medical Dispatch";
    if(lower.includes("fire")) protocol = "Fire Emergency Services";

    alert(`REPORT LOGGED\n\nProtocol: ${protocol}\nAuthority: Peddapuram Station\nStatus: Live on Guardian Mesh`);
    setReport("");
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white selection:bg-blue-500/30">
      <Navbar />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={() => { setIsAuthOpen(false); setView("guardian"); }} 
      />
      
      <main className="container mx-auto pt-24 px-6 pb-12">
        <div className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${view === 'victim' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                    <ShieldCheck className={view === 'victim' ? 'text-red-500' : 'text-green-500'} />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">{view === "victim" ? "Emergency Control" : "Guardian Mesh"}</h1>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Node ID: ADY-SURAM-01</p>
                </div>
            </div>
            <button 
                onClick={() => view === "victim" ? setIsAuthOpen(true) : setView("victim")}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-[10px] font-bold uppercase transition-all shadow-lg shadow-blue-600/20"
            >
                {view === "victim" ? "Login as Guardian" : "Switch to SOS"}
            </button>
        </div>

        {view === "victim" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-white/10 bg-[#111827] shadow-2xl relative min-h-[500px]">
              <SafetyMap />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#111827]/50 border border-white/10 rounded-3xl p-6 flex-grow shadow-2xl overflow-y-auto max-h-[300px]">
                  <AIInsights />
              </div>
              <div className="bg-blue-900/10 border border-blue-500/20 rounded-3xl p-5 shadow-2xl">
                  <h2 className="text-xs font-bold uppercase text-blue-400 mb-4 flex items-center gap-2">
                      <ShieldAlert size={14} /> Authority Bridge
                  </h2>
                  <textarea 
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    placeholder="Describe incident (e.g. accident report to Peddapuram)..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 outline-none min-h-[120px]"
                  />
                  <button onClick={handlePoliceReport} className="w-full mt-3 bg-blue-600 py-3 rounded-xl text-sm font-bold">
                      SUBMIT SOS
                  </button>
              </div>
            </div>
          </div>
        ) : (
          <SafetyFeed /> 
        )}
      </main>
    </div>
  );
};

export default Dashboard;