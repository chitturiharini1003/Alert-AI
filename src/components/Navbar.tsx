import { MapPin, User, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifs, setShowNotifs] = useState(false);

  // This function simulates the "Login" or "Verification"
  const handleLoginTrigger = () => {
    const confirmLogin = confirm("AlertAI: Begin Guardian Identity Verification?");
    if (confirmLogin) {
      navigate("/dashboard"); // Redirects to the live map
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F1A]/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="relative">
            <Shield className="h-7 w-7 text-red-500" />
            <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse border-2 border-[#0B0F1A]" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-white">
            Alert<span className="text-red-500">AI</span>
          </span>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center bg-white/5 p-1 rounded-full border border-white/10 shadow-2xl">
          <button 
            onClick={() => navigate("/")}
            className={`px-5 py-1.5 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider ${location.pathname === "/" ? "bg-red-500 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Home
          </button>
          <button 
            onClick={handleLoginTrigger} // LOGIN TRIGGER
            className={`px-5 py-1.5 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider ${location.pathname === "/dashboard" ? "bg-red-500 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Live Map
          </button>
          <button 
            onClick={() => navigate("/feed")}
            className={`px-5 py-1.5 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider ${location.pathname === "/feed" ? "bg-red-500 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Feed
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <MapPin className="h-3 w-3 text-red-500" />
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
              Region: <span className="text-white font-bold">Andhra Pradesh East</span>
            </span>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setShowNotifs(!showNotifs)} className="relative">
            <Bell className="h-5 w-5 text-slate-400" />
            <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">3</span>
          </Button>

          {/* USER ICON NOW TRIGGERS LOGIN */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLoginTrigger} 
            className="rounded-full hover:bg-white/5"
          >
            <User className="h-5 w-5 text-slate-400" />
          </Button>
        </div>
      </div>
      
      {/* Simple Notification Dropdown */}
      {showNotifs && (
        <div className="absolute top-16 right-4 w-64 bg-[#111827] border border-white/10 rounded-xl p-4 shadow-2xl z-50">
          <p className="text-[10px] font-bold text-red-500 mb-2 uppercase">Live Alerts</p>
          <div className="text-xs text-slate-300 space-y-2">
            <div className="pb-2 border-b border-white/5">⚠️ Accident on NH-16</div>
            <div>🚨 Personal SOS - Sector 4</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;