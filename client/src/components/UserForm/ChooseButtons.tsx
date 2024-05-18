import React from 'react'
import { useUserFormContext } from '../../context/userFormContext'
import { Button } from '../../@/components/ui/button';

const ChooseButtons = () => {
    const { formData, setFormData } = useUserFormContext();
    return (
        <div>
            <Button
                onClick={() => setFormData({ ...formData, variant: "TIMER" })}
            >
                Set A Timer ?
            </Button>
            <Button
                onClick={() => setFormData({ ...formData, variant: "NO-TIMER" })}
            >
                Set No. of Mcqs ?
            </Button>
        </div>
    )
}

export default ChooseButtons;
