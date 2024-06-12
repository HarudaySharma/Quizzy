import clsx from "clsx";
import { useMcqComponentContext } from "../../../../context/McqComponentContext";

const AttemptedCount = ({ className }: { className?: string }) => {
    const { attemptedCount } = useMcqComponentContext();
 
    return (
        <div
            className={clsx(`
                p-4
                bg-sky-100
                rounded-md
                outline
                outline-1
                outline-sky-400
            `,
                className
            )}
        >
            Attempted: {attemptedCount}
        </div>
    )
}

export default AttemptedCount;
