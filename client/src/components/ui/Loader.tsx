import { ClipLoader } from "react-spinners"

const Loader = ({ className }: { className?: string }) => {
    return (
        <ClipLoader
            size={40}
            color='#4267B2'
            className={className}
        />
    )
}

export default Loader
