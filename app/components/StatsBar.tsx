"use client";

import { motion } from "framer-motion";
import { Stats } from "../types";
import { Flame, BookOpen, CheckCircle2, Clock, Bookmark } from "lucide-react";

interface StatsBarProps {
    stats: Stats;
}

export function StatsBar({ stats }: StatsBarProps) {
    const progressPct = stats.total > 0
        ? Math.round((stats.known / stats.total) * 100)
        : 0;

    const items = [
        {
        icon: CheckCircle2,
        value: stats.known,
        label: "Known",
        color: "text-green-400",
        bg: "bg-green-400/10",
        },
        {
        icon: Clock,
        value: stats.reviewing,
        label: "Reviewing",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        },
        {
        icon: BookOpen,
        value: stats.unseen,
        label: "Unseen",
        color: "text-zinc-400",
        bg: "bg-zinc-400/10",
        },
        {
        icon: Bookmark,
        value: stats.bookmarked,
        label: "Saved",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        },
        {
        icon: Flame,
        value: stats.streak,
        label: "Day streak",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        },
    ];

    return (
        <div className="space-y-3">
        {/* Progress bar */}
        <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
            </div>
            <span className="text-xs text-zinc-500 tabular-nums w-10 text-right">
            {progressPct}%
            </span>
        </div>

        {/* Stat pills */}
        <div className="flex gap-2 flex-wrap">
            {items.map(({ icon: Icon, value, label, color, bg }, i) => (
            <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg} border border-white/5`}
            >
                <Icon size={12} className={color} />
                <span className={`text-xs font-medium tabular-nums ${color}`}>
                {value}
                </span>
                <span className="text-xs text-zinc-600">{label}</span>
            </motion.div>
            ))}
        </div>
        </div>
    );
}