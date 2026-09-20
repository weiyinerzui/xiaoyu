export interface QuestionItem {
  id: number;
  title: string;
  originalText: string;
  category: '经过时间' | '时刻与数轴' | '24时计时法' | '生活中的综合应用' | '跨天计算';
  badge: string;
  summaryProblem: string;
  difficulty: 1 | 2 | 3;
  // 读题拆解
  givens: { label: string; value: string; hint?: string }[];
  traps: string[];
  // 核心解题步骤
  steps: {
    title: string;
    description: string;
    formula?: string;
    keyPoint: string;
  }[];
  // 互动题
  interactiveQuiz: {
    question: string;
    type: 'fill' | 'choice';
    options?: string[];
    correctAnswer: string | string[];
    hints: string[];
    explanation: string;
  };
  // 记忆口诀
  rhyme: string;
}

export type ActiveTab = 'tutorial' | 'toolbox' | 'paper';
