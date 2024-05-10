import { ReactNode } from 'react'
import ResetButton from './ResetButton';
import RetryButton from './RetryButton';

interface Props {
    children: ReactNode[];
    className?: string
}

const OverButtons = ({ children, className }: Props) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

OverButtons.ResetButton = ResetButton
OverButtons.RetryButton = RetryButton

export default OverButtons
