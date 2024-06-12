import { useEffect } from 'react'
import { useMcqComponentContext } from '../../context/McqComponentContext'
import { Timer } from 'lucide-react';

const QuizTimer = () => {
    const { timer, setTimer, variant } = useMcqComponentContext();

    useEffect(() => {
        if (timer === undefined || setTimer === undefined) {
            return;
        }
        setInterval(() => {
            setTimer(prev => {
                if (prev !== null)
                    return prev - 1
                return prev;
            });
        }, 1000);
    }, []);


    if (variant === 'TEST' && timer !== null) {
        return (
            <div>
                <Timer />
                {timer}
            </div>

        )
    }
}

export default QuizTimer;
