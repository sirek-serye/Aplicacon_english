import { CURRENT_UNIT, MISSIONS } from '../constants';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { Flame, Check, Headphones, BookOpen, Trophy, Users, School } from 'lucide-react';
import { motion } from 'motion/react';
import { View } from '../types';
import { cn } from '../lib/utils';

interface HomeViewProps {
  onStartLevel: (view: View) => void;
}

export default function HomeView({ onStartLevel }: HomeViewProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.section variants={item}>
        <h2 className="text-4xl font-headline font-black text-on-surface">Hello, Leo! 👋</h2>
        <p className="text-lg text-on-surface-variant mt-2">Ready for your next English adventure?</p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Current Unit Progress */}
        <motion.div 
          variants={item}
          className="md:col-span-8 bg-surface-container-lowest rounded-2xl border-2 border-slate-200 border-bottom-4 p-6 flex flex-col justify-between border-t-8 border-t-primary card-border"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="inline-block bg-primary-fixed text-on-primary-fixed font-headline font-bold text-xs px-3 py-1 rounded-full mb-2 uppercase tracking-widest">UNIT {CURRENT_UNIT.number}</span>
              <h3 className="text-2xl font-headline font-black text-on-surface">{CURRENT_UNIT.title}</h3>
              <p className="text-on-surface-variant mt-1">{CURRENT_UNIT.description}</p>
            </div>
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center border-2 border-outline-variant shrink-0">
              <School className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-headline font-bold text-on-surface-variant uppercase tracking-widest">
              <span>PROGRESS: {CURRENT_UNIT.progress}%</span>
              <span>{CURRENT_UNIT.lessonsCompleted}/{CURRENT_UNIT.totalLessons} Lessons</span>
            </div>
            <ProgressBar progress={CURRENT_UNIT.progress} variant="secondary" showIcon />
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={() => onStartLevel('explorer')} variant="secondary" className="w-full md:w-auto px-10 py-4">
              Play Next Level
            </Button>
          </div>
        </motion.div>

        {/* Daily Missions */}
        <motion.div 
          variants={item}
          className="md:col-span-4 bg-surface-container-lowest rounded-2xl card-border p-6 border-t-8 border-t-tertiary flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <Flame className="w-6 h-6 text-tertiary fill-current" />
            <h3 className="font-headline font-bold text-on-surface">Daily Missions</h3>
          </div>
          
          <ul className="space-y-4 flex-1">
            {MISSIONS.map((mission) => (
              <li key={mission.id} className="flex items-start gap-4 bg-surface p-3 rounded-xl border-2 border-outline-variant">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 translate-y-0.5",
                  mission.completed ? "bg-secondary-fixed border-on-secondary-container" : "bg-white border-outline-variant"
                )}>
                  {mission.completed ? <Check className="w-5 h-5 text-on-secondary-container" /> : <div className="w-2 h-2 bg-outline-variant rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-headline font-bold text-sm text-on-surface truncate",
                    mission.completed && "line-through text-on-surface-variant"
                  )}>{mission.title}</p>
                  {mission.total ? (
                     <div className="mt-2 space-y-1">
                        <div className="h-2 bg-surface-variant rounded-full w-full">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(mission.progress! / mission.total) * 100}%` }} />
                        </div>
                     </div>
                  ) : (
                    <p className="text-xs text-tertiary font-bold mt-1">+{mission.gold} Gold</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Categories */}
        <motion.div variants={item} className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
           {[
             { icon: Headphones, label: 'Listening', color: 'primary' },
             { icon: BookOpen, label: 'Reading', color: 'secondary' },
             { icon: Trophy, label: 'Badges', color: 'tertiary' },
             { icon: Users, label: 'Friends', color: 'error' }
           ].map((cat, idx) => (
             <button 
                key={idx}
                className={cn(
                  "bg-surface-container-lowest rounded-xl card-border p-4 flex flex-col items-center text-center gap-2 hover:bg-surface-container transition-all active:translate-y-1 active:border-b-2",
                  `border-t-4 border-t-${cat.color}`
                )}
             >
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-2", `bg-${cat.color}-container`)}>
                  <cat.icon className={cn("w-6 h-6", `text-on-${cat.color}-container`)} />
                </div>
                <span className="font-headline font-bold text-on-surface text-sm uppercase tracking-wider">{cat.label}</span>
             </button>
           ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
