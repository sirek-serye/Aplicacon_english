import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import Button from '../components/Button';
import { Star, RotateCcw, CircleCheck, ChevronRight, Rabbit } from 'lucide-react';

export default function GameView() {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [targetSentence, setTargetSentence] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'loading' | 'playing' | 'correct' | 'wrong'>('loading');

  const fetchNextLevel = async () => {
    setGameState('loading');
    try {
      const res = await fetch('/api/levels/next');
      const data = await res.json();
      if (data) {
        setAvailableWords(data.available_words);
        setTargetSentence(data.target_sentence);
        setSelectedWords([]);
        setGameState('playing');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNextLevel();
  }, []);

  const handleWordClick = (word: string) => {
    if (gameState !== 'playing') return;
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const checkAnswer = async () => {
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(targetSentence);
    setGameState(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      try {
        await fetch('/api/levels/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isCorrect: true })
        });
        // Dispatch an event to update gold in NavBar/App if they were listening, 
        // or just let them refetch when navigating.
        window.dispatchEvent(new Event('goldUpdated'));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const reset = () => {
    setSelectedWords([]);
    setGameState('playing');
  };

  if (gameState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] bg-surface-container-low rounded-3xl">
        <Star className="w-12 h-12 text-primary animate-spin" />
        <p className="mt-4 font-headline font-bold text-primary">Loading Next Adventure...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-48px)] relative overflow-hidden bg-surface-container-low md:rounded-3xl border-2 border-outline-variant shadow-lg">
      {/* Background with paralax-like feel */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
        style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_VyBIqrFynuA5NWsAzZ35io9xVY_1Ka0KnTxShVTCu1005SObwMknFlinx8XR7a6zwU3YseeYEYlFm7OKgUQBmJvxfTGUDL7lkkI1gLHUs78cRaw86pG95OOlRZ7EDZ9hOHa1AOw78IaHxUnJUvbcMYp_uilmJR4Yk3dBz6X--pLDXR0fgn1V3_nsFqEc_v5uaCUQwHK0Cpee-VySivpaaXdfI-ae1doXBUBdCkrXJz8T9vsE7uefwmMpMJsuuoUeyMRNoIstX4P0')",
            filter: gameState === 'correct' ? 'saturate(1.4)' : 'none'
        }}
      />

      {/* Level HUD - More compact to avoid overlap */}
      <div className="z-20 relative flex justify-between items-center p-3 bg-white/95 backdrop-blur-sm m-3 rounded-2xl border-2 border-outline-variant shadow-md border-t-4 border-t-primary">
        <div className="flex items-center gap-3 flex-grow max-w-xs">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-tighter text-primary">Level 4</span>
            <span className="text-[9px] font-bold text-on-surface-variant">Unit 1</span>
          </div>
          <div className="flex-grow h-2.5 bg-surface-container rounded-full overflow-hidden border border-outline-variant relative shadow-inner">
            <motion.div 
                initial={{ width: '40%' }}
                animate={{ width: '66%' }}
                className="h-full bg-secondary-fixed rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-primary-fixed px-3 py-1 rounded-xl border-2 border-primary shadow-sm">
          <Star className="w-4 h-4 text-primary fill-current" />
          <span className="font-headline font-black text-primary text-sm">2/3</span>
        </div>
      </div>

      {/* Interactive Gameplay Area */}
      <div className="flex-grow relative z-10 p-4 flex flex-col items-center justify-center">
        {/* Character */}
        <motion.div 
            animate={{ 
                y: gameState === 'correct' ? [0, -15, 0] : 0,
            }}
            transition={{ repeat: gameState === 'correct' ? Infinity : 0, duration: 0.5 }}
            className="absolute bottom-[20%] left-[8%] sm:left-[15%] w-28 h-28 sm:w-40 sm:h-40 z-10"
        >
            <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFVYFcGfEs0WVRkolelsxhNoeISRiaH7Sfnp_vBoPkEBLOiUvj3SU5wUxwg3sbFZh23GuMu5M5RfRGKWiW5Nfpdt6oX3E-pIZ_iJApTJi_q0YpMArmz2e60fqzR0KpbRz1VW5UCpgc05YtHGhBiHxA0A6VEYCi0HSU3CtoMZ129eEI4ovTzWtsVQ8EJrPduY10TSLSUcufm5WEGZH-05QKMjhkS47EumUAHruhH7MZS71NLUh8nzhZwI-pkTnfFyMFVewg1MUhh6q1" 
                alt="Kid Explorer" 
                className="w-full h-full object-contain filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
            />
        </motion.div>

        {/* Platform */}
        <div className="absolute bottom-[18%] left-[5%] sm:left-[10%] w-[35%] h-6 sm:h-8 bg-[#8B5A2B] rounded-xl border-t-4 border-[#4CAF50] shadow-[0_5px_0_rgba(94,62,29,1)]" />

        {/* Decorative elements */}
        <motion.div 
            animate={{ x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute top-[10%] right-[10%] opacity-30 select-none pointer-events-none"
        >
            <Star className="w-12 h-12 text-primary" />
        </motion.div>
        
        <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="absolute bottom-[40%] right-[5%] opacity-20 select-none pointer-events-none"
        >
            <Rabbit className="w-20 h-20 text-secondary" />
        </motion.div>

        {/* Floating Words to Pick - More spread out */}
        <div className="relative w-full h-full max-w-4xl mx-auto">
            {availableWords.map((word, idx) => (
                <motion.button
                    key={word}
                    onClick={() => handleWordClick(word)}
                    initial={{ scale: 0 }}
                    animate={{ 
                        scale: selectedWords.includes(word) ? 0.8 : 1,
                        opacity: selectedWords.includes(word) ? 0.2 : 1,
                        x: [0, 8, -8, 0][idx] || 0,
                        y: [0, -8, 8, 0][idx] || 0,
                    }}
                    whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                    transition={{ 
                        x: { repeat: Infinity, duration: 4 + idx, ease: "easeInOut" },
                        y: { repeat: Infinity, duration: 5 + idx, ease: "easeInOut" },
                    }}
                    disabled={selectedWords.includes(word)}
                    className={cn(
                        "absolute transform -translate-x-1/2 -translate-y-1/2 bg-white px-5 sm:px-10 py-3 rounded-full border-2 border-primary text-primary font-headline font-black text-base sm:text-2xl shadow-xl transition-all active:translate-y-1 active:shadow-none block-shadow-primary",
                        idx % 4 === 0 && "top-[20%] left-[20%]",
                        idx % 4 === 1 && "top-[40%] left-[50%]",
                        idx % 4 === 2 && "top-[15%] left-[65%]",
                        idx % 4 === 3 && "top-[40%] left-[85%]",
                        selectedWords.includes(word) && "shadow-none opacity-20 pointer-events-none"
                    )}
                >
                    {word}
                </motion.button>
            ))}
        </div>
      </div>

      {/* Sentence Builder Controls */}
      <div className="z-30 relative bg-white border-t-4 border-primary p-4 sm:p-6 shadow-[0_-10px_25px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-headline font-black text-on-surface uppercase tracking-widest text-[9px] sm:text-xs">Sentence Builder:</h2>
            <button 
                onClick={reset}
                className="text-error font-headline font-bold text-[9px] sm:text-xs flex items-center gap-1 hover:opacity-75 transition-all uppercase tracking-wider"
            >
              <RotateCcw className="w-3 h-3" /> Start Over
            </button>
          </div>

          <div className="min-h-[70px] sm:min-h-[100px] bg-surface-container-low border-4 border-dashed border-outline-variant rounded-2xl flex items-center p-3 sm:p-4 gap-2 sm:gap-4 overflow-x-auto shadow-inner">
            <AnimatePresence mode="popLayout">
                {selectedWords.map((word) => (
                    <motion.div 
                        key={word}
                        layout
                        initial={{ scale: 0.5, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.5, opacity: 0, y: 15 }}
                        onClick={() => handleWordClick(word)}
                        className="bg-primary text-on-primary px-4 sm:px-8 py-2 sm:py-3 rounded-full font-headline font-black text-base sm:text-xl shadow-[0_5px_0_#00497e] cursor-pointer hover:brightness-110 active:translate-y-1 active:shadow-none transition-all whitespace-nowrap"
                    >
                        {word}
                    </motion.div>
                ))}
            </AnimatePresence>
            {!selectedWords.length && (
                <span className="text-on-surface-variant/50 font-bold italic mx-auto text-sm sm:text-lg animate-pulse tracking-wide">Choose your words!</span>
            )}
          </div>

          <div className="flex justify-end pt-1">
            {gameState === 'playing' ? (
                <Button 
                    variant="secondary" 
                    onClick={checkAnswer} 
                    disabled={selectedWords.length === 0}
                    className="w-full sm:w-auto px-16 py-4 shadow-xl text-lg block-shadow-secondary"
                >
                    Check Answer <CircleCheck className="w-6 h-6 ml-2" />
                </Button>
            ) : gameState === 'correct' ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 flex flex-col sm:flex-row items-center justify-between bg-secondary-container p-4 rounded-2xl border-2 border-secondary gap-4 shadow-xl"
                >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="bg-white p-2 rounded-full border-2 border-secondary">
                          <CircleCheck className="w-10 h-10 text-secondary fill-current" />
                        </div>
                        <div>
                           <p className="font-headline font-black text-secondary leading-none text-xl">FANTASTIC!</p>
                           <p className="text-on-secondary-container text-xs font-bold mt-1">Linguistic achievement unlocked!</p>
                        </div>
                    </div>
                    <Button variant="secondary" onClick={fetchNextLevel} className="w-full sm:w-auto px-10 py-4 block-shadow-secondary">
                        Next Challenge <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 flex flex-col sm:flex-row items-center justify-between bg-error-container p-4 rounded-2xl border-2 border-error gap-4 shadow-xl"
                >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="bg-white p-2 rounded-full border-2 border-error">
                          <RotateCcw className="w-10 h-10 text-error" />
                        </div>
                        <div>
                           <p className="font-headline font-black text-error leading-none text-xl">OH NO!</p>
                           <p className="text-on-error-container text-xs font-bold mt-1">That's not quite right. Try again!</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={reset} className="w-full sm:w-auto px-10 py-4 border-error text-error bg-white hover:bg-error/5">
                        Try Again
                    </Button>
                </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
