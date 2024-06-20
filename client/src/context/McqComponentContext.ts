import { useContext, createContext } from "react";
import { Categories, MCQ, MarkedQuestion, VARIANT } from "../types";


export type CompoundMcqContextType = {
    mcq: MCQ;
    correctCount: number;
    inCorrectCount: number;
    attemptedCount?: number;
    categoryKey: keyof typeof Categories;
    totalMcqs: number;
    markedAnswers: MarkedQuestion[];
    timer: number | null;
    setTimer: React.Dispatch<React.SetStateAction<number | null>>;
    variant: VARIANT;
}

export const CompoundMcqContext = createContext<CompoundMcqContextType | undefined>(undefined);

export const useMcqComponentContext = () => {
    const context = useContext(CompoundMcqContext);

    //console.log(context);
    if (!context) {
        throw Error("wtf you doing! pass the McqComponent state and its setter in the context provider");
    }

    return {
        mcq: context.mcq,
        correctCount: context.correctCount,
        inCorrectCount: context.inCorrectCount,
        attemptedCount: context.attemptedCount,
        totalMcqs: context.totalMcqs,
        markedAnswers: context.markedAnswers,
        timer: context.timer,
        setTimer: context.setTimer,
        variant: context.variant,
        categoryKey: context.categoryKey,
    }
}
