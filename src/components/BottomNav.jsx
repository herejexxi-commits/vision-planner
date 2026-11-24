import React from 'react';
import { Flame, Sparkles, CheckSquare, ListTodo, Settings } from 'lucide-react';

export default function BottomNav({ currentTab, setCurrentTab, onOpenSettings, dailyStats }) {
  const tabs = [
    { id: 'daily', label: 'Mi Día', icon: Flame, badge: dailyStats ? `${dailyStats.completed}/${dailyStats.total}` : null },
    { id: 'goals', label: 'Metas', icon: Sparkles },
    { id: 'projects', label: 'Tatuajes', icon: CheckSquare },
    { id: 'all', label: 'Tareas', icon: ListTodo },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-purple-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-purple-400' : ''} transition-transform`} />
                {tab.id === 'daily' && dailyStats && dailyStats.completed === dailyStats.total && dailyStats.total > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}

        {/* Settings button on mobile */}
        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-slate-400 hover:text-slate-200"
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Ajustes</span>
        </button>
      </div>
    </nav>
  );
}
