import { STUDENTS } from '../constants';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { TrendingUp, AlertTriangle, Medal, Search, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function TeacherView() {
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
    hidden: { scale: 0.95, opacity: 0 },
    show: { scale: 1, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-headline font-black text-on-surface">Class Overview</h1>
          <p className="text-on-surface-variant font-medium mt-1">Grade 7 • Section A</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" className="px-6">
            Generate Exam PDF
          </Button>
          <Button variant="primary" className="px-6">
            View Group Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item} className="bg-surface-container-lowest border-2 border-outline-variant rounded-xl p-6 card-border border-t-8 border-t-secondary">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-bold text-on-surface">Average Progress</h3>
            <TrendingUp className="text-secondary w-6 h-6" />
          </div>
          <p className="text-4xl font-headline font-black text-secondary">78%</p>
          <p className="text-sm text-on-surface-variant mt-2 font-medium">+5% from last week</p>
        </motion.div>

        <motion.div variants={item} className="bg-surface-container-lowest border-2 border-outline-variant rounded-xl p-6 card-border border-t-8 border-t-error">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-bold text-on-surface">Needs Attention</h3>
            <AlertTriangle className="text-error w-6 h-6" />
          </div>
          <p className="text-4xl font-headline font-black text-error">4</p>
          <p className="text-sm text-on-surface-variant mt-2 font-medium">Students below 50%</p>
        </motion.div>

        <motion.div variants={item} className="bg-surface-container-lowest border-2 border-outline-variant rounded-xl p-6 card-border border-t-8 border-t-primary">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-bold text-on-surface">Quests Completed</h3>
            <Medal className="text-primary w-6 h-6" />
          </div>
          <p className="text-4xl font-headline font-black text-primary">142</p>
          <p className="text-sm text-on-surface-variant mt-2 font-medium">Total across all students</p>
        </motion.div>
      </div>

      {/* Student List */}
      <motion.div variants={item} className="bg-surface-container-lowest border-2 border-outline-variant rounded-2xl overflow-hidden card-border">
        <div className="p-6 border-b-2 border-outline-variant bg-surface-container-low flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-headline font-black text-on-surface">Student Roster</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-2 border-2 border-outline-variant rounded-xl focus:border-primary focus:outline-none bg-white font-medium shadow-inner" 
              placeholder="Search students..." 
              type="text"
            />
          </div>
        </div>

        <div className="divide-y-2 divide-outline-variant">
          {STUDENTS.map((student) => (
            <div key={student.id} className="p-6 flex flex-col md:flex-row items-stretch md:items-center gap-6 hover:bg-surface-container-low transition-colors group">
              <div className="flex items-center gap-4 md:w-1/3">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-white font-headline font-black text-lg shadow-sm shrink-0",
                  student.status === 'on-track' ? 'bg-secondary' : student.status === 'slipping' ? 'bg-tertiary' : 'bg-error'
                )}>
                  {student.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-headline font-bold text-on-surface truncate">{student.name}</h4>
                  <p className="text-xs text-on-surface-variant font-medium">Last active: {student.lastActive}</p>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-on-surface uppercase tracking-wide truncate max-w-[200px]">{student.currentUnit}</span>
                  <span className={cn(
                    "font-headline font-black",
                    student.status === 'on-track' ? 'text-secondary' : student.status === 'slipping' ? 'text-tertiary' : 'text-error'
                  )}>{student.progress}%</span>
                </div>
                <ProgressBar 
                  progress={student.progress} 
                  variant={student.status === 'on-track' ? 'secondary' : student.status === 'slipping' ? 'tertiary' : 'primary'} 
                  className="h-4"
                />
              </div>

              <div className="flex justify-end items-center md:w-32">
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-headline font-black uppercase tracking-widest border-2",
                  student.status === 'on-track' ? 'bg-secondary-fixed border-secondary text-on-secondary-container' : 
                  student.status === 'slipping' ? 'bg-tertiary-fixed border-tertiary text-on-tertiary-fixed' : 
                  'bg-error-container border-error text-on-error-container'
                )}>
                  {student.status === 'on-track' ? <CheckCircle className="w-3 h-3" /> : student.status === 'slipping' ? <Clock className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                  {student.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
