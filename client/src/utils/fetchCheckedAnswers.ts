import { Categories, CheckedQuestion, MarkedQuestion } from "../types";

const fetchCheckedAnswers = async (category: Categories, markedQuestions: MarkedQuestion[]) => {

    try {
        const res = await fetch('/api/quiz/test/questions/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category, markedQuestions })
        })
        if (!res.ok) {
            throw Error("response not OK");
        }

        const data = await res.json() as CheckedQuestion[];
        return data;
    }
    catch (err) {
        console.log("Checking of Questions Failed")
        throw err;
    }
}

export default fetchCheckedAnswers;
