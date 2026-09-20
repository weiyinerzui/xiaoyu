import React from 'react';
import { ActiveTab } from '../types';
import { soundManager } from '../utils/audio';
import { Clock, Wrench, FileText, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  completedIds: number[];
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedIds,
  totalQuestions,
}) => {
  const handleTabChange = (tab: ActiveTab) => {
    soundManager.playClick();
    setActiveTab(tab);
  };

  const progressPercent = Math.round((completedIds.length / totalQuestions) * 100);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  三上数学「一天的时间」互动探索教程
                </h1>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  课时 4 复习
                </span>
              </div>
              <p className="text-xs text-slate-500">
                降低认知负荷 · 直观数轴与双圈时钟 · 循序掌握 8 道经典题
              </p>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => handleTabChange('tutorial')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'tutorial'
                  ? 'bg-white text-amber-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>逐题精讲探究</span>
            </button>

            <button
              onClick={() => handleTabChange('toolbox')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'toolbox'
                  ? 'bg-white text-indigo-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-indigo-500" />
              <span>时间思维工具箱</span>
            </button>

            <button
              onClick={() => handleTabChange('paper')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'paper'
                  ? 'bg-white text-emerald-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-500" />
              <span>原卷对照模式</span>
            </button>
          </div>

          {/* Student Progress Badge */}
          <div className="hidden lg:flex items-center gap-3 bg-amber-50/80 px-3.5 py-1.5 rounded-xl border border-amber-200">
            <Award className="w-4 h-4 text-amber-600" />
            <div className="text-xs">
              <span className="text-slate-600">已闯关：</span>
              <span className="font-bold text-amber-800">
                {completedIds.length} / {totalQuestions}
              </span>
            </div>
            <div className="w-16 h-2 bg-amber-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
