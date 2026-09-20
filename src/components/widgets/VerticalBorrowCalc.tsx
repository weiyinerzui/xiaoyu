import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Sparkles, HelpCircle, ArrowDown, RotateCcw } from 'lucide-react';

interface VerticalBorrowCalcProps {
  endHour: number;
  endMin: number;
  startHour: number;
  startMin: number;
}

export const VerticalBorrowCalc: React.FC<VerticalBorrowCalcProps> = ({
  endHour = 21,
  endMin = 38,
  startHour = 14,
  startMin = 59,
}) => {
  // Step: 0: initial, 1: borrowed (21->20, 38+60=98), 2: min calculated, 3: hour calculated
  const [step, setStep] = useState<number>(0);

  const handleNextStep = () => {
    soundManager.playClick();
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setStep(0);
  };

  const isBorrowed = step >= 1;
  const isMinCalculated = step >= 2;
  const isHourCalculated = step >= 3;

  const currentHour = isBorrowed ? endHour - 1 : endHour;
  const currentMin = isBorrowed ? endMin + 60 : endMin;

  const resultMin = isMinCalculated ? (endMin + 60) - startMin : null;
  const resultHour = isHourCalculated ? (endHour - 1) - startHour : null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-indigo-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 text-sm font-bold">
            法2
          </span>
          <h4 className="text-base font-bold text-slate-800">
            时间竖式「借1小时作60分」模拟器
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重试
          </button>
          <button
            onClick={handleNextStep}
            disabled={step >= 3}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-sm ${
              step >= 3
                ? 'bg-emerald-100 text-emerald-700 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {step === 0 && '第1步：38分不够减，借1小时'}
            {step === 1 && '第2步：计算分钟 98 - 59'}
            {step === 2 && '第3步：计算小时 20 - 14'}
            {step === 3 && '已完成竖式计算！'}
          </button>
        </div>
      </div>

      {/* Warning alert banner */}
      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 mb-4 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong>最易错警示：</strong> 小数减大数不够减时，千万<strong>不能借1当10</strong>！
          因为 <strong>1小时 = 60分钟</strong>，借过来的 1 小时要变成 <span className="text-rose-600 font-bold bg-rose-50 px-1 py-0.5 rounded border border-rose-200">+60分</span> 借给分钟！
        </div>
      </div>

      {/* Interactive Column Layout */}
      <div className="max-w-md mx-auto bg-slate-50/90 rounded-2xl p-6 border border-slate-200">
        <div className="font-mono text-center">
          {/* Borrowing annotation row */}
          <div className="h-8 flex justify-end items-end gap-12 pr-6 text-xs">
            <div className={`transition-all duration-300 font-bold ${isBorrowed ? 'text-indigo-600 opacity-100 scale-105' : 'opacity-0'}`}>
              <span className="bg-indigo-100 px-2 py-0.5 rounded border border-indigo-300">
                借走1小时，剩 20 时
              </span>
            </div>
            <div className={`transition-all duration-300 font-bold ${isBorrowed ? 'text-rose-600 opacity-100 scale-105' : 'opacity-0'}`}>
              <span className="bg-rose-100 px-2 py-0.5 rounded border border-rose-300">
                38 + 60 = 98 分
              </span>
            </div>
          </div>

          {/* First Line: 21时 38分 */}
          <div className="flex justify-end items-center gap-12 pr-6 py-2 text-2xl font-bold text-slate-800 border-b border-dashed border-slate-200">
            <div className="relative">
              {isBorrowed && (
                <div className="absolute inset-x-0 top-1/2 border-b-2 border-rose-500 -rotate-12" />
              )}
              <span>{endHour}</span>
              <span className="text-sm text-slate-400 font-normal ml-1">时</span>
            </div>
            <div className="relative">
              {isBorrowed && (
                <div className="absolute inset-x-0 top-1/2 border-b-2 border-rose-500 -rotate-12" />
              )}
              <span>{endMin}</span>
              <span className="text-sm text-slate-400 font-normal ml-1">分</span>
            </div>
          </div>

          {/* Second Line: - 14时 59分 */}
          <div className="flex justify-end items-center gap-12 pr-6 py-2 text-2xl font-bold text-slate-700 relative">
            <span className="absolute left-6 text-3xl font-normal text-slate-400">－</span>
            <div>
              <span>{startHour}</span>
              <span className="text-sm text-slate-400 font-normal ml-1">时</span>
            </div>
            <div>
              <span>{startMin}</span>
              <span className="text-sm text-slate-400 font-normal ml-1">分</span>
            </div>
          </div>

          {/* Solid line */}
          <div className="h-0.5 bg-slate-800 my-2 rounded-full" />

          {/* Result Line */}
          <div className="flex justify-end items-center gap-12 pr-6 py-2 text-2xl font-bold min-h-[48px]">
            <div className="w-16 text-right">
              {isHourCalculated ? (
                <span className="text-indigo-600 animate-in fade-in duration-300 font-extrabold">
                  {resultHour}
                  <span className="text-sm font-normal text-slate-500 ml-1">时</span>
                </span>
              ) : (
                <span className="text-slate-300 text-lg">?</span>
              )}
            </div>
            <div className="w-16 text-right">
              {isMinCalculated ? (
                <span className="text-emerald-600 animate-in fade-in duration-300 font-extrabold">
                  {resultMin}
                  <span className="text-sm font-normal text-slate-500 ml-1">分</span>
                </span>
              ) : (
                <span className="text-slate-300 text-lg">?</span>
              )}
            </div>
          </div>
        </div>

        {/* Step Guide Explanation */}
        <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ArrowDown className="w-3.5 h-3.5 text-indigo-500" />
            <span>
              {step === 0 && '准备计算：查看分钟位 38 < 59，需要借位。'}
              {step === 1 && '已借位：21时变成20时，分位得到60分变成98分。'}
              {step === 2 && '分钟位相减：98 - 59 = 39分。下一步算小时。'}
              {step === 3 && '小时位相减：20 - 14 = 6时。得出经过时间 6小时39分！'}
            </span>
          </div>
          {step === 3 && (
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              大功告成！
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
