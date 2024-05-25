import { Categories, CheckedQuestion, MarkedQuestion } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

const fetchCheckedAnswers = async (category: Categories, markedQuestions: MarkedQuestion[]) => {

    try {
        const res = await fetch(`${API_URL}/api/quiz/test/questions/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category, markedQuestions }),
            credentials: 'include'
        })
        if (!res.ok) {
            throw Error("response not OK");
        }
        const data = await res.json() as CheckedQuestion[];
        return data;
    }
    catch (err) {
        console.log(err);
        throw Error("Checking of Questions Failed");
    }
}

export default fetchCheckedAnswers;
