import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";

const InCorrectCount = ({ className }: { className?: string }) => {
    const { inCorrectCount, variant } = useMcqComponentContext();

    if (variant === 'TEST') {
        return null;
    }

    return (
        <div
            className={clsx(`
                p-4
                bg-red-50
                rounded-md
                outline
                outline-1
                outline-red-400
            `,
                className
            )}
        >
            InCorrect: {inCorrectCount}
        </div>
    )
}

export default InCorrectCount;
