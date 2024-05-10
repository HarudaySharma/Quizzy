/* import { Categories, MCQ } from "../types";
import { createContext, useContext } from "react";

type QuizPageContextType = {
    mcqList: MCQ[];
    setCategory: React.Dispatch<React.SetStateAction<Categories | undefined>>,
    setMcqCount: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const QuizPageContext = createContext<QuizPageContextType | undefined>(undefined);

export function useQuizPageContext() {
    const context = useContext(QuizPageContext);

    if (!context || !context.setCategory || !context.setMcqCount) {
        throw Error("wtf you doing! pass the QuizPage state and its setter in the context provider");
    }

    return {mcqList: context.mcqList, setCategory: context.setCategory, setMcqCount: context.setMcqCount};
} */
