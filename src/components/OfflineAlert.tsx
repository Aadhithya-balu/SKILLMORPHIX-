
import React, { useEffect, useState } from "react";
import { AlertTriangle, WifiOff } from "lucide-react";

const OfflineAlert = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-md flex items-center shadow-md">
      <WifiOff className="h-4 w-4 mr-2" />
      <span>
        You're currently offline. Don't worry - your learning can continue! Changes will sync when you're back online.
      </span>
    </div>
  );
};

export default OfflineAlert;
