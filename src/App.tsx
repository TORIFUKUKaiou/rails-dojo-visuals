/**
 * Ruby Visualizer for Rails Dojo Year 1 / Week 05.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Brackets,
  ChevronRight,
  Gauge,
  Hash,
  ListPlus,
  Pause,
  Play,
  Repeat2,
  RotateCcw,
  Sigma,
  Sparkles,
} from 'lucide-react';

type LessonId =
  | 'why_array'
  | 'index_access'
  | 'overwrite'
  | 'append'
  | 'each_loop'
  | 'total'
  | 'sum_length'
  | 'range'
  | 'condition';

type Lesson = {
  id: LessonId;
  short: string;
  title: string;
  lead: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  code: string[];
  steps: {
    line: number;
    message: string;
    console?: string[];
  }[];
};

const foods = ['カレー', 'ラーメン', '寿司'];
const scores = [80, 55, 100];

const LESSONS: Lesson[] = [
  {
    id: 'why_array',
    short: '配列',
    title: 'なぜ配列が必要なのか',
    lead: '別々の変数を増やすより、1つの配列にまとめると扱いやすくなります。',
    icon: Brackets,
    accent: 'blue',
    code: [
      'food1 = "カレー"',
      'food2 = "ラーメン"',
      'food3 = "寿司"',
      '',
      'foods = ["カレー", "ラーメン", "寿司"]',
    ],
    steps: [
      { line: 0, message: '1つ目の食べ物を別々の変数に入れます。' },
      { line: 1, message: '2つ目も別の変数です。' },
      { line: 2, message: '3つ目も別の変数です。数が増えるほど管理が大変になります。' },
      { line: 4, message: '配列なら、順番のあるデータを1つにまとめて持てます。' },
    ],
  },
  {
    id: 'index_access',
    short: '添字',
    title: '配列は 0 から数える',
    lead: '配列の中身は番号で取り出します。Ruby の配列は 0 番目から始まります。',
    icon: Hash,
    accent: 'indigo',
    code: [
      'foods = ["カレー", "ラーメン", "寿司"]',
      '',
      'puts foods[0]',
      'puts foods[1]',
      'puts foods[2]',
    ],
    steps: [
      { line: 0, message: '3つの食べ物が、順番を持って配列に入っています。' },
      { line: 2, message: 'foods[0] は先頭、つまり「カレー」です。', console: ['カレー'] },
      { line: 3, message: 'foods[1] は2番目、つまり「ラーメン」です。', console: ['カレー', 'ラーメン'] },
      { line: 4, message: 'foods[2] は3番目、つまり「寿司」です。', console: ['カレー', 'ラーメン', '寿司'] },
    ],
  },
  {
    id: 'overwrite',
    short: '更新',
    title: '配列の値を書き換える',
    lead: '番号を指定して代入すると、その場所の値をあとから変えられます。',
    icon: Sparkles,
    accent: 'amber',
    code: [
      'foods = ["カレー", "ラーメン", "寿司"]',
      '',
      'foods[1] = "うどん"',
      '',
      'puts foods[0]',
      'puts foods[1]',
      'puts foods[2]',
    ],
    steps: [
      { line: 0, message: '最初は「カレー」「ラーメン」「寿司」です。' },
      { line: 2, message: 'foods[1] は2番目です。まず「ラーメン」が入っている場所を確認します。' },
      { line: 2, message: '同じ03行で、「ラーメン」を「うどん」に上書きします。' },
      { line: 4, message: '0番目を表示します。', console: ['カレー'] },
      { line: 5, message: '1番目は、書き換え後の「うどん」です。', console: ['カレー', 'うどん'] },
      { line: 6, message: '2番目の「寿司」はそのままです。', console: ['カレー', 'うどん', '寿司'] },
    ],
  },
  {
    id: 'append',
    short: '追加',
    title: '<< で最後に追加する',
    lead: '入力したデータをためるときにも、配列への追加はよく使います。',
    icon: ListPlus,
    accent: 'green',
    code: [
      'foods = ["カレー", "ラーメン", "寿司"]',
      '',
      'foods << "うどん"',
      '',
      'foods.each do |food|',
      '  puts food',
      'end',
    ],
    steps: [
      { line: 0, message: '最初は3つのデータが入っています。' },
      { line: 2, message: '03行で、追加する値「うどん」を確認します。まだ配列には入っていません。' },
      { line: 2, message: '同じ03行で、配列の最後に「うどん」を追加します。' },
      { line: 4, message: '05行で、1つ目の「カレー」を取り出します。' },
      { line: 5, message: '06行で「カレー」を表示します。', console: ['カレー'] },
      { line: 4, message: '05行に戻り、2つ目の「ラーメン」を取り出します。', console: ['カレー'] },
      { line: 5, message: '06行で「ラーメン」を表示します。', console: ['カレー', 'ラーメン'] },
      { line: 4, message: '05行に戻り、3つ目の「寿司」を取り出します。', console: ['カレー', 'ラーメン'] },
      { line: 5, message: '06行で「寿司」を表示します。', console: ['カレー', 'ラーメン', '寿司'] },
      { line: 4, message: '05行に戻り、追加した「うどん」を取り出します。', console: ['カレー', 'ラーメン', '寿司'] },
      { line: 5, message: '06行で「うどん」を表示します。', console: ['カレー', 'ラーメン', '寿司', 'うどん'] },
      { line: 6, message: '4つの食べ物をすべて取り出しました。', console: ['カレー', 'ラーメン', '寿司', 'うどん'] },
    ],
  },
  {
    id: 'each_loop',
    short: 'each',
    title: 'each で1つずつ取り出す',
    lead: '配列の中身を順番に取り出し、今取り出した1つを変数に入れて使います。',
    icon: Repeat2,
    accent: 'cyan',
    code: [
      'foods = ["カレー", "ラーメン", "寿司"]',
      '',
      'foods.each do |food|',
      '  puts food',
      'end',
    ],
    steps: [
      { line: 0, message: '配列には3つの食べ物が入っています。' },
      { line: 2, message: '03行で、1つ目の「カレー」を取り出します。' },
      { line: 3, message: '04行で「カレー」を表示します。', console: ['カレー'] },
      { line: 2, message: '03行に戻り、2つ目の「ラーメン」を取り出します。', console: ['カレー'] },
      { line: 3, message: '04行で「ラーメン」を表示します。', console: ['カレー', 'ラーメン'] },
      { line: 2, message: '03行に戻り、3つ目の「寿司」を取り出します。', console: ['カレー', 'ラーメン'] },
      { line: 3, message: '04行で「寿司」を表示します。', console: ['カレー', 'ラーメン', '寿司'] },
      { line: 4, message: '配列の最後まで取り出したので、繰り返しは終わります。', console: ['カレー', 'ラーメン', '寿司'] },
    ],
  },
  {
    id: 'total',
    short: '合計',
    title: 'total は合計をためる貯金箱',
    lead: 'each と変数を組み合わせると、配列の中身を1つずつ足して合計できます。',
    icon: Sigma,
    accent: 'rose',
    code: [
      'scores = [80, 55, 100]',
      'total = 0',
      '',
      'scores.each do |score|',
      '  total = total + score',
      'end',
      '',
      'puts "合計：#{total}点"',
    ],
    steps: [
      { line: 0, message: '点数の配列を用意します。' },
      { line: 1, message: 'total は合計を入れる変数です。最初は0です。' },
      { line: 3, message: '04行で、1つ目の点数 80 を score に入れます。' },
      { line: 4, message: '05行で total + score、つまり 0 + 80 を計算します。' },
      { line: 4, message: '計算結果の 80 で total を上書きします。', console: ['total: 0 + 80 = 80'] },
      { line: 3, message: '04行に戻り、2つ目の点数 55 を score に入れます。', console: ['total: 0 + 80 = 80'] },
      { line: 4, message: '05行で total + score、つまり 80 + 55 を計算します。', console: ['total: 0 + 80 = 80'] },
      { line: 4, message: '計算結果の 135 で total を上書きします。', console: ['total: 0 + 80 = 80', 'total: 80 + 55 = 135'] },
      { line: 3, message: '04行に戻り、3つ目の点数 100 を score に入れます。', console: ['total: 0 + 80 = 80', 'total: 80 + 55 = 135'] },
      { line: 4, message: '05行で total + score、つまり 135 + 100 を計算します。', console: ['total: 0 + 80 = 80', 'total: 80 + 55 = 135'] },
      { line: 4, message: '計算結果の 235 で total を上書きします。', console: ['total: 0 + 80 = 80', 'total: 80 + 55 = 135', 'total: 135 + 100 = 235'] },
      { line: 7, message: '合計は235点です。', console: ['合計：235点'] },
    ],
  },
  {
    id: 'sum_length',
    short: '便利',
    title: 'sum と length',
    lead: 'Rubyには、合計や個数を調べる便利なメソッドがあります。',
    icon: Gauge,
    accent: 'violet',
    code: [
      'scores = [80, 55, 100]',
      '',
      'total = scores.sum',
      'length = scores.length',
      'average = total / length',
      '',
      'puts "平均：#{average}点"',
    ],
    steps: [
      { line: 0, message: '3つの点数を配列にまとめます。' },
      { line: 2, message: 'scores.sum は、配列の中の数をまとめて合計します。' },
      { line: 3, message: 'scores.length は、配列の個数を数えます。length に 3 を入れます。' },
      { line: 4, message: 'total / length、つまり 235 / 3 で平均を計算します。' },
      { line: 6, message: '今回は整数同士の割り算なので、小数点以下は出ません。', console: ['平均：78点'] },
    ],
  },
  {
    id: 'range',
    short: '範囲',
    title: '1..5 は範囲',
    lead: '連続した数字を順番に使いたいときは、配列ではなく範囲が向いています。',
    icon: ArrowRight,
    accent: 'teal',
    code: [
      'r = 1..5',
      '',
      'r.each do |number|',
      '  puts number',
      'end',
    ],
    steps: [
      { line: 0, message: '1..5 は、1から5までという意味です。' },
      { line: 2, message: '03行で、範囲から 1 を取り出します。' },
      { line: 3, message: '04行で 1 を表示します。', console: ['1'] },
      { line: 2, message: '03行に戻り、次の 2 を取り出します。', console: ['1'] },
      { line: 3, message: '04行で 2 を表示します。', console: ['1', '2'] },
      { line: 2, message: '03行に戻り、次の 3 を取り出します。', console: ['1', '2'] },
      { line: 3, message: '04行で 3 を表示します。', console: ['1', '2', '3'] },
      { line: 2, message: '03行に戻り、次の 4 を取り出します。', console: ['1', '2', '3'] },
      { line: 3, message: '04行で 4 を表示します。', console: ['1', '2', '3', '4'] },
      { line: 2, message: '03行に戻り、次の 5 を取り出します。', console: ['1', '2', '3', '4'] },
      { line: 3, message: '04行で 5 を表示します。', console: ['1', '2', '3', '4', '5'] },
      { line: 4, message: 'ここでは5まで見ました。教材では同じ動きで10まで続きます。', console: ['1', '2', '3', '4', '5'] },
    ],
  },
  {
    id: 'condition',
    short: '判定',
    title: 'each と if を組み合わせる',
    lead: '配列の中身を1つずつ見ながら、条件に応じて処理を変えられます。',
    icon: ChevronRight,
    accent: 'orange',
    code: [
      'scores = [80, 55, 100]',
      '',
      'scores.each do |score|',
      '  if score >= 60',
      '    puts "#{score}点：合格"',
      '  else',
      '    puts "#{score}点：不合格"',
      '  end',
      'end',
    ],
    steps: [
      { line: 0, message: '点数を配列で持ちます。' },
      { line: 2, message: '03行で、1つ目の点数 80 を score に入れます。' },
      { line: 3, message: '04行で 80 >= 60 を判定します。結果は true です。' },
      { line: 4, message: 'true なので合格のルートに入り、05行で表示します。', console: ['80点：合格'] },
      { line: 2, message: '03行に戻り、2つ目の点数 55 を score に入れます。', console: ['80点：合格'] },
      { line: 3, message: '04行で 55 >= 60 を判定します。結果は false です。', console: ['80点：合格'] },
      { line: 6, message: 'false なので不合格のルートに入り、07行で表示します。', console: ['80点：合格', '55点：不合格'] },
      { line: 2, message: '03行に戻り、3つ目の点数 100 を score に入れます。', console: ['80点：合格', '55点：不合格'] },
      { line: 3, message: '04行で 100 >= 60 を判定します。結果は true です。', console: ['80点：合格', '55点：不合格'] },
      { line: 4, message: 'true なので合格のルートに入り、05行で表示します。', console: ['80点：合格', '55点：不合格', '100点：合格'] },
      { line: 8, message: '配列の最後まで判定したので、繰り返しは終わります。', console: ['80点：合格', '55点：不合格', '100点：合格'] },
    ],
  },
];

const accentClasses: Record<string, { bg: string; text: string; ring: string; soft: string; border: string }> = {
  amber: { bg: 'bg-amber-500', text: 'text-amber-700', ring: 'ring-amber-300', soft: 'bg-amber-50', border: 'border-amber-200' },
  blue: { bg: 'bg-blue-600', text: 'text-blue-700', ring: 'ring-blue-300', soft: 'bg-blue-50', border: 'border-blue-200' },
  cyan: { bg: 'bg-cyan-600', text: 'text-cyan-700', ring: 'ring-cyan-300', soft: 'bg-cyan-50', border: 'border-cyan-200' },
  green: { bg: 'bg-emerald-600', text: 'text-emerald-700', ring: 'ring-emerald-300', soft: 'bg-emerald-50', border: 'border-emerald-200' },
  indigo: { bg: 'bg-indigo-600', text: 'text-indigo-700', ring: 'ring-indigo-300', soft: 'bg-indigo-50', border: 'border-indigo-200' },
  orange: { bg: 'bg-orange-600', text: 'text-orange-700', ring: 'ring-orange-300', soft: 'bg-orange-50', border: 'border-orange-200' },
  rose: { bg: 'bg-rose-600', text: 'text-rose-700', ring: 'ring-rose-300', soft: 'bg-rose-50', border: 'border-rose-200' },
  teal: { bg: 'bg-teal-600', text: 'text-teal-700', ring: 'ring-teal-300', soft: 'bg-teal-50', border: 'border-teal-200' },
  violet: { bg: 'bg-violet-600', text: 'text-violet-700', ring: 'ring-violet-300', soft: 'bg-violet-50', border: 'border-violet-200' },
};

function App() {
  const [lessonId, setLessonId] = useState<LessonId>('why_array');
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(950);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lesson = useMemo(() => LESSONS.find((item) => item.id === lessonId) ?? LESSONS[0], [lessonId]);
  const current =
    step < 0
      ? {
          line: -1,
          message: '再生または次へを押すと、コードの動きが始まります。',
          console: undefined,
        }
      : lesson.steps[Math.min(step, lesson.steps.length - 1)];
  const accent = accentClasses[lesson.accent];

  const reset = useCallback(() => {
    setPlaying(false);
    setStep(-1);
  }, []);

  const next = useCallback(() => {
    setStep((value) => {
      if (value < 0) return 0;
      if (value >= lesson.steps.length - 1) {
        setPlaying(false);
        return value;
      }
      return value + 1;
    });
  }, [lesson.steps.length]);

  useEffect(() => {
    if (!playing) {
      if (timer.current) clearTimeout(timer.current);
      return;
    }
    timer.current = setTimeout(next, speed);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [next, playing, speed, step]);

  const switchLesson = (id: LessonId) => {
    setLessonId(id);
    setStep(-1);
    setPlaying(false);
  };

  return (
    <main className="app-shell">
      <LessonRail activeId={lessonId} onSelect={switchLesson} />

      <section className="stage">
        <header className="stage-header">
          <div>
            <div className="eyebrow">Rails Dojo Year 1 / Week 05</div>
            <h1>配列を目で見る</h1>
          </div>
          <div className={`week-badge ${accent.soft} ${accent.border}`}>
            <Brackets size={18} />
            <span>第5回 配列</span>
          </div>
        </header>

        <div className="lesson-title-row">
          <div className={`lesson-icon ${accent.bg}`}>
            <lesson.icon size={30} />
          </div>
          <div>
            <h2>{lesson.title}</h2>
            <p>{lesson.lead}</p>
          </div>
        </div>

        <div className="main-grid">
          <section className="visual-panel">
            <div className="motion-backdrop">
              <motion.div
                key={`${lesson.id}-${step}-orb-a`}
                className={`pulse-disc ${accent.bg}`}
                initial={{ scale: 0.2, opacity: 0.18 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 1.1 }}
              />
              <motion.div
                key={`${lesson.id}-${step}-orb-b`}
                className={`pulse-disc delay ${accent.bg}`}
                initial={{ scale: 0.15, opacity: 0.14 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 1.35, delay: 0.12 }}
              />
            </div>
            <LessonVisual lesson={lesson} step={step} />
          </section>

          <aside className="code-panel">
            <div className="code-head">
              <span>main.rb</span>
              <span>{current.line >= 0 ? `line ${current.line + 1}` : 'ready'}</span>
            </div>
            <div className="code-list">
              {lesson.code.map((line, index) => (
                <motion.div
                  key={`${lesson.id}-${index}`}
                  className={[
                    'code-row',
                    index === current.line ? 'active' : '',
                    current.line < 0 ? 'idle' : '',
                    current.line >= 0 && index < current.line ? 'completed' : '',
                    current.line >= 0 && index > current.line ? 'pending' : '',
                  ].join(' ')}
                  animate={index === current.line ? { x: [0, 7, 0] } : { x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="line-no">{String(index + 1).padStart(2, '0')}</span>
                  <code>{line || ' '}</code>
                </motion.div>
              ))}
            </div>

            <div className="console">
              <div className="console-title">実行結果</div>
              {(current.console ?? ['まだ出力はありません']).map((line, index) => (
                <motion.div
                  key={`${lesson.id}-${step}-${index}-${line}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: line === 'まだ出力はありません' ? 0.45 : 1, y: 0 }}
                  className="console-line"
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </aside>
        </div>

        <footer className="control-strip">
          <div className="step-message">
            <span className={`step-dot ${accent.bg}`} />
            <p>{current.message}</p>
          </div>
          <div className="controls">
            <button className="icon-button primary" onClick={() => setPlaying((value) => !value)} aria-label={playing ? '一時停止' : '再生'}>
              {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
            </button>
            <button className="icon-button" onClick={next} disabled={step >= lesson.steps.length - 1} aria-label="次へ">
              <ChevronRight size={22} />
            </button>
            <button className="icon-button" onClick={reset} aria-label="最初から">
              <RotateCcw size={20} />
            </button>
            <label className="speed-control">
              <span>{speed}ms</span>
              <input
                type="range"
                min="350"
                max="1500"
                step="50"
                value={speed}
                onChange={(event) => setSpeed(Number(event.target.value))}
              />
            </label>
          </div>
        </footer>
      </section>
    </main>
  );
}

function LessonRail({ activeId, onSelect }: { activeId: LessonId; onSelect: (id: LessonId) => void }) {
  return (
    <nav className="lesson-rail" aria-label="レッスン選択">
      <div className="rail-mark">05</div>
      <div className="rail-items">
        {LESSONS.map((lesson, index) => {
          const Icon = lesson.icon;
          const active = lesson.id === activeId;
          return (
            <button
              key={lesson.id}
              className={`rail-button ${active ? 'selected' : ''}`}
              onClick={() => onSelect(lesson.id)}
              title={`${index + 1}. ${lesson.title}`}
            >
              <Icon size={18} />
              <span>{lesson.short}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function LessonVisual({ lesson, step }: { lesson: Lesson; step: number }) {
  switch (lesson.id) {
    case 'why_array':
      return <WhyArrayVisual step={step} />;
    case 'index_access':
      return <IndexVisual step={step} />;
    case 'overwrite':
      return <OverwriteVisual step={step} />;
    case 'append':
      return <AppendVisual step={step} />;
    case 'each_loop':
      return <EachVisual step={step} />;
    case 'total':
      return <TotalVisual step={step} />;
    case 'sum_length':
      return <SumLengthVisual step={step} />;
    case 'range':
      return <RangeVisual step={step} />;
    case 'condition':
      return <ConditionVisual step={step} />;
    default:
      return null;
  }
}

function ArrayBlocks({
  items,
  activeIndex = -1,
  replacedIndex = -1,
  appended = false,
}: {
  items: string[];
  activeIndex?: number;
  replacedIndex?: number;
  appended?: boolean;
}) {
  return (
    <div className="array-wrap">
      <span className="bracket">[</span>
      {items.map((item, index) => (
        <motion.div
          key={`${item}-${index}`}
          layout
          className={`array-cell ${index === activeIndex ? 'active' : ''} ${index === replacedIndex ? 'replaced' : ''} ${
            appended && index === items.length - 1 ? 'appended' : ''
          }`}
          initial={{ scale: 0.7, opacity: 0, y: 20 }}
          animate={{ scale: index === activeIndex ? 1.12 : 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22 }}
        >
          <div className="index-pill">{index}</div>
          <div className="cell-value">{item}</div>
        </motion.div>
      ))}
      <span className="bracket">]</span>
    </div>
  );
}

function WhyArrayVisual({ step }: { step: number }) {
  const showArray = step >= 3;
  return (
    <div className="split-visual">
      <div className={`variable-stack ${showArray ? 'dimmed' : ''}`}>
        {foods.map((food, index) => (
          <motion.div
            key={food}
            className={`variable-card ${step === index ? 'active' : ''} ${step > index ? 'completed' : ''}`}
            animate={{
              x: showArray ? -30 : 0,
              opacity: showArray ? 0.38 : step === index ? 1 : step > index ? 0.78 : 0.26,
              scale: step === index ? 1.04 : 1,
            }}
          >
            <span>food{index + 1}</span>
            <strong>{food}</strong>
          </motion.div>
        ))}
      </div>
      <motion.div className="big-arrow" animate={{ scale: showArray ? 1.08 : 0.9, opacity: showArray ? 1 : 0.35 }}>
        <ArrowRight size={58} />
      </motion.div>
      <motion.div className="array-focus" animate={{ scale: showArray ? 1 : 0.86, opacity: showArray ? 1 : 0.25 }}>
        <div className="visual-label">foods</div>
        <ArrayBlocks items={foods} />
      </motion.div>
    </div>
  );
}

function IndexVisual({ step }: { step: number }) {
  const active = step <= 0 ? -1 : step - 1;
  return (
    <div className="center-stack">
      <ArrayBlocks items={foods} activeIndex={active} />
      <motion.div key={active} className="readout" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        {active >= 0 ? (
          <>
            <span>foods[{active}]</span>
            <strong>{foods[active]}</strong>
          </>
        ) : (
          <>
            <span>番号は</span>
            <strong>0 から始まる</strong>
          </>
        )}
      </motion.div>
    </div>
  );
}

function OverwriteVisual({ step }: { step: number }) {
  const items = step >= 2 ? ['カレー', 'うどん', '寿司'] : foods;
  const printIndex = step >= 3 ? step - 3 : -1;
  const activeIndex = printIndex >= 0 ? printIndex : step >= 1 ? 1 : -1;
  return (
    <div className="center-stack">
      <ArrayBlocks items={items} activeIndex={activeIndex} replacedIndex={step === 1 || step === 2 ? 1 : -1} />
      <AnimatePresence mode="wait">
        {step < 3 && (
          <motion.div
            key={step >= 2 ? 'after' : 'before'}
            className="swap-banner"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, y: 14 }}
          >
            {step >= 2 ? 'ラーメン → うどん' : 'foods[1] を狙います'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AppendVisual({ step }: { step: number }) {
  const items = step >= 2 ? [...foods, 'うどん'] : foods;
  const eachIndex = step >= 3 ? Math.min(Math.floor((step - 3) / 2), items.length - 1) : -1;
  const activeIndex = eachIndex >= 0 ? eachIndex : step === 2 ? items.length - 1 : -1;
  return (
    <div className="center-stack">
      <ArrayBlocks items={items} activeIndex={activeIndex} appended={step === 2} />
      <AnimatePresence mode="wait">
        {step < 2 && (
          <motion.div
            className="append-token"
            initial={{ x: -120, opacity: 0.35 }}
            animate={{ x: step >= 1 ? 0 : -120, opacity: step >= 1 ? 1 : 0.35 }}
            exit={{ scale: 0.8, opacity: 0, y: 14 }}
          >
            &lt;&lt; "うどん"
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EachVisual({ step }: { step: number }) {
  const active = step >= 1 ? Math.min(Math.floor((step - 1) / 2), 2) : -1;
  return (
    <div className="each-visual">
      <ArrayBlocks items={foods} activeIndex={active} />
      <div className="pipe-row">
        <span>|</span>
        <motion.div key={active} className="pipe-value" initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {active >= 0 ? foods[active] : 'food'}
        </motion.div>
        <span>|</span>
      </div>
      <div className="laser-line" />
    </div>
  );
}

function TotalVisual({ step }: { step: number }) {
  const additions = [
    { before: 0, score: 80, after: 80 },
    { before: 80, score: 55, after: 135 },
    { before: 135, score: 100, after: 235 },
  ];
  const active =
    step >= 2 && step <= 10
      ? Math.min(Math.floor((step - 2) / 3), 2)
      : -1;
  const calculating = step >= 3 && step <= 10 && (step - 3) % 3 === 0;
  const updating = step >= 4 && step <= 10 && (step - 4) % 3 === 0;
  const currentAddition = active >= 0 ? additions[active] : null;
  const totalValue = (() => {
    if (step <= 1) return 0;
    if (step >= 11) return 235;
    if (!currentAddition) return 0;
    return updating ? currentAddition.after : currentAddition.before;
  })();
  return (
    <div className="total-visual">
      <ArrayBlocks items={scores.map(String)} activeIndex={active} />
      <div className="calculator-row">
        <motion.div
          className={`coin-bank ${step >= 1 ? 'active' : ''}`}
          animate={{ scale: updating ? [1, 1.12, 1] : 1 }}
          transition={{ duration: 0.35 }}
        >
          <span>total</span>
          <strong>{totalValue}</strong>
        </motion.div>
        {currentAddition && (
          <motion.div
            className={`flying-score ${calculating || updating ? 'calculating' : ''}`}
            key={`${step}-${active}-${calculating}-${updating}`}
            initial={{ x: calculating || updating ? -110 : 0, opacity: 0, scale: 0.84 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
          >
            {calculating || updating
              ? `${currentAddition.before} + ${currentAddition.score} = ${currentAddition.after}`
              : `score = ${currentAddition.score}`}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function SumLengthVisual({ step }: { step: number }) {
  const showArray = step >= 0;
  const showSum = step >= 1;
  const showLength = step >= 2;
  const showAverage = step >= 3;
  return (
    <div className="method-visual">
      <div className={`array-presence ${showArray ? 'visible' : ''}`}>
        <ArrayBlocks items={scores.map(String)} />
      </div>
      <div className="method-grid">
        <motion.div className="method-card" animate={{ opacity: showSum ? 1 : 0.35, y: showSum ? 0 : 16 }}>
          <span>scores.sum</span>
          <strong>235</strong>
        </motion.div>
        <motion.div className="method-card" animate={{ opacity: showLength ? 1 : 0.35, y: showLength ? 0 : 16 }}>
          <span>scores.length</span>
          <strong>3</strong>
        </motion.div>
        <motion.div className="method-card result" animate={{ opacity: showAverage ? 1 : 0.25, scale: showAverage ? 1 : 0.9 }}>
          <span>235 / 3</span>
          <strong>78点</strong>
        </motion.div>
      </div>
    </div>
  );
}

function RangeVisual({ step }: { step: number }) {
  const showRange = step >= 0;
  const activeNumber = step >= 1 && step <= 10 ? Math.floor((step - 1) / 2) + 1 : 0;
  const highlighted = activeNumber;
  return (
    <div className="range-visual">
      <div className={`range-line ${showRange ? 'visible' : ''}`}>
        {Array.from({ length: 5 }, (_, index) => index + 1).map((number) => (
          <motion.div
            key={number}
            className={`range-number ${number <= highlighted ? 'lit' : ''}`}
            animate={{ y: number === activeNumber ? -10 : 0, scale: number === activeNumber ? 1.18 : 1 }}
          >
            {number}
          </motion.div>
        ))}
      </div>
      <div className={`range-caption ${showRange ? 'visible' : ''}`}>r = 1..5</div>
    </div>
  );
}

function ConditionVisual({ step }: { step: number }) {
  const active = step >= 1 ? Math.min(Math.floor((step - 1) / 3), 2) : -1;
  const score = active >= 0 ? scores[active] : null;
  const pass = score !== null && score >= 60;
  const checking = step >= 2 && step <= 8 && (step - 2) % 3 === 0;
  const outputting = step >= 3 && step <= 9 && (step - 3) % 3 === 0;
  const judgeText = (() => {
    if (checking) return pass ? 'true' : 'false';
    if (outputting) return pass ? '合格' : '不合格';
    if (active >= 0) return `score = ${score}`;
    return '判定待ち';
  })();
  return (
    <div className="condition-visual">
      <div className={`array-presence ${step >= 0 ? 'visible' : ''}`}>
        <ArrayBlocks items={scores.map(String)} activeIndex={active} />
      </div>
      <div className="condition-boxes">
        <motion.div
          className={`score-box ${active >= 0 ? 'active' : ''}`}
          animate={{ scale: active >= 0 && !checking && !outputting ? [1, 1.06, 1] : 1 }}
        >
          <span>score</span>
          <strong>{active >= 0 ? score : '-'}</strong>
        </motion.div>
        <motion.div
          className={`judge-gate ${checking || outputting ? (pass ? 'pass' : 'fail') : ''}`}
          animate={{ scale: checking || outputting ? [1, 1.08, 1] : 1 }}
        >
          <span>score &gt;= 60 ?</span>
          <strong>{checking ? judgeText : outputting ? judgeText : '判定待ち'}</strong>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
