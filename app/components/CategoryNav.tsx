"use client";

import { motion } from "framer-motion";
import { Category } from "../types";
import { categories } from "../data/questions";
import { cn } from "../lib/utils";

interface CategoryNavProps {
    active: Category | "all" | "bookmarked";
    onChange: (cat: Category | "all" | "bookmarked") => void;
    counts: Record<string, number>;
}

export function CategoryNav({ active, onChange, counts }: CategoryNavProps) {
    const allItems = [
        { id: "all", label: "All Topics", icon: "✦" },
        { id: "bookmarked", label: "Bookmarked", icon: "🔖" },
        ...categories,
    ];

    return (
        <nav className="flex flex-col gap-0.5">
        {allItems.map((cat) => {
            const isActive = active === cat.id;
            const count = counts[cat.id] ?? 0;

            return (
            <motion.button
                key={cat.id}
                onClick={() => onChange(cat.id as Category | "all" | "bookmarked")}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left w-full group",
                isActive
                    ? "bg-[var(--accent-dim)] text-green-400 border border-green-500/20"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                )}
            >
                <span className="flex items-center gap-2.5">
                <span className="text-base leading-none">{cat.icon}</span>
                <span className="font-medium">{cat.label}</span>
                </span>
                {count > 0 && (
                <span
                    className={cn(
                    "text-xs tabular-nums px-1.5 py-0.5 rounded-md",
                    isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700"
                    )}
                >
                    {count}
                </span>
                )}
            </motion.button>
            );
        })}
        </nav>
    );
}