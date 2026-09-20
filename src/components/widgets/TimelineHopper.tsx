import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Play, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TimelineHop {
  from: string;
  to: string;
  durationLabel: string;
  type: 'minute' | 'hour';
  description: string;
}

interface TimelineHopperProps {
  start: string;
  end: string;
  hops: TimelineHop[];
  totalResult: string;
}

export const TimelineHopper: React.FC<TimelineHopperProps> = ({
  start,
  end,
  hops,
  totalResult,
}) => {
  const [activeHopIndex, setActiveHopIndex] = useState<number>(0);

  const handleNext = () => {
    if (activeHopIndex < hops.length) {
      soundManager.playHop();
      setActiveHopIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setActiveHopIndex(0);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-sm font-bold">
            法1
          </span>
          <h4 className="text-base font-bold text-slate-800">
            数轴整点跳跃探究器（分段法）
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重置
          </button>
          <button
            onClick={handleNext}
            disabled={activeHopIndex >= hops.length}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-sm ${
              activeHopIndex >= hops.length
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            {activeHopIndex === 0
              ? '点击开始跳跃'
              : activeHopIndex >= hops.length
              ? '已完成跳跃'
              : '跳向下一段'}
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-600 mb-4">
        💡 <strong>小学生的减负秘诀</strong>：把复杂的时间差拆成
        <span className="text-emerald-700 font-semibold">「凑整点」</span>、
        <span className="text-blue-700 font-semibold">「跳整小时」</span>和
        <span className="text-purple-700 font-semibold">「加零头」</span>
        ，一口气算出来不用借位！
      </p>

      {/* Visual Timeline Bar */}
      <div className="relative py-8 px-4 bg-slate-50/80 rounded-xl border border-slate-200/70 overflow-x-auto">
        <div className="min-w-[480px]">
          {/* Base line */}
          <div className="relative h-2 bg-slate-200 rounded-full my-6">
            {/* Progress fill */}
            <div
              className="absolute left-0 top-0 h-full bg-amber-400 rounded-full transition-all duration-500"
              style={{
                width: `${(activeHopIndex / hops.length) * 100}%`,
              }}
            />

            {/* Start Node */}
            <div className="absolute -left-2 -top-3 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow">
                起点
              </div>
              <span className="text-xs font-bold text-blue-900 mt-2 whitespace-nowrap">
                {start}
              </span>
            </div>

            {/* Intermediate and End Nodes */}
            {hops.map((hop, idx) => {
              const leftPercent = ((idx + 1) / hops.length) * 100;
              const isPassed = activeHopIndex > idx;
              const isCurrent = activeHopIndex === idx;

              return (
                <div
                  key={idx}
                  className="absolute -top-3 flex flex-col items-center -translate-x-1/2"
                  style={{ left: `${leftPercent}%` }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow ${
                      isPassed
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                        : isCurrent
                        ? 'bg-amber-500 text-white ring-4 ring-amber-200 animate-pulse'
                        : 'bg-white border-2 border-slate-300 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`text-xs font-bold mt-2 whitespace-nowrap ${
                      isPassed ? 'text-emerald-900' : 'text-slate-600'
                    }`}
                  >
                    {hop.to}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Jump Arc annotations */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-2">
            {hops.map((hop, idx) => {
              const isRevealed = activeHopIndex > idx;
              const isCurrent = activeHopIndex === idx;

              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border transition-all text-center ${
                    isRevealed
                      ? 'bg-emerald-50 border-emerald-200 shadow-xs'
                      : isCurrent
                      ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-100'
                      : 'bg-white/60 border-dashed border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 text-xs font-bold mb-1">
                    <span className="text-slate-500">第 {idx + 1} 跳：</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        hop.type === 'hour'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      +{hop.durationLabel}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {hop.from} → {hop.to}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {hop.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary calculation box */}
      <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div className="text-xs text-slate-700">
            <span className="font-bold text-slate-900">跳跃总用时：</span>
            {hops.map((h, i) => (
              <span key={i} className="font-semibold text-slate-800">
                {i > 0 && ' + '}
                {h.durationLabel}
              </span>
            ))}
          </div>
        </div>
        <div className="text-sm font-bold text-amber-900 bg-white px-3 py-1 rounded-lg border border-amber-300 shadow-xs flex items-center gap-1.5">
          <span>=</span>
          <span className="text-amber-700">{totalResult}</span>
        </div>
      </div>
    </div>
  );
};
