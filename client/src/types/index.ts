export type RequestModes = 'TIMER' | 'NO-TIMER';

export type OPTIONS = 'A' | 'B' | 'C' | 'D';

export type VARIANT = 'TEST' | 'QUIZ';

export interface MCQ {
    question?: string,
    image?: string,
    A: string,
    B: string,
    C: string,
    D: string,
    answer: OPTIONS;
}

export interface CheckedQuestion {
    question?: string;
    image?: string,
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
    question?: string;
    image?: string,
    correctAnswer?: {
        option: OPTIONS,
        text: string
    };
    userAnswer: {
        option: OPTIONS,
        text: string
    };
}

export type handleFormSubmitParams = {
    categoryKey: keyof typeof Categories,
    mcqCount?: number;
    requestMode: RequestModes;
    timer?: number;
}

export enum Categories {
    MixedQuestions = "ALL",
    Anime = "ANIME",
    Basketball = "BASKETBALL",
    Football = "FOOTBALL",
    History = "HISTORY",
    Politics = "POLITICS",
    Sports = "SPORTS",
    Flags = "FLAGS",
    "Capitals" = "CAPITALS_ALL",
    "Asian Countries Capital" = "CAPITALS_ASIAN",
    "European Countries Capital" = "CAPITALS_EURPOEAN",
    "Austrailan Oceania Countries Capital" = "CAPITALS_AUSTRALIAN_OCEANIA",
    "American Countries Capital" = "CAPITALS_AMERICAN",
    "African Countries Capital" = "CAPITALS_AFRICAN",
}

