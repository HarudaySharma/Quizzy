import { BiCategory } from "react-icons/bi"
import { useMcqComponentContext } from "../../context/McqComponentContext";

const Category = () => {

    const { category } = useMcqComponentContext();

    return (
        <div
            className='
                p-2
                rounded-md
                outline
                outline-1
                outline-violet-400
                backdrop-blur-md 
                flex
                flex-row
                gap-2
                w-fit
                tracking-widest
            '
            title='Category'
        >
            <BiCategory size={24} className='inline-block' />
            <span>{category.toLocaleLowerCase()}</span>
        </div>
    )
}

export default Category
