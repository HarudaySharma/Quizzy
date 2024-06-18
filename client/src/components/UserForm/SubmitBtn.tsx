import { useEffect, useState } from 'react';
import { Button } from '../../@/components/ui/button';
import { useUserFormContext } from '../../context/userFormContext';

const SubmitBtn = () => {
    const { formData } = useUserFormContext();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (!formData)
            return;
        console.log({ formData });
        if ((formData.timer || formData.mcqCount) && formData.category)
            setDisabled(false);
        else
            setDisabled(true);

    }, [formData?.timer, formData?.requestMode, formData?.category, formData?.mcqCount]);

    return (
        <Button
            type='submit'
            disabled={disabled}
            className="
                w-fit 
                mx-auto
                py-8
                px-12 
                text-xl 
                tracking-wider
                uppercase 
                cursor-pointer 
                bg-sky-500
                hover:bg-sky-400
                disabled:bg-sky-200
                relative
            "
        >
            Start Quiz
        </Button>
    )
}

export default SubmitBtn;
