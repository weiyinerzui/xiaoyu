import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { Users, Ticket, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const TrainTicketWidget: React.FC = () => {
  const [includeUncleLi, setIncludeUncleLi] = useState<boolean>(true);
  const [friendsCount, setFriendsCount] = useState<number>(2);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(true);

  const totalPeople = (includeUncleLi ? 1 : 0) + friendsCount;
  const multiplier = isRoundTrip ? 2 : 1;
  const totalTickets = totalPeople * multiplier;
  const pricePerTicket = 68;
  const totalPrice = totalTickets * pricePerTicket;

  return (
    <div className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Ticket className="w-5 h-5 text-amber-600" />
          <h4 className="text-base font-bold text-slate-800">
            高铁购票与用时拆解（生活应用与陷阱探秘）
          </h4>
        </div>
        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          三大隐藏陷阱
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Simulated Train Ticket (matching Figure 2 from worksheet) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-blue-50 to-indigo-50/60 p-4 rounded-2xl border-2 border-indigo-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-indigo-100/60 pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-indigo-200/80 pb-2 mb-3">
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              12306 购票页面（图2还原）
            </span>
            <span className="text-base font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-mono">
              ¥68
            </span>
          </div>

          <div className="flex items-center justify-between px-2 py-3 bg-white rounded-xl border border-indigo-100 shadow-xs mb-3">
            <div className="text-center">
              <div className="text-xl font-black text-slate-800 font-mono">07:29</div>
              <div className="text-xs font-bold text-indigo-900 mt-0.5">江阴</div>
            </div>

            <div className="flex flex-col items-center px-4">
              <span className="text-[11px] font-bold text-slate-500 font-mono">G104 次</span>
              <div className="flex items-center text-indigo-500 my-0.5">
                <div className="w-8 h-0.5 bg-indigo-300" />
                <ArrowRight className="w-4 h-4 text-indigo-600 -ml-1" />
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                耗时 1小时
              </span>
            </div>

            <div className="text-center">
              <div className="text-xl font-black text-slate-800 font-mono">08:29</div>
              <div className="text-xs font-bold text-indigo-900 mt-0.5">南京南</div>
            </div>
          </div>

          {/* Time calculation reveal */}
          <div className="p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950">
            <div className="font-bold flex items-center gap-1 text-emerald-900 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              经过时间：07:29 到 08:29
            </div>
            <p className="text-[11px] text-emerald-800 leading-normal">
              08:29 - 07:29 = <strong>1 小时</strong>。
              <span className="text-rose-600 font-bold ml-1 bg-white px-1.5 py-0.5 rounded border border-rose-200">
                注意题目问的是(   )分钟！1小时 = 60分钟！
              </span>
            </p>
          </div>
        </div>

        {/* Right: Interactive People & Roundtrip Counter */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              陷阱 1：一共几个人？（李叔叔 + 2个好朋友）
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIncludeUncleLi(!includeUncleLi);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  includeUncleLi
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                李叔叔本人 {includeUncleLi ? '✓ (1人)' : '(未勾选)'}
              </button>
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-300">
                <span className="text-xs text-slate-500">好朋友：</span>
                <span className="text-xs font-bold text-indigo-700">{friendsCount} 人</span>
              </div>
              <span className="text-xs font-bold text-slate-800 ml-auto">
                总人数 = <span className="text-blue-600 text-sm">{totalPeople}</span> 人
              </span>
            </div>
            {!includeUncleLi && (
              <p className="text-[11px] text-rose-600 font-semibold mt-1">
                ⚠️ 小心！很多同学忘了算李叔叔，只算了2个朋友！
              </p>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              陷阱 2：“往返”都乘高铁（买几张票？）
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsRoundTrip(true);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  isRoundTrip
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                往返 (去程 + 返程 ×2)
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsRoundTrip(false);
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  !isRoundTrip
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                仅单程 (去程 ×1)
              </button>
            </div>
            {!isRoundTrip && (
              <p className="text-[11px] text-rose-600 font-semibold mt-1">
                ⚠️ 题目明确写了“往返”，去一趟要买票，回来也要买票！总票数要乘 2！
              </p>
            )}
          </div>

          {/* Final Cost Calculation */}
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl">
            <div className="text-xs text-slate-600 mb-1">票价计算公式：</div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="text-xs font-mono font-bold text-slate-800">
                {totalPeople}人 × {multiplier}趟 × ¥{pricePerTicket} =
              </div>
              <div className="text-lg font-black text-indigo-700 bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-xs">
                ¥ {totalPrice} 元
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
