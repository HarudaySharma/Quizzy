import { OPTIONS } from "../types";

function shuffleOptions(options: OPTIONS[], optionsCount: number) {
    const takenIdx: Set<number> = new Set();

    for (let i = 0; i < optionsCount / 2; i++) {
        let idx1;
        do {
            idx1 = Math.floor(Math.random() * optionsCount);
        } while (takenIdx.has(idx1));
        takenIdx.add(idx1);

        let idx2;
        do {
            idx2 = Math.floor(Math.random() * optionsCount);
        } while (takenIdx.has(idx2));
        takenIdx.add(idx2);

        let tmp = options[idx1];
        options[idx1] = options[idx2];
        options[idx2] = tmp;
    }

    return options;
}

export default shuffleOptions;
