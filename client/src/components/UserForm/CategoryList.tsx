import React from 'react';
import { useUserFormContext } from '../../context/userFormContext';
import { Categories } from '../../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../@/components/ui/select';

const CategoryList = () => {
    const categories = Object.keys(Categories);
    const { formData, setFormData } = useUserFormContext();

    const handleChange = (key: keyof typeof Categories) => {
        const category = Categories[key];
        setFormData({ ...formData, category: category });
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className='p-4 w-fit'>
                <SelectValue placeholder='Select a Category' />
            </SelectTrigger>
            <SelectContent>
                {
                    categories.map((category) =>
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                    )
                }
            </SelectContent>
        </Select>
    )
}

export default CategoryList
