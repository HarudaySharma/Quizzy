import { RouterProvider } from "react-router-dom";
import router from "./routes";
function App() {
    return (
        <main>
            <RouterProvider router={router} />
            {/*Boolean(McqList.length) &&

                    <section className="m-4 bg-transparent">
                        <h3 className="text-md uppercase "> Questions </h3>
                        <ul className="border-2 border-black rounded-[4px]"> 
                            {
                                McqList.map((obj) => {
                                    return <li key={obj.question}>{obj.question}</li>
                                })
                            }
                        </ul>
                    </section>
                */}
        </main>
    )
}

export default App
