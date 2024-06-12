import { useEffect, useState } from 'react';
import { Button } from '../../@/components/ui/button';
import { useUserFormContext } from '../../context/userFormContext';

const SubmitBtn = () => {
    const { formData } = useUserFormContext();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (!formData)
            return;
        if ((formData.timer || formData.mcqCount) && formData.category)
            setDisabled(false);
        else
            setDisabled(true);

    }, [formData?.timer, formData?.requestMode, formData?.category, formData?.mcqCount]);

    return (
        <Button
            type='submit'
            className='w-fit mx-auto py-8 px-12 text-xl uppercase cursor-pointer disabled:bg-gray-400'
            disabled={disabled}
        >
            Start Quiz
        </Button>
    )
}

export default SubmitBtn;
