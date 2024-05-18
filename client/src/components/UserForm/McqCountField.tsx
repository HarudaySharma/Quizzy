import React from 'react'
import { useUserFormContext } from '../../context/userFormContext';
import { Input } from '../../@/components/ui/input';
import { Label } from '../../@/components/ui/label';

const McqCountField = () => {
    const { formData, setFormData } = useUserFormContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const mcqCount = e.target.value;
        setFormData({ ...formData, mcqCount: Number(mcqCount) });
    }

    //className='flex flex-row gap-1 '
    //className='basis-2/3 py-2 px-1'
    if (formData?.variant === 'NO-TIMER') {
        return (
            <>
                <Label className='py-2' htmlFor='mcqCount'>Number of Questions ?</Label>
                <Input type='number' id='mcqCount' onChange={handleChange} />
            </>
        )
    }
}

export default McqCountField
