import { Home, Compass, Store, User, GraduationCap } from 'lucide-react';
import { View } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface NavBarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  gold: number;
}

export default function NavBar({ currentView, onViewChange, gold }: NavBarProps) {
  const navItems = [
    { id: 'home' as View, icon: Home, label: 'Home' },
    { id: 'explorer' as View, icon: Compass, label: 'Explorer' },
    { id: 'shop' as View, icon: Store, label: 'Shop' },
    { id: 'profile' as View, icon: User, label: 'Profile' },
    { id: 'teacher' as View, icon: GraduationCap, label: 'Teacher' },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="md:hidden flex justify-between items-center w-full px-6 py-4 bg-white border-b-2 border-slate-200 shadow-[0px_4px_0px_0px_rgba(226,232,240,1)] sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border-2 border-primary">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFVYFcGfEs0WVRkolelsxhNoeISRiaH7Sfnp_vBoPkEBLOiUvj3SU5wUxwg3sbFZh23GuMu5M5RfRGKWiW5Nfpdt6oX3E-pIZ_iJApTJi_q0YpMArmz2e60fqzR0KpbRz1VW5UCpgc05YtHGhBiHxA0A6VEYCi0HSU3CtoMZ129eEI4ovTzWtsVQ8EJrPduY10TSLSUcufm5WEGZH-05QKMjhkS47EumUAHruhH7MZS71NLUh8nzhZwI-pkTnfFyMFVewg1MUhh6q1" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-lg font-headline font-black text-primary tracking-wider uppercase">Adventure English</h1>
        </div>
        <div className="flex items-center gap-1 bg-tertiary-fixed px-3 py-1.5 rounded-full border-2 border-tertiary block-shadow-tertiary">
          <span className="text-xs font-bold text-tertiary">{gold.toLocaleString()} Gold</span>
        </div>
      </header>

      {/* Desktop Side Nav */}
      <aside className="hidden md:flex flex-col h-screen w-72 bg-white border-r-2 border-slate-200 divide-y-2 divide-slate-100 py-8 gap-4 sticky top-0 shrink-0">
        <div className="px-6 pb-6">
          <h1 className="text-2xl font-headline font-black text-primary tracking-wider uppercase mb-6 leading-tight">Adventure English</h1>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-surface-container overflow-hidden border-2 border-primary">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARaXtIF7spPp5SVYgApJ2uCMQ9svgzgHukeUBf3ftTQ5fejRkQRLJPwUJliM96hqWpXSCCOETKxLSpIcMMECscn42tgfRynT0z6y5Abl7y70hcX_GAkLhq67emf4rtDIkIuEH2qla0Oq43I2ClhIsqYgnyYvSfbULA7tUJtOIbKHtXZLswd_K9lXtaElT5COUEBqPGGRn4IdH5g3H1bzciYLnnTtsvyExHhj_aZO8l4XXc6o17Tcl1oDks_jeccnVb8M3SHyEokUEr" 
                alt="Leo Explorer" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-headline font-bold text-on-surface">Leo Explorer</h2>
              <p className="text-sm text-on-surface-variant">5th Grade</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                currentView === item.id 
                  ? "bg-primary text-on-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]" 
                  : "text-on-surface-variant hover:bg-surface-container hover:translate-x-1"
              )}
            >
              <item.icon className={cn("w-5 h-5", currentView === item.id ? "fill-current" : "")} />
              <span className="font-headline font-bold uppercase tracking-wide text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-6 pt-6">
          <div className="flex items-center justify-center gap-2 bg-tertiary-fixed p-3 rounded-xl border-2 border-tertiary block-shadow-tertiary">
             <span className="font-headline font-bold text-tertiary">{gold.toLocaleString()} Gold</span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white border-t-2 border-slate-200 rounded-t-2xl shadow-[0px_-4px_0px_0px_rgba(226,232,240,1)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl px-3 py-1 transition-all duration-150 active:scale-95",
              currentView === item.id 
                ? "bg-primary-fixed text-primary shadow-[4px_4px_0px_0px_rgba(0,119,200,0.2)]" 
                : "text-on-surface-variant"
            )}
          >
            <item.icon className={cn("w-6 h-6 mb-1", currentView === item.id ? "fill-current" : "")} />
            <span className="font-headline font-bold text-[10px] uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
