import React from 'react';
import { useUserFormContext } from '../../context/userFormContext';
import { Categories } from '../../types';

const CategoryList = () => {
    const categories = Object.keys(Categories);
    const { formData, setFormData } = useUserFormContext();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = Categories[e.target.value as keyof typeof Categories];
        setFormData({ ...formData, category: category});
    }

    return (
        <fieldset className='flex flex-row gap-1 '>
            <label htmlFor='categories'
                className='py-2'
            >
                Choose
            </label>
            <select name='category'
                id='categories'
                onChange={handleChange}
                className='basis-2/3 py-2 px-1'
            >
                {
                    categories.map((category) =>
                        <option key={category} value={category}>{category}</option>
                    )
                }
            </select>
        </fieldset>
    )
}

export default CategoryList
