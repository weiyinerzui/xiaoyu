import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Ban, Truck, Clock, CheckCircle2, Sparkles } from 'lucide-react';

export const TrafficSignWidget: React.FC = () => {
  const [startInput, setStartInput] = useState<string>('7:00');
  const [endInput, setEndInput] = useState<string>('17:30');
  const [showCalculation, setShowCalculation] = useState<boolean>(true);

  return (
    <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <span>交通标志牌与24时计时转换</span>
        </h4>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          生活中的数学
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Realistic Traffic Sign (matching Question 3) */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="w-52 bg-white rounded-2xl p-4 border-4 border-slate-700 shadow-md flex flex-col items-center text-center">
            {/* Red Prohibition Sign for Trucks */}
            <div className="relative w-24 h-24 rounded-full border-4 border-rose-600 flex items-center justify-center mb-2">
              <Truck className="w-12 h-12 text-slate-800" />
              {/* Diagonal Slash */}
              <div className="absolute w-24 h-1 bg-rose-600 rotate-45" />
            </div>
            <span className="text-[10px] text-slate-500 font-bold tracking-wider mb-2">
              禁止载货汽车通行
            </span>

            {/* Time interval on sign */}
            <div className="w-full bg-slate-50 p-2 rounded-lg border border-slate-200 font-mono font-bold text-slate-800 text-sm">
              ( {startInput || '____'} ) — ( {endInput || '____'} )
            </div>

            <div className="mt-2 text-base font-black text-slate-900 tracking-widest">
              禁止通行
            </div>
          </div>
          <span className="text-[11px] text-slate-500 mt-2 font-medium">
            公路交通指示牌实景
          </span>
        </div>

        {/* Right: Step-by-step Transformation & Duration Calc */}
        <div className="md:col-span-7 space-y-3">
          {/* Question 1 breakdown */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-1">
              (1) 转化为 24 时计时法填入标志牌：
            </span>
            <div className="text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                <span>上午 7: 00 ➔ 数字不变</span>
                <span className="font-mono font-bold text-blue-600">7:00</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                <span>下午 5: 30 ➔ 5 + 12 = 17</span>
                <span className="font-mono font-bold text-rose-600">17:30</span>
              </div>
            </div>
          </div>

          {/* Question 2 breakdown */}
          <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200">
            <span className="text-xs font-bold text-indigo-950 block mb-1">
              (2) 计算全天禁行总时长：
            </span>
            <div className="text-xs text-indigo-900 space-y-1">
              <p className="font-mono">
                经过时间 = 结束时刻 - 开始时刻
              </p>
              <div className="bg-white p-2 rounded-lg border border-indigo-200 text-xs flex items-center justify-between">
                <span className="font-mono font-bold text-slate-800">
                  17时30分 - 7时00分 =
                </span>
                <span className="font-mono font-extrabold text-indigo-700 text-sm">
                  10 小时 30 分
                </span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                时减时：17 - 7 = 10时；分减分：30 - 0 = 30分。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
