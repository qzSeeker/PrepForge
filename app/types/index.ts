export type Level = "fresher" | "intermediate" | "advanced";
export type Category =
    | "javascript"
    | "react"
    | "typescript"
    | "nodejs"
    | "database"
    | "api"
    | "performance"
    | "system-design"
    | "git"
    | "security";

export interface Question {
    id: string;
    category: Category;
    level: Level;
    question: string;
    answer: string;
    codeExample?: string;
    tags: string[];
    frequency: number; // 1-5, how often asked
}

export interface UserProgress {
    questionId: string;
    status: "unseen" | "reviewing" | "known";
    lastSeen?: string;
    bookmarked: boolean;
}

export interface Stats {
    total: number;
    known: number;
    reviewing: number;
    unseen: number;
    bookmarked: number;
    streak: number;
}