import React, { useState } from 'react';
import { QuestionItem } from '../types';
import { soundManager } from '../utils/audio';
import { TimelineHopper } from './widgets/TimelineHopper';
import { VerticalBorrowCalc } from './widgets/VerticalBorrowCalc';
import { DualRingClock } from './widgets/DualRingClock';
import { TrainTicketWidget } from './widgets/TrainTicketWidget';
import { SpaceMissionCrossDay } from './widgets/SpaceMissionCrossDay';
import { CinemaScheduleWidget } from './widgets/CinemaScheduleWidget';
import { SpeedDistanceCar } from './widgets/SpeedDistanceCar';
import { NumberLineQuizWidget } from './widgets/NumberLineQuizWidget';
import { TrafficSignWidget } from './widgets/TrafficSignWidget';
import { FootballMatchWidget } from './widgets/FootballMatchWidget';
import {
  BookOpen,
  Compass,
  FileCheck2,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Star,
} from 'lucide-react';

interface ProblemCardProps {
  question: QuestionItem;
  onCompleted?: (id: number) => void;
  isCompleted?: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  question,
  onCompleted,
  isCompleted = false,
}) => {
  // 4 pedagogical sub-tabs for reducing cognitive load
  type SubTab = 'deconstruct' | 'explore' | 'solution' | 'practice';
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('explore');

  // Interactive Quiz State
  const [inputs, setInputs] = useState<string[]>(['', '', '']);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(0);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const handleSubTabChange = (tab: SubTab) => {
    soundManager.playClick();
    setActiveSubTab(tab);
  };

  const handleNextHint = () => {
    soundManager.playHint();
    setRevealedHintIndex((prev) => Math.min(question.interactiveQuiz.hints.length, prev + 1));
  };

  const handleCheckAnswer = () => {
    const q = question.interactiveQuiz;
    let correct = false;

    if (q.type === 'choice') {
      correct = selectedOption === q.correctAnswer;
    } else {
      if (Array.isArray(q.correctAnswer)) {
        correct = q.correctAnswer.every((ans, i) => {
          const userVal = (inputs[i] || '').trim();
          // allow fuzzy matching for time like "23:44" or "23时44分"
          if (ans === '23:44') return userVal === '23:44' || userVal === '23时44分' || userVal === '23时44';
          if (ans === '17:30') return userVal === '17:30' || userVal === '17时30分' || userVal === '17时30';
          if (ans === '18:24') return userVal === '18:24' || userVal === '18时24分' || userVal === '18时24';
          if (ans === '凌晨4:58') return userVal.includes('4:58') || userVal.includes('4时58');
          return userVal === ans;
        });
      } else {
        correct = (inputs[0] || '').trim() === q.correctAnswer;
      }
    }

    if (correct) {
      soundManager.playCorrect();
      setQuizStatus('correct');
      if (onCompleted) {
        onCompleted(question.id);
      }
    } else {
      soundManager.playClick();
      setQuizStatus('wrong');
    }
  };

  // Render the specific visual widget for the question
  const renderVisualWidget = () => {
    switch (question.id) {
      case 1:
        return (
          <div className="space-y-4">
            <TimelineHopper
              start="14:59"
              end="21:38"
              hops={[
                {
                  from: '14:59',
                  to: '15:00',
                  durationLabel: '1 分钟',
                  type: 'minute',
                  description: '只差 1 分钟就到 15:00 整点啦！',
                },
                {
                  from: '15:00',
                  to: '21:00',
                  durationLabel: '6 小时',
                  type: 'hour',
                  description: '15时到21时，时针整整走了 6 大格！',
                },
                {
                  from: '21:00',
                  to: '21:38',
                  durationLabel: '38 分钟',
                  type: 'minute',
                  description: '21时再走38分钟，正好到达终点！',
                },
              ]}
              totalResult="6 小时 39 分钟"
            />
            <VerticalBorrowCalc
              startHour={14}
              startMin={59}
              endHour={21}
              endMin={38}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <NumberLineQuizWidget />
            <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200">
              <span className="text-xs font-bold text-indigo-900 block mb-1">
                ⏱️ 单位换算助记卡：
              </span>
              <div className="flex items-center gap-2 flex-wrap text-xs text-indigo-800">
                <span className="bg-white px-2 py-1 rounded border border-indigo-300 font-mono font-bold">
                  150 分钟
                </span>
                <span>=</span>
                <span className="bg-white px-2 py-1 rounded border border-indigo-300 font-mono font-bold">
                  120 分钟 (2小时) + 30 分钟
                </span>
                <span>=</span>
                <span className="bg-white px-2 py-1 rounded border border-indigo-300 font-bold text-emerald-700">
                  2 小时 30 分钟
                </span>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <TrafficSignWidget />
            <DualRingClock initialHour={17} initialMin={30} />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <TrainTicketWidget />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <FootballMatchWidget />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <SpaceMissionCrossDay />
            <DualRingClock initialHour={23} initialMin={44} />
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <CinemaScheduleWidget />
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <SpeedDistanceCar />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
      {/* Top Card Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0">
            {question.id}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                {question.badge}
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {question.category}
              </span>
              {isCompleted && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  已掌握
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {question.title}
            </h3>
          </div>
        </div>

        {/* Difficulty stars */}
        <div className="flex items-center gap-1 self-start sm:self-auto">
          <span className="text-xs text-slate-400 mr-1 font-medium">思维难度:</span>
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < question.difficulty
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Sub-navigation Tabs (Cognitive Scaffolding) */}
      <div className="px-5 pt-3 pb-0 bg-slate-50/50 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => handleSubTabChange('explore')}
          className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'explore'
              ? 'border-amber-500 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>交互教具探究 (降低负荷)</span>
        </button>

        <button
          onClick={() => handleSubTabChange('deconstruct')}
          className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'deconstruct'
              ? 'border-blue-500 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>读题破题 · 避坑指南</span>
        </button>

        <button
          onClick={() => handleSubTabChange('solution')}
          className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'solution'
              ? 'border-indigo-500 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>循序解法与速记口诀</span>
        </button>

        <button
          onClick={() => handleSubTabChange('practice')}
          className={`pb-2.5 px-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeSubTab === 'practice'
              ? 'border-emerald-500 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>动手通关练 ({quizStatus === 'correct' ? '已过关' : '立即挑战'})</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Tab 1: Interactive Explorer */}
        {activeSubTab === 'explore' && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>情境导学：</strong>
                  {question.summaryProblem}
                </span>
              </div>
              <button
                onClick={() => handleSubTabChange('practice')}
                className="text-amber-700 hover:text-amber-900 font-bold underline text-xs"
              >
                掌握了？去闯关 ➔
              </button>
            </div>

            {renderVisualWidget()}
          </div>
        )}

        {/* Tab 2: Deconstruction & Traps */}
        {activeSubTab === 'deconstruct' && (
          <div className="space-y-4">
            {/* Original Problem Quote */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block mb-1">
                【原卷题目再现】
              </span>
              <p className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                {question.originalText}
              </p>
            </div>

            {/* Given Information Chunking */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                📌 读题拆解：提取已知条件
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {question.givens.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-blue-50/60 rounded-xl border border-blue-100"
                  >
                    <span className="text-[11px] font-semibold text-blue-600 block">
                      {g.label}
                    </span>
                    <div className="text-sm font-bold text-blue-950 mt-0.5">
                      {g.value}
                    </div>
                    {g.hint && (
                      <span className="text-[11px] text-blue-700 mt-1 block">
                        💡 {g.hint}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Traps Alert */}
            <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 mb-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>小心！小学生最容易掉入的失分陷阱：</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-900">
                {question.traps.map((trap, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Detailed Solution & Rhyme */}
        {activeSubTab === 'solution' && (
          <div className="space-y-4">
            {question.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm font-bold text-slate-900">
                    {step.title}
                  </h5>
                  <span className="text-xs text-slate-400 font-medium">
                    步骤 {idx + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  {step.description}
                </p>

                {step.formula && (
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/90 font-mono font-bold text-slate-800 text-xs mb-2 shadow-xs">
                    {step.formula}
                  </div>
                )}

                <div className="text-xs text-indigo-900 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
                  <span className="font-bold">要点提炼：</span> {step.keyPoint}
                </div>
              </div>
            ))}

            {/* Memory Rhyme */}
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-xs">
                口诀
              </div>
              <div>
                <span className="text-xs font-bold text-amber-900 block">
                  小学生秒记顺口溜：
                </span>
                <p className="text-sm font-bold text-amber-800 mt-0.5 tracking-wide">
                  “{question.rhyme}”
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Interactive Practice */}
        {activeSubTab === 'practice' && (
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  通关小测验：动动手指写出答案
                </span>
                <button
                  onClick={handleNextHint}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  需要锦囊提示 ({revealedHintIndex}/{question.interactiveQuiz.hints.length})
                </button>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {question.interactiveQuiz.question}
              </p>
            </div>

            {/* Hint Box */}
            {revealedHintIndex > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-xs text-amber-900">
                {question.interactiveQuiz.hints
                  .slice(0, revealedHintIndex)
                  .map((hint, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <span className="font-bold text-amber-700">💡</span>
                      <span>{hint}</span>
                    </div>
                  ))}
              </div>
            )}

            {/* Answer Input Area */}
            {question.interactiveQuiz.type === 'choice' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {question.interactiveQuiz.options?.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedOption(opt);
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-900 ring-2 ring-indigo-200 shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                {Array.isArray(question.interactiveQuiz.correctAnswer) ? (
                  question.interactiveQuiz.correctAnswer.map((ans, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-600">
                        空 {idx + 1}：
                      </span>
                      <input
                        type="text"
                        placeholder="输入答案"
                        value={inputs[idx] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setInputs((prev) => {
                            const next = [...prev];
                            next[idx] = val;
                            return next;
                          });
                        }}
                        className="w-28 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600">答案：</span>
                    <input
                      type="text"
                      placeholder="输入数值"
                      value={inputs[0] || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setInputs([val]);
                      }}
                      className="w-36 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCheckAnswer}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
              >
                核对答案
              </button>
            </div>

            {/* Feedback result */}
            {quizStatus === 'correct' && (
              <div className="p-3.5 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-emerald-950 flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-emerald-900 mb-1">
                    🎉 太棒了！回答完全正确！
                  </div>
                  <p className="leading-relaxed">
                    {question.interactiveQuiz.explanation}
                  </p>
                </div>
              </div>
            )}

            {quizStatus === 'wrong' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">答案还不太对哦！</span>
                  <p className="mt-0.5">
                    别灰心，点击右上角「需要锦囊提示」，或切换到「交互教具探究」看一看模拟演示再试一次吧！
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
