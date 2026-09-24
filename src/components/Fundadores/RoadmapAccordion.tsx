import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

interface RoadmapPhaseProps {
  title: string;
  subtitle: string;
  tasks: Task[];
  defaultOpen?: boolean;
}

export const RoadmapAccordion: React.FC<RoadmapPhaseProps> = ({ title, subtitle, tasks, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedCount / tasks.length) * 100) || 0;

  return (
    <div className="bg-[#1C1A17] border border-[#3E3A33] rounded-xl overflow-hidden mb-6 shadow-xl transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-[#1C1A17] hover:bg-[#25221F] transition-colors text-left focus:outline-none"
      >
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-[#FDFBF7] tracking-tight">{title}</h3>
          <p className="text-sm md:text-base text-[#D4CFC9] mt-1 font-light opacity-80">{subtitle}</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs text-[#A89F91] uppercase tracking-wider mb-1">Progreso</span>
            <div className="w-24 h-2 bg-[#3E3A33] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-green-500"
              />
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#A89F91]"
          >
            <ChevronDown size={28} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2 bg-[#1C1A17] border-t border-[#3E3A33]/50">
              <div className="space-y-4 mt-4">
                {tasks.map((task, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-[#25221F] border border-[#3E3A33] hover:border-[#524C44] transition-colors">
                    <div className="mt-1 flex-shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="text-green-500" size={24} />
                      ) : (
                        <Circle className="text-[#524C44]" size={24} />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-lg font-medium ${task.completed ? 'text-[#A89F91] line-through' : 'text-[#FDFBF7]'}`}>
                        {task.title}
                      </h4>
                      <p className="text-[#A89F91] text-sm mt-1 leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
