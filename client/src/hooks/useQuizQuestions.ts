import { useCallback, useEffect, useState } from "react";
import { Categories, MCQ } from "../types";

type useQuizQuestionsParams = {
    defaultCategoryValue?: Categories,
    defaultMCQCount?: number,
}

const useQuizQuestions = ({ defaultCategoryValue, defaultMCQCount }: useQuizQuestionsParams) => {
    const [category, setCategory] = useState<Categories | undefined>(defaultCategoryValue);
    const [mcqCount, setMcqCount] = useState<number | undefined>(defaultMCQCount);
    const [mcqList, setMcqList] = useState<MCQ[]>([]);

    const fetchQuestions = useCallback(async () => {
        if (!category || !mcqCount)
            return;
        try {
            const res = await fetch('/api/quiz/questions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, mcqCount })
            });
            if (!res.ok) {
                console.log("failed");
                return;
            }
            const data = await res.json() as MCQ[];
            // set the MCQ LIST state
            setMcqList(data);
        }
        catch (err) {
            console.log(err);
        }
    }, [mcqCount, category])

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    return { mcqList, setCategory, setMcqCount };
}

export default useQuizQuestions;
