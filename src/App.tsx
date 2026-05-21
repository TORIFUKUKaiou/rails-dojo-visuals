/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, ChevronRight, Info, List, Hash, Code2 } from 'lucide-react';

type LessonId = 
  | 'multiplication' 
  | 'summation' 
  | 'array_sum'
  | 'array_average'
  | 'array_append' 
  | 'array_overwrite' 
  | 'array_index_access' 
  | 'array_length' 
  | 'array_pop' 
  | 'times_vs_each' 
  | 'range_each'
  | 'array_each_if';

interface Lesson {
  id: LessonId;
  title: string;
  description: string;
  code: string[];
}

const LESSONS: Lesson[] = [
  {
    id: 'multiplication',
    title: '9×9 Multiplication Table',
    description: 'Visualization of nested loops using (1..9).each.',
    code: [
      "(1..9).each do |dan|",
      "  (1..9).each do |n|",
      "    print \"#{dan * n} \"",
      "  end",
      "  puts \"\"",
      "end"
    ]
  },
  {
    id: 'summation',
    title: 'Calculate Total Score',
    description: 'Using .each to accumulate values from a list of scores.',
    code: [
      "scores = [80, 55, 100]",
      "total = 0",
      "scores.each do |score|",
      "  total = total + score",
      "end",
      "puts \"合計：#{total}点\""
    ]
  },
  {
    id: 'array_sum',
    title: 'Sum Method',
    description: 'Using .sum to calculate the total sum of an array instantly.',
    code: [
      "scores = [80, 55, 100]",
      "",
      "total = scores.sum",
      "",
      "puts \"合計：#{total}点\""
    ]
  },
  {
    id: 'array_average',
    title: 'Calculate Average Score',
    description: 'Using .sum and .length to calculate the average score.',
    code: [
      "scores = [80, 55, 100]",
      "total = scores.sum",
      "average = total / scores.length",
      "",
      "puts \"平均：#{average}点\""
    ]
  },
  {
    id: 'array_append',
    title: 'Array Append & Print',
    description: 'Adding elements with << and iterating through the results.',
    code: [
      "foods = [\"カレー\", \"ラーメン\", \"寿司\"]",
      "",
      "foods << \"うどん\"",
      "",
      "foods.each do |food|",
      "  puts food",
      "end"
    ]
  },
  {
    id: 'array_overwrite',
    title: 'Array Overwrite',
    description: 'Modifying an existing array element by its index.',
    code: [
      "foods = [\"カレー\", \"ラーメン\", \"寿司\"]",
      "",
      "foods[1] = \"うどん\"",
      "",
      "puts foods[0]",
      "puts foods[1]",
      "puts foods[2]"
    ]
  },
  {
    id: 'array_index_access',
    title: 'Array Index Access',
    description: 'Understand how Ruby arrays are 0-indexed, starting from foods[0].',
    code: [
      "foods = [\"カレー\", \"ラーメン\", \"寿司\"]",
      "",
      "puts foods[0]",
      "puts foods[1]",
      "puts foods[2]"
    ]
  },
  {
    id: 'array_length',
    title: 'Array Length & Size',
    description: 'Using .length and .size to count the number of elements.',
    code: [
      "foods = [\"カレー\", \"ラーメン\", \"寿司\"]",
      "",
      "len = foods.length",
      "",
      "puts \"Length: #{len}\""
    ]
  },
  {
    id: 'array_pop',
    title: 'Array Pop',
    description: 'Removing and returning the last element from an array.',
    code: [
      "foods = [\"カレー\", \"ラーメン\", \"寿司\"]",
      "",
      "last_item = foods.pop",
      "",
      "puts \"Popped: #{last_item}\"",
      "puts \"New size: #{foods.size}\""
    ]
  },
  {
    id: 'times_vs_each',
    title: 'times vs each',
    description: 'Compare repeating by a fixed count vs looping through items.',
    code: [
      "# times (fixed count)",
      "3.times do",
      "  puts \"Hello\"",
      "end",
      "",
      "# each (element loop)",
      "[\"カレー\", \"ラーメン\"].each do |x|",
      "  puts x",
      "end"
    ]
  },
  {
    id: 'range_each',
    title: 'Range each',
    description: 'Using each with a range of numbers (1..5).',
    code: [
      "(1..5).each do |number|",
      "  puts number",
      "end"
    ]
  },
  {
    id: 'array_each_if',
    title: 'Loop with Condition',
    description: 'Iterative filtering using each and if condition.',
    code: [
      "scores = [80, 55, 100]",
      "",
      "scores.each do |score|",
      "  if score >= 60",
      "    puts \"#{score}点：合格\"",
      "  else",
      "    puts \"#{score}点：不合格\"",
      "  end",
      "end"
    ]
  }
];

