import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Rocket, Satellite, Moon, Sparkles, Play, RotateCcw } from 'lucide-react';

export const SpaceMissionCrossDay: React.FC = () => {
  const [phase, setPhase] = useState<number>(0); // 0: before launch, 1: flight to midnight, 2: flight to space station

  const handleNextPhase = () => {
    soundManager.playHop();
    if (phase < 2) {
      setPhase((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setPhase(0);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-indigo-800">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-600 rounded-lg shadow-sm">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              神舟二十一号飞天 · 跨夜时间分段探秘
            </h4>
            <span className="text-[11px] text-indigo-300">
              10月31日 23:44 发射 ➔ 11月1日 04:58 空间站会师
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-1 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重置
          </button>
          <button
            onClick={handleNextPhase}
            disabled={phase >= 2}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-md ${
              phase >= 2
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            {phase === 0 && '发射飞船 (第1段：飞向零点)'}
            {phase === 1 && '继续飞行 (第2段：飞向空间站)'}
            {phase === 2 && '太空会师成功！'}
          </button>
        </div>
      </div>

      {/* Flight Canvas Visualizer */}
      <div className="relative py-8 px-6 bg-slate-950/70 rounded-xl border border-indigo-800/60 my-4 overflow-hidden">
        {/* Background stars */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-2 left-10 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute top-8 right-16 w-1 h-1 bg-amber-200 rounded-full" />
          <div className="absolute bottom-4 left-1/3 w-1.5 h-1.5 bg-blue-200 rounded-full" />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full" />
        </div>

        {/* The 3 Stage Milestones */}
        <div className="relative flex items-center justify-between z-10">
          {/* Milestone 1: Jiuquan Launch */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-900/30">
              <Rocket className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-rose-300 mt-2">酒泉发射</span>
            <span className="text-[11px] font-mono text-slate-300">10月31日</span>
            <span className="text-xs font-bold text-white font-mono bg-rose-900/50 px-2 py-0.5 rounded mt-0.5 border border-rose-700/50">
              23:44
            </span>
          </div>

          {/* Segment 1 Path */}
          <div className="flex-1 px-3 flex flex-col items-center relative">
            <div className="text-[11px] font-bold text-amber-300 mb-1 flex items-center gap-1">
              <span>第1段：</span>
              <span className={`px-2 py-0.5 rounded transition-all ${phase >= 1 ? 'bg-amber-500/20 border border-amber-400 text-amber-300' : 'text-slate-500'}`}>
                16 分钟
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full relative">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: phase >= 1 ? '100%' : '0%' }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1">
              24:00 - 23:44 = 16分
            </span>
          </div>

          {/* Milestone 2: Midnight 24:00/0:00 (The bridge!) */}
          <div className="flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
              phase >= 1
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-900/30'
                : 'bg-slate-800/40 border-slate-700 text-slate-500'
            }`}>
              <Moon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-300 mt-2">午夜零点桥梁</span>
            <span className="text-[11px] font-mono text-slate-400">换天分界点</span>
            <span className="text-xs font-bold text-amber-200 font-mono bg-amber-950/60 px-2 py-0.5 rounded mt-0.5 border border-amber-700/50">
              24:00 / 0:00
            </span>
          </div>

          {/* Segment 2 Path */}
          <div className="flex-1 px-3 flex flex-col items-center relative">
            <div className="text-[11px] font-bold text-emerald-300 mb-1 flex items-center gap-1">
              <span>第2段：</span>
              <span className={`px-2 py-0.5 rounded transition-all ${phase >= 2 ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300' : 'text-slate-500'}`}>
                4小时58分
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full relative">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: phase >= 2 ? '100%' : '0%' }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1">
              0:00 到 4:58
            </span>
          </div>

          {/* Milestone 3: Space Station */}
          <div className="flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
              phase >= 2
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-900/30'
                : 'bg-slate-800/40 border-slate-700 text-slate-500'
            }`}>
              <Satellite className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-300 mt-2">天宫空间站</span>
            <span className="text-[11px] font-mono text-slate-300">11月1日</span>
            <span className="text-xs font-bold text-white font-mono bg-emerald-900/50 px-2 py-0.5 rounded mt-0.5 border border-emerald-700/50">
              04:58
            </span>
          </div>
        </div>
      </div>

      {/* Scaffolding explanation and approximation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-800/70 text-xs">
          <div className="font-bold text-indigo-300 mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            两段加和精确时间：
          </div>
          <p className="text-slate-300 font-mono">
            16分 + 4小时58分 = 4小时74分 = <strong className="text-amber-300">5 小时 14 分钟</strong>
          </p>
        </div>

        <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-800/70 text-xs">
          <div className="font-bold text-emerald-300 mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            合理估算（大约多少小时）：
          </div>
          <p className="text-slate-300">
            5小时14分钟中，14分钟不到半小时，所以四舍五入
            <strong className="text-emerald-300 ml-1 font-bold">大约是 5 小时</strong>！
          </p>
        </div>
      </div>
    </div>
  );
};
