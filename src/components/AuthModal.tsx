import { useState } from "react";
import { ShieldCheck, Phone, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 1) setStep(2);
      else onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111827] border border-blue-500/30 w-full max-w-md rounded-3xl p-8 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-500/20 p-4 rounded-2xl mb-4">
            <ShieldCheck className="text-blue-500 h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Guardian Identity</h2>
          <p className="text-slate-400 text-sm mb-8">
            {step === 1 ? "Enter your mobile to link with the Safety Mesh" : "Enter the 4-digit code sent to your device"}
          </p>

          <div className="w-full space-y-4">
            {step === 1 ? (
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="+91 00000 00000"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            ) : (
              <div className="flex justify-center gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <input key={i} type="text" maxLength={1} className="w-12 h-14 bg-black/40 border border-white/10 rounded-xl text-center text-xl font-bold text-blue-500 focus:border-blue-500 focus:outline-none" />
                ))}
              </div>
            )}

            <button 
              onClick={handleNext}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <> {step === 1 ? "Send OTP" : "Verify & Access Feed"} <ArrowRight size={18} /> </>
              )}
            </button>
          </div>
          
          <button onClick={onClose} className="mt-6 text-slate-500 text-xs hover:text-white transition-colors">Cancel Authorization</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;