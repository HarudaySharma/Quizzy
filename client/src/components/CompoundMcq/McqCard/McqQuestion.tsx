import clsx from "clsx";
import { CardTitle } from "../../../@/components/ui/card";
import { useMcqCardContext } from "../../../context/MCQCardContext";

function McqQuestion({ className }: { className?: string }) {
    const { question } = useMcqCardContext();

    if (!question)
        return null;

    return (
        <CardTitle
            className={clsx(`
                text-md
                text-gray-900
                leading-6
                tracking-wider
                text-left
                outline
                outline-1
                outline-gray-400
                rounded-md
                p-2
            `,
                className
            )}
        >
            {question}
        </ CardTitle>
    )
}

export default McqQuestion;
