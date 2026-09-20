import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Sun, Moon, Sparkles, Clock } from 'lucide-react';

interface DualRingClockProps {
  initialHour?: number;
  initialMin?: number;
  showPresets?: boolean;
}

export const DualRingClock: React.FC<DualRingClockProps> = ({
  initialHour = 17,
  initialMin = 30,
  showPresets = true,
}) => {
  const [totalMinutes, setTotalMinutes] = useState<number>(
    initialHour * 60 + initialMin
  );

  const hour24 = Math.floor(totalMinutes / 60);
  const min = totalMinutes % 60;

  // 12-hour format calculation
  const isAfternoonOrNight = hour24 >= 12;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  let periodText = '凌晨';
  if (hour24 >= 5 && hour24 < 8) periodText = '早晨';
  else if (hour24 >= 8 && hour24 < 12) periodText = '上午';
  else if (hour24 === 12) periodText = '中午';
  else if (hour24 > 12 && hour24 < 18) periodText = '下午';
  else if (hour24 >= 18) periodText = '晚上';

  // Clock Hand Angles
  const minuteAngle = min * 6; // 360 / 60 = 6 deg
  const hourAngle = (hour12 % 12) * 30 + min * 0.5; // 360 / 12 = 30 deg + min offset

  const presets = [
    { label: '上午 7:00 (禁行开始)', h: 7, m: 0 },
    { label: '上午 11:30 (王老师出发)', h: 11, m: 30 },
    { label: '下午 2:00 (作文赛开始)', h: 14, m: 0 },
    { label: '下午 3:30 (足球开球)', h: 15, m: 30 },
    { label: '下午 5:30 (禁行结束)', h: 17, m: 30 },
    { label: '晚上 11:44 (飞船发射)', h: 23, m: 44 },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalMinutes(Number(e.target.value));
  };

  const applyPreset = (h: number, m: number) => {
    soundManager.playClick();
    setTotalMinutes(h * 60 + m);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-sky-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-600" />
          <h4 className="text-base font-bold text-slate-800">
            双圈时钟互动探究（12时制 vs 24时制）
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          {hour24 >= 6 && hour24 < 18 ? (
            <span className="flex items-center gap-1 text-amber-700">
              <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              白天
            </span>
          ) : (
            <span className="flex items-center gap-1 text-indigo-700">
              <Moon className="w-3.5 h-3.5 text-indigo-500 fill-indigo-400" />
              夜间
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-600 mb-4">
        🔍 <strong>为什么要加12？</strong> 时针在钟面上跑第一圈是 0~12
        点（上午）；过了中午12点，时针跑第二圈，所以在第1圈12小时的基础上加上内圈数字，就是
        24 时计时法！
      </p>

      {/* Main Dual Clock + Conversion Board */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50/70 p-4 rounded-xl border border-slate-200">
        {/* SVG Clock Face */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative w-64 h-64 select-none">
            <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md">
              {/* Outer circle background (24-hour ring) */}
              <circle
                cx="120"
                cy="120"
                r="115"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="2"
              />
              <circle
                cx="120"
                cy="120"
                r="90"
                fill="#f1f5f9"
                stroke="#e2e8f0"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Inner circle (12-hour ring) */}
              <circle
                cx="120"
                cy="120"
                r="68"
                fill="#ffffff"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />

              {/* Outer Ring Numbers (13-24) */}
              {[
                { n: 24, a: 0 },
                { n: 13, a: 30 },
                { n: 14, a: 60 },
                { n: 15, a: 90 },
                { n: 16, a: 120 },
                { n: 17, a: 150 },
                { n: 18, a: 180 },
                { n: 19, a: 210 },
                { n: 20, a: 240 },
                { n: 21, a: 270 },
                { n: 22, a: 300 },
                { n: 23, a: 330 },
              ].map((item) => {
                const rad = ((item.a - 90) * Math.PI) / 180;
                const x = 120 + 102 * Math.cos(rad);
                const y = 120 + 102 * Math.sin(rad) + 4;
                const isActive = (hour24 === 0 && item.n === 24) || hour24 === item.n;
                return (
                  <text
                    key={item.n}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fontSize={item.n === 24 ? "9" : "10"}
                    fontWeight={isActive ? '800' : '600'}
                    fill={isActive ? '#e11d48' : '#64748b'}
                  >
                    {item.n === 24 ? '24/0' : item.n}
                  </text>
                );
              })}

              {/* Inner Ring Numbers (1-12) */}
              {[
                { n: 12, a: 0 },
                { n: 1, a: 30 },
                { n: 2, a: 60 },
                { n: 3, a: 90 },
                { n: 4, a: 120 },
                { n: 5, a: 150 },
                { n: 6, a: 180 },
                { n: 7, a: 210 },
                { n: 8, a: 240 },
                { n: 9, a: 270 },
                { n: 10, a: 300 },
                { n: 11, a: 330 },
              ].map((item) => {
                const rad = ((item.a - 90) * Math.PI) / 180;
                const x = 120 + 78 * Math.cos(rad);
                const y = 120 + 78 * Math.sin(rad) + 4;
                const isActive = hour12 === item.n;
                return (
                  <text
                    key={item.n}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={isActive ? '800' : '600'}
                    fill={isActive ? '#0284c7' : '#334155'}
                  >
                    {item.n}
                  </text>
                );
              })}

              {/* Minute ticks */}
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = i * 6;
                const isHourTick = i % 5 === 0;
                const rad = ((angle - 90) * Math.PI) / 180;
                const r1 = isHourTick ? 62 : 65;
                const r2 = 68;
                return (
                  <line
                    key={i}
                    x1={120 + r1 * Math.cos(rad)}
                    y1={120 + r1 * Math.sin(rad)}
                    x2={120 + r2 * Math.cos(rad)}
                    y2={120 + r2 * Math.sin(rad)}
                    stroke={isHourTick ? '#475569' : '#cbd5e1'}
                    strokeWidth={isHourTick ? 1.5 : 0.8}
                  />
                );
              })}

              {/* Hour hand */}
              <line
                x1="120"
                y1="120"
                x2={120 + 38 * Math.cos(((hourAngle - 90) * Math.PI) / 180)}
                y2={120 + 38 * Math.sin(((hourAngle - 90) * Math.PI) / 180)}
                stroke="#0f172a"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Minute hand */}
              <line
                x1="120"
                y1="120"
                x2={120 + 56 * Math.cos(((minuteAngle - 90) * Math.PI) / 180)}
                y2={120 + 56 * Math.sin(((minuteAngle - 90) * Math.PI) / 180)}
                stroke="#0284c7"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Center pin */}
              <circle cx="120" cy="120" r="5" fill="#e11d48" />
              <circle cx="120" cy="120" r="2" fill="#ffffff" />
            </svg>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" />
              内圈：12时制 (1~12)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              外圈：24时制 (13~24)
            </span>
          </div>
        </div>

        {/* Display and Conversion comparison */}
        <div className="md:col-span-6 space-y-3">
          {/* 12-hour display */}
          <div className="p-3 bg-white rounded-xl border border-sky-100 shadow-xs">
            <span className="text-[11px] font-bold text-sky-700 block mb-1">
              12时计时法（普通计时法，必须带时间词）
            </span>
            <div className="text-xl font-bold text-slate-900 flex items-center justify-between">
              <span>
                <span className="text-sky-600 mr-1.5">{periodText}</span>
                {hour12} : {min.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                看内圈
              </span>
            </div>
          </div>

          {/* 24-hour display */}
          <div className="p-3 bg-white rounded-xl border border-rose-100 shadow-xs">
            <span className="text-[11px] font-bold text-rose-700 block mb-1">
              24时计时法（不用带时间词，直接写时刻）
            </span>
            <div className="text-xl font-bold text-slate-900 flex items-center justify-between">
              <span className="text-rose-600">
                {hour24.toString().padStart(2, '0')} : {min.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                看外圈
              </span>
            </div>
          </div>

          {/* Conversion explanation card */}
          <div className="p-3 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
            <div className="flex items-center gap-1 font-bold text-indigo-950 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              转化关系公式：
            </div>
            {isAfternoonOrNight ? (
              <p>
                当前是下午/晚上：内圈小时 <strong className="text-indigo-700">{hour12}</strong> + 12 ={' '}
                <strong className="text-rose-600">{hour24}</strong> （24时计时法）
              </p>
            ) : (
              <p>
                当前是上午/早晨：数字不变，去掉时间词即可！直接写为{' '}
                <strong className="text-rose-600">
                  {hour24.toString().padStart(2, '0')}:{min.toString().padStart(2, '0')}
                </strong>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Slider for interactive dragging */}
      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <span>拨动时间滑块 (00:00 - 24:00)</span>
          <span className="text-sky-700 font-bold font-mono">
            {hour24.toString().padStart(2, '0')} : {min.toString().padStart(2, '0')}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1439"
          value={totalMinutes}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
        />
      </div>

      {/* Presets buttons from the worksheet questions */}
      {showPresets && (
        <div className="mt-3">
          <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
            试卷题目中的关键时刻快捷体验：
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset.h, preset.m)}
                className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-sky-100 hover:text-sky-800 text-slate-700 rounded-lg transition-colors border border-slate-200/80"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
