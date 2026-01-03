import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Phone, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";

const PoliceDetails = () => {
  const stations = [
    { name: "City Central Police Station", distance: "0.8 km", phone: "100" },
    { name: "Sector 4 Security Hub", distance: "1.5 km", phone: "040-2323XXXX" },
    { name: "Women's Safety Wing", distance: "2.2 km", phone: "1091" }
  ];

  const handleAlert = (name: string) => {
    toast.error(`🚨 EMERGENCY: GPS Data Sent to ${name}`);
    alert(`Alerting ${name}...\nYour current coordinates have been shared with the dispatch team.`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="text-blue-500 w-8 h-8" />
        <h1 className="text-2xl font-bold">Nearby Authorities</h1>
      </div>

      <div className="space-y-4">
        {stations.map((s, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <p className="text-zinc-400 flex items-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" /> {s.distance} away
                </p>
              </div>
              <Button variant="outline" size="icon" onClick={() => window.open(`tel:${s.phone}`)}>
                <Phone className="w-4 h-4 text-green-500" />
              </Button>
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => handleAlert(s.name)}
            >
              <Navigation className="w-4 h-4 mr-2" /> ALERT STATION
            </Button>
          </div>
        ))}
      </div>
      
      <p className="mt-8 text-xs text-zinc-500 text-center italic">
        "Bridging the gap between community safety and official law enforcement."
      </p>
    </div>
  );
};

export default PoliceDetails;