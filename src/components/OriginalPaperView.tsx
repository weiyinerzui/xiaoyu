import React from 'react';
import { QUESTIONS_DATA } from '../data/questionsData';
import { soundManager } from '../utils/audio';
import { ExternalLink, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

interface OriginalPaperViewProps {
  onSelectQuestion: (id: number) => void;
  completedIds: number[];
}

export const OriginalPaperView: React.FC<OriginalPaperViewProps> = ({
  onSelectQuestion,
  completedIds,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Paper Container resembling school exam sheet */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-300 shadow-sm relative font-sans">
        {/* Paper Header */}
        <div className="border-b-2 border-slate-800 pb-4 mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
            <span>三上每日一练 一天的时间</span>
            <span>苏州朱老师</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              课时 4 时间总复习 (1)
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="border-b border-slate-400 pb-0.5">姓名：___________</span>
              <span className="border-b border-slate-400 pb-0.5">班级：___________</span>
            </div>
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-6 divide-y divide-slate-100">
          {QUESTIONS_DATA.map((q, idx) => {
            const isCompleted = completedIds.includes(q.id);

            return (
              <div
                key={q.id}
                className={`pt-6 first:pt-0 group transition-all rounded-2xl p-3 -mx-3 hover:bg-slate-50/80 ${
                  isCompleted ? 'bg-emerald-50/30' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        {q.id}
                      </span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {q.badge}
                      </span>
                      {isCompleted && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          已通关
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line pl-1">
                      {q.originalText}
                    </p>
                  </div>

                  {/* Jump button */}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectQuestion(q.id);
                    }}
                    className="flex-shrink-0 px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>互动探究</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paper Footer */}
        <div className="border-t border-slate-200 mt-8 pt-4 flex items-center justify-between text-xs text-slate-400">
          <span>小学三年级数学上册 · 时间复习精选练习</span>
          <span>全卷共 8 题 · 点击任意题目进入循序微课</span>
        </div>
      </div>
    </div>
  );
};
