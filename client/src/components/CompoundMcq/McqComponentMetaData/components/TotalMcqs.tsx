import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";

const TotalMcqs = ({ className }: { className?: string }) => {
    const { totalMcqs } = useMcqComponentContext();

    return (
        <div
            className={clsx(`
                p-4
                bg-gray-50
                rounded-md
                outline
                outline-1
                outline-gray-400

            `,
                className
            )}
        >
            Total MCQs: {totalMcqs}
        </div>
    )
}

export default TotalMcqs;
