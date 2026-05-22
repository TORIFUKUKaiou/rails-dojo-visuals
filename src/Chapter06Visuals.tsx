import type { ComponentType } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Brackets,
  Database,
  FolderTree,
  Gauge,
  Repeat2,
  Sparkles,
} from 'lucide-react';

export type LessonId06 =
  | 'why_hash'
  | 'hash_basic'
  | 'hash_modify'
  | 'hash_each'
  | 'hash_methods'
  | 'array_of_hashes'
  | 'hash_in_hash';

export type Lesson06 = {
  id: LessonId06;
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

const LESSON_06_IDS: readonly LessonId06[] = [
  'why_hash',
  'hash_basic',
  'hash_modify',
  'hash_each',
  'hash_methods',
  'array_of_hashes',
  'hash_in_hash',
];

export function isLessonId06(id: string): id is LessonId06 {
  return LESSON_06_IDS.includes(id as LessonId06);
}

export const LESSONS_06: readonly Lesson06[] = [
  {
    id: 'why_hash',
    short: 'なぜ？',
    title: 'なぜハッシュが必要なのか',
    lead: '別々の変数で持っていた情報を、キー付きの1つのハッシュにまとめられます。',
    icon: Database,
    accent: 'blue',
    code: [
      'name = "田中"',
      'age = 20',
      'city = "福岡"',
      '',
      'person = {',
      '  "name" => "田中",',
      '  "age" => 20,',
      '  "city" => "福岡"',
      '}',
      'puts person["age"]',
    ],
    steps: [
      { line: 0, message: '名前を name という変数に入れます。' },
      { line: 1, message: '年齢を age という変数に入れます。' },
      { line: 2, message: '住んでいる場所を city という変数に入れます。' },
      { line: 4, message: 'ハッシュなら、関係するデータをキー付きで1つにまとめられます。' },
      { line: 9, message: 'person["age"] と書けば、年齢を取り出していることが分かります。', console: ['20'] },
    ],
  },
  {
    id: 'hash_basic',
    short: '基本',
    title: 'キーを使って値を取り出す',
    lead: 'ハッシュの中身はキーを指定して取り出します。配列が「番号」なら、ハッシュは「名前」です。',
    icon: Database,
    accent: 'indigo',
    code: [
      'person = { "name" => "田中", "age" => 20 }',
      '',
      'puts person["name"]',
      'puts person["age"]',
    ],
    steps: [
      { line: 0, message: 'キー "name" に "田中"、"age" に 20 を結びつけたハッシュです。' },
      { line: 2, message: 'キー "name" を指定して値を取り出します。', console: ['田中'] },
      { line: 3, message: 'キー "age" を指定して値を取り出します。', console: ['田中', '20'] },
    ],
  },
  {
    id: 'hash_modify',
    short: '更新',
    title: '値を書き換える・追加する',
    lead: 'キーを指定して代入することで、値を書き換えたり、新しいペアを追加したりできます。',
    icon: Sparkles,
    accent: 'amber',
    code: [
      'person = { "name" => "田中", "age" => 20 }',
      '',
      'person["age"] = 21',
      'person["city"] = "福岡"',
    ],
    steps: [
      { line: 0, message: '最初は名前と年齢だけのハッシュです。' },
      { line: 2, message: 'person["age"] の場所を確認します。値はまだ 20 のままです。' },
      { line: 2, message: '同じ03行で代入が実行され、age の値が 20 から 21 に書き換わります。' },
      { line: 3, message: 'person["city"] に追加する値を確認します。まだハッシュには入っていません。' },
      { line: 3, message: '同じ04行で "city" => "福岡" が新しく追加されます。' },
    ],
  },
  {
    id: 'hash_each',
    short: 'each',
    title: 'each でキーと値を見る',
    lead: 'ハッシュの each は、キー（key）と値（value）の2つの変数を受け取ります。',
    icon: Repeat2,
    accent: 'cyan',
    code: [
      'person = {',
      '  "name" => "田中",',
      '  "age" => 20,',
      '  "city" => "福岡"',
      '}',
      '',
      'person.each do |key, value|',
      '  puts "#{key}: #{value}"',
      'end',
    ],
    steps: [
      { line: 0, message: '3つのペアを持つハッシュを用意します。' },
      { line: 6, message: '1つ目のペアを取り出します。key = "name", value = "田中" です。' },
      { line: 7, message: '取り出した key と value を使って表示します。', console: ['name: 田中'] },
      { line: 6, message: '07行に戻り、2つ目のペアを取り出します。key = "age", value = 20 です。', console: ['name: 田中'] },
      { line: 7, message: '2つ目のペアを表示します。', console: ['name: 田中', 'age: 20'] },
      { line: 6, message: '07行に戻り、3つ目のペアを取り出します。key = "city", value = "福岡" です。', console: ['name: 田中', 'age: 20'] },
      { line: 7, message: '3つ目のペアを表示します。', console: ['name: 田中', 'age: 20', 'city: 福岡'] },
      { line: 8, message: '全ペアを処理したのでループ終了です。', console: ['name: 田中', 'age: 20', 'city: 福岡'] },
    ],
  },
  {
    id: 'hash_methods',
    short: '便利',
    title: 'keys・values・length・key?',
    lead: 'ハッシュの中身を確認するときに使う便利なメソッドを見ていきます。',
    icon: Gauge,
    accent: 'violet',
    code: [
      'person = {',
      '  "name" => "田中",',
      '  "age" => 20,',
      '  "city" => "福岡"',
      '}',
      '',
      'p person.keys',
      'p person.values',
      'puts person.length',
      'puts person.key?("name")',
    ],
    steps: [
      { line: 0, message: '3つのキーと値を持つハッシュを用意します。' },
      { line: 6, message: 'keys はキーの一覧を配列として返します。p で配列の形のまま確認します。', console: ['["name", "age", "city"]'] },
      { line: 7, message: 'values は値の一覧を配列として返します。', console: ['["name", "age", "city"]', '["田中", 20, "福岡"]'] },
      { line: 8, message: 'length はペアの数を返します。', console: ['["name", "age", "city"]', '["田中", 20, "福岡"]', '3'] },
      { line: 9, message: 'key? は、そのキーがあるかどうかを true / false で返します。', console: ['["name", "age", "city"]', '["田中", 20, "福岡"]', '3', 'true'] },
    ],
  },
  {
    id: 'array_of_hashes',
    short: '配列＋ハッシュ',
    title: '配列の中にハッシュを入れる',
    lead: '配列の各要素にハッシュを格納すると、複数人のデータを扱えます。',
    icon: Brackets,
    accent: 'green',
    code: [
      'students = [',
      '  { "name" => "田中", "score" => 80 },',
      '  { "name" => "鈴木", "score" => 65 }',
      ']',
      '',
      'students.each do |student|',
      '  puts "#{student["name"]}: #{student["score"]}点"',
      'end',
    ],
    steps: [
      { line: 0, message: '配列の各要素にハッシュを入れます。2人分のデータです。' },
      { line: 5, message: 'students 全体を見ながら、each で1つずつ取り出す準備をします。' },
      { line: 5, message: '0番目のハッシュが student に入ります。' },
      { line: 6, message: 'student["name"] と student["score"] を使って表示します。', console: ['田中: 80点'] },
      { line: 5, message: '06行に戻り、1番目のハッシュが student に入ります。', console: ['田中: 80点'] },
      { line: 6, message: '2人目のデータを表示します。', console: ['田中: 80点', '鈴木: 65点'] },
      { line: 7, message: '全員を処理したのでループ終了です。', console: ['田中: 80点', '鈴木: 65点'] },
    ],
  },
  {
    id: 'hash_in_hash',
    short: 'ネスト',
    title: 'ハッシュの中にハッシュを入れる',
    lead: 'ハッシュの値にさらにハッシュを入れることで、複雑な階層構造のデータを表現できます。',
    icon: FolderTree,
    accent: 'rose',
    code: [
      'student = {',
      '  "name" => "田中",',
      '  "scores" => {',
      '    "japanese" => 80,',
      '    "math" => 90',
      '  }',
      '}',
      '',
      'puts student["scores"]["math"]',
    ],
    steps: [
      { line: 0, message: '"scores" の値にさらにハッシュを入れてネスト構造を作ります。' },
      { line: 8, message: 'まず student 全体を見ます。大きいハッシュの中に "scores" があります。' },
      { line: 8, message: 'student["scores"] で、内側のハッシュを取り出します。' },
      { line: 8, message: 'student["scores"]["math"] で、内側の "math" を取り出して表示します。', console: ['90'] },
    ],
  },
];

type HashPair = { key: string; value: string | number };

function HashBlocks({
  pairs,
  activeKey = '',
  newKey = '',
  dimKeys = [],
  compact = false,
  roomy = false,
  large = false,
  dimmed = false,
  changedKey = '',
}: {
  pairs: HashPair[];
  activeKey?: string;
  newKey?: string;
  dimKeys?: string[];
  compact?: boolean;
  roomy?: boolean;
  large?: boolean;
  dimmed?: boolean;
  changedKey?: string;
}) {
  return (
    <div className={`hash-wrap ${compact ? 'compact' : ''} ${roomy ? 'roomy' : ''} ${large ? 'large' : ''} ${dimmed ? 'dimmed' : ''}`}>
      <span className="hash-brace">{'{'}</span>
      {pairs.map((pair) => {
        const isActive = pair.key === activeKey;
        const isNew = pair.key === newKey;
        const isDim = dimKeys.includes(pair.key);
        return (
          <motion.div
            key={pair.key}
            layout
            className={`hash-cell${isActive ? ' active' : ''}${isNew ? ' appended' : ''}`}
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{
              scale: isActive ? 1.12 : isDim ? 0.88 : 1,
              opacity: isDim ? 0.28 : 1,
              y: 0,
            }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          >
            <div className="key-pill">"{pair.key}"</div>
            <div className="arrow-label">=&gt;</div>
            <div className={`cell-value ${pair.key === changedKey ? 'changed' : ''}`}>{typeof pair.value === 'string' ? `"${pair.value}"` : pair.value}</div>
          </motion.div>
        );
      })}
      <span className="hash-brace">{'}'}</span>
    </div>
  );
}

function WhyHashVisual({ step }: { step: number }) {
  const showHash = step >= 3;
  const activeVariable = step >= 0 && step <= 2 ? step : -1;
  const hashPairs: HashPair[] = [
    { key: 'name', value: '田中' },
    { key: 'age', value: 20 },
    { key: 'city', value: '福岡' },
  ];

  return (
    <div className="split-visual hash-comparison">
      <motion.div className="variable-stack" animate={{ opacity: showHash ? 0.36 : 1, scale: showHash ? 0.9 : 1 }}>
        {[
          ['name', '"田中"'],
          ['age', '20'],
          ['city', '"福岡"'],
        ].map(([name, value], index) => (
          <motion.div
            key={name}
            className={`variable-card ${activeVariable === index ? 'active' : ''} ${step > index ? 'completed' : ''}`}
            animate={{
              opacity: activeVariable === index ? 1 : step > index ? 0.76 : 0.26,
              scale: activeVariable === index ? 1.04 : 1,
            }}
          >
            <span>{name}</span>
            <strong>{value}</strong>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="big-arrow" animate={{ scale: showHash ? 1.08 : 0.85, opacity: showHash ? 1 : 0.25 }}>
        <Database size={52} />
      </motion.div>

      <motion.div className="array-focus hash-focus" animate={{ opacity: showHash ? 1 : 0.2, scale: showHash ? 1 : 0.88 }}>
        <div className="visual-label">person</div>
        <HashBlocks pairs={hashPairs} activeKey={step === 4 ? 'age' : ''} roomy />
      </motion.div>
    </div>
  );
}

function HashBasicVisual({ step }: { step: number }) {
  const activeKey = step === 1 ? 'name' : step === 2 ? 'age' : '';
  const dimKeys = step === 1 ? ['age'] : step === 2 ? ['name'] : [];
  const pairs: HashPair[] = [
    { key: 'name', value: '田中' },
    { key: 'age', value: 20 },
  ];

  return (
    <div className="center-stack hash-basic-visual">
      <div className="visual-label">person</div>
      <HashBlocks pairs={pairs} activeKey={activeKey} dimKeys={dimKeys} large dimmed={step < 0} />
      <AnimatePresence mode="wait">
        {activeKey && (
          <motion.div
            key={activeKey}
            className="readout"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span>person["{activeKey}"]</span>
            <strong>{activeKey === 'name' ? '"田中"' : '20'}</strong>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HashModifyVisual({ step }: { step: number }) {
  const ageValue = step >= 2 ? 21 : 20;
  const showCity = step >= 4;
  const activeKey = step === 1 || step === 2 ? 'age' : step === 3 || step === 4 ? 'city' : '';
  const pairs: HashPair[] = [
    { key: 'name', value: '田中' },
    { key: 'age', value: ageValue },
    ...(showCity ? [{ key: 'city', value: '福岡' } satisfies HashPair] : []),
  ];

  return (
    <div className="center-stack">
      <div className="visual-label">person</div>
      <HashBlocks pairs={pairs} activeKey={activeKey} newKey={showCity ? 'city' : ''} large dimmed={step < 0} changedKey={step === 2 ? 'age' : ''} />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="target-age" className="swap-banner" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}>
            person["age"] の場所を確認中
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="write-age" className="swap-banner" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}>
            20 → 21
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="pending-city" className="swap-banner info" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}>
            "city" =&gt; "福岡" を追加する準備
          </motion.div>
        )}
        {step === 4 && (
          <motion.div key="wrote-city" className="swap-banner success" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}>
            "city" が追加されました
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HashEachVisual({ step }: { step: number }) {
  const activePairIndex = step >= 1 && step <= 6 ? Math.min(Math.floor((step - 1) / 2), 2) : -1;
  const pairs: HashPair[] = [
    { key: 'name', value: '田中' },
    { key: 'age', value: 20 },
    { key: 'city', value: '福岡' },
  ];
  const activeKey = activePairIndex >= 0 ? pairs[activePairIndex].key : '';
  const dimKeys = pairs.map((pair) => pair.key).filter((key) => key !== activeKey);
  const currentPair = activePairIndex >= 0 ? pairs[activePairIndex] : null;
  const showPipe = step >= 1 && step < 8;
  const keyDisplay = currentPair ? `"${currentPair.key}"` : '-';
  const valueDisplay = currentPair ? (typeof currentPair.value === 'string' ? `"${currentPair.value}"` : String(currentPair.value)) : '-';

  return (
    <div className={`each-visual ${step < 0 ? 'dimmed' : ''}`}>
      <HashBlocks pairs={pairs} activeKey={activeKey} dimKeys={activePairIndex >= 0 ? dimKeys : []} />
      <div className={`pipe-row ${step < 0 ? 'dimmed' : ''}`}>
        <span>|</span>
        <div className="hash-pipe-box">
          <span className="hash-pipe-label">key</span>
          <motion.div key={activeKey || 'idle-k'} className="hash-pipe-value" initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: showPipe ? 1 : 0.28 }}>
            {keyDisplay}
          </motion.div>
        </div>
        <span>,</span>
        <div className="hash-pipe-box value">
          <span className="hash-pipe-label">value</span>
          <motion.div key={`${activeKey || 'idle'}-value`} className="hash-pipe-value" initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: showPipe ? 1 : 0.28 }}>
            {valueDisplay}
          </motion.div>
        </div>
        <span>|</span>
      </div>
      <div className="laser-line" />
    </div>
  );
}

function HashMethodsVisual({ step }: { step: number }) {
  const methodIndex = step - 1;
  const cards = [
    { label: 'person.keys', value: '["name", "age", "city"]' },
    { label: 'person.values', value: '["田中", 20, "福岡"]' },
    { label: 'person.length', value: '3' },
    { label: 'person.key?("name")', value: 'true' },
  ];

  return (
    <div className="method-visual">
      <HashBlocks
        pairs={[
          { key: 'name', value: '田中' },
          { key: 'age', value: 20 },
          { key: 'city', value: '福岡' },
        ]}
        activeKey={methodIndex === 3 ? 'name' : ''}
        dimmed={step < 0}
      />
      <div className="method-grid hash-method-grid">
        {cards.map((card, index) => (
          <motion.div
            key={card.label}
            className={`method-card hash-method-card ${methodIndex === index ? 'result' : ''}`}
            animate={{ opacity: step <= 0 ? 0.26 : methodIndex === index ? 1 : index < methodIndex ? 0.72 : 0.28, scale: methodIndex === index ? 1.04 : 1 }}
          >
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ArrayOfHashesVisual({ step }: { step: number }) {
  const enteringLoop = step === 1;
  const activeHashIndex = step === 2 || step === 3 ? 0 : step === 4 || step === 5 ? 1 : -1;
  const showStudentBox = activeHashIndex >= 0;
  const data = [
    { name: '田中', score: 80 },
    { name: '鈴木', score: 65 },
  ];

  return (
    <div className="center-stack array-of-hashes-visual">
      <div className="visual-label">students</div>
      <div className={`array-wrap hash-array-wrap ${step < 0 ? 'dimmed' : ''} ${enteringLoop ? 'looping' : ''}`}>
        <span className="bracket">[</span>
        {data.map((student, index) => {
          const isActive = index === activeHashIndex;
          return (
            <div key={student.name} className="hash-array-slot">
              <motion.div
                layout
                className={`hash-array-item ${isActive ? 'active' : ''}`}
                animate={{ scale: isActive ? 1.05 : 1, opacity: activeHashIndex < 0 || isActive ? 1 : 0.36 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              >
                <div className="hash-index-holder">
                  <span className="index-pill static">{index}</span>
                </div>
                <HashBlocks
                  pairs={[
                    { key: 'name', value: student.name },
                    { key: 'score', value: student.score },
                  ]}
                  compact
                />
              </motion.div>
            </div>
          );
        })}
        <span className="bracket">]</span>
      </div>
      <AnimatePresence mode="wait">
        {showStudentBox && (
          <motion.div
            key={`student-${activeHashIndex}`}
            className="student-pipe-box"
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
          >
            <span>student</span>
            <strong>{activeHashIndex}番目のハッシュ</strong>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {activeHashIndex >= 0 && (step === 3 || step === 5) && (
          <motion.div key={`out-${activeHashIndex}`} className="readout" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <span>出力</span>
            <strong>
              {data[activeHashIndex].name}: {data[activeHashIndex].score}点
            </strong>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HashInHashVisual({ step }: { step: number }) {
  const highlightStudent = step === 1;
  const highlightScores = step >= 2;
  const highlightMath = step >= 3;

  return (
    <div className="center-stack hash-in-hash-visual">
      <div className="visual-label">student</div>
      <div className={`hash-wrap hash-in-hash-wrap ${step < 0 ? 'dimmed' : ''} ${highlightStudent ? 'student-active' : ''}`}>
        <span className="hash-brace">{'{'}</span>
        <motion.div layout className="hash-cell" animate={{ scale: 1, opacity: highlightMath ? 0.28 : 1 }} transition={{ type: 'spring', stiffness: 360, damping: 22 }}>
          <div className="key-pill">"name"</div>
          <div className="arrow-label">=&gt;</div>
          <div className="cell-value">"田中"</div>
        </motion.div>
        <motion.div
          layout
          className={`hash-cell nested ${highlightScores ? 'active' : ''}`}
          animate={{ scale: highlightScores && !highlightMath ? 1.08 : highlightMath ? 1.04 : 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22 }}
        >
          <div className="key-pill nested-key">"scores"</div>
          <div className="arrow-label nested-arrow">=&gt;</div>
          <div className="hash-wrap compact nested-inner">
            <span className="hash-brace small">{'{'}</span>
            <motion.div layout className="hash-cell mini" animate={{ scale: 1, opacity: highlightMath ? 0.28 : 1 }}>
              <div className="key-pill small">"japanese"</div>
              <div className="arrow-label small">=&gt;</div>
              <div className="cell-value small">80</div>
            </motion.div>
            <motion.div layout className={`hash-cell mini ${highlightMath ? 'active' : ''}`} animate={{ scale: highlightMath ? 1.14 : 1 }} transition={{ type: 'spring', stiffness: 360, damping: 22 }}>
              <div className="key-pill small">"math"</div>
              <div className="arrow-label small">=&gt;</div>
              <div className="cell-value small">90</div>
            </motion.div>
            <span className="hash-brace small">{'}'}</span>
          </div>
        </motion.div>
        <span className="hash-brace">{'}'}</span>
      </div>
      <AnimatePresence mode="wait">
        {highlightMath && (
          <motion.div key="nest-out" className="readout" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <span>student["scores"]["math"]</span>
            <strong>90</strong>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Chapter06Visual({ lessonId, step }: { lessonId: LessonId06; step: number }) {
  switch (lessonId) {
    case 'why_hash':
      return <WhyHashVisual step={step} />;
    case 'hash_basic':
      return <HashBasicVisual step={step} />;
    case 'hash_modify':
      return <HashModifyVisual step={step} />;
    case 'hash_each':
      return <HashEachVisual step={step} />;
    case 'hash_methods':
      return <HashMethodsVisual step={step} />;
    case 'array_of_hashes':
      return <ArrayOfHashesVisual step={step} />;
    case 'hash_in_hash':
      return <HashInHashVisual step={step} />;
    default:
      return null;
  }
}
