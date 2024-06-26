import { Request } from "express";

export type Options = 'A' | 'B' | 'C' | 'D';

export interface MCQ {
    question?: string,
    image?: string,
    A: string,
    B: string,
    C: string,
    D: string,
    answer: Options;
}

export interface MarkedQuestion {
    question?: string;
    image?: string;
    userAnswer: {
        option: Options,
        text: string
    };
}

export interface CheckedQuestion {
    question?: string;
    image?: string;
    correctAnswer: {
        option: Options,
        text: string
    };
    userAnswer: {
        option: Options,
        text: string
    };
}

export interface CustomRequest extends Request {
    sessionId?: string;
}
