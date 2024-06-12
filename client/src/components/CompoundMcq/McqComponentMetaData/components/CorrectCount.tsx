import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";

const CorrectCount = ({ className }: { className?: string }) => {
    const { correctCount, variant } = useMcqComponentContext();

    if (variant === 'TEST') {
        return null;
    }

    return (
        <div
            className={clsx(`
                p-4 
                bg-green-50
                rounded-md
                outline
                outline-1
                outline-green-400
            `,
                className
            )}
        >
            Correct: {correctCount}
        </div>
    )
}

export default CorrectCount;
