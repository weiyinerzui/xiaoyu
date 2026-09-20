import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Trophy, Clock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const FootballMatchWidget: React.FC = () => {
  const [method, setMethod] = useState<'quick' | 'step'>('quick');

  return (
    <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-600" />
          <h4 className="text-base font-bold text-slate-800">
            足球比赛进程与凑整一小时巧算
          </h4>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => {
              soundManager.playClick();
              setMethod('quick');
            }}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              method === 'quick'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            巧算法（打包凑整）
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setMethod('step');
            }}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              method === 'step'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            分步推进法
          </button>
        </div>
      </div>

      {/* Visual Match Timeline Blocks */}
      <div className="bg-emerald-950/90 text-white p-5 rounded-xl border border-emerald-800 mb-4">
        <div className="flex items-center justify-between text-xs text-emerald-300 mb-3">
          <span>比赛下午 3:30 开始</span>
          <span>下半场几点开球？</span>
        </div>

        {/* Timeline block representation */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* First Half */}
          <div className="flex-1 bg-emerald-800/80 rounded-lg p-3 border border-emerald-600/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">上半场比赛</span>
              <span className="bg-emerald-700 text-emerald-100 px-2 py-0.5 rounded text-[11px] font-mono">
                45 分钟
              </span>
            </div>
            <div className="text-[11px] text-emerald-300 mt-2">
              下午 3:30 ➔ 4:15
            </div>
          </div>

          {/* Plus sign */}
          <div className="flex items-center justify-center font-bold text-xl text-emerald-400">
            +
          </div>

          {/* Half-time Break */}
          <div className="sm:w-36 bg-amber-900/60 rounded-lg p-3 border border-amber-600/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-200">中场休息</span>
              <span className="bg-amber-800 text-amber-100 px-2 py-0.5 rounded text-[11px] font-mono">
                15 分钟
              </span>
            </div>
            <div className="text-[11px] text-amber-300 mt-2">
              4:15 ➔ 4:30
            </div>
          </div>

          {/* Equals arrow */}
          <div className="flex items-center justify-center font-bold text-xl text-emerald-400">
            =
          </div>

          {/* Result Block */}
          <div className="sm:w-44 bg-gradient-to-r from-teal-700 to-emerald-700 rounded-lg p-3 border border-teal-400 shadow-md flex flex-col justify-between">
            <span className="text-[10px] text-teal-200 font-bold uppercase tracking-wider">
              下半场开始时刻
            </span>
            <div className="text-xl font-black text-white font-mono mt-1">
              下午 4:30
            </div>
            <span className="text-[10px] text-teal-100 mt-0.5">
              (24时计时法: 16:30)
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Explanation */}
      {method === 'quick' ? (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>神仙巧算法：45 + 15 = 60 分钟 = 整整 1 小时！</span>
          </div>
          <p className="leading-relaxed">
            观察数字：上半场的 45 分钟与中场休息的 15 分钟加起来，正好等于 <strong>60 分钟（即 1 小时）</strong>！
            所以只需要将下午 3:30 往后推 1 个小时，就能瞬间得到：
            <strong className="text-emerald-700 font-bold ml-1">下午 4:30 (16:30)</strong>！不用借位也不用换算进位，口算秒出答案！
          </p>
        </div>
      ) : (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1.5">
          <div className="font-bold text-slate-900">
            常规分步推导：
          </div>
          <ol className="list-decimal pl-4 space-y-1">
            <li>
              上半场结束时刻：3时30分 + 45分 = 3时75分。因为 60分=1小时，75分 = 1小时15分，所以是 <strong>下午 4:15</strong>。
            </li>
            <li>
              中场休息15分：4时15分 + 15分 = <strong>下午 4:30</strong> (16:30)。
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};
