import { useState } from 'react'
import { useQuizPageContext } from '../context/QuizPageContext'
import McqCard from './McqCard';
import { McqComponentContext } from '../context/McqComponentContext';
import { MarkedQuestion, Options } from '../types';
import QuizMetaData from './QuizMetaData';
import QuizResult from './QuizResult';


const McqComponent = () => {
    const { mcqList } = useQuizPageContext();
    const [mcqIndex, setMcqIndex] = useState(0);

    const [correctCount, setCorrectCount] = useState(0);
    const [inCorrectCount, setInCorrectCount] = useState(0);
    const [markedAnswers, setMarkedAnswers] = useState<MarkedQuestion[]>([]);

    const [component, setComponent] = useState<'MCQ' | 'RESULT'>('MCQ');

    //checks each submitted answer and saves it
    const answerSubmitHandler = (markedOption: Options) => {
        const markedAnswer: MarkedQuestion = {
            question: mcqList[mcqIndex].question,
            correctAnswer: {
                option: mcqList[mcqIndex].answer,
                text: mcqList[mcqIndex][mcqList[mcqIndex].answer],
            },
            userAnswer: {
                option: markedOption,
                text: mcqList[mcqIndex][markedOption],
            }
        };
        if (markedOption === mcqList[mcqIndex].answer) {
            setCorrectCount(prev => prev + 1);
        } else {
            setInCorrectCount(prev => prev + 1);
        }
        if (mcqIndex < mcqList.length) {
            setMcqIndex(prev => prev + 1);
        }
        if (mcqIndex == mcqList.length - 1) {
            // render all the markedAnswers
            setComponent('RESULT');
        }
        setMarkedAnswers([...markedAnswers, markedAnswer]);
    }

    const ShowComponent = () => {
        if (component === 'MCQ') {
            return <McqCard answerSubmitHandler={answerSubmitHandler} />
        }
        if (component === 'RESULT') {
            return <QuizResult />
        }
    }

    return (
        <div className="m-4 bg-transparent">
            <h3 className="text-md uppercase "> Questions </h3>
            <McqComponentContext.Provider value={{ mcq: mcqList[mcqIndex], totalMcqs: mcqList.length, markedAnswers, correctCount, inCorrectCount }}>
                <QuizMetaData />
                <div className='my-6'></div>
                <ShowComponent />
            </McqComponentContext.Provider>
        </div >
    )
}

export default McqComponent
