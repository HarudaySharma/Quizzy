import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";
import Loader from "../../../ui/Loader";

interface TotalMcqsProps {
    showLoading?: boolean;
    className?: string;
}

const TotalMcqs = ({ showLoading, className }: TotalMcqsProps) => {
    const { totalMcqs } = useMcqComponentContext();

    return (
        <>
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
            {showLoading && <Loader />}
        </>
    )
}

export default TotalMcqs;
