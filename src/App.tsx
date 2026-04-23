/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { View } from './types';
import NavBar from './components/NavBar';
import HomeView from './views/HomeView';
import TeacherView from './views/TeacherView';
import ShopView from './views/ShopView';
import GameView from './views/GameView';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [gold, setGold] = useState(0);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/user');
      const data = await res.json();
      if (data) setGold(data.gold);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
    
    const handleGoldUpdated = () => fetchUser();
    window.addEventListener('goldUpdated', handleGoldUpdated);
    return () => window.removeEventListener('goldUpdated', handleGoldUpdated);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onStartLevel={setCurrentView} />;
      case 'teacher':
        return <TeacherView />;
      case 'shop':
        return <ShopView />;
      case 'explorer':
        return <GameView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-surface-container-low rounded-3xl border-4 border-dashed border-outline-variant">
            <h2 className="text-3xl font-headline font-black text-on-surface-variant">Coming Soon!</h2>
            <p className="text-on-surface-variant mt-4 font-medium max-w-sm">We are currently trekking through the jungle to build this feature. Stay tuned!</p>
            <button 
                onClick={() => setCurrentView('home')}
                className="mt-8 bg-primary text-on-primary px-8 py-3 rounded-full block-shadow-primary font-headline font-black uppercase tracking-widest text-xs"
            >
                Back Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row antialiased select-none overflow-x-hidden">
      <NavBar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        gold={gold}
      />
      
      <main className={cn(
        "flex-1 w-full max-w-[1200px] mx-auto pb-32 md:pb-8 relative",
        currentView === 'explorer' ? "p-0" : "p-4 md:p-8 space-y-8"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
