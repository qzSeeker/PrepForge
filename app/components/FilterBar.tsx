"use client";

import { motion } from "framer-motion";
import { Level } from "../types";
import { cn } from "../lib/utils";
import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
    level: Level | "all";
    onLevelChange: (level: Level | "all") => void;
    sortBy: "frequency" | "level" | "status";
    onSortChange: (sort: "frequency" | "level" | "status") => void;
    total: number;
    showing: number;
    search: string;
    onSearch: (s: string) => void;
}

const levels: { value: Level | "all"; label: string }[] = [
    { value: "all", label: "All Levels" },
    { value: "fresher", label: "Fresher" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

export function FilterBar({
    level,
    onLevelChange,
    sortBy,
    onSortChange,
    total,
    showing,
    search,
    onSearch,
}: FilterBarProps) {
    return (
        <div className="space-y-3">
        {/* Search */}
        <div className="relative">
            <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-[var(--bg-2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
            />
            {search && (
            <button
                onClick={() => onSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 text-xs"
            >
                ✕
            </button>
            )}
        </div>

        <div className="flex items-center justify-between gap-3">
            {/* Level tabs */}
            <div className="flex gap-1">
            {levels.map(({ value, label }) => (
                <button
                key={value}
                onClick={() => onLevelChange(value)}
                className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    level === value
                    ? "bg-white/10 text-white"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                )}
                >
                {label}
                </button>
            ))}
            </div>

            {/* Sort + count */}
            <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
                <SlidersHorizontal size={13} className="text-zinc-600" />
                <select
                value={sortBy}
                onChange={(e) =>
                    onSortChange(e.target.value as "frequency" | "level" | "status")
                }
                className="bg-transparent text-xs text-zinc-500 focus:outline-none cursor-pointer hover:text-zinc-300 transition-colors"
                >
                <option value="frequency" className="bg-zinc-900">
                    By frequency
                </option>
                <option value="level" className="bg-zinc-900">
                    By level
                </option>
                <option value="status" className="bg-zinc-900">
                    By status
                </option>
                </select>
            </div>
            <span className="text-xs text-zinc-600 tabular-nums">
                {showing}/{total}
            </span>
            </div>
        </div>
        </div>
    );
}