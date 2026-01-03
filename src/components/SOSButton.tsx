import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Radio, MapPin, Users, CheckCircle } from "lucide-react";

type AlertStatus = "idle" | "fetching" | "alerting" | "notified";

const SOSButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<AlertStatus>("idle");
  const [notifiedCount, setNotifiedCount] = useState(0);

  // Refs to manage the sound so we can stop it later
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const sirenIntervalRef = useRef<number | null>(null);

  const startSiren = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const context = new AudioCtx();
      audioCtxRef.current = context;

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      // "Square" wave is MUCH louder and more aggressive than "sine"
      oscillator.type = "square"; 
      oscillator.frequency.setValueAtTime(440, context.currentTime);
      gainNode.gain.setValueAtTime(0.1, context.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start();
      oscillatorRef.current = oscillator;

      // This creates the "WEE-WOO" oscillating effect
      let high = true;
      sirenIntervalRef.current = window.setInterval(() => {
        if (oscillator) {
          const freq = high ? 880 : 550; // Switches between high and low pitch
          oscillator.frequency.exponentialRampToValueAtTime(freq, context.currentTime + 0.1);
          high = !high;
        }
      }, 400); // Speed of the siren
    } catch (e) {
      console.error("Audio failed", e);
    }
  };

  const stopSiren = () => {
    if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    if (audioCtxRef.current) audioCtxRef.current.close();
  };

  useEffect(() => {
    if (!isActive) return;

    const runSequence = async () => {
      startSiren(); // Start the loud siren!

      setStatus("fetching");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus("alerting");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      for (let i = 1; i <= 25; i++) {
        setNotifiedCount(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      setStatus("notified");
      
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      stopSiren(); // Stop the siren when done
      setIsActive(false);
      setStatus("idle");
      setNotifiedCount(0);
    };

    runSequence();
    return () => stopSiren(); // Cleanup if user leaves page
  }, [isActive]);

  const handleSOSClick = () => {
    if (status !== "idle") return;
    if (window.confirm("🚨 ACTIVATE EMERGENCY SOS?\nThis will alert Security and nearby Guardians.")) {
      setIsActive(true);
      if ("vibrate" in navigator) navigator.vibrate([500, 200, 500]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {/* Visual background pulse */}
      {isActive && (
        <div className="fixed inset-0 bg-red-600/30 animate-pulse pointer-events-none z-0" />
      )}

      <div className="relative">
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-red-500/40 animate-ping" />
        )}
        <button
          onClick={handleSOSClick}
          disabled={status !== "idle"}
          className={`relative w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-2xl ${
            isActive ? "bg-red-600 scale-110" : "bg-gradient-to-br from-red-600 to-orange-600 hover:scale-105"
          }`}
        >
          <div className="absolute inset-2 rounded-full bg-red-700 flex flex-col items-center justify-center gap-2 border-4 border-white/20">
            <AlertTriangle className={`h-12 w-12 md:h-16 md:w-16 text-white ${isActive ? "animate-bounce" : ""}`} />
            <span className="font-black text-3xl md:text-4xl text-white">SOS</span>
          </div>
        </button>
      </div>

      <div className="min-h-[110px] w-full max-w-sm px-4 z-10">
        {status !== "idle" && (
          <div className="bg-slate-900 border-2 border-red-500 rounded-2xl p-5 shadow-2xl animate-in fade-in zoom-in">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${status === "notified" ? "bg-green-500" : "bg-red-500 animate-pulse"}`}>
                {status === "notified" ? <CheckCircle className="text-white" /> : <Radio className="text-white" />}
              </div>
              <div className="flex-1 text-white">
                <p className="font-bold text-lg leading-tight">
                  {status === "notified" ? "HELP IS ON THE WAY!" : status === "fetching" ? "Locating..." : "Alerting Security..."}
                </p>
                <p className="text-red-400 text-sm">{notifiedCount} Responders notified</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOSButton;