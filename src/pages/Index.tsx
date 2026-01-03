import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import SOSButton from "@/components/SOSButton";

const Index = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  // Function to handle the Guardian Login/Verification
  const handleGuardianEntry = () => {
    setIsVerifying(true);
    // Simulate a biometric/ID check for the demo
    setTimeout(() => {
      setIsVerifying(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white font-sans selection:bg-red-500/30">
      <Navbar />
      
      {/* 1. Verification Overlay (Login Step) */}
      {isVerifying && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="text-center animate-pulse">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold tracking-widest uppercase">Verifying Guardian Identity</h2>
            <p className="text-slate-500 text-xs mt-2">Connecting to AlertAI Safety Mesh...</p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="container mx-auto px-4 pt-32 flex flex-col items-center justify-between min-h-[calc(100vh-40px)]">
        
        {/* Header Section */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Your Safety <span className="text-sky-400">Our Priority</span>
          </h1>
          
          {/* Navigation Pill */}
          <div className="mt-8 inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl">
            <button 
              onClick={() => navigate("/")}
              className="px-8 py-2.5 bg-red-500 rounded-full font-semibold shadow-lg shadow-red-500/20 transition-all"
            >
              Dashboard
            </button>
            <button 
              onClick={handleGuardianEntry}
              className="px-8 py-2.5 text-slate-400 hover:text-white transition-colors font-medium"
            >
              Live Map
            </button>
            <button 
              onClick={() => navigate("/feed")}
              className="px-8 py-2.5 text-slate-400 hover:text-white transition-colors font-medium"
            >
              Feed
            </button>
          </div>
        </div>

        {/* 2. Central SOS Section */}
        <div className="flex flex-col items-center gap-8 my-16 group">
          <div className="relative">
            {/* Outer Glow Effect */}
            <div className="absolute inset-0 bg-red-500/20 blur-[100px] rounded-full group-hover:bg-red-500/30 transition-all duration-700" />
            <SOSButton />
          </div>
          
          <div className="text-center space-y-3 z-10">
            <p className="text-slate-300 text-xl font-medium tracking-wide">
              Emergency? Tap to alert Guardians
            </p>
            {/* CHANGED: Removed Aditya University, replaced with your brand */}
            <p className="text-[11px] text-red-500 uppercase tracking-[0.3em] font-bold">
              AlertAI Community Safety Mesh
            </p>
          </div>
        </div>

        {/* 3. Bottom Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <StatCard label="Active Guardians" value="12.4K" />
          <StatCard label="Incidents Resolved" value="847" />
          <StatCard label="Avg Response Time" value="< 2min" />
          <StatCard label="Safety Rating" value="4.9★" />
        </div>
      </main>
    </div>
  );
};

/**
 * StatCard Component
 */
const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#111827]/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-white/10 transition-all duration-300 group shadow-xl">
    <p className="text-4xl font-black text-sky-400 group-hover:scale-110 transition-transform duration-500 tracking-tight">
      {value}
    </p>
    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-3 font-bold">
      {label}
    </p>
  </div>
);

export default Index;