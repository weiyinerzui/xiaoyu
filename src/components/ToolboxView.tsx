import React, { useState } from 'react';
import { DualRingClock } from './widgets/DualRingClock';
import { VerticalBorrowCalc } from './widgets/VerticalBorrowCalc';
import { Clock, Calculator, Lightbulb, BookmarkCheck, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const ToolboxView: React.FC = () => {
  const [calcStartHour, setCalcStartHour] = useState<number>(14);
  const [calcStartMin, setCalcStartMin] = useState<number>(59);
  const [calcEndHour, setCalcEndHour] = useState<number>(21);
  const [calcEndMin, setCalcEndMin] = useState<number>(38);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Introduction banner */}
      <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>三上数学专项 · 时间教具工具箱</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            随时可用的时间可视化实验台
          </h2>
          <p className="text-xs text-indigo-200 max-w-xl leading-relaxed">
            把抽象看不见的时间，变成看得见、摸得着的双圈表盘与计算器。遇到任何经过时间算不准，随时来这里动手演练！
          </p>
        </div>
      </div>

      {/* Tool 1: Dual Ring Clock */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">
            1
          </span>
          <h3 className="text-base font-bold text-slate-800">
            双圈时钟转换探究器（12时制与24时制）
          </h3>
        </div>
        <DualRingClock initialHour={17} initialMin={30} showPresets={true} />
      </section>

      {/* Tool 2: Custom Column Subtraction Simulator */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">
            2
          </span>
          <h3 className="text-base font-bold text-slate-800">
            竖式「借1作60」退位实验室
          </h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-3 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold text-slate-600">
            自定义计算时刻：
          </span>
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-500 font-medium">结束时刻:</span>
            <input
              type="number"
              min="0"
              max="23"
              value={calcEndHour}
              onChange={(e) => setCalcEndHour(Number(e.target.value))}
              className="w-14 px-2 py-1 border rounded text-center font-bold"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={calcEndMin}
              onChange={(e) => setCalcEndMin(Number(e.target.value))}
              className="w-14 px-2 py-1 border rounded text-center font-bold"
            />

            <span className="text-slate-500 font-medium ml-2">开始时刻:</span>
            <input
              type="number"
              min="0"
              max="23"
              value={calcStartHour}
              onChange={(e) => setCalcStartHour(Number(e.target.value))}
              className="w-14 px-2 py-1 border rounded text-center font-bold"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={calcStartMin}
              onChange={(e) => setCalcStartMin(Number(e.target.value))}
              className="w-14 px-2 py-1 border rounded text-center font-bold"
            />
          </div>
        </div>

        <VerticalBorrowCalc
          key={`${calcEndHour}-${calcEndMin}-${calcStartHour}-${calcStartMin}`}
          endHour={calcEndHour}
          endMin={calcEndMin}
          startHour={calcStartHour}
          startMin={calcStartMin}
        />
      </section>

      {/* Tool 3: Cognitive Map & Rules Card */}
      <section className="p-6 bg-amber-50/70 border border-amber-200 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <BookmarkCheck className="w-5 h-5 text-amber-700" />
          <h3 className="text-base font-bold text-amber-950">
            三上数学「时间单元」四大黄金法则
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-amber-800 block">
              法则 1：分清「时刻」与「经过时间」
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>时刻</strong>是钟面上的一个点（如 14:00、7:30）；
              <strong>经过时间</strong>是一段过程（如 150分钟、6小时）。
              经过时间 = 结束时刻 - 开始时刻；结束时刻 = 开始时刻 + 经过时间。
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-amber-800 block">
              法则 2：12时与24时快速转换
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              上午时间数字不变，去掉上午词语；
              下午和晚上时间去掉词语，时数一定要 <strong>+ 12</strong>（例如下午5点 = 17点）。
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-amber-800 block">
              法则 3：时间是六十进制
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              1 小时 = 60 分钟！做减法竖式借位时，向时借 1 小时，必须化为 <strong>60 分</strong>！
              千万不能当成 10 分相加！
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs space-y-1">
            <span className="text-xs font-bold text-amber-800 block">
              法则 4：跨夜问题分段算
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              今天晚上到明天早上的跨天任务（如神舟飞船），以夜里 <strong>24:00 (0:00)</strong> 为界：
              第一段算到 24:00，第二段从 0:00 算起，最后两段相加！
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
