import { ReactNode } from "react";
import clsx from "clsx";
import TotalMcqs from "./components/TotalMcqs";
import CorrectCount from "./components/CorrectCount";
import InCorrectCount from "./components/InCorrectCount";
import AttemptedCount from "./components/AttemptedCount";

interface Props {
    children: ReactNode;
    className?: string;
}

const McqComponentMetaData = ({ children, className }: Props) => {
    return (
        <div
            className={clsx(`
                w-full
                m-4
                ring
                ring-gray-500
                rounded-md
                px-2
                py-2
                flex 
                flex-row 
                flex-wrap
                justify-center
                sm:justify-between
                tracking-wider
                font-bold
                gap-4
                backdrop-blur-md 
            `,
                className
            )}
        >
            {children}
        </div>
    );
}

McqComponentMetaData.TotalMcqs = TotalMcqs;
McqComponentMetaData.CorrectCount = CorrectCount;
McqComponentMetaData.InCorrectCount = InCorrectCount;
McqComponentMetaData.AttemptedCount = AttemptedCount;

export default McqComponentMetaData;
