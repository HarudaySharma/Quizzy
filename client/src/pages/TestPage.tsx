import { ReactNode, useEffect, useState } from 'react';
import UserForm from '../components/UserForm'
import McqComponent from '../components/McqComponent';
import { Categories, CheckedQuestion, MarkedQuestion } from '../types';
import QuizResult from '../components/QuizResult';
import OverButtons from '../components/OverButtons';
import useTestQuestions from '../hooks/useTestQuestions';
import fetchCheckedAnswers from '../utils/fetchCheckedAnswers';
import analyseCheckedQuestions from '../utils/analyseCheckedAnswers';


/*
 * responsibility to fetch mcqs
 * and fetch mcq whenever category or mcqCount are changed
 */
export type TestResult = {
    markedQuestions: MarkedQuestion[],
    totalMcqs: number,
}

const TestPage = () => {
    const { mcqList, setCategory, setMcqCount } = useTestQuestions({})
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
                        <McqComponent.TotalMcqs />
                    ]}
                />}
                onQuizOver={onQuizOver}
                includeCount={false}
            />)
    }

    const handleReset = () => {
        setCategory(undefined);
        setMcqCount(undefined);
    }

    const onQuizOver = async ({ markedQuestions, totalMcqs }: TestResult) => {
        let checkedQuestions: CheckedQuestion[];
        try {
            checkedQuestions = await fetchCheckedAnswers(markedQuestions);
        }
        catch (err) {
            console.log(err);
            // show retry connection btn
            return;
        }
        const {correctCount, inCorrectCount} = analyseCheckedQuestions(checkedQuestions);
        setRenderComponent(<>
            <QuizResult
                checkedQuestions={checkedQuestions}
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

    useEffect(() => {
        if (mcqList.length == 0) {
            setRenderComponent(
                <>
                    <h1 className="text-3xl text-center font-bold">
                        Take a Test
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
                            <McqComponent.TotalMcqs />
                        ]}
                    />}
                    onQuizOver={onQuizOver}
                    includeCount={false}
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

export default TestPage
