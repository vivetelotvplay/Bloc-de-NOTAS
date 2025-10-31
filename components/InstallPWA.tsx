import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ShareIcon, ThreeDotsVerticalIcon, XIcon } from './Icons';

const InstallPWA: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isDismissed, setIsDismissed] = useLocalStorage('installPromptDismissed', false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isDismissed || isStandalone) {
      return;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android/.test(userAgent);

    if (isMobile) {
        if (/iphone|ipad|ipod/.test(userAgent)) {
            setPlatform('ios');
        } else {
            setPlatform('android');
        }
        setShowPrompt(true);
    }
    
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }
  
  const IosInstructions = () => (
    <>
      <p className="font-semibold">Install this app on your iPhone:</p>
      <p className="flex items-center justify-center mt-2">
        Tap the <ShareIcon className="w-5 h-5 mx-1.5" /> button, then 'Add to Home Screen'.
      </p>
    </>
  );

  const AndroidInstructions = () => (
    <>
      <p className="font-semibold">Install this app on your Android device:</p>
      <p className="flex items-center justify-center mt-2">
        Tap the <ThreeDotsVerticalIcon className="w-5 h-5 mx-1.5" /> menu, then 'Install app'.
      </p>
    </>
  );
  
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-slate-800 text-white rounded-lg shadow-lg p-4 max-w-md mx-auto flex items-start space-x-4">
        <div className="flex-grow text-center text-sm">
          {platform === 'ios' && <IosInstructions />}
          {platform === 'android' && <AndroidInstructions />}
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 rounded-full text-slate-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Dismiss install prompt"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InstallPWA;
