"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProgress, Stats } from "../types";
import { questions } from "../data/questions";

const STORAGE_KEY = "interview-prep-progress";
const STREAK_KEY = "interview-prep-streak";

function getToday() {
    return new Date().toISOString().split("T")[0];
}

export function useProgress() {
    const [progress, setProgress] = useState<Record<string, UserProgress>>({});
    const [streak, setStreak] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setProgress(JSON.parse(saved));

        const streakData = localStorage.getItem(STREAK_KEY);
        if (streakData) {
            const { count, lastDate } = JSON.parse(streakData);
            const today = getToday();
            const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];
            if (lastDate === today || lastDate === yesterday) {
            setStreak(count);
            } else {
            setStreak(0);
            }
        }
        } catch {}
        setLoaded(true);
    }, []);

    const save = useCallback((updated: Record<string, UserProgress>) => {
        setProgress(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        // Update streak
        const today = getToday();
        try {
        const streakData = localStorage.getItem(STREAK_KEY);
        if (streakData) {
            const { count, lastDate } = JSON.parse(streakData);
            if (lastDate === today) return; // already counted today
            const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];
            const newCount = lastDate === yesterday ? count + 1 : 1;
            localStorage.setItem(
            STREAK_KEY,
            JSON.stringify({ count: newCount, lastDate: today })
            );
            setStreak(newCount);
        } else {
            localStorage.setItem(
            STREAK_KEY,
            JSON.stringify({ count: 1, lastDate: today })
            );
            setStreak(1);
        }
        } catch {}
    }, []);

    const updateStatus = useCallback(
        (
        questionId: string,
        status: UserProgress["status"]
        ) => {
        const updated = {
            ...progress,
            [questionId]: {
            ...progress[questionId],
            questionId,
            status,
            lastSeen: new Date().toISOString(),
            bookmarked: progress[questionId]?.bookmarked ?? false,
            },
        };
        save(updated);
        },
        [progress, save]
    );

    const toggleBookmark = useCallback(
        (questionId: string) => {
        const current = progress[questionId];
        const updated = {
            ...progress,
            [questionId]: {
            questionId,
            status: current?.status ?? "unseen",
            lastSeen: current?.lastSeen,
            bookmarked: !(current?.bookmarked ?? false),
            },
        };
        save(updated);
        },
        [progress, save]
    );

    const getStatus = useCallback(
        (questionId: string): UserProgress["status"] => {
        return progress[questionId]?.status ?? "unseen";
        },
        [progress]
    );

    const isBookmarked = useCallback(
        (questionId: string): boolean => {
        return progress[questionId]?.bookmarked ?? false;
        },
        [progress]
    );

    const stats: Stats = {
        total: questions.length,
        known: Object.values(progress).filter((p) => p.status === "known").length,
        reviewing: Object.values(progress).filter((p) => p.status === "reviewing")
        .length,
        unseen:
        questions.length -
        Object.values(progress).filter(
            (p) => p.status === "known" || p.status === "reviewing"
        ).length,
        bookmarked: Object.values(progress).filter((p) => p.bookmarked).length,
        streak,
    };

    return {
        progress,
        stats,
        updateStatus,
        toggleBookmark,
        getStatus,
        isBookmarked,
        loaded,
    };
}