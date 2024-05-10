import React from 'react'
import { Button } from '../../@/components/ui/button'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClickHandler: () => void;
}

const RetryButton = (props: Props) => {

    const handleOnClick = () => {
        props.onClickHandler();
    }

    return (
        <Button {...props} onClick={handleOnClick}>
            Retry
        </Button>
    )
}

export default RetryButton
