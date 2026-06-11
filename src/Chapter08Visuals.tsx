import type { ComponentType, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Box,
  BrickWall,
  Database,
  Package,
  Sparkles,
  SquareFunction,
  Workflow,
} from 'lucide-react';

export type LessonId08 =
  | 'why_class'
  | 'class_instance'
  | 'simple_method'
  | 'initialize'
  | 'instance_variable'
  | 'state_change'
  | 'rails_bridge';

export type Lesson08 = {
  id: LessonId08;
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

const LESSON_08_IDS: readonly LessonId08[] = [
  'why_class',
  'class_instance',
  'simple_method',
  'initialize',
  'instance_variable',
  'state_change',
  'rails_bridge',
];

export function isLessonId08(id: string): id is LessonId08 {
  return LESSON_08_IDS.includes(id as LessonId08);
}

export const LESSONS_08: readonly Lesson08[] = [
  {
    id: 'why_class',
    short: 'なぜ？',
    title: 'データとメソッドをまとめる',
    lead: 'ハッシュのデータと、それを扱うメソッドが離れている状態から、クラスで1つにまとめる考え方を見ます。',
    icon: Database,
    accent: 'blue',
    code: [
      'article = { "title" => "はじめての記事", "body" => "Rubyを学んでいます" }',
      '',
      'def show_title(article)',
      '  "記事タイトル：#{article["title"]}"',
      'end',
      '',
      'puts show_title(article)',
      '',
      'class Article',
      '  def initialize(title, body)',
      '    @title = title',
      '    @body = body',
      '  end',
      '',
      '  def title_message',
      '    "記事タイトル：#{@title}"',
      '  end',
      'end',
    ],
    steps: [
      { line: 0, message: '記事1件分のデータをハッシュで用意します。' },
      { line: 2, message: 'タイトルを表示する処理は、データとは別の場所に定義されています。' },
      { line: 3, message: 'メソッドの中で article["title"] を取り出して文章を作ります。' },
      { line: 6, message: 'ハッシュをメソッドに渡して呼び出します。', console: ['記事タイトル：はじめての記事'] },
      { line: 8, message: 'class Article から、データと処理をまとめる Article クラスを定義します。', console: ['記事タイトル：はじめての記事'] },
      { line: 17, message: 'ここでは細かい中身より、end までが Article クラスの範囲だと眺めます。', console: ['記事タイトル：はじめての記事'] },
    ],
  },
  {
    id: 'class_instance',
    short: '設計図',
    title: 'クラスは設計図、インスタンスは実物',
    lead: 'Article クラスは設計図です。Article.new すると、記事の実物であるインスタンスが作られます。',
    icon: Box,
    accent: 'indigo',
    code: [
      'class Article',
      'end',
      '',
      'article1 = Article.new',
      'article2 = Article.new',
    ],
    steps: [
      { line: 0, message: 'Article というクラスを定義します。これはまだ設計図です。' },
      { line: 1, message: 'end までが Article クラスの範囲です。まだ記事の実物はありません。' },
      { line: 3, message: 'Article.new で、1つ目の記事インスタンスを作ります。' },
      { line: 4, message: '同じ設計図から、2つ目の記事インスタンスも作れます。' },
    ],
  },
  {
    id: 'simple_method',
    short: '呼出',
    title: 'インスタンスのメソッドを呼ぶ',
    lead: 'クラスの中に書いたメソッドは、作ったインスタンスに対して呼び出します。',
    icon: SquareFunction,
    accent: 'green',
    code: [
      'class Article',
      '  def title_message',
      '    "これは記事です"',
      '  end',
      'end',
      '',
      'article = Article.new',
      'puts article.title_message',
    ],
    steps: [
      { line: 0, message: 'Article クラスを定義します。' },
      { line: 1, message: 'title_message は、Article のインスタンスが使えるメソッドです。' },
      { line: 2, message: 'このメソッドは文字列「これは記事です」を戻り値にします。' },
      { line: 6, message: 'Article.new で article というインスタンスを作ります。' },
      { line: 7, message: 'article.title_message と書いて、article に対してメソッドを呼びます。' },
      { line: 2, message: 'メソッドの中に入り、戻り値の文字列を作ります。' },
      { line: 7, message: '戻り値を puts が表示します。', console: ['これは記事です'] },
    ],
  },
  {
    id: 'initialize',
    short: '初期化',
    title: 'new すると initialize が動く',
    lead: 'Article.new("はじめての記事") の値は initialize(title) に渡り、@title に保存されます。',
    icon: Package,
    accent: 'cyan',
    code: [
      'class Article',
      '  def initialize(title)',
      '    @title = title',
      '  end',
      '',
      '  def title_message',
      '    "記事タイトル：#{@title}"',
      '  end',
      'end',
      '',
      'article1 = Article.new("はじめての記事")',
      'puts article1.title_message',
      '',
      'article2 = Article.new("Rubyを学ぶ")',
      'puts article2.title_message',
    ],
    steps: [
      { line: 1, message: 'initialize は、new したときに自動で呼ばれる特別なメソッドです。' },
      { line: 10, message: 'Article.new に "はじめての記事" を渡します。まだ @title には入っていません。' },
      { line: 1, message: '渡した値が initialize の引数 title に入ります。' },
      { line: 2, message: '@title = title により、article1 の中に @title が保存されます。' },
      { line: 11, message: 'article1.title_message を呼び出します。' },
      { line: 6, message: 'article1 の @title を使って、表示する文章を作ります。' },
      { line: 11, message: 'article1 のタイトルが表示されます。', console: ['記事タイトル：はじめての記事'] },
      { line: 13, message: '次は "Rubyを学ぶ" を渡して、別のインスタンスを作ります。', console: ['記事タイトル：はじめての記事'] },
      { line: 1, message: '同じ initialize ですが、今度は title に "Rubyを学ぶ" が入ります。', console: ['記事タイトル：はじめての記事'] },
      { line: 2, message: 'article2 の中に、article1 とは別の @title が保存されます。', console: ['記事タイトル：はじめての記事'] },
      { line: 14, message: 'article2.title_message を呼び出します。', console: ['記事タイトル：はじめての記事'] },
      { line: 6, message: 'article2 の @title を使って、別の文章を作ります。', console: ['記事タイトル：はじめての記事'] },
      { line: 14, message: '2つ目の記事タイトルが表示されます。', console: ['記事タイトル：はじめての記事', '記事タイトル：Rubyを学ぶ'] },
    ],
  },
  {
    id: 'instance_variable',
    short: '@変数',
    title: '@title は同じインスタンスの中で使える',
    lead: 'インスタンス変数は、同じインスタンスのメソッドから使えます。ただし外側から直接は触れません。',
    icon: BrickWall,
    accent: 'orange',
    code: [
      'class Article',
      '  def initialize(title)',
      '    @title = title',
      '  end',
      '',
      '  def title_message',
      '    "記事タイトル：#{@title}"',
      '  end',
      'end',
      '',
      'article1 = Article.new("はじめての記事")',
      'puts article1.title_message',
      'puts article1.@title',
    ],
    steps: [
      { line: 10, message: 'article1 を作ると、article1 の中に @title が保存されます。' },
      { line: 11, message: 'title_message は Article クラスの中にあるメソッドなので、@title を使えます。' },
      { line: 6, message: '@title の値を使って、タイトル表示用の文字列を作ります。' },
      { line: 11, message: 'メソッドを通してタイトルを表示できます。', console: ['記事タイトル：はじめての記事'] },
      { line: 12, message: '外側から article1.@title のように直接取り出そうとすると、Ruby では書けません。', console: ['記事タイトル：はじめての記事', 'SyntaxError'] },
    ],
  },
  {
    id: 'state_change',
    short: '状態',
    title: 'インスタンスは状態を持てる',
    lead: 'メソッドを呼ぶことで、同じインスタンスの @published を false から true へ変えられます。',
    icon: Sparkles,
    accent: 'rose',
    code: [
      'class Article',
      '  def initialize(title, body)',
      '    @title = title',
      '    @body = body',
      '    @published = false',
      '  end',
      '',
      '  def publish',
      '    @published = true',
      '  end',
      '',
      '  def published?',
      '    @published',
      '  end',
      'end',
      '',
      'article = Article.new("はじめての記事", "Rubyを学んでいます")',
      'puts article.published?',
      'article.publish',
      'puts article.published?',
    ],
    steps: [
      { line: 16, message: '記事インスタンスを作ります。title と body を渡します。' },
      { line: 2, message: '@title にタイトルを保存します。' },
      { line: 3, message: '@body に本文を保存します。' },
      { line: 4, message: '@published は最初 false、つまり未公開の状態です。' },
      { line: 17, message: 'published? を呼び、今の @published を確認します。' },
      { line: 12, message: 'published? は @published の値をそのまま返します。' },
      { line: 17, message: '最初は false と表示されます。', console: ['false'] },
      { line: 18, message: 'publish メソッドを呼びます。まだ値は false のままです。', console: ['false'] },
      { line: 8, message: '@published = true が実行され、同じインスタンスの状態が変わります。', console: ['false'] },
      { line: 19, message: 'もう一度 published? を呼び、変更後の状態を確認します。', console: ['false'] },
      { line: 12, message: '今度は @published が true になっています。', console: ['false'] },
      { line: 19, message: 'true と表示されます。', console: ['false', 'true'] },
    ],
  },
  {
    id: 'rails_bridge',
    short: 'Rails',
    title: 'Rails の Article も同じ考え方',
    lead: 'Rails のコードも、クラスからインスタンスを作り、値を入れ、メソッドを呼ぶという基本は同じです。',
    icon: Workflow,
    accent: 'violet',
    code: [
      'article = Article.new',
      'article.title = "はじめての記事"',
      'article.save',
    ],
    steps: [
      { line: 0, message: 'Rails でも Article.new で Article クラスのインスタンスを作ります。' },
      { line: 1, message: 'title に値を入れます。今日の素朴な Article クラスには、まだこの仕組みはありません。' },
      { line: 2, message: 'save メソッドを呼ぶと、Rails ではデータベースへ保存できます。' },
      { line: 2, message: '今日の基本は、クラスから実物を作り、実物に対してメソッドを呼ぶことです。' },
    ],
  },
];

function MiniMethodBox({
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
      className={`method-box class-method-box ${active ? 'active' : ''} ${dimmed ? 'dimmed' : ''}`}
      animate={{ scale: active ? 1.04 : 1, opacity: dimmed ? 0.3 : 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      <span>{name}</span>
      {subtitle && <strong>{subtitle}</strong>}
      {children}
    </motion.div>
  );
}

function DataChip({
  label,
  value,
  active = false,
  reading = false,
  danger = false,
  muted = false,
}: {
  label: string;
  value: string;
  active?: boolean;
  reading?: boolean;
  danger?: boolean;
  muted?: boolean;
}) {
  return (
    <motion.div
      className={`value-chip class-value-chip ${active ? 'active' : ''} ${reading ? 'reading' : ''} ${danger ? 'danger' : ''} ${muted ? 'muted' : ''}`}
      animate={{ scale: active || reading ? [1, 1.08, 1] : 1 }}
      transition={{ duration: 0.4 }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </motion.div>
  );
}

function ArticleInstance({
  name,
  title = '-',
  body = '-',
  published = '-',
  active = false,
  dimmed = false,
  showBody = false,
  showPublished = false,
  changedPublished = false,
}: {
  name: string;
  title?: string;
  body?: string;
  published?: string;
  active?: boolean;
  dimmed?: boolean;
  showBody?: boolean;
  showPublished?: boolean;
  changedPublished?: boolean;
}) {
  return (
    <motion.div
      className={`article-instance ${active ? 'active' : ''} ${dimmed ? 'dimmed' : ''}`}
      animate={{ scale: active ? 1.04 : 1, opacity: dimmed ? 0.35 : 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      <span className="instance-name">{name}</span>
      <DataChip label="@title" value={title} active={active && title !== '-'} muted={title === '-'} />
      {showBody && <DataChip label="@body" value={body} active={active && body !== '-'} muted={body === '-'} />}
      {showPublished && (
        <DataChip
          label="@published"
          value={published}
          active={active || changedPublished}
          reading={changedPublished}
          muted={published === '-'}
        />
      )}
    </motion.div>
  );
}

function WhyClassVisual({ step }: { step: number }) {
  const showClass = step >= 4;
  const definingClass = step >= 4;
  return (
    <div className="class-why-visual">
      <motion.div className="separate-side" animate={{ opacity: showClass ? 0.32 : 1, x: showClass ? -24 : 0 }}>
        <div className={`hash-mini-card ${step === 0 ? 'active' : ''}`}>
          <span>article ハッシュ</span>
          <strong>"title" =&gt; "はじめての記事"</strong>
          <strong>"body" =&gt; "Rubyを学んでいます"</strong>
        </div>
        <div className={`method-mini-card ${step >= 1 && step <= 2 ? 'active' : ''}`}>
          <span>show_title(article)</span>
          <strong>article["title"] を使う</strong>
        </div>
      </motion.div>
      <motion.div className="big-arrow" animate={{ opacity: showClass ? 1 : 0.35, scale: showClass ? 1.08 : 0.88 }}>
        <ArrowRight size={58} />
      </motion.div>
      <motion.div
        className={`class-bundle ${definingClass ? 'active' : ''}`}
        animate={{ opacity: showClass ? 1 : 0.2, scale: showClass ? 1 : 0.9 }}
      >
        <span>Article クラス</span>
        <div className="class-bundle-grid">
          <DataChip label="データ" value="@title / @body" active={showClass} muted={!showClass} />
          <MiniMethodBox name="title_message" subtitle="タイトルを表示する処理" active={showClass} dimmed={!showClass} />
        </div>
      </motion.div>
    </div>
  );
}

function ClassInstanceVisual({ step }: { step: number }) {
  const showBlueprint = step >= 0;
  const showArticle1 = step >= 2;
  const showArticle2 = step >= 3;
  return (
    <div className="blueprint-visual">
      <motion.div className={`blueprint-card ${showBlueprint ? 'active' : ''}`} animate={{ opacity: showBlueprint ? 1 : 0.25 }}>
        <Box size={52} />
        <span>Article クラス</span>
        <strong>設計図</strong>
      </motion.div>
      <motion.div className={`factory-arrow ${showArticle1 ? 'active' : ''}`}>
        <ArrowRight size={48} />
        <span>Article.new</span>
      </motion.div>
      <div className="instance-row">
        <ArticleInstance name="article1" active={step === 2} dimmed={!showArticle1} />
        <ArticleInstance name="article2" active={step === 3} dimmed={!showArticle2} />
      </div>
    </div>
  );
}

function SimpleMethodVisual({ step }: { step: number }) {
  const showInstance = step >= 3;
  const methodActive = step >= 1 && step <= 5;
  return (
    <div className="simple-class-visual">
      <div className="class-shell">
        <span className="class-name">Article</span>
        <MiniMethodBox
          name="title_message"
          subtitle={step >= 5 ? '"これは記事です"' : '文字列を返す'}
          active={methodActive}
          dimmed={step < 1}
        />
      </div>
      <motion.div className={`call-arrow ${step >= 4 ? 'active' : ''}`} animate={{ x: step >= 4 ? [0, 12, 0] : 0 }}>
        <ArrowRight size={48} />
        <span>article.title_message</span>
      </motion.div>
      <ArticleInstance name="article" title="メソッドを呼べる実物" active={step === 3 || step >= 4} dimmed={!showInstance} />
    </div>
  );
}

function InitializeVisual({ step }: { step: number }) {
  const activeIndex = step >= 7 ? 1 : 0;
  const titleValue =
    step >= 9
      ? '"Rubyを学ぶ"'
      : step >= 2 && step < 7
        ? '"はじめての記事"'
        : step >= 8
          ? '"Rubyを学ぶ"'
          : '-';
  const article1Title = step >= 3 ? '"はじめての記事"' : '-';
  const article2Title = step >= 9 ? '"Rubyを学ぶ"' : '-';
  return (
    <div className="initialize-visual">
      <div className="call-stack-side">
        <DataChip
          label="Article.new の引数"
          value={activeIndex === 0 ? '"はじめての記事"' : '"Rubyを学ぶ"'}
          active={step === 1 || step === 7}
          muted={step < 1}
        />
        <motion.div className={`value-tunnel ${step >= 1 ? 'active' : ''}`}>
          <Package size={40} />
          <span>値を渡す</span>
        </motion.div>
        <MiniMethodBox name="initialize(title)" subtitle="new で自動実行" active={step >= 0 && step <= 9}>
          <DataChip label="title" value={titleValue} active={step === 2 || step === 8} muted={titleValue === '-'} />
        </MiniMethodBox>
      </div>
      <div className="instance-column">
        <ArticleInstance
          name="article1"
          title={article1Title}
          active={(step >= 3 && step <= 6) || step === 10}
          dimmed={step < 3}
        />
        <ArticleInstance
          name="article2"
          title={article2Title}
          active={step >= 9}
          dimmed={step < 9}
        />
      </div>
      <AnimatePresence mode="wait">
        {(step === 5 || step === 11) && (
          <motion.div
            key={`message-${step}`}
            className="class-readout"
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
          >
            {step === 5 ? '記事タイトル：はじめての記事' : '記事タイトル：Rubyを学ぶ'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InstanceVariableVisual({ step }: { step: number }) {
  const showWall = step >= 4;
  return (
    <div className="instance-variable-visual">
      <div className="scope-space inside class-scope">
        <span>Article クラスの中</span>
        <ArticleInstance name="article1" title='"はじめての記事"' active={step <= 3} />
        <MiniMethodBox name="title_message" subtitle="@title を使える" active={step >= 1 && step <= 2} />
      </div>
      <motion.div className={`scope-wall ${showWall ? 'active' : ''}`} animate={{ opacity: showWall ? 1 : 0.34 }}>
        <BrickWall size={54} />
        <strong>外から直接は不可</strong>
      </motion.div>
      <div className="scope-space outside class-scope">
        <span>クラスの外側</span>
        <DataChip label="article1.title_message" value="OK" active={step === 3} muted={step < 3} />
        <DataChip label="article1.@title" value="SyntaxError" danger={step >= 4} muted={step < 4} />
      </div>
    </div>
  );
}

function StateChangeVisual({ step }: { step: number }) {
  const published = step >= 8 ? 'true' : step >= 3 ? 'false' : '-';
  return (
    <div className="state-change-visual">
      <ArticleInstance
        name="article"
        title={step >= 1 ? '"はじめての記事"' : '-'}
        body={step >= 2 ? '"Rubyを学んでいます"' : '-'}
        published={published}
        active={step >= 0}
        showBody
        showPublished
        changedPublished={step >= 8}
      />
      <div className="state-methods">
        <MiniMethodBox name="published?" subtitle="@published を返す" active={step >= 4 && step <= 6} />
        <MiniMethodBox name="publish" subtitle="@published = true" active={step >= 7 && step <= 8} />
        <MiniMethodBox name="published?" subtitle="もう一度確認" active={step >= 9} />
      </div>
      <AnimatePresence mode="wait">
        {(step === 6 || step === 11) && (
          <motion.div
            key={`published-${step}`}
            className={`state-output ${step === 11 ? 'published' : ''}`}
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
          >
            {step === 6 ? 'false' : 'true'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RailsBridgeVisual({ step }: { step: number }) {
  return (
    <div className="rails-bridge-visual">
      <div className="rails-step-row">
        <motion.div className={`rails-step ${step >= 0 ? 'active' : ''}`} animate={{ scale: step === 0 ? [1, 1.08, 1] : 1 }}>
          <Box size={38} />
          <span>Article.new</span>
          <strong>インスタンス作成</strong>
        </motion.div>
        <ArrowRight size={38} />
        <motion.div className={`rails-step ${step >= 1 ? 'active' : ''}`} animate={{ scale: step === 1 ? [1, 1.08, 1] : 1 }}>
          <Sparkles size={38} />
          <span>article.title = ...</span>
          <strong>値を入れる</strong>
        </motion.div>
        <ArrowRight size={38} />
        <motion.div className={`rails-step ${step >= 2 ? 'active' : ''}`} animate={{ scale: step >= 2 ? [1, 1.08, 1] : 1 }}>
          <Database size={38} />
          <span>article.save</span>
          <strong>保存する</strong>
        </motion.div>
      </div>
      <div className="rails-note">クラスから実物を作り、実物に対してメソッドを呼ぶ</div>
    </div>
  );
}

export function Chapter08Visual({ lessonId, step }: { lessonId: LessonId08; step: number }) {
  switch (lessonId) {
    case 'why_class':
      return <WhyClassVisual step={step} />;
    case 'class_instance':
      return <ClassInstanceVisual step={step} />;
    case 'simple_method':
      return <SimpleMethodVisual step={step} />;
    case 'initialize':
      return <InitializeVisual step={step} />;
    case 'instance_variable':
      return <InstanceVariableVisual step={step} />;
    case 'state_change':
      return <StateChangeVisual step={step} />;
    case 'rails_bridge':
      return <RailsBridgeVisual step={step} />;
    default:
      return null;
  }
}
