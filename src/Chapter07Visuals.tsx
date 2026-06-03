import type { ComponentType, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDownToLine,
  ArrowRight,
  Box,
  BrickWall,
  Package,
  SquareFunction,
  Undo2,
  Waypoints,
  Workflow,
} from 'lucide-react';

export type LessonId07 =
  | 'why_method'
  | 'define_call'
  | 'argument'
  | 'return_value'
  | 'puts_return'
  | 'method_chain'
  | 'scope_wall';

export type Lesson07 = {
  id: LessonId07;
  short: string;
  title: string;
  lead: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  accent: string;
  code: string[];
  steps: {
    line: number;
    message: string;
    console?: string[];
  }[];
};

const LESSON_07_IDS: readonly LessonId07[] = [
  'why_method',
  'define_call',
  'argument',
  'return_value',
  'puts_return',
  'method_chain',
  'scope_wall',
];

export function isLessonId07(id: string): id is LessonId07 {
  return LESSON_07_IDS.includes(id as LessonId07);
}

export const LESSONS_07: readonly Lesson07[] = [
  {
    id: 'why_method',
    short: 'なぜ？',
    title: '処理に名前をつける',
    lead: '同じような処理を何度も書く代わりに、メソッドとしてまとめて呼び出します。',
    icon: SquareFunction,
    accent: 'blue',
    code: [
      'def make_greeting(name)',
      '  "こんにちは、#{name}さん！"',
      'end',
      '',
      'msg1 = make_greeting("田中")',
      'puts msg1',
      '',
      'msg2 = make_greeting("佐藤")',
      'puts msg2',
      '',
      'msg3 = make_greeting("鈴木")',
      'puts msg3',
    ],
    steps: [
      { line: 0, message: 'まず、挨拶を作る処理に make_greeting という名前をつけます。' },
      { line: 1, message: 'name に入った値を使って、挨拶の文字列を組み立てる処理です。' },
      { line: 2, message: 'end までが、メソッドとしてまとめた処理の範囲です。' },
      { line: 4, message: 'make_greeting("田中") を呼び出します。' },
      { line: 1, message: '02行目で「こんにちは、田中さん！」という文字列を作り、戻り値にします。' },
      { line: 4, message: '戻り値が msg1 に入ります。' },
      { line: 5, message: 'msg1 の中身を puts で表示します。', console: ['こんにちは、田中さん！'] },
      { line: 7, message: 'make_greeting("佐藤") を呼び出します。', console: ['こんにちは、田中さん！'] },
      { line: 1, message: '02行目で「こんにちは、佐藤さん！」という文字列を作り、戻り値にします。', console: ['こんにちは、田中さん！'] },
      { line: 7, message: '戻り値が msg2 に入ります。', console: ['こんにちは、田中さん！'] },
      { line: 8, message: 'msg2 の中身を puts で表示します。', console: ['こんにちは、田中さん！', 'こんにちは、佐藤さん！'] },
      { line: 10, message: 'make_greeting("鈴木") を呼び出します。', console: ['こんにちは、田中さん！', 'こんにちは、佐藤さん！'] },
      { line: 1, message: '02行目で「こんにちは、鈴木さん！」という文字列を作り、戻り値にします。', console: ['こんにちは、田中さん！', 'こんにちは、佐藤さん！'] },
      { line: 10, message: '戻り値が msg3 に入ります。', console: ['こんにちは、田中さん！', 'こんにちは、佐藤さん！'] },
      { line: 11, message: 'msg3 の中身を puts で表示します。', console: ['こんにちは、田中さん！', 'こんにちは、佐藤さん！', 'こんにちは、鈴木さん！'] },
    ],
  },
  {
    id: 'define_call',
    short: '呼び出し',
    title: '定義しただけでは動かない',
    lead: 'def で作ったメソッドは、名前を呼び出した瞬間に初めて中の処理へ進みます。',
    icon: ArrowDownToLine,
    accent: 'indigo',
    code: [
      'def make_message',
      '  "こんにちは！"',
      'end',
      '',
      'msg = make_message',
      'puts msg',
    ],
    steps: [
      { line: 0, message: 'def はメソッドを作る合図です。この時点では、まだ表示は起きません。' },
      { line: 2, message: 'end まで読んで、make_message の定義ができました。まだ実行結果は空です。' },
      { line: 4, message: 'msg = make_message で、外側からメソッドを呼び出します。' },
      { line: 1, message: '呼び出されたので、メソッドの中へ入り、文字列を戻り値として返します。' },
      { line: 4, message: '戻り値が外側へ戻ってきました。まだ msg は空です。' },
      { line: 4, message: '返ってきた文字列が、外側の変数 msg に入ります。' },
      { line: 5, message: 'puts msg で、msg の中身を画面に表示します。', console: ['こんにちは！'] },
    ],
  },
  {
    id: 'argument',
    short: '引数',
    title: '外から値を渡す',
    lead: '呼び出し側の値が、メソッド内の引数用の変数に入ります。',
    icon: Package,
    accent: 'green',
    code: [
      'def make_greeting(name)',
      '  "こんにちは、#{name}さん！"',
      'end',
      '',
      'msg1 = make_greeting("田中")',
      'puts msg1',
      '',
      'msg2 = make_greeting("佐藤")',
      'puts msg2',
    ],
    steps: [
      { line: 0, message: 'name は、外から渡された値を受け取るための変数です。' },
      { line: 4, message: '呼び出し側から "田中" を渡します。' },
      { line: 0, message: 'メソッドの中では、name に "田中" が入った状態になります。' },
      { line: 1, message: 'name を使って、田中さん用の文字列を作って返します。' },
      { line: 4, message: '返ってきた文字列が msg1 に入ります。' },
      { line: 5, message: 'puts msg1 で、msg1 の中身を表示します。', console: ['こんにちは、田中さん！'] },
      { line: 7, message: '次は "佐藤" を渡します。同じメソッドでも、材料が変わります。', console: ['こんにちは、田中さん！'] },
      { line: 0, message: 'name が "佐藤" になり、佐藤さん用の処理に入ります。', console: ['こんにちは、田中さん！'] },
      { line: 1, message: '佐藤さん用の文字列を戻り値として返します。', console: ['こんにちは、田中さん！'] },
      { line: 7, message: '返ってきた文字列が msg2 に入ります。', console: ['こんにちは、田中さん！'] },
      { line: 8, message: 'puts msg2 で、msg2 の中身を表示します。', console: ['こんにちは、田中さん！', 'こんにちは、佐藤さん！'] },
    ],
  },
  {
    id: 'return_value',
    short: '戻り値',
    title: '結果を受け取って使う',
    lead: 'メソッドの最後の式が戻り値になり、変数へ入れたり別の処理で使ったりできます。',
    icon: Undo2,
    accent: 'rose',
    code: [
      'def add(a, b)',
      '  a + b',
      'end',
      '',
      'result = add(3, 5)',
      'puts result',
    ],
    steps: [
      { line: 0, message: 'add は、2つの値 a と b を受け取るメソッドです。' },
      { line: 4, message: 'add(3, 5) を呼び出し、3 と 5 をメソッドへ渡します。' },
      { line: 0, message: 'メソッド内では a = 3、b = 5 として扱われます。' },
      { line: 1, message: '最後の式 a + b を計算します。結果は 8 です。' },
      { line: 4, message: '戻り値 8 が外側へ戻り、result に代入されます。' },
      { line: 5, message: 'result の中身 8 を puts で表示します。', console: ['8'] },
    ],
  },
  {
    id: 'puts_return',
    short: 'puts',
    title: 'puts と戻り値は別',
    lead: '画面に表示することと、値を返すことは別の動きです。puts 自体の戻り値は nil です。',
    icon: Box,
    accent: 'amber',
    code: [
      'def calc_a',
      '  puts 3 + 5',
      'end',
      'answer_a = calc_a',
      'p answer_a',
      '',
      'def calc_b',
      '  3 + 5',
      'end',
      'answer_b = calc_b',
      'p answer_b',
    ],
    steps: [
      { line: 3, message: 'calc_a を呼び出します。中に puts があるメソッドです。' },
      { line: 1, message: 'calc_a の中の puts が 8 を画面に表示します。', console: ['8'] },
      { line: 3, message: 'puts 自体の戻り値は nil なので、answer_a には nil が入ります。', console: ['8'] },
      { line: 4, message: 'p answer_a で、変数の中身 nil をそのまま確認します。', console: ['8', 'nil'] },
      { line: 9, message: '次に calc_b を呼び出します。こちらは puts せず、値を返すメソッドです。', console: ['8', 'nil'] },
      { line: 7, message: '最後の式 3 + 5 の結果 8 が、戻り値として返ります。', console: ['8', 'nil'] },
      { line: 9, message: '戻り値 8 が answer_b に入ります。', console: ['8', 'nil'] },
      { line: 10, message: 'p answer_b で、中身の 8 を確認します。', console: ['8', 'nil', '8'] },
    ],
  },
  {
    id: 'method_chain',
    short: '連携',
    title: 'メソッドの中で別のメソッドを使う',
    lead: '小さな役割のメソッドを組み合わせると、処理の流れを読みやすくできます。',
    icon: Workflow,
    accent: 'cyan',
    code: [
      'def add_shipping_fee(price)',
      '  price + 200',
      'end',
      '',
      'def make_total_message(price)',
      '  total = add_shipping_fee(price)',
      '  "合計金額は#{total}円です"',
      'end',
      '',
      'message = make_total_message(500)',
      'puts message',
    ],
    steps: [
      { line: 9, message: '外側から make_total_message(500) を呼び出します。' },
      { line: 4, message: 'make_total_message の中へ入り、price は 500 になります。' },
      { line: 5, message: '中から add_shipping_fee(price) を呼び出します。' },
      { line: 0, message: 'add_shipping_fee の中へ入り、送料を足す処理に移ります。' },
      { line: 1, message: '500 + 200 を計算し、700 を戻り値として返します。' },
      { line: 5, message: '戻ってきた 700 が total に入ります。' },
      { line: 6, message: 'total を使って、合計金額の文章を作って返します。' },
      { line: 9, message: '戻り値の文章が message に入ります。' },
      { line: 10, message: '外側の puts が message を表示します。', console: ['合計金額は700円です'] },
    ],
  },
  {
    id: 'scope_wall',
    short: '壁',
    title: 'スコープの見えない壁',
    lead: 'メソッドの外の変数は、中から直接見えません。使いたい値は引数として渡します。',
    icon: BrickWall,
    accent: 'orange',
    code: [
      'message = "こんにちは"',
      '',
      'def get_message(text)',
      '  text',
      'end',
      '',
      'result = get_message(message)',
      'puts result',
    ],
    steps: [
      { line: 0, message: '外側で message という変数を作ります。' },
      { line: 2, message: 'メソッドの中には、外側とは別の空間があります。' },
      { line: 6, message: '外側の message を、引数として get_message に渡します。' },
      { line: 2, message: '壁を越えた値が、メソッド内の text に入ります。' },
      { line: 3, message: 'text の値 "こんにちは" を戻り値として返します。' },
      { line: 6, message: '返ってきた文字列が、外側の result に入ります。' },
      { line: 7, message: 'puts result で、result の中身を表示します。', console: ['こんにちは'] },
    ],
  },
];

