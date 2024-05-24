import React from 'react';
import { useUserFormContext } from '../../context/userFormContext';
import { Categories } from '../../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../@/components/ui/select';

type PROPS = {
    className?: string
}
const CategoryList = ({ className }: PROPS) => {
    const categories = Object.keys(Categories);
    const { formData, setFormData } = useUserFormContext();

    const handleChange = (key: keyof typeof Categories) => {
        const category = Categories[key];
        setFormData({ ...formData, category: category });
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className={`p-4 mx-auto w-96 font-mono ${className}`}>
                <SelectValue placeholder='Select a Category' />
            </SelectTrigger>
            <SelectContent>
                {
                    categories.map((category) =>
                        <SelectItem
                            className={`font-mono tracking-widest `}
                            key={category}
                            value={category}
                        >
                            {category}
                        </SelectItem>
                    )
                }
            </SelectContent>
        </Select>
    )
}

export default CategoryList
