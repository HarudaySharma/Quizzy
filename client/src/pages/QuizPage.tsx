import UserForm from '../components/UserForm'
import useQuizQuestions from '../hooks/useQuizQuestions';
import { ReactNode, useEffect, useState } from 'react';
import McqComponent from '../components/McqComponent';
import { Categories, MarkedQuestion } from '../types';
import QuizResult from '../components/QuizResult';
import markedToCheckedQuestions from '../utils/markedToCheckedQuestions';
import OverButtons from '../components/OverButtons';
import { TestResult } from './TestPage';


/*
 * responsibility to fetch mcqs
 * and fetch mcq whenever category or mcqCount are changed
 */
export type SimpleResult = {
    markedQuestions: MarkedQuestion[],
    correctCount: number,
    inCorrectCount: number,
    totalMcqs: number,

}

const QuizPage = () => {
    const { mcqList, setCategory, setMcqCount } = useQuizQuestions({})
    const [renderComponent, setRenderComponent] = useState<ReactNode>()


    const handleFormSubmit = (category: Categories, mcqCount: number) => {
        setCategory(category);
        setMcqCount(mcqCount);
    }

    const handleRetry = () => {
        setRenderComponent(
            <McqComponent
                mcqList={mcqList}
                meta={<McqComponent.MetaData
                    children={[
                        <McqComponent.TotalMcqs />,
                        <McqComponent.CorrectCount />,
                        <McqComponent.InCorrectCount />
                    ]}
                />}
                onQuizOver={onQuizOver}
                includeCount={true}
            />)
    }

    const handleReset = () => {
        setCategory(undefined);
        setMcqCount(undefined);
    }

    const onQuizOver = (result: SimpleResult | TestResult) => {
        if ('correctCount' in result && 'inCorrectCount' in result) {
            const { correctCount, inCorrectCount, totalMcqs, markedQuestions } = result;
            setRenderComponent(<>
                <QuizResult
                    checkedQuestions={markedToCheckedQuestions(markedQuestions)}
                    correctCount={correctCount}
                    inCorrectCount={inCorrectCount}
                    totalMcqs={totalMcqs}
                />
                <OverButtons
                    className='flex flex-row justify-center gap-x-12'
                    children={[
                        <OverButtons.RetryButton
                            className='bg-gray-50 text-black'
                            onClickHandler={handleRetry}
                        />,
                        <OverButtons.ResetButton
                            className='bg-gray-50 text-black'
                            onClickHandler={handleReset}
                        />
                    ]} />
            </>);
        }
    }

    useEffect(() => {
        if (mcqList.length == 0) {
            setRenderComponent(
                <>
                    <h1 className="text-3xl text-center font-bold">
                        Take a QUIZ
                    </h1>
                    <UserForm
                        onSubmit={handleFormSubmit}
                        categoryList={<UserForm.CategoryList />}
                        mcqCountField={<UserForm.McqCountField />}
                        button={<UserForm.Button />}
                    />
                </>)
        }

        else {
            setRenderComponent(
                <McqComponent
                    mcqList={mcqList}
                    meta={<McqComponent.MetaData
                        children={[
                            <McqComponent.TotalMcqs />,
                            <McqComponent.CorrectCount />,
                            <McqComponent.InCorrectCount />
                        ]}
                    />}
                    onQuizOver={onQuizOver}
                    includeCount={true}
                />)
        }
    }, [mcqList]);

    return (
        <div className="grid max-w-screen-2xl bg-sky-50 mx-auto">
            <div className="flex flex-col gap-4">
                {renderComponent}
            </div>
        </div >
    )
}

export default QuizPage
