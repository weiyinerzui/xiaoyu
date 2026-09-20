import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Car, MapPin, Gauge, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

export const SpeedDistanceCar: React.FC = () => {
  const [hourProgress, setHourProgress] = useState<number>(4); // 0 to 4 hours

  const speed = 70;
  const currentDistance = hourProgress * speed;

  const handleStep = () => {
    soundManager.playHop();
    if (hourProgress < 4) {
      setHourProgress((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setHourProgress(0);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-emerald-600" />
          <h4 className="text-base font-bold text-slate-800">
            自驾路程模拟器（行驶时间 × 平均速度 = 总路程）
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重试出发
          </button>
          <button
            onClick={handleStep}
            disabled={hourProgress >= 4}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-sm ${
              hourProgress >= 4
                ? 'bg-emerald-100 text-emerald-700 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            {hourProgress === 0
              ? '开车出发 (第1小时)'
              : hourProgress >= 4
              ? '已安全到达温州！'
              : `开往第 ${hourProgress + 1} 小时`}
          </button>
        </div>
      </div>

      {/* Road Highway Simulation */}
      <div className="bg-slate-900 rounded-xl p-5 text-white relative overflow-hidden my-3 border border-slate-800">
        {/* Road lanes and milestones */}
        <div className="flex items-center justify-between text-xs text-slate-300 mb-6">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="font-bold text-white">上虞城北</div>
              <div className="text-[10px] text-slate-400 font-mono">上午 11:30 出发</div>
            </div>
          </div>
          <div className="text-center">
            <span className="text-xs font-mono font-bold text-amber-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-amber-500/30">
              匀速行驶：70 km/h
            </span>
          </div>
          <div className="flex items-center gap-1 text-right">
            <div>
              <div className="font-bold text-white">温州市实验小学</div>
              <div className="text-[10px] text-slate-400 font-mono">下午 3:30 到达 (15:30)</div>
            </div>
            <MapPin className="w-4 h-4 text-rose-400" />
          </div>
        </div>

        {/* Road Track */}
        <div className="relative h-12 bg-slate-800 rounded-lg flex items-center px-4 border-y border-dashed border-slate-700">
          {/* Animated Car */}
          <div
            className="absolute transition-all duration-700 flex items-center gap-1 -translate-x-1/2"
            style={{ left: `${Math.max(8, (hourProgress / 4) * 92)}%` }}
          >
            <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/40">
              <Car className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Hourly Checkpoints */}
        <div className="grid grid-cols-5 text-center mt-3 text-[11px] text-slate-400 font-mono">
          <div>
            <span>11:30</span>
            <div className="text-[10px] text-slate-500">0 km</div>
          </div>
          <div>
            <span>12:30</span>
            <div className="text-[10px] text-emerald-400">70 km</div>
          </div>
          <div>
            <span>13:30</span>
            <div className="text-[10px] text-emerald-400">140 km</div>
          </div>
          <div>
            <span>14:30</span>
            <div className="text-[10px] text-emerald-400">210 km</div>
          </div>
          <div>
            <span>15:30</span>
            <div className="text-[10px] text-amber-300 font-bold">280 km</div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[11px] text-slate-500 block">第1步：计算时间</span>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            15:30 - 11:30 = <span className="text-blue-600">4 小时</span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[11px] text-slate-500 block">第2步：速度 × 时间</span>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            70 × 4 = <span className="text-emerald-700">280 千米</span>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-emerald-800 font-semibold block">当前已开路程</span>
            <div className="text-lg font-black text-emerald-700 font-mono">
              {currentDistance} <span className="text-xs font-normal">km</span>
            </div>
          </div>
          <div className="text-xs font-bold text-emerald-800 bg-white px-2 py-1 rounded-lg border border-emerald-200">
            {hourProgress} / 4 小时
          </div>
        </div>
      </div>
    </div>
  );
};
