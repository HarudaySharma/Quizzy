export interface MCQ {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    answer: string,
    isCorrect?: boolean,
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
