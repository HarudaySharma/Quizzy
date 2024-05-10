import { useCallback, useEffect, useState } from "react";
import { Categories, MCQ } from "../types";

type useTestQuestionsParams = {
    defaultCategoryValue?: Categories,
    defaultMCQCount?: number,
};

const useTestQuestions = ({ defaultCategoryValue, defaultMCQCount }: useTestQuestionsParams) => {
    const [category, setCategory] = useState<Categories | undefined>(defaultCategoryValue);
    const [mcqCount, setMcqCount] = useState<number | undefined>(defaultMCQCount);
    const [mcqList, setMcqList] = useState<MCQ[]>([]);

    const fetchQuestions = useCallback(async () => {
        if (!category || !mcqCount) {
            setMcqList([]);
            return;
        }
        try {
            const res = await fetch('/api/quiz/test/questions/', {
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
            console.log(data);
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

export default useTestQuestions;
