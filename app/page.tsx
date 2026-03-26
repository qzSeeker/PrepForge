"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Category, Level, Question } from "./types";
import { questions, categories } from "./data/questions";
import { useProgress } from "./hooks/useProgress";
import { Code2, Zap, Menu, X } from "lucide-react";
import { StatsBar } from "./components/StatsBar";
import { CategoryNav } from "./components/CategoryNav";
import { FilterBar } from "./components/FilterBar";
import { QuestionCard } from "./components/QuestionCard";
import { cn } from "./lib/utils";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<
    Category | "all" | "bookmarked"
  >("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [sortBy, setSortBy] = useState<"frequency" | "level" | "status">(
    "frequency"
  );
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { stats, updateStatus, toggleBookmark, getStatus, isBookmarked, progress, loaded } =
    useProgress();

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: questions.length, bookmarked: 0 };
    categories.forEach((cat) => {
      counts[cat.id] = questions.filter((q) => q.category === cat.id).length;
    });
    counts.bookmarked = Object.values(progress).filter((p) => p.bookmarked).length;
    return counts;
  }, [progress]);

  // Filtered + sorted questions
  const filtered = useMemo(() => {
    let list: Question[] = [...questions];

    if (activeCategory === "bookmarked") {
      list = list.filter((q) => isBookmarked(q.id));
    } else if (activeCategory !== "all") {
      list = list.filter((q) => q.category === activeCategory);
    }

    if (level !== "all") {
      list = list.filter((q) => q.level === level);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    const levelOrder = { fresher: 0, intermediate: 1, advanced: 2 };
    const statusOrder = { unseen: 0, reviewing: 1, known: 2 };

    list.sort((a, b) => {
      if (sortBy === "frequency") return b.frequency - a.frequency;
      if (sortBy === "level")
        return levelOrder[a.level] - levelOrder[b.level];
      if (sortBy === "status")
        return (
          statusOrder[getStatus(a.id)] - statusOrder[getStatus(b.id)]
        );
      return 0;
    });

    return list;
  }, [activeCategory, level, search, sortBy, isBookmarked, getStatus]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b border-(--border) bg-(--bg-1) sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-(--accent) flex items-center justify-center">
              <Zap size={14} className="text-black" />
            </div>
            <span className="font-semibold text-sm tracking-tight">
              PrepForge
            </span>
            <span className="hidden sm:inline text-xs text-zinc-600 ml-1">
              Fullstack Interview Prep
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
              <Code2 size={13} />
              <span className="tabular-nums">
                {stats.known}/{stats.total} mastered
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sm:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside
          className={cn(
            "w-52 shrink-0 space-y-5",
            "hidden sm:block",
            sidebarOpen &&
              "fixed sm:static inset-0 z-30 bg-(--bg-0) sm:bg-transparent pt-16 sm:pt-0 px-4 sm:px-0 overflow-y-auto sm:overflow-visible block"
          )}
        >
          {/* Stats */}
          {loaded && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-zinc-600 uppercase tracking-wider px-1">
                Progress
              </p>
              <StatsBar stats={stats} />
            </div>
          )}

          {/* Nav */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-600 uppercase tracking-wider px-1">
              Topics
            </p>
            <CategoryNav
              active={activeCategory}
              onChange={(cat) => {
                setActiveCategory(cat);
                setSidebarOpen(false);
              }}
              counts={categoryCounts}
            />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-4">
          {/* Filter bar */}
          <FilterBar
            level={level}
            onLevelChange={setLevel}
            sortBy={sortBy}
            onSortChange={setSortBy}
            total={questions.length}
            showing={filtered.length}
            search={search}
            onSearch={setSearch}
          />

          {/* Question list */}
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 text-zinc-600 text-sm"
                >
                  {search
                    ? `No questions matching "${search}"`
                    : "No questions in this category"}
                </motion.div>
              ) : (
                filtered.map((q, i) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    status={getStatus(q.id)}
                    bookmarked={isBookmarked(q.id)}
                    onStatusChange={updateStatus}
                    onBookmark={toggleBookmark}
                    index={i}
                  />
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Footer hint */}
          {filtered.length > 0 && (
            <p className="text-center text-xs text-zinc-700 py-4">
              {filtered.length} question{filtered.length !== 1 ? "s" : ""} ·
              Click any card to reveal the answer
            </p>
          )}
        </main>
      </div>
    </div>
  );
}