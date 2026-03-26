"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "../types";
import {
    ChevronDown,
    Bookmark,
    BookmarkCheck,
    CheckCircle2,
    Clock,
    Eye,
    Flame,
    Code2,
} from "lucide-react";
import { cn } from "../lib/utils";

interface QuestionCardProps {
    question: Question;
    status: "unseen" | "reviewing" | "known";
    bookmarked: boolean;
    onStatusChange: (id: string, status: "unseen" | "reviewing" | "known") => void;
    onBookmark: (id: string) => void;
    index: number;
}

const frequencyDots = (freq: number) =>
    Array.from({ length: 5 }, (_, i) => (
        <span
        key={i}
        className={cn(
            "inline-block w-1.5 h-1.5 rounded-full",
            i < freq ? "bg-[var(--accent)]" : "bg-zinc-700"
        )}
        />
    ));

const levelColors = {
    fresher: "text-blue-400 bg-blue-400/10 border-blue-500/20",
    intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20",
    advanced: "text-red-400 bg-red-400/10 border-red-500/20",
};

const statusConfig = {
    unseen: { label: "Unseen", icon: Eye, color: "text-zinc-500" },
    reviewing: { label: "Reviewing", icon: Clock, color: "text-yellow-400" },
    known: { label: "Known", icon: CheckCircle2, color: "text-green-400" },
};

export function QuestionCard({
    question,
    status,
    bookmarked,
    onStatusChange,
    onBookmark,
    index,
}: QuestionCardProps) {
    const [open, setOpen] = useState(false);
    const [showCode, setShowCode] = useState(false);

    const StatusIcon = statusConfig[status].icon;

    return (
        <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.3 }}
        className={cn(
            "rounded-xl border transition-all duration-200",
            open
            ? "bg-[var(--bg-2)] border-white/10"
            : "bg-[var(--bg-1)] border-[var(--border)] hover:border-[var(--border-hover)]",
            status === "known" && "border-l-2 border-l-green-500/40",
            status === "reviewing" && "border-l-2 border-l-yellow-500/40"
        )}
        >
        {/* Header */}
        <div
            className="flex items-start gap-3 p-4 cursor-pointer"
            onClick={() => setOpen((o) => !o)}
        >
            {/* Status indicator */}
            <div className="mt-0.5 flex-shrink-0">
            <StatusIcon
                size={16}
                className={cn(statusConfig[status].color, "mt-0.5")}
            />
            </div>

            {/* Question text */}
            <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full border",
                    levelColors[question.level]
                )}
                >
                {question.level}
                </span>
                <span className="flex items-center gap-0.5">
                {frequencyDots(question.frequency)}
                </span>
                <span className="text-xs text-zinc-600">asked frequently</span>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                {question.question}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
                {question.tags.map((tag) => (
                <span
                    key={tag}
                    className="text-xs text-zinc-600 bg-zinc-800/60 px-1.5 py-0.5 rounded"
                >
                    #{tag}
                </span>
                ))}
            </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
            <button
                onClick={(e) => {
                e.stopPropagation();
                onBookmark(question.id);
                }}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
                {bookmarked ? (
                <BookmarkCheck size={15} className="text-blue-400" />
                ) : (
                <Bookmark size={15} className="text-zinc-600 hover:text-zinc-400" />
                )}
            </button>
            <ChevronDown
                size={16}
                className={cn(
                "text-zinc-600 transition-transform duration-200",
                open && "rotate-180"
                )}
            />
            </div>
        </div>

        {/* Answer panel */}
        <AnimatePresence>
            {open && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="px-4 pb-4 border-t border-white/5 pt-4 space-y-4">
                {/* Answer text */}
                <p className="text-sm text-zinc-300 leading-relaxed">
                    {question.answer}
                </p>

                {/* Code example */}
                {question.codeExample && (
                    <div>
                    <button
                        onClick={() => setShowCode((s) => !s)}
                        className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-2"
                    >
                        <Code2 size={13} />
                        {showCode ? "Hide code example" : "Show code example"}
                    </button>
                    <AnimatePresence>
                        {showCode && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-lg bg-[var(--bg-0)] border border-white/8 overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                            <span className="text-xs text-zinc-600 font-mono">
                                code example
                            </span>
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                            </div>
                            </div>
                            <pre className="p-4 text-xs text-zinc-300 font-mono leading-relaxed overflow-x-auto">
                            <code>{question.codeExample}</code>
                            </pre>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                )}

                {/* Status buttons */}
                <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-zinc-600 mr-1">Mark as:</span>
                    {(
                    [
                        {
                        status: "reviewing" as const,
                        label: "Still learning",
                        icon: Clock,
                        active: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
                        inactive: "text-zinc-500 hover:text-yellow-400 hover:bg-yellow-500/10",
                        },
                        {
                        status: "known" as const,
                        label: "Got it!",
                        icon: CheckCircle2,
                        active: "bg-green-500/15 text-green-400 border-green-500/30",
                        inactive: "text-zinc-500 hover:text-green-400 hover:bg-green-500/10",
                        },
                    ] as const
                    ).map(({ status: s, label, icon: Icon, active, inactive }) => (
                    <motion.button
                        key={s}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => onStatusChange(question.id, s)}
                        className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all",
                        status === s
                            ? active
                            : `border-transparent ${inactive}`
                        )}
                    >
                        <Icon size={12} />
                        {label}
                    </motion.button>
                    ))}

                    {status !== "unseen" && (
                    <button
                        onClick={() => onStatusChange(question.id, "unseen")}
                        className="ml-auto text-xs text-zinc-700 hover:text-zinc-500 transition-colors"
                    >
                        Reset
                    </button>
                    )}
                </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
        </motion.div>
    );
}