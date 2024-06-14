import React, { useState } from 'react'
import { useUserFormContext } from '../../context/userFormContext';
import { Input } from '../../@/components/ui/input';
import { Label } from '../../@/components/ui/label';

const McqCountField = () => {
    const { formData, setFormData } = useUserFormContext();
    const [mcqCount, setMcqCount] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = e.target.value;
        //console.log(num);
        if (num === "") {
            setMcqCount("");
            setFormData({ ...formData, mcqCount: undefined });
            return;
        }
        if (Number(num) <= 0) {
            setMcqCount("");
            return;
        }
        setMcqCount(num);
        setFormData({ ...formData, mcqCount: Number(num) });
    }

    if (formData?.requestMode === 'NO-TIMER') {
        return (
            <fieldset className='flex flex-col gap-2'>
                <Label
                    className='w-fit py-1 px-1'
                    htmlFor='mcqCount'
                >
                    Number of Questions ?
                </Label>
                <Input
                    className='
                        p-4
                        mx-auto 
                        basis-11/12
                        font-mono
                    '
                    type='number'
                    id='mcqCount'
                    value={mcqCount}
                    onChange={handleChange}
                />
            </fieldset>
        )
    }
}

export default McqCountField
