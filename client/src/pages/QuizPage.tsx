import UserForm from '../components/UserForm/UserForm'
import useQuizQuestions from '../hooks/useQuizQuestions';
import { QuizPageContext } from '../context/QuizPageContext';
import { useEffect } from 'react';
import McqComponent from '../components/McqComponent';


const QuizPage = () => {
    const { mcqList, setCategory, setMcqCount } = useQuizQuestions({})

    useEffect(() => {
        console.log("mcqList", mcqList);
    }, [mcqList]);

    const ShowComponent = () => {
        if (mcqList.length != 0) {
            return (
                <QuizPageContext.Provider value={{ mcqList, setMcqCount, setCategory }}>
                    <McqComponent />
                </QuizPageContext.Provider>
            )
        }
        return (
            <QuizPageContext.Provider value={{ mcqList, setMcqCount, setCategory }}>
                <UserForm />
            </QuizPageContext.Provider>
        )
    }

    return (
        <div className="grid max-w-screen-2xl bg-sky-50 mx-auto">
            <h1 className="text-3xl text-center font-bold">
                Take a QUIZ
            </h1>
            <div className="flex flex-col gap-4">
                <ShowComponent />
            </div>
        </div >
    )
}

export default QuizPage
