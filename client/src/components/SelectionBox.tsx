import React, { useState } from 'react'
import { Categories } from '../types/MCQ'


interface SelectionBoxProps {
    setCategory: React.Dispatch<React.SetStateAction<Categories>>;
    setMcqCount: React.Dispatch<React.SetStateAction<number>>;
    children?: React.ReactNode;
}
interface FormData {
    category: Categories;
    count: number;
}

function SelectionBox({ setCategory, setMcqCount }: SelectionBoxProps) {
    const [formData, setFormData] = useState<FormData>({
        category: Categories.MixedQuestions,
        count: 5
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const CategoryList = () => {
        const [list, setList] = useState<string[]>(Object.keys(Categories));
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
                    value={formData.category}
                    className='basis-2/3 py-2 px-1'
                >
                    {
                        list.map((key) =>
                            <option key={key} value={Categories[key as keyof typeof Categories]}>{key}</option>
                        )
                    }
                </select>
            </fieldset>
        )
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        setCategory(formData.category);
        setMcqCount(formData.count);

    }
    return (
        <div className=''>
            <h3> Select Category of MCQ's </h3>
            <form onSubmit={handleSubmit}
                className='border-2 p-4 flex flex-col gap-2'
            >
                <CategoryList />
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
                <input 
                type='submit' 
                value={'Submit'} 
                className='bg-sky-100 py-2 px-1 cursor-pointer hover:bg-sky-200'
                />
            </form>
        </div>
    )
}

export default SelectionBox;
