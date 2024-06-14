import React, { useEffect, useRef } from 'react';
import { useUserFormContext } from '../../context/userFormContext';
import { Categories } from '../../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../@/components/ui/select';
import clsx from 'clsx';

type PROPS = {
    className?: string
}
const CategoryList = ({ className }: PROPS) => {
    const categories = Object.keys(Categories);
    const { setFormData } = useUserFormContext();

    const selectRef = useRef<HTMLButtonElement>(null);

    const handleChange = (key: keyof typeof Categories) => {
        const category = Categories[key];
        console.log({ category });
        if (!category) {
            return;
        }
        setFormData((prev) => ({ ...prev, category: category }));
    }

    useEffect(() => {
        selectRef.current?.focus();
    }, [])

    return (
        <Select
            onValueChange={handleChange}
        >
            <SelectTrigger
                ref={selectRef}
                className={clsx(`
                        p-4
                        mx-auto 
                        w-11/12
                        font-mono 
                    `,
                    className
                )}
            >
                <SelectValue
                    placeholder='Select a Category'
                />
            </SelectTrigger>
            <SelectContent >
                {
                    categories.map((category) =>
                        <SelectItem
                            className={`
                                font-mono 
                                tracking-widest 
                            `}
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