export default function App() {
  const [lessonId, setLessonId] = useState<LessonId>('multiplication');
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(500);
  const [statusText, setStatusText] = useState<string>("Click Play to start the visualization!");

  // Multiplication state
  const [dan, setDan] = useState<number>(-1);
  const [n_val, setNVal] = useState<number>(-1);
  const [gridOutput, setGridOutput] = useState<string[][]>(Array.from({ length: 9 }, () => []));

  // Summation & Scores state
  const scores = [80, 55, 100];
  const [total, setTotal] = useState<number>(0);
  const [average, setAverage] = useState<number>(0);
  const [sumIdx, setSumIdx] = useState<number>(-1);
  const [sumLog, setSumLog] = useState<string[]>([]);

  // Array Append / Overwrite / Pop state
  const initialFoods = ["カレー", "ラーメン", "寿司"];
  const [foods, setFoods] = useState<string[]>(initialFoods);
  const [poppedFood, setPoppedFood] = useState<string | null>(null);
  const [foodIdx, setFoodIdx] = useState<number>(-1);
  const [foodLog, setFoodLog] = useState<string[]>([]);

  // times vs each state
  const [timesCounter, setTimesCounter] = useState<number>(0);
  const [iterItem, setIterItem] = useState<string>("");

  // Range state
  const [rangeNum, setRangeNum] = useState<number>(-1);

  const stepTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeLesson = LESSONS.find(l => l.id === lessonId)!;

  // 簡易 Ruby シンタックスハイライター関数
  const highlightRuby = (codeText: string) => {
    if (codeText.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{codeText}</span>;
    }

    const keywords = ['do', 'end', 'if', 'else', 'times', 'each', 'print', 'puts'];
    // トークン分割用正規表現
    const regex = /("[^"]*"|\d+|do|end|if|else|times|each|print|puts|\|[a-zA-Z_]+\||<<|\+|=)/g;
    const parts = codeText.split(regex);

    return parts.map((part, i) => {
      if (part.startsWith('"') && part.endsWith('"')) {
        return <span key={i} className="text-emerald-400 font-semibold">{part}</span>;
      }
      if (/^\d+$/.test(part)) {
        return <span key={i} className="text-amber-400 font-semibold">{part}</span>;
      }
      if (keywords.includes(part)) {
        return <span key={i} className="text-purple-400 font-bold">{part}</span>;
      }
      if (part.startsWith('|') && part.endsWith('|')) {
        return <span key={i} className="text-orange-400 font-bold">{part}</span>;
      }
      if (['<<', '+', '='].includes(part)) {
        return <span key={i} className="text-pink-400 font-bold">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentLine(0);
    setDan(-1);
    setNVal(-1);
    setGridOutput(Array.from({ length: 9 }, () => []));
    setTotal(0);
    setAverage(0);
    setSumIdx(-1);
    setSumLog([]);
    setFoods(initialFoods);
    setPoppedFood(null);
    setFoodIdx(-1);
    setFoodLog([]);
    setTimesCounter(0);
    setIterItem("");
    setRangeNum(-1);
    setStatusText("Ready to start.");
  }, [initialFoods]);

  const handleNextStep = useCallback(() => {
    if (lessonId === 'multiplication') {
      switch (currentLine) {
        case 0:
          if (dan === -1) {
            setDan(1);
            setNVal(-1);
            setCurrentLine(1);
            setStatusText(`Entered outer loop: dan = 1`);
          } else if (dan < 9) {
            const nextDan = dan + 1;
            setDan(nextDan);
            setNVal(-1);
            setCurrentLine(1);
            setStatusText(`Outer loop increments: dan = ${nextDan}`);
          } else {
            setIsPlaying(false);
            setStatusText("Multiplication table complete!");
          }
          break;
        case 1:
          if (n_val === -1) {
            setNVal(1);
            setCurrentLine(2);
            setStatusText(`Entered inner loop: n = 1 (dan = ${dan})`);
          } else if (n_val < 9) {
            const nextN = n_val + 1;
            setNVal(nextN);
            setCurrentLine(2);
            setStatusText(`Inner loop increments: n = ${nextN} (dan = ${dan})`);
          } else {
            setCurrentLine(4);
            setStatusText(`Inner loop (n) finished for row ${dan}.`);
          }
          break;
        case 2:
          setGridOutput(prev => {
            const newOutput = [...prev];
            newOutput[dan - 1] = [...newOutput[dan - 1], (dan * n_val).toString()];
            return newOutput;
          });
          setCurrentLine(3);
          setStatusText(`Calculation: ${dan} × ${n_val} = ${dan * n_val}`);
          break;
        case 3:
          setCurrentLine(1);
          setStatusText(`Checking inner loop condition.`);
          break;
        case 4:
          setCurrentLine(5);
          setStatusText("Moving to next line.");
          break;
        case 5:
          setCurrentLine(0);
          setStatusText(`Checking outer loop condition.`);
          break;
      }
    } else if (lessonId === 'summation') {
      switch (currentLine) {
        case 0:
          setCurrentLine(1);
          setStatusText("Scores array initialized.");
          break;
        case 1:
          setTotal(0);
          setCurrentLine(2);
          setStatusText("Variable 'total' initialized to 0.");
          break;
        case 2:
          if (sumIdx < scores.length - 1) {
            const nextIdx = sumIdx + 1;
            setSumIdx(nextIdx);
            setCurrentLine(3);
            setStatusText(`Iterating: current score is ${scores[nextIdx]}.`);
          } else {
            setCurrentLine(5);
            setStatusText("Iteration complete. Final output stage.");
          }
          break;
        case 3:
          const currentScore = scores[sumIdx];
          const newTotal = total + currentScore;
          setTotal(newTotal);
          setSumLog(prev => [...prev, `${total} + ${currentScore} = ${newTotal}`]);
          setCurrentLine(4);
          setStatusText(`Updated total: ${total} + ${currentScore} = ${newTotal}`);
          break;
        case 4:
          setCurrentLine(2);
          setStatusText("Checking for more scores...");
          break;
        case 5:
          setSumLog(prev => [...prev, `Final Output: 合計：${total}点`]);
          setIsPlaying(false);
          setStatusText(`Calculation finished! Result: 合計：${total}点`);
          break;
      }
    } else if (lessonId === 'array_sum') {
      switch (currentLine) {
        case 0:
          setCurrentLine(2);
          setStatusText("Scores array initialized.");
          break;
        case 2:
          setTotal(235);
          setCurrentLine(4);
          setStatusText("Used .sum to instantly sum up all array values (80 + 55 + 100 = 235).");
          break;
        case 4:
          setSumLog(prev => [...prev, `Final Output: 合計：235点`]);
          setIsPlaying(false);
          setStatusText("Calculation finished using .sum!");
          break;
      }
    } else if (lessonId === 'array_average') {
      switch (currentLine) {
        case 0:
          setCurrentLine(1);
          setStatusText("Scores array initialized.");
          break;
        case 1:
          setTotal(235);
          setCurrentLine(2);
          setStatusText("Variable 'total' calculated using scores.sum.");
          break;
        case 2:
          setAverage(78);
          setCurrentLine(4);
          setStatusText("Average calculated: total / scores.length (235 / 3 = 78).");
          break;
        case 4:
          setSumLog(prev => [...prev, `Final Output: 平均：78点`]);
          setIsPlaying(false);
          setStatusText("Calculation finished! Average: 78点");
          break;
      }
    } else if (lessonId === 'array_append') {
      switch (currentLine) {
        case 0:
          setFoods(initialFoods);
          setCurrentLine(2);
          setStatusText("Foods array initialized with 3 items.");
          break;
        case 2:
          setFoods(prev => [...prev, "うどん"]);
          setCurrentLine(4);
          setStatusText("Appended 'うどん' to the end of the array using << operator.");
          break;
        case 4:
          if (foodIdx < foods.length - 1) {
            const nextIdx = foodIdx + 1;
            setFoodIdx(nextIdx);
            setCurrentLine(5);
            setStatusText(`Iterating: current food is '${foods[nextIdx]}'.`);
          } else {
            setIsPlaying(false);
            setStatusText("Finished iterating through the array.");
          }
          break;
        case 5:
          const currentFood = foods[foodIdx];
          setFoodLog(prev => [...prev, currentFood]);
          setCurrentLine(6);
          setStatusText(`Printing current food to console: '${currentFood}'`);
          break;
        case 6:
          setCurrentLine(4);
          setStatusText("Checking for next element...");
          break;
        default:
          setCurrentLine(prev => (prev + 1) % activeLesson.code.length);
          break;
      }
    } else if (lessonId === 'array_overwrite') {
      switch (currentLine) {
        case 0:
          setFoods(initialFoods);
          setCurrentLine(2);
          setStatusText("Initializing array with 3 items.");
          break;
        case 2:
          setFoods(prev => {
            const next = [...prev];
            next[1] = "うどん";
            return next;
          });
          setFoodIdx(1);
          setCurrentLine(4);
          setStatusText("Overwrote element at index 1 with 'うどん'.");
          break;
        case 4:
          setFoodIdx(0);
          setFoodLog(prev => [...prev, foods[0]]);
          setCurrentLine(5);
          setStatusText(`Printing foods[0]: ${foods[0]}`);
          break;
        case 5:
          setFoodIdx(1);
          setFoodLog(prev => [...prev, foods[1]]);
          setCurrentLine(6);
          setStatusText(`Printing foods[1]: ${foods[1]}`);
          break;
        case 6:
          setFoodIdx(2);
          setFoodLog(prev => [...prev, foods[2]]);
          setIsPlaying(false);
          setStatusText(`Printing foods[2]: ${foods[2]}. Program finished.`);
          break;
      }
    } else if (lessonId === 'array_index_access') {
      switch (currentLine) {
        case 0:
          setFoods(initialFoods);
          setFoodIdx(-1);
          setCurrentLine(2);
          setStatusText("Array initialized.");
          break;
        case 2:
          setFoodIdx(0);
          setFoodLog(prev => [...prev, foods[0]]);
          setCurrentLine(3);
          setStatusText(`Index 0 contains '${foods[0]}'`);
          break;
        case 3:
          setFoodIdx(1);
          setFoodLog(prev => [...prev, foods[1]]);
          setCurrentLine(4);
          setStatusText(`Index 1 contains '${foods[1]}'`);
          break;
        case 4:
          setFoodIdx(2);
          setFoodLog(prev => [...prev, foods[2]]);
          setIsPlaying(false);
          setStatusText(`Index 2 contains '${foods[2]}'`);
          break;
      }
    } else if (lessonId === 'array_length') {
      switch (currentLine) {
        case 0:
          setFoods(initialFoods);
          setCurrentLine(2);
          setStatusText("Array initialized with 3 items.");
          break;
        case 2:
          setTotal(foods.length);
          setCurrentLine(4);
          setStatusText("Calculated length using foods.length.");
          break;
        case 4:
          setFoodLog(prev => [...prev, `Length: ${total}`]);
          setIsPlaying(false);
          setStatusText(`Final output: Array has ${total} elements.`);
          break;
      }
    } else if (lessonId === 'array_pop') {
      switch (currentLine) {
        case 0:
          setFoods(initialFoods);
          setPoppedFood(null);
          setCurrentLine(2);
          setStatusText("Array initialized with 3 items.");
          break;
        case 2:
          const item = foods[foods.length - 1];
          setPoppedFood(item);
          setFoods(prev => prev.slice(0, -1));
          setFoodLog(prev => [...prev, `Popped: ${item}`]);
          setCurrentLine(4);
          setStatusText(`Removed '${item}' from the end.`);
          break;
        case 4:
          setCurrentLine(5);
          setStatusText("Checking the new size...");
          break;
        case 5:
          setFoodLog(prev => [...prev, `New size: ${foods.length}`]);
          setIsPlaying(false);
          setStatusText(`After pop, array has ${foods.length} elements.`);
          break;
      }
    } else if (lessonId === 'times_vs_each') {
      const conveyorItems = ["カレー", "ラーメン"];
      switch (currentLine) {
        case 0:
          setTimesCounter(0);
          setFoodLog([]);
          setCurrentLine(1);
          setStatusText("Preparing the 3.times loop...");
          break;
        case 1:
          if (timesCounter < 3) {
            setCurrentLine(2);
            setStatusText(`Iteration ${timesCounter + 1} of 3.`);
          } else {
            setCurrentLine(6);
            setFoodIdx(-1);
            setStatusText("3.times finished. Moving to each loop.");
          }
          break;
        case 2:
          setFoodLog(prev => [...prev, "Hello"]);
          setTimesCounter(prev => prev + 1);
          setCurrentLine(3);
          setStatusText("Stamp! 'Hello' printed to console.");
          break;
        case 3:
          setCurrentLine(1);
          break;
        case 6:
          if (foodIdx < conveyorItems.length - 1) {
            const nextIdx = foodIdx + 1;
            setFoodIdx(nextIdx);
            setIterItem(conveyorItems[nextIdx]);
            setCurrentLine(7);
            setStatusText(`Conveyor delivery: item '${conveyorItems[nextIdx]}' moved to |x|`);
          } else {
            setIsPlaying(false);
            setStatusText("Conveyor empty. each loop finished.");
          }
          break;
        case 7:
          setFoodLog(prev => [...prev, iterItem]);
          setCurrentLine(8);
          setStatusText(`Printing the value of x: '${iterItem}'`);
          break;
        case 8:
          setCurrentLine(6);
          break;
        default:
          setCurrentLine(prev => (prev + 1) % 9);
          break;
      }
    } else if (lessonId === 'range_each') {
      switch (currentLine) {
        case 0:
          setRangeNum(1);
          setFoodLog([]);
          setCurrentLine(1);
          setStatusText("Loop started. Current number is 1.");
          break;
        case 1:
          setFoodLog(prev => [...prev, rangeNum.toString()]);
          setCurrentLine(2);
          setStatusText(`Printing current number to console: ${rangeNum}`);
          break;
        case 2:
          if (rangeNum < 5) {
            setRangeNum(prev => prev + 1);
            setCurrentLine(0);
            setStatusText("Checking next number in range...");
          } else {
            setIsPlaying(false);
            setStatusText("Finished iterating through range (1..5).");
          }
          break;
      }
    } else if (lessonId === 'array_each_if') {
      const currentScores = [80, 55, 100];
      switch (currentLine) {
        case 0:
          setSumIdx(-1);
          setFoodLog([]);
          setCurrentLine(2);
          setStatusText("Array of scores initialized.");
          break;
        case 2:
          if (sumIdx < currentScores.length - 1) {
            const nextIdx = sumIdx + 1;
            setSumIdx(nextIdx);
            setCurrentLine(3);
            setStatusText(`Iterating: current score is ${currentScores[nextIdx]}`);
          } else {
            setIsPlaying(false);
            setStatusText("All scores processed.");
          }
          break;
        case 3:
          setCurrentLine(currentScores[sumIdx] >= 60 ? 4 : 6);
          setStatusText(`Checking condition: ${currentScores[sumIdx]} >= 60?`);
          break;
        case 4:
          setFoodLog(prev => [...prev, `${currentScores[sumIdx]}点：合格`]);
          setCurrentLine(8);
          setStatusText("Condition TRUE: Pass!");
          break;
        case 6:
          setFoodLog(prev => [...prev, `${currentScores[sumIdx]}点：不合格`]);
          setCurrentLine(8);
          setStatusText("Condition FALSE: Fail.");
          break;
        case 8:
          setCurrentLine(2);
          break;
      }
    }
  }, [lessonId, currentLine, dan, n_val, total, average, sumIdx, scores, foods, foodIdx, activeLesson, initialFoods, timesCounter, iterItem, rangeNum]);

  useEffect(() => {
    if (isPlaying) {
      stepTimeoutRef.current = setTimeout(() => {
        handleNextStep();
      }, speed);
    } else {
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    }
    return () => {
      if (stepTimeoutRef.current) clearTimeout(stepTimeoutRef.current);
    };
  }, [isPlaying, currentLine, handleNextStep, speed]);

  const switchLesson = (id: LessonId) => {
    setLessonId(id);
    reset();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-slate-900 font-sans">
      <header className="header shrink-0 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Code2 size={20} />
          </div>
          <div className="header-title text-xl font-black tracking-tight">Ruby Visualizer</div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <aside className="sidebar shrink-0 scrollbar-thin">
          <div className="mb-6">
            <div className="status-label text-[10px] uppercase font-black tracking-widest text-slate-400 mb-3">Lesson Library</div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-bottom border-slate-200">
                    <th className="px-3 py-2 font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">Topic</th>
                    <th className="px-3 py-2 font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {LESSONS.map(l => (
                    <tr 
                      key={l.id} 
                      onClick={() => switchLesson(l.id)}
                      className={`cursor-pointer transition-colors hover:bg-blue-50/50 ${lessonId === l.id ? 'bg-blue-50/80' : ''}`}
                    >
                      <td className="px-3 py-2.5 font-bold text-slate-700">{l.title}</td>
                      <td className="px-3 py-2.5 text-right">
                        <div className={`inline-block w-2.5 h-2.5 rounded-full ${lessonId === l.id ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]' : 'bg-slate-200'}`}></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="code-box overflow-hidden flex flex-col shrink-0">
            <div className="mb-3 px-6 text-[10px] text-slate-500 font-mono flex items-center justify-between uppercase tracking-[0.2em] font-bold">
              <span>main.rb</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded-full text-[9px]">Line {currentLine + 1}</span>
            </div>
            <div className="relative py-1">
              {activeLesson.code.map((line, idx) => (
                <div key={idx} className={`code-line ${currentLine === idx ? 'code-line-active' : ''}`}>
                  {highlightRuby(line)}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="status-label text-[9px] uppercase font-black tracking-widest text-slate-400">Environment Variables</div>
            <div className="grid grid-cols-2 gap-2">
              {lessonId === 'multiplication' ? (
                <>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="status-label text-[9px] mb-0.5 text-slate-400">dan (段)</div>
                    <div className="status-value text-lg text-blue-600 font-mono font-black">{dan === -1 ? "-" : dan}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="status-label text-[9px] mb-0.5 text-slate-400">n (掛ける数)</div>
                    <div className="status-value text-lg text-orange-600 font-mono font-black">{n_val === -1 ? "-" : n_val}</div>
                  </div>
                </>
              ) : (lessonId === 'summation' || lessonId === 'array_sum' || lessonId === 'array_average') ? (
                <>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="status-label text-[9px] mb-0.5 text-slate-400">score</div>
                    <div className="status-value text-lg text-orange-600 font-mono font-black">{sumIdx === -1 ? "-" : scores[sumIdx]}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="status-label text-[9px] mb-0.5 text-slate-400">total (合計)</div>
                    <div className="status-value text-lg text-green-600 font-mono font-black">
                      {(lessonId === 'array_sum' || lessonId === 'array_average') && total === 0 ? "?" : total}
                    </div>
                  </div>
                </>
              ) : lessonId === 'range_each' ? (
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm col-span-2">
                  <div className="status-label text-[9px] mb-0.5 text-slate-400">number</div>
                  <div className="status-value text-lg text-teal-600 font-mono font-black">
                    {rangeNum === -1 ? "-" : rangeNum}
                  </div>
                </div>
              ) : lessonId === 'array_append' ? (
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm col-span-2">
                  <div className="status-label text-[9px] mb-0.5 text-slate-400">food</div>
                  <div className="status-value text-lg text-amber-600 font-mono font-black">
                    {foodIdx === -1 ? "-" : `"${foods[foodIdx]}"`}
                  </div>
                </div>
              ) : lessonId === 'array_length' || lessonId === 'array_pop' ? (
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm col-span-2">
                  <div className="status-label text-[9px] mb-0.5">{lessonId === 'array_length' ? 'length' : 'new size'}</div>
                  <div className="status-value text-lg text-rose-600 font-mono font-black">
                    {lessonId === 'array_length' ? (total === 0 && currentLine < 4 ? "-" : total) : foods.length}
                  </div>
                </div>
              ) : lessonId === 'times_vs_each' ? (
                <>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="status-label text-[9px] mb-0.5 text-slate-400">counter</div>
                    <div className="status-value text-lg text-blue-600 font-mono font-black">{timesCounter}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="status-label text-[9px] mb-0.5 text-slate-400">x</div>
                    <div className="status-value text-lg text-orange-600 font-mono font-black">{foodIdx === -1 ? "-" : `"${iterItem}"`}</div>
                  </div>
                </>
              ) : (
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm col-span-2">
                  <div className="status-label text-[9px] mb-0.5 text-slate-400">index</div>
                  <div className="status-value text-lg text-indigo-600 font-mono font-black">
                    {foodIdx === -1 ? "-" : foodIdx}
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <div className="status-label text-[9px] mb-0.5 font-bold uppercase tracking-widest text-slate-400 font-sans">Step Explanation</div>
              <div className="text-xs text-slate-600 leading-tight font-bold font-sans">
                {statusText}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl shadow-xl space-y-4 mt-auto">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 flex justify-center p-3 rounded-xl transition-all ${isPlaying ? 'bg-amber-500 text-white shadow-lg shadow-amber-900/20' : 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'}`}
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>
              <button 
                onClick={handleNextStep}
                disabled={isPlaying}
                className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 disabled:opacity-30 transition-colors"
                title="Step Forward"
              >
                <ChevronRight size={20} />
              </button>
              <button 
                onClick={reset}
                className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                title="Restart"
              >
                <RotateCcw size={20} />
              </button>
            </div>
            
            <div className="px-1">
              <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase mb-2">
                <span>Speed Control</span>
                <span className="text-blue-400">{speed}ms</span>
              </div>
              <input 
                type="range" min="50" max="1000" step="50"
                value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </aside>

        <section className="viz-area gap-6">
          <div className="shrink-0 text-center max-w-2xl mx-auto py-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">{activeLesson.title}</h2>
            <p className="text-slate-500 text-xs font-medium">{activeLesson.description}</p>
          </div>

          <div className="bg-[#f0f2f5] p-6 rounded-[32px] shadow-inner-lg min-w-[450px] flex flex-col items-center scale-95 origin-top mb-8">
            {lessonId === 'multiplication' ? (
              <div className="grid grid-cols-9 gap-1.5">
                {Array.from({ length: 9 }).map((_, rIdx) => {
                  const r = rIdx + 1;
                  return Array.from({ length: 9 }).map((_, cIdx) => {
                    const c = cIdx + 1;
                    const isActive = dan === r && n_val === c && currentLine === 2;
                    const isFilled = gridOutput[rIdx] && gridOutput[rIdx][cIdx] !== undefined;
                    
                    return (
                      <motion.div 
                        key={`cell-${r}-${c}`}
                        initial={false}
                        className={`grid-cell ${isActive ? 'grid-cell-active' : ''} ${isFilled ? 'grid-cell-completed' : ''}`}
                      >
                        {isFilled ? gridOutput[rIdx][cIdx] : ""}
                      </motion.div>
                    );
                  });
                })}
              </div>
            ) : lessonId === 'summation' ? (
              <div className="w-full space-y-6 max-w-sm">
                <div className="bg-white/50 p-5 rounded-[32px] border-4 border-slate-200 shadow-inner group transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-slate-400 font-mono italic">scores =</span>
                    <span className="text-4xl font-black text-slate-300 select-none">[</span>
                    <div className="flex-1 flex items-center justify-between gap-3">
                      {scores.map((val, idx) => (
                        <motion.div 
                          key={idx}
                          className={`flex-1 h-16 rounded-2xl border-4 flex items-center justify-center font-black text-xl select-none transition-all ${sumIdx === idx ? 'bg-orange-500 text-white border-orange-600 scale-110 shadow-xl z-20' : idx < sumIdx ? 'bg-blue-100 text-blue-400 border-blue-200 opacity-60' : 'bg-white text-slate-300 border-slate-200'}`}
                          animate={sumIdx === idx ? { y: -10 } : { y: 0 }}
                        >
                          {val}
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-4xl font-black text-slate-300 select-none">]</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-[24px] p-5 border-2 border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span>Calculation Log</span>
                    <List size={14} />
                  </div>
                  <div className="space-y-1.5 h-32 overflow-y-auto scrollbar-none">
                    {sumLog.length === 0 && <div className="text-slate-300 text-xs font-bold italic text-center py-6">Starting summation engine...</div>}
                    {sumLog.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-mono text-xs flex items-center gap-2 text-slate-700 font-bold"
                      >
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400 shrink-0">{i + 1}</div>
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-green-600 text-white p-5 rounded-[28px] shadow-xl shadow-green-900/40">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Hash size={20} />
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80 mb-0.5">Cumulative Total</div>
                    <div className="text-2xl font-black">{currentLine <= 1 && total === 0 ? "? " : total}</div>
                  </div>
                </div>
              </div>
            ) : lessonId === 'array_sum' ? (
              <div className="w-full space-y-6 max-w-sm">
                <div className="bg-white/50 p-5 rounded-[32px] border-4 border-slate-200 shadow-inner group transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-slate-400 font-mono italic">scores =</span>
                    <span className="text-4xl font-black text-slate-300 select-none">[</span>
                    <div className="flex-1 flex items-center justify-between gap-3">
                      {scores.map((val, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex-1 h-16 rounded-2xl border-4 flex items-center justify-center font-black text-xl bg-white text-slate-700 border-slate-200"
                          animate={currentLine >= 2 ? { 
                            scale: 0.8, 
                            opacity: 0,
                            y: 30,
                            transition: { duration: 0.4, delay: idx * 0.1 }
                          } : { scale: 1, opacity: 1, y: 0 }}
                        >
                          {val}
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-4xl font-black text-slate-300 select-none">]</span>
                  </div>
                </div>

                <AnimatePresence>
                  {currentLine >= 2 && (
                    <motion.div 
                      initial={{ scale: 0.5, y: -20, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      transition={{ type: "spring", damping: 10 }}
                      className="flex items-center gap-4 bg-green-600 text-white p-5 rounded-[28px] shadow-xl"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                        <Hash size={20} />
                      </div>
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80 mb-0.5">scores.sum (合計を一発計算)</div>
                        <div className="text-2xl font-black">{total === 0 ? "? " : total}点</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-white rounded-[24px] p-5 border-2 border-slate-200 shadow-sm min-h-[100px]">
                  <div className="flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                    <span>Console Log</span>
                    <List size={14} />
                  </div>
                  {sumLog.map((log, i) => (
                    <div key={i} className="font-mono text-xs text-slate-700 font-bold">{log}</div>
                  ))}
                </div>
              </div>
            ) : lessonId === 'array_average' ? (
              <div className="w-full space-y-6 max-w-sm">
                <div className="bg-white/50 p-5 rounded-[32px] border-4 border-slate-200 shadow-inner group transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-slate-400 font-mono italic">scores =</span>
                    <span className="text-4xl font-black text-slate-300 select-none">[</span>
                    <div className="flex-1 flex items-center justify-between gap-3">
                      {scores.map((val, idx) => (
                        <div 
                          key={idx}
                          className="flex-1 h-16 rounded-2xl border-4 flex items-center justify-center font-black text-xl bg-white text-slate-700 border-slate-200"
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                    <span className="text-4xl font-black text-slate-300 select-none">]</span>
                  </div>
                </div>

                <div className="bg-white rounded-[24px] p-5 border-2 border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>1. scores.sum (合計)</span>
                    <span className="font-black text-green-600 text-lg">{total > 0 ? `${total}点` : '? 点'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-t border-slate-100 pt-2">
                    <span>2. scores.length (個数)</span>
                    <span className="font-black text-blue-600 text-lg">{currentLine >= 2 ? '3個' : '-'}</span>
                  </div>
                </div>

                <AnimatePresence>
                  {currentLine >= 2 && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-4 bg-teal-600 text-white p-5 rounded-[28px] shadow-xl"
                    >
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80 mb-0.5">Average: total / scores.length</div>
                        <div className="text-2xl font-black">{average}点 (235 / 3)</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-slate-900 rounded-[24px] p-5 shadow-3xl text-emerald-400 font-mono text-xs min-h-[80px]">
                  {sumLog.map((log, i) => (
                    <div key={i} className="font-bold">{log}</div>
                  ))}
                </div>
              </div>
            ) : lessonId === 'range_each' ? (
              <div className="w-full space-y-8 max-w-md">
                <div className="bg-white rounded-[24px] p-5 border-2 border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-0 bg-teal-500/10 transition-all" style={{ width: `${(rangeNum > 0 ? rangeNum : 0) * 20}%` }} />
                  {[1, 2, 3, 4, 5].map((num) => (
                    <motion.div
                      key={num}
                      animate={{
                        scale: rangeNum === num ? 1.2 : 1,
                        backgroundColor: rangeNum === num ? '#0f766e' : rangeNum > num ? '#ccfbf1' : '#ffffff',
                        color: rangeNum === num ? '#ffffff' : rangeNum > num ? '#0f766e' : '#94a3b8',
                        borderColor: rangeNum === num ? '#0d9488' : '#e2e8f0',
                      }}
                      className="w-12 h-12 rounded-xl border-2 flex items-center justify-center font-black z-10 transition-all"
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>

                <div className="bg-slate-900 rounded-[32px] p-5 shadow-3xl border-4 border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <span>Ruby Console Output</span>
                  </div>
                  <div className="space-y-1.5 h-36 overflow-y-auto font-mono text-xs">
                    {foodLog.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-emerald-400 flex items-center gap-2 font-black"
                      >
                        <span className="text-slate-700 select-none text-[10px]">&gt;</span>
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : lessonId === 'array_each_if' ? (
              <div className="w-full space-y-10 max-w-lg">
                <div className="flex justify-center gap-4">
                  {[80, 55, 100].map((s, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: sumIdx > i ? 0.3 : 1,
                        scale: sumIdx === i ? 1.1 : 1,
                        y: sumIdx === i ? 20 : 0
                      }}
                      className={`w-20 h-24 rounded-2xl border-4 flex flex-col items-center justify-center font-black shadow-lg transition-colors ${sumIdx === i ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white border-slate-200 text-slate-700'}`}
                    >
                      <div className="text-[10px] uppercase opacity-60 mb-1">Score</div>
                      <div className="text-2xl">{s}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="relative flex flex-col items-center py-8">
                  <div className="absolute top-0 bottom-0 w-1 bg-slate-100 left-1/2 -translate-x-1/2 -z-10" />
                  
                  <motion.div 
                    animate={{
                      scale: currentLine === 3 ? 1.05 : 1,
                      borderColor: currentLine === 4 ? '#22c55e' : currentLine === 6 ? '#ef4444' : '#e2e8f0',
                      backgroundColor: currentLine === 4 ? '#f0fdf4' : currentLine === 6 ? '#fef2f2' : '#ffffff'
                    }}
                    className="w-48 h-20 rounded-[24px] border-4 flex items-center justify-center relative shadow-xl z-20"
                  >
                    <div className="text-xl font-black text-slate-800 tracking-tighter">score &gt;= 60</div>
                    
                    <AnimatePresence>
                      {currentLine === 4 && (
                        <motion.div 
                          key="pass"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute -top-8 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest"
                        >
                          Pass
                        </motion.div>
                      )}
                      {currentLine === 6 && (
                        <motion.div 
                          key="fail"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute -top-8 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest"
                        >
                          Fail
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="mt-12 flex justify-between w-full relative h-32">
                     <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-[32px] bg-slate-50 border-4 border-dashed border-slate-200 flex items-center justify-center">
                           <div className="text-slate-300 font-black text-[10px] uppercase tracking-widest text-center">Fail<br/>Path</div>
                        </div>
                        {currentLine >= 6 && currentLine <= 8 && sumIdx === 1 && (
                          <motion.div 
                            initial={{ x: 100, y: -80, scale: 0.5 }}
                            animate={{ x: 0, y: 0, scale: 1 }}
                            className="absolute bg-red-500 text-white w-20 h-24 rounded-2xl border-4 border-red-600 flex flex-col items-center justify-center font-black shadow-xl"
                          >
                             <div className="text-[10px] uppercase opacity-60">55</div>
                             <div className="text-xl">FAIL</div>
                          </motion.div>
                        )}
                     </div>

                     <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-[32px] bg-slate-50 border-4 border-dashed border-slate-200 flex items-center justify-center">
                           <div className="text-slate-300 font-black text-[10px] uppercase tracking-widest text-center">Pass<br/>Path</div>
                        </div>
                        {currentLine >= 4 && currentLine <= 8 && (sumIdx === 0 || sumIdx === 2) && (
                           <motion.div 
                             key={sumIdx}
                             initial={{ x: -100, y: -80, scale: 0.5 }}
                             animate={{ x: 0, y: 0, scale: 1 }}
                             className="absolute bg-green-500 text-white w-20 h-24 rounded-2xl border-4 border-green-600 flex flex-col items-center justify-center font-black shadow-xl"
                           >
                              <div className="text-[10px] uppercase opacity-60">{[80, 55, 100][sumIdx]}</div>
                              <div className="text-xl">PASS</div>
                           </motion.div>
                        )}
                     </div>
                  </div>
                </div>
              </div>
            ) : lessonId === 'times_vs_each' ? (
              <div className="w-full space-y-12 max-w-lg">
                <div className={`p-6 rounded-[32px] border-4 transition-all ${currentLine <= 4 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100 opacity-40'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 font-sans">3.times do</span>
                    <div className="flex gap-2">
                       {Array.from({ length: 3 }).map((_, i) => (
                         <div key={i} className={`w-3 h-3 rounded-full ${i < timesCounter ? 'bg-amber-500' : 'bg-amber-200'}`} />
                       ))}
                    </div>
                  </div>
                  
                  <div className="relative h-24 flex items-center justify-center bg-white rounded-2xl border-2 border-amber-100 overflow-hidden">
                    <motion.div 
                      key={timesCounter}
                      initial={{ y: -50, opacity: 0, scale: 1.5 }}
                      animate={currentLine === 2 ? { y: 0, opacity: 1, scale: 1 } : { y: 0, opacity: currentLine > 2 ? 1 : 0, scale: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                      className="bg-amber-500 text-white px-8 py-2 rounded-lg font-black text-xl shadow-lg ring-4 ring-amber-100 font-sans"
                    >
                      HELLO
                    </motion.div>
                    
                    {currentLine === 2 && (
                       <motion.div 
                         initial={{ y: -100 }}
                         animate={{ y: -20 }}
                         transition={{ duration: 0.2 }}
                         className="absolute top-0 w-20 h-10 bg-slate-300 rounded-b-xl border-x-4 border-b-4 border-slate-400 flex items-center justify-center"
                       >
                         <div className="w-8 h-8 rounded-full bg-slate-400" />
                       </motion.div>
                    )}
                  </div>
                </div>

                <div className={`p-6 rounded-[32px] border-4 transition-all ${currentLine >= 5 ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-100 opacity-40'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 font-sans">["キー", "値"].each do |x|</span>
                  </div>

                  <div className="relative h-32 flex flex-col items-center justify-center space-y-4">
                    <div className="w-full h-1 bg-slate-200 rounded-full relative">
                       {["カレー", "ラーメン"].map((item, i) => (
                         <motion.div 
                           key={i}
                           animate={{
                             x: foodIdx === i ? 200 : i * 100 + 20,
                             opacity: foodIdx > i ? 0 : 1,
                             scale: foodIdx === i ? 1.2 : 1
                           }}
                           className={`absolute -top-6 px-4 py-2 rounded-xl border-4 bg-white flex items-center justify-center font-black transition-all font-sans ${foodIdx === i ? 'border-indigo-600 text-indigo-600 shadow-xl' : 'border-slate-200 text-slate-300'}`}
                         >
                           {item}
                         </motion.div>
                       ))}
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                       <div className="text-xl font-black text-slate-400">|</div>
                       <motion.div 
                         animate={{
                           backgroundColor: currentLine === 7 ? '#4f46e5' : '#f8fafc',
                           color: currentLine === 7 ? '#ffffff' : '#94a3b8',
                           borderColor: currentLine === 7 ? '#4338ca' : '#e2e8f0',
                           scale: currentLine === 7 ? 1.1 : 1
                         }}
                         className="px-6 py-3 rounded-2xl border-4 flex items-center justify-center font-black text-lg shadow-inner transition-colors font-sans"
                       >
                         {foodIdx === -1 ? "?" : iterItem}
                       </motion.div>
                       <div className="text-xl font-black text-slate-400 font-sans">|</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-8 max-w-sm">
                <div className="flex flex-wrap items-center justify-center gap-4 min-h-[80px]">
                  <AnimatePresence>
                    {foods.map((val, idx) => (
                      <motion.div 
                        key={val}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ 
                          x: 100, 
                          opacity: 0, 
                          scale: 0.7,
                          transition: { duration: 0.3 }
                        }}
                        className={`relative px-6 py-3 rounded-2xl border-4 flex items-center justify-center font-black text-sm select-none transition-all font-sans ${foodIdx === idx ? 'bg-amber-500 text-white border-amber-600 shadow-2xl scale-110' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
                      >
                        {val}
                        {lessonId === 'array_index_access' && (
                          <div className="absolute -top-3 -left-3 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm">
                            {idx}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <AnimatePresence>
                    {poppedFood && lessonId === 'array_pop' && currentLine === 2 && (
                      <motion.div
                        initial={{ scale: 1, opacity: 1, x: 0 }}
                        animate={{ x: 50, opacity: 0, scale: 0.8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="px-6 py-3 rounded-2xl border-4 bg-rose-500 text-white border-rose-600 font-black text-sm font-sans"
                      >
                        {poppedFood} (Popped!)
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {lessonId === 'array_append' && currentLine === 2 && (
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-blue-600 font-black text-xl animate-pulse ml-2 font-sans"
                    >
                      &lt;&lt; "うどん"
                    </motion.div>
                  )}
                </div>

                <div className="bg-slate-900 rounded-[32px] p-5 shadow-3xl border-4 border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] font-sans">
                    <span>Ruby Console Output</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="space-y-1.5 h-40 overflow-y-auto font-mono text-xs scrollbar-none">
                    {foodLog.length === 0 && <div className="text-slate-700 text-[10px] font-black tracking-tight animate-pulse">$ ruby application.rb</div>}
                    {foodLog.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-emerald-400 flex items-center gap-2 font-black"
                      >
                        <span className="text-slate-700 select-none text-[10px]">&gt;</span>
                        {log}
                      </motion.div>
                    ))}
                    {foodIdx !== -1 && (
                      <div className="w-1.5 h-3 bg-emerald-400/50 animate-pulse inline-block ml-1 rounded-sm"></div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-2xl bg-blue-50 border-2 border-blue-100 rounded-[24px] p-5 shadow-sm font-sans">
            <div className="flex gap-4 font-sans">
                  <div className="bg-blue-600/10 p-3 rounded-xl shrink-0 h-fit">
                    <Info className="text-blue-600" size={24} />
                  </div>
                  <div className="space-y-1 font-sans">
                    <p className="text-sm font-black text-blue-900 tracking-tight">Concept Overview</p>
                    <p className="text-sm text-blue-800/80 leading-relaxed font-semibold">
                      {lessonId === 'multiplication' ? 
                        "Notice how the inner loop (n) cycles from 1 to 9 completely for every single increment of the outer loop (dan). This is how we traverse 2D spaces like grids!" : 
                       lessonId === 'summation' ?
                        "The each loop simplifies iteration. For every element 'score' in the scores array, we apply a logic transform—in this case, adding it to a shared accumulator variable called 'total'." :
                       lessonId === 'array_sum' ?
                        "The .sum method provides an elegant way to sum up all elements in an array at once, removing the need for manual accumulator variables and loops." :
                       lessonId === 'array_average' ?
                        "By combining .sum and .length, we can easily calculate statistical metrics like the average. Remember that integer division in Ruby discards decimal values!" :
                       lessonId === 'array_append' ?
                        "Appending to an array is a common operation. The << operator provides a convenient shorthand for pushing elements onto the end of an existing collection." :
                       lessonId === 'array_overwrite' ?
                        "Arrays allow direct access and modification via index. Remember that Ruby arrays are 0-indexed, so foods[1] targets the second element." :
                       lessonId === 'array_index_access' ?
                        "Ruby arrays start counting at 0. This means the first element is foods[0], and the second is foods[1]. Off-by-one errors are common if you forget this!" :
                       lessonId === 'array_length' ?
                        "Both .length and .size return the number of elements in an array. They are interchangeable and very useful for controlling loop conditions." :
                       lessonId === 'array_pop' ?
                        "The .pop method removes the last element of an array and returns it. This 'shrinks' the array size by one and is useful for stack-like operations." :
                       lessonId === 'times_vs_each' ?
                        "The .times loop repeats logic a specific number of times, perfect for fixed counts. The .each loop iterates through an actual collection of items, providing each item as a variable." :
                       lessonId === 'range_each' ?
                        "Ranges (like 1..5) represent continuous intervals. Using each with a range iterates through each consecutive value in order." :
                        "Combining .each with an if-else condition allows you to apply different logic to elements based on their characteristics, such as filtering or categorization."
                      }
                    </p>
                  </div>
                </div>
              </div>
        </section>
      </main>
    </div>
  );
}
