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
        console.log(category);
        if(!category) {
            return;
        }
        setFormData({ ...formData, category: category });
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger onClick={e => e.preventDefault()} className={`p-4 mx-auto w-96 font-mono ${className}`}>
                <SelectValue placeholder='Select a Category' />
            </SelectTrigger>
            <SelectContent onClick={(e) => e.preventDefault()}>
                {
                    categories.map((category) =>
                        <SelectItem
                            className={`font-mono tracking-widest `}
                            key={category}
                            value={category}
                            onClick={e=> {e.preventDefault(); e.stopPropagation()}}
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
