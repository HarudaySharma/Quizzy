import { useNavigate } from "react-router";
import { Button } from "../@/components/ui/button"
import McqImage from "../assets/mcq-image.png"
import { useEffect } from "react";
import changeLayoutColor from "../utils/changeCssVariables";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        changeLayoutColor('primary');
    }, []);

    return (
            <div
                className="
                    bg-page-primaryColor
                    flex 
                    flex-col
                    lg:flex-row
                    h-screen
                    items-center
                    justify-center
                    lg:justify-between
                    tracking-wider
                    content-center
                "
            >
                <div
                    className="
                        flex
                        my-auto
                        flex-col
                        gap-2
                        self-center
                        lg:ml-12
                        space-y-2
                        mx-2
                    "
                >
                    <h1
                        className="
                            text-3xl
                            md:text-5xl
                            font-bold
                            text-center
                            lg:text-left
                        "
                    >
                        Test Your Knowledge.
                        <br />
                        Have Fun !!
                    </h1>
                    <p
                        className="
                            font-light
                            tracking-widest
                            text-xl
                            text-center
                            lg:text-left
                            md:text-3xl
                        "
                    >
                        Take quizzes on various topics,
                        <br />
                        challenge yourself with timed tests,
                        <br />
                        and track your progress.
                    </p>
                    <div
                        className="
                            flex 
                            flex-row 
                            justify-center
                            lg:justify-between
                            flex-wrap
                            gap-4
                        "
                    >
                        <Button
                            onClick={() => navigate('/quiz')}
                            className="
                                bg-customGreen
                                text-white
                                font-bolder
                                text-2xl
                                hover:bg-button-green
                                md:flex-grow
                                xl:flex-grow-0
                                rounded-none
                                p-8
                                hover:bg-customGreen-light1
                            "
                        >
                            Start a Simple Quiz
                        </Button>
                        <Button
                            onClick={() => navigate('/quiz/test')}
                            className="
                                bg-customGreen
                                text-white
                                font-bolder
                                hover:bg-button-green
                                text-2xl
                                md:flex-grow
                                xl:flex-grow-0
                                p-8
                                rounded-none
                                hover:bg-customGreen-light1
                            "
                        >
                            Take a Quiz Test
                        </Button>
                    </div>
                </div>
                <div
                    className="
                        hidden
                        lg:flex
                        basis-1/2
                        h-full
                        justify-center
                        items-center
                    "
                >
                    <div
                        className="
                            w-2/3
                            text-xl
                            text-center
                        "
                    >
                        <img
                            src={McqImage}
                            className="
                                object-cover
                                outline
                                outline-gray-900
                                outline-offset-2
                            "
                        />
                    </div>
                </div>
            </div >
    )
}

export default HomePage;
