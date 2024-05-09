import React from 'react'
import { useUserFormContext } from '../../context/userFormContext';

const McqCountField = () => {
    const { formData, setFormData } = useUserFormContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const mcqCount = e.target.value;
        setFormData({ ...formData, mcqCount: Number(mcqCount)});
    }

    return (
        <fieldset className='flex flex-row gap-1 '>
            <label
                htmlFor='mcqcount'
                className='py-2'
            >
                Number of Questions?
            </label>
            <input id="mcqcount"
                type='number'
                max={30}
                name="count"
                onChange={handleChange}
                className='basis-2/3 py-2 px-1'
            />
        </fieldset>
    )
}

export default McqCountField
