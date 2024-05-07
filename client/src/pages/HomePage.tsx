import { useNavigate } from "react-router";
import { Button } from "../@/components/ui/button"

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="grid max-w-screen-2xl bg-sky-50 mx-auto">
            <h1 className="text-3xl text-center font-bold">
                WELCOME
            </h1>
            <div className="flex flex-col gap-4">
                <Button onClick={() => navigate('/quiz')} className="p-4 px-24 mx-4">
                    Take a Quiz
                </Button>
                <Button onClick={() => navigate('/quiz/test')} className="p-4 px-24 mx-4">
                    Take a MCQ Test
                </Button>
            </div>
        </div >
    )
}

export default HomePage;
