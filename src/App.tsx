/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QUESTIONS_DATA } from './data/questionsData';
import { ActiveTab, QuestionItem } from './types';
import { Header } from './components/Header';
import { ProblemCard } from './components/ProblemCard';
import { ToolboxView } from './components/ToolboxView';
import { OriginalPaperView } from './components/OriginalPaperView';
import { soundManager } from './utils/audio';
import {
  Sparkles,
  CheckCircle2,
  Trophy,
  Filter,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tutorial');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const categories = [
    '全部',
    '经过时间',
    '时刻与数轴',
    '24时计时法',
    '跨天计算',
    '生活中的综合应用',
  ];

  const handleCompleteQuestion = (id: number) => {
    if (!completedIds.includes(id)) {
      const next = [...completedIds, id];
      setCompletedIds(next);
      if (next.length === QUESTIONS_DATA.length) {
        setShowCelebration(true);
      }
    }
  };

  const handleSelectFromPaper = (id: number) => {
    setSelectedQuestionId(id);
    setActiveTab('tutorial');
    // scroll smoothly to top of problem
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Filter questions
  const filteredQuestions = QUESTIONS_DATA.filter((q) => {
    if (selectedCategory !== '全部' && q.category !== selectedCategory) {
      return false;
    }
    if (selectedQuestionId !== null && q.id !== selectedQuestionId) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans">
      {/* Top Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedIds={completedIds}
        totalQuestions={QUESTIONS_DATA.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* VIEW 1: Tutorial Mode */}
        {activeTab === 'tutorial' && (
          <div className="space-y-6">
            {/* Child-friendly Guide Banner */}
            <div className="p-5 sm:p-6 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl text-white shadow-md relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>小学生减负秘籍 · 循序渐进掌握时间题目</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  不怕“退位借10”，搞懂“退1作60”与数轴分段法
                </h2>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                  每道题目都配有「<strong>直观教具演示</strong>」、「<strong>避坑指南</strong>」与「<strong>速记口诀</strong>」。
                  动动手指拨表盘、跳数轴，让时间数学变得好玩又简单！
                </p>
              </div>
            </div>

            {/* Question Quick Navigation Bar */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              {/* Question Number Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedQuestionId(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedQuestionId === null
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  全部题目 (8题)
                </button>
                {QUESTIONS_DATA.map((q) => {
                  const isSelected = selectedQuestionId === q.id;
                  const isDone = completedIds.includes(q.id);

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedQuestionId(q.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500 text-white shadow-xs'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>第{q.id}题</span>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-slate-100 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-600 whitespace-nowrap">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  知识分类：
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedCategory(cat);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-slate-800 text-white font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Problem Cards */}
            <div className="space-y-6">
              {filteredQuestions.map((q) => (
                <ProblemCard
                  key={q.id}
                  question={q}
                  isCompleted={completedIds.includes(q.id)}
                  onCompleted={handleCompleteQuestion}
                />
              ))}

              {filteredQuestions.length === 0 && (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                  <p className="text-slate-500 text-sm">
                    未找到匹配的题目，请调整上方分类或点击“全部题目”。
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: Toolbox Mode */}
        {activeTab === 'toolbox' && <ToolboxView />}

        {/* VIEW 3: Original Paper View */}
        {activeTab === 'paper' && (
          <OriginalPaperView
            onSelectQuestion={handleSelectFromPaper}
            completedIds={completedIds}
          />
        )}
      </main>

      {/* Completion Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4 border border-amber-200">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-200">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              🎉 恭喜你！全部题目通关！
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              你已经完整掌握了「一天的时间」所有 8 道经典题目的解法！
              牢记“借1小时作60分”、“分段跳跃法”与“下午晚上加12”，期末考试稳拿满分！
            </p>
            <button
              onClick={() => setShowCelebration(false)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all"
            >
              继续探索复习
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">
          小学数学三年级上册 ·「一天的时间」认知负荷优化与互动教学系统
        </p>
        <p>基于认知负荷理论 (Cognitive Load Theory) · 双重编码 · 脚手架式循序探究</p>
      </footer>
    </div>
  );
}
