export type OPTIONS = 'A' | 'B' | 'C' | 'D';

export type VARIANT = 'TEST' | 'QUIZ';

export interface MCQ {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    answer: OPTIONS;
}

export interface CheckedQuestion {
    question: string;
    correctAnswer: {
        option: OPTIONS,
        text: string
    };
    userAnswer: {
        option: OPTIONS,
        text: string
    };
}

export interface MarkedQuestion {
    question: string;
    correctAnswer?: {
        option: OPTIONS,
        text: string
    };
    userAnswer: {
        option: OPTIONS,
        text: string
    };
}

export enum Categories {
    MixedQuestions = "ALL",
    Anime = "ANIME",
    Basketball = "BASKETBALL",
    Football = "FOOTBALL",
    History = "HISTORY",
    Politics = "POLITICS",
    Sports = "SPORTS"
}