function MethodBox({
  name,
  subtitle,
  active = false,
  dimmed = false,
  children,
}: {
  name: string;
  subtitle?: string;
  active?: boolean;
  dimmed?: boolean;
  children?: ReactNode;
}) {
  return (
    <motion.div
      className={`method-box ${active ? 'active' : ''} ${dimmed ? 'dimmed' : ''}`}
      animate={{ scale: active ? 1.04 : 1, opacity: dimmed ? 0.3 : 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      <span>{name}</span>
      {subtitle && <strong>{subtitle}</strong>}
      {children}
    </motion.div>
  );
}

function ValueChip({
  label,
  value,
  active = false,
  reading = false,
  muted = false,
}: {
  label: string;
  value: string;
  active?: boolean;
  reading?: boolean;
  muted?: boolean;
}) {
  return (
    <motion.div
      className={`value-chip ${active ? 'active' : ''} ${reading ? 'reading' : ''} ${muted ? 'muted' : ''}`}
      animate={{ scale: active || reading ? [1, 1.08, 1] : 1 }}
      transition={{ duration: 0.4 }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </motion.div>
  );
}

function WhyMethodVisual({ step }: { step: number }) {
  const showMethod = step >= 0;
  const activeCall = step >= 3 ? Math.min(Math.floor((step - 3) / 4), 2) : -1;
  const phase = step >= 3 ? (step - 3) % 4 : -1;
  const names = ['田中', '佐藤', '鈴木'];
  const messageNames = ['msg1', 'msg2', 'msg3'];
  const returnValues = names.map((name) => `"こんにちは、${name}さん！"`);
  const visibleReturnIndex = phase >= 2 ? activeCall : activeCall - 1;
  const methodActive = (step >= 0 && step <= 2) || phase === 1;

  return (
    <div className="method-why-visual">
      <motion.div className="repeat-stack" animate={{ opacity: showMethod ? 0.34 : 1, x: showMethod ? -22 : 0 }}>
        {names.map((name, index) => (
          <div key={name} className={`repeat-card ${index === activeCall ? 'active' : ''}`}>
            <span>同じ挨拶処理</span>
            <strong>{name}さん</strong>
          </div>
        ))}
      </motion.div>
      <motion.div className="big-arrow" animate={{ opacity: showMethod ? 1 : 0.28, scale: showMethod ? 1 : 0.86 }}>
        <ArrowRight size={56} />
      </motion.div>
      <div className="method-call-stack">
        <MethodBox
          name="make_greeting(name)"
          subtitle={phase === 1 && activeCall >= 0 ? returnValues[activeCall] : '挨拶を作って返す'}
          active={methodActive}
          dimmed={step < 0}
        />
        <div className="call-chip-row">
          {names.map((name, index) => (
            <div key={name}>
              <ValueChip
                label={messageNames[index]}
                value={visibleReturnIndex >= index ? returnValues[index] : '-'}
                active={phase === 2 && activeCall === index}
                reading={phase === 3 && activeCall === index}
                muted={visibleReturnIndex < index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DefineCallVisual({ step }: { step: number }) {
  const inside = step === 3;
  return (
    <div className="call-flow-visual">
      <MethodBox name="def make_message" subtitle="定義された処理" active={step >= 0 && step <= 1} dimmed={step < 0}>
        <div className={`inner-return ${inside ? 'active' : ''}`}>"こんにちは！"</div>
      </MethodBox>
      <motion.div className={`jump-arrow ${step >= 2 ? 'active' : ''}`} animate={{ x: step >= 2 ? [0, 12, 0] : 0 }}>
        <ArrowRight size={44} />
      </motion.div>
      <div className="main-space">
        <ValueChip label="外側" value="msg = make_message" active={step === 2 || step === 4 || step === 5} muted={step < 2} />
        <ValueChip label="戻り値" value='"こんにちは！"' active={step === 3 || step === 4} muted={step < 3} />
        <ValueChip label="msg" value={step >= 5 ? '"こんにちは！"' : '-'} active={step === 5 || step === 6} muted={step < 5} />
      </div>
    </div>
  );
}

function ArgumentVisual({ step }: { step: number }) {
  const argumentValue = step >= 6 ? '"佐藤"' : step >= 1 ? '"田中"' : '-';
  const nameValue = step >= 7 ? '"佐藤"' : step >= 2 && step < 6 ? '"田中"' : '-';
  const msg1Value = step >= 4 ? '"こんにちは、田中さん！"' : '-';
  const msg2Value = step >= 9 ? '"こんにちは、佐藤さん！"' : '-';

  return (
    <div className="argument-visual">
      <ValueChip label="呼び出し側の値" value={argumentValue} active={step === 1 || step === 6} muted={step < 1} />
      <motion.div className={`value-tunnel ${step >= 1 ? 'active' : ''}`}>
        <Package size={42} />
        <span>引数</span>
      </motion.div>
      <MethodBox name="make_greeting(name)" subtitle="name が値を受け取る" active={step >= 2 && step <= 8} dimmed={step < 2}>
        <ValueChip label="name" value={nameValue} active={step === 2 || step === 7} muted={step < 2 || step === 6} />
      </MethodBox>
      <div className="argument-results">
        <ValueChip label="msg1" value={msg1Value} active={step === 4 || step === 5} muted={step < 4} />
        <ValueChip label="msg2" value={msg2Value} active={step === 9 || step === 10} muted={step < 9} />
      </div>
    </div>
  );
}

function ReturnValueVisual({ step }: { step: number }) {
  return (
    <div className="return-visual">
      <div className="parameter-row">
        <ValueChip label="a" value="3" active={step === 2} muted={step < 2} />
        <ValueChip label="b" value="5" active={step === 2} muted={step < 2} />
      </div>
      <MethodBox name="add(a, b)" subtitle="a + b を返す" active={step >= 1 && step <= 3} dimmed={step < 1}>
        <div className={`calc-expression ${step === 3 ? 'active' : ''}`}>3 + 5 = 8</div>
      </MethodBox>
      <motion.div className={`return-arrow ${step >= 4 ? 'active' : ''}`}>
        <Undo2 size={42} />
        <span>戻り値</span>
      </motion.div>
      <ValueChip label="result" value={step >= 4 ? '8' : '-'} active={step === 4 || step === 5} muted={step < 4} />
    </div>
  );
}

function PutsReturnVisual({ step }: { step: number }) {
  return (
    <div className="puts-return-visual">
      <div className="compare-lane">
        <MethodBox name="calc_a" subtitle="中で puts する" active={step >= 0 && step <= 2}>
          <ValueChip label="表示" value="8" active={step === 1} muted={step < 1} />
          <ValueChip label="answer_a" value={step >= 2 ? 'nil' : '-'} active={step === 2 || step === 3} muted={step < 2} />
        </MethodBox>
        <MethodBox name="calc_b" subtitle="値を返す" active={step >= 4}>
          <ValueChip label="戻り値" value={step >= 5 ? '8' : '-'} active={step === 5 || step === 6} muted={step < 5} />
          <ValueChip label="answer_b" value={step >= 6 ? '8' : '-'} active={step >= 6} muted={step < 6} />
        </MethodBox>
      </div>
    </div>
  );
}

function MethodChainVisual({ step }: { step: number }) {
  return (
    <div className="method-chain-visual">
      <MethodBox name="make_total_message(price)" subtitle="文章を作る" active={step >= 1 && step <= 6} dimmed={step < 1}>
        <ValueChip label="price" value="500" active={step === 1} muted={step < 1} />
        <ValueChip label="total" value={step >= 5 ? '700' : '-'} active={step === 5} muted={step < 5} />
      </MethodBox>
      <motion.div className={`chain-connector ${step >= 2 && step <= 5 ? 'active' : ''}`}>
        <Waypoints size={48} />
      </motion.div>
      <MethodBox name="add_shipping_fee(price)" subtitle="送料を足す" active={step >= 3 && step <= 4} dimmed={step < 3}>
        <div className={`calc-expression ${step === 4 ? 'active' : ''}`}>500 + 200 = 700</div>
      </MethodBox>
      <ValueChip label="message" value={step >= 7 ? '"合計金額は700円です"' : '-'} active={step === 7 || step === 8} muted={step < 7} />
    </div>
  );
}

function ScopeWallVisual({ step }: { step: number }) {
  return (
    <div className="scope-wall-visual">
      <div className="scope-space outside">
        <span>外側</span>
        <ValueChip label="message" value='"こんにちは"' active={step === 0 || step === 2} muted={step < 0} />
        <ValueChip label="result" value={step >= 5 ? '"こんにちは"' : '-'} active={step === 5 || step === 6} muted={step < 5} />
      </div>
      <motion.div className={`scope-wall ${step >= 1 ? 'active' : ''}`} animate={{ opacity: step >= 1 ? 1 : 0.34 }}>
        <BrickWall size={54} />
        <strong>見えない壁</strong>
      </motion.div>
      <div className="scope-space inside">
        <span>メソッド内</span>
        <MethodBox name="get_message(text)" subtitle="引数で受け取る" active={step >= 3} dimmed={step < 3}>
          <ValueChip label="text" value={step >= 3 ? '"こんにちは"' : '-'} active={step === 3 || step === 4} muted={step < 3} />
        </MethodBox>
      </div>
      <AnimatePresence>
        {step >= 2 && (
          <motion.div className="scope-pass" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            引数として渡す
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Chapter07Visual({ lessonId, step }: { lessonId: LessonId07; step: number }) {
  switch (lessonId) {
    case 'why_method':
      return <WhyMethodVisual step={step} />;
    case 'define_call':
      return <DefineCallVisual step={step} />;
    case 'argument':
      return <ArgumentVisual step={step} />;
    case 'return_value':
      return <ReturnValueVisual step={step} />;
    case 'puts_return':
      return <PutsReturnVisual step={step} />;
    case 'method_chain':
      return <MethodChainVisual step={step} />;
    case 'scope_wall':
      return <ScopeWallVisual step={step} />;
    default:
      return null;
  }
}
