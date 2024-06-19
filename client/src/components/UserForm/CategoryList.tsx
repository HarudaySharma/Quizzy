import { useEffect, useRef } from 'react';
import { useUserFormContext } from '../../context/userFormContext';
import { Categories } from '../../types';
import Select from 'react-select'


const CategoryList = () => {
    const categories = Object.keys(Categories) as Array<keyof typeof Categories>;
    const { setFormData } = useUserFormContext();

    const selectRef = useRef<HTMLButtonElement>(null);

    const handleChange = (option: any) => {
        if (!option) {
            setFormData((prev) => ({ ...prev, category: undefined }));
            return;
        }
        const { value } = option;

        //console.log({ category: value });

        setFormData((prev) => ({ ...prev, category: value }));
    }

    useEffect(() => {
        selectRef.current?.focus();
    }, [])

    const categoryOptions = categories.map((category: keyof typeof Categories) => ({
        label: category,
        value: Categories[category],
    }));

    return (
        <div className='flex w-full'>
            <Select
                className="basic-single basis-11/12 mx-auto"
                classNamePrefix="select category"
                onChange={handleChange}
                placeholder={'select a category'}
                isClearable={true}
                isSearchable={true}
                name="Categories"
                options={categoryOptions}
            />
        </div>
    )
}

export default CategoryList
