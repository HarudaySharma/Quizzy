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
