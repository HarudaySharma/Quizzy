export interface MCQ {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    answer: 'A' | 'B' | 'C' | 'D';
}

export interface CheckedQuestion extends MCQ {
    correctOption: 'A' | 'B' | 'C' | 'D';
    isCorrect: boolean;
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
