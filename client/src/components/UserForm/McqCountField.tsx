import React, { useEffect, useState } from 'react'
import { useUserFormContext } from '../../context/userFormContext';
import { Input } from '../../@/components/ui/input';
import { Label } from '../../@/components/ui/label';
import toast from 'react-hot-toast';

const McqCountField = () => {
    const { formData, setFormData } = useUserFormContext();
    const [mcqCount, setMcqCount] = useState("");

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (!formData?.categoryKey) {
            setMcqCount("");
        }

        formData?.categoryKey ? setDisabled(false) : setDisabled(true);

    }, [formData?.categoryKey])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) {
            toast.error('please select a category first');
            return;
        }

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
