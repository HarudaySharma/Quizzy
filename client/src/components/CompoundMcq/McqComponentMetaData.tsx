import { ReactNode } from "react";
import { useMcqComponentContext } from "../../context/McqComponentContext";

export const TotalMcqs = ({className}: {className?: string}) => {
    const { totalMcqs } = useMcqComponentContext();
    return <div className={`p-4 bg-gray-50 ${className}`}>Total MCQs: {totalMcqs}</div>
}

export const CorrectCount = ({className}: {className?: string}) => {
    const { correctCount } = useMcqComponentContext();
    return <div className={`p-4 bg-green-50 ${className}`}>Correct: {correctCount}</div>
}

export const InCorrectCount = ({className}: {className?: string}) => {
    const { inCorrectCount } = useMcqComponentContext();
    return <div className={`p-4 bg-red-50 ${className}`}>InCorrect: {inCorrectCount}</div>
}

export const AttemptedCount = ({className}: {className?: string}) => {
    const { attemptedCount } = useMcqComponentContext();
    return <div className={`p-4 bg-sky-100 ${className}`}>Attempted: {attemptedCount}</div>
}

interface Props {
    children: ReactNode[];
    className?: string;
}

const McqComponentMetaData = ({ children, className}: Props) => {
    return (
        <div className={`flex flex-row gap-4 bg-white bg-opacity-50 backdrop-blur-md ${className}`}>
            {children}
        </div>
    );
}

McqComponentMetaData.TotalMcqs = TotalMcqs;
McqComponentMetaData.CorrectCount = CorrectCount;
McqComponentMetaData.InCorrectCount = InCorrectCount;
McqComponentMetaData.AttemptedCount = AttemptedCount;

export default McqComponentMetaData;
