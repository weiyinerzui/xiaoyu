import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';

export const NumberLineQuizWidget: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const points = [
    { id: 'A', name: '点 A', time: '16:15', fraction: 1 + 1 / 4, isCorrect: false, note: '16时过了1格(15分)，不是16:30哦' },
    { id: 'B', name: '点 B', time: '16:30', fraction: 1 + 2 / 4, isCorrect: true, note: '太棒了！16时过了2格(30分)，正是 14:00 + 2小时30分！' },
    { id: 'C', name: '点 C', time: '16:45', fraction: 1 + 3 / 4, isCorrect: false, note: '16时过了3格(45分)，超时了' },
    { id: 'D', name: '点 D', time: '17:00', fraction: 2, isCorrect: false, note: '17时整，比赛已经结束半小时啦' },
  ];

  const handleSelect = (pt: typeof points[0]) => {
    if (pt.isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playClick();
    }
    setSelectedPoint(pt.id);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-blue-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <span>原卷时间数轴与刻度解密</span>
        </h4>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          1大格 = 1小时 (60分) ➔ 每小格 = 15分钟
        </span>
      </div>

      <p className="text-xs text-slate-600 mb-4">
        🔍 <strong>小学生数轴读数诀窍</strong>：15时到16时被平均分成了 4 个小格子。
        1小时有60分钟，60 ÷ 4 = <strong>15 分钟/格</strong>！点击下面数轴上的点试试：
      </p>

      {/* SVG Interactive Number line */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
        <div className="min-w-[520px] py-4">
          <svg viewBox="0 0 540 100" className="w-full h-auto select-none">
            {/* Main Axis Line */}
            <line x1="20" y1="50" x2="510" y2="50" stroke="#0f172a" strokeWidth="2.5" />
            <polygon points="520,50 505,44 505,56" fill="#0f172a" />

            {/* Hour ticks and labels: 15时, 16时, 17时, 18时 */}
            {[
              { label: '15时', x: 50 },
              { label: '16时', x: 190 },
              { label: '17时', x: 330 },
              { label: '18时', x: 470 },
            ].map((h, i) => (
              <g key={i}>
                <line x1={h.x} y1="35" x2={h.x} y2="65" stroke="#0f172a" strokeWidth="2" />
                <text
                  x={h.x}
                  y="26"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#0f172a"
                >
                  {h.label}
                </text>
              </g>
            ))}

            {/* Sub-ticks (each is 15 minutes = 35px apart) */}
            {/* Between 15 and 16 */}
            {[85, 120, 155].map((x, idx) => (
              <line key={`s1-${idx}`} x1={x} y1="42" x2={x} y2="58" stroke="#94a3b8" strokeWidth="1.5" />
            ))}

            {/* Between 16 and 17 (Points A, B, C) */}
            {/* 16:15 is 190 + 35 = 225 (A) */}
            {/* 16:30 is 190 + 70 = 260 (B) */}
            {/* 16:45 is 190 + 105 = 295 (C) */}
            {/* 17:00 is 330 (D) */}
            {[225, 260, 295].map((x, idx) => (
              <line key={`s2-${idx}`} x1={x} y1="40" x2={x} y2="60" stroke="#64748b" strokeWidth="1.5" />
            ))}

            {/* Between 17 and 18 */}
            {[365, 400, 435].map((x, idx) => (
              <line key={`s3-${idx}`} x1={x} y1="42" x2={x} y2="58" stroke="#94a3b8" strokeWidth="1.5" />
            ))}

            {/* Point Labels A, B, C, D */}
            {[
              { id: 'A', x: 225, label: 'A' },
              { id: 'B', x: 260, label: 'B' },
              { id: 'C', x: 295, label: 'C' },
              { id: 'D', x: 330, label: 'D' },
            ].map((pt) => {
              const isSelected = selectedPoint === pt.id;
              const isB = pt.id === 'B';
              return (
                <g
                  key={pt.id}
                  className="cursor-pointer"
                  onClick={() => {
                    const match = points.find((p) => p.id === pt.id);
                    if (match) handleSelect(match);
                  }}
                >
                  <circle
                    cx={pt.x}
                    cy="72"
                    r={isSelected ? '11' : '9'}
                    fill={isSelected ? (isB ? '#16a34a' : '#ef4444') : '#2563eb'}
                    className="transition-all hover:scale-125"
                  />
                  <text
                    x={pt.x}
                    y="76"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#ffffff"
                  >
                    {pt.label}
                  </text>
                  <text
                    x={pt.x}
                    y="92"
                    textAnchor="middle"
                    fontSize="9"
                    fill={isSelected ? '#0f172a' : '#64748b'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    点{pt.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Interactive Point Feedback */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        {points.map((pt) => {
          const isSelected = selectedPoint === pt.id;
          return (
            <button
              key={pt.id}
              onClick={() => handleSelect(pt)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? pt.isCorrect
                    ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200'
                    : 'bg-rose-50 border-rose-300 ring-2 ring-rose-100'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">{pt.name}</span>
                <span className="font-mono text-xs text-slate-500">{pt.time}</span>
              </div>
              {isSelected && (
                <div className={`text-[10px] mt-1 font-bold ${pt.isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {pt.isCorrect ? '✓ 正确答案' : '✕ 再想想'}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedPoint && (
        <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <strong>解题分析：</strong>
            {points.find((p) => p.id === selectedPoint)?.note}
          </div>
        </div>
      )}
    </div>
  );
};
