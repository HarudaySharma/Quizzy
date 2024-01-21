import { useEffect, useState } from "react"
import { Categories, MCQ } from "./types/MCQ.js";
import SelectionBox from "./components/SelectionBox.jsx";


function App() {
    const [category, setCategory] = useState(Categories.MixedQuestions);
    const [mcqCount, setMcqCount] = useState(5);
    const [McqList, setMcqList] = useState<MCQ[]>([]);


    useEffect(() => {
        async function getMCQs() {
            try {
                const res = await fetch('/api/questions/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ category, mcqCount })
                });
                if (!res.ok) {
                    console.log("failed");
                    return;
                }
                const data = await res.json();
                console.log(data);
                setMcqList(data);
            } catch (err) {
                console.log(err);
            }
        }
        getMCQs();
    }, [category, setCategory, mcqCount, setMcqCount])

    return (
        <main className="">
            <div className="max-w-3xl bg-sky-50 mx-auto">
                <h1 className="text-3xl text-center font-bold">
                    QUIZ APP
                </h1>
                <SelectionBox setCategory={setCategory} setMcqCount={setMcqCount} />
                {Boolean(McqList.length) &&
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
                }
            </div>

        </main>
    )
}

export default App
