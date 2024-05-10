export type Options = 'A' | 'B' | 'C' | 'D';

export interface MCQ {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    answer: Options;
}

export interface CheckedQuestion {
    question: string;
    correctAnswer: {
        option: Options,
        text: string
    };
    userAnswer: {
        option: Options,
        text: string
    };
}

export interface MarkedQuestion {
    question: string;
    correctAnswer?: {
        option: Options,
        text: string
    };
    userAnswer: {
        option: Options,
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
    Sports = "SPORTS",

}
