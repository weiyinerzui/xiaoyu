import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Film, Clapperboard, Clock, ArrowRight, Check } from 'lucide-react';

export const CinemaScheduleWidget: React.FC = () => {
  const [showUnitConversion, setShowUnitConversion] = useState<boolean>(true);

  return (
    <div className="bg-white rounded-2xl p-5 border border-purple-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-5 h-5 text-purple-600" />
          <h4 className="text-base font-bold text-slate-800">
            影院排片探秘（表格信息提取与单位化聚）
          </h4>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
          《哪吒 2》排片表
        </span>
      </div>

      {/* Film Schedule Table Reproduction */}
      <div className="overflow-hidden rounded-xl border border-slate-200 mb-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-purple-50/80 text-purple-900 font-bold border-b border-purple-200">
              <th className="p-2.5 border-r border-purple-200">影片名称</th>
              <th className="p-2.5 border-r border-purple-200">开始时间</th>
              <th className="p-2.5 border-r border-purple-200">结束时间</th>
              <th className="p-2.5">放映厅</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 hover:bg-slate-50/60">
              <td rowSpan={2} className="p-3 font-bold text-purple-950 border-r border-slate-200 bg-white">
                <div className="flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-purple-600" />
                  <span>哪吒 2</span>
                </div>
              </td>
              <td className="p-3 font-mono font-bold text-slate-800 border-r border-slate-200">13:00</td>
              <td className="p-3 font-mono font-bold text-emerald-700 border-r border-slate-200">15:24</td>
              <td className="p-3 text-slate-700 font-medium">1 号厅</td>
            </tr>
            <tr className="bg-amber-50/40">
              <td className="p-3 font-mono font-bold text-slate-800 border-r border-slate-200">16:00</td>
              <td className="p-3 font-mono font-bold text-amber-700 border-r border-slate-200">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  ( 18:24 )
                </span>
              </td>
              <td className="p-3 text-slate-700 font-medium">2 号厅</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Two-step Scaffolding */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step 1: Hall 1 Duration */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px]">
              1
            </span>
            <span>算片长：1号厅用时与单位转换</span>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <p>15:24 - 13:00 = <strong>2 小时 24 分钟</strong></p>
            <div className="p-2 bg-white rounded-lg border border-purple-200 text-purple-900 font-medium">
              ⚠️ <strong>陷阱提醒</strong>：题目要求填的是 <strong>(   ) 分钟</strong>！
              <div className="mt-1 text-xs font-mono font-bold text-purple-700">
                2小时 = 2 × 60 = 120 分钟<br />
                120 + 24 = <span className="text-rose-600 text-sm">144 分钟</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Hall 2 Ending Time */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px]">
              2
            </span>
            <span>推算2号厅结束时刻</span>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <p>同一部电影，放映时长完全相同（都是 2小时24分钟）：</p>
            <div className="p-2 bg-white rounded-lg border border-amber-200 text-slate-800 font-medium">
              <span className="text-slate-500">结束时刻 = 开始时刻 + 片长</span>
              <div className="mt-1 text-xs font-mono font-bold text-amber-700">
                16:00 + 2小时24分 = <span className="text-emerald-700 text-sm">18:24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
