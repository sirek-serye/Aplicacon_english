import { SHOP_ITEMS } from '../constants';
import Button from '../components/Button';
import { ShoppingBag, Shirt, Sparkles, Palette, CheckCircle2, Coins } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function ShopView() {
  const [activeCategory, setActiveCategory] = useState<string>('hats');

  const categories = [
    { id: 'hats', icon: ShoppingBag, label: 'Hats & Gear' },
    { id: 'outfits', icon: Shirt, label: 'Outfits' },
    { id: 'companions', icon: Sparkles, label: 'Companions' },
    { id: 'colors', icon: Palette, label: 'Colors' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
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
      <div className="flex flex-col items-center text-center gap-4 bg-surface-container-low p-8 rounded-2xl border-2 border-outline-variant card-border">
        <h1 className="text-4xl font-headline font-black text-primary">Avatar Shop</h1>
        <p className="text-on-surface-variant max-w-2xl font-medium">Use your hard-earned Gold to customize your explorer! New items arrive every week.</p>
      </div>

      {/* Categories Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-4 snap-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "snap-start shrink-0 px-6 py-3 rounded-full font-headline font-bold text-xs uppercase tracking-widest border-2 transition-all flex items-center gap-2",
              activeCategory === cat.id 
                ? "bg-primary text-on-primary border-on-primary-fixed-variant block-shadow-primary" 
                : "bg-surface-container border-outline-variant text-on-surface hover:bg-surface-dim"
            )}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SHOP_ITEMS.map((si) => (
          <motion.div 
            key={si.id}
            variants={item}
            className={cn(
              "bg-surface-container-lowest rounded-2xl border-2 overflow-hidden flex flex-col p-4 gap-4 transition-all group",
              si.equipped ? "border-secondary bg-secondary-container/5" : "border-outline-variant hover:border-primary"
            )}
          >
            <div className={cn(
              "aspect-square bg-surface-container-low rounded-xl p-4 flex items-center justify-center relative border-2 border-dashed transition-colors",
              si.equipped ? "border-secondary" : "border-outline-variant group-hover:border-primary-fixed-dim"
            )}>
              <img 
                src={si.image} 
                alt={si.name} 
                className={cn("w-full h-full object-contain drop-shadow-xl transition-transform group-hover:scale-110", !si.owned && "grayscale-[20%] opacity-80")} 
              />
              {si.isNew && (
                <div className="absolute top-2 right-2 bg-secondary text-white text-[10px] font-black px-2 py-1 rounded-full border border-on-secondary-container uppercase tracking-tighter">NEW</div>
              )}
              {si.equipped && (
                <div className="absolute inset-0 bg-secondary/10 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
                  <CheckCircle2 className="w-12 h-12 text-secondary fill-white" />
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-headline font-black text-on-surface truncate">{si.name}</h3>
              <p className="text-xs text-on-surface-variant font-medium line-clamp-2 min-h-[2rem]">{si.description}</p>
            </div>

            <div className="mt-auto pt-2 flex items-center justify-between gap-2">
              {si.owned ? (
                <>
                  <span className="text-xs font-headline font-black text-secondary uppercase tracking-widest">Owned</span>
                  <Button variant={si.equipped ? "outline" : "secondary"} className="h-10 text-[10px] px-4 whitespace-nowrap">
                    {si.equipped ? "Unequip" : "Wear"}
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1 font-headline font-black text-tertiary">
                    <Coins className="w-4 h-4" />
                    <span>{si.price}</span>
                  </div>
                  <Button variant="primary" className="h-10 text-[10px] px-6">
                    Buy
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
