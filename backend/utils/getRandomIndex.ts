export default function getRandomIndex(present: Set<number>, upperBound: number): number {
    let randIndex: number = Math.floor(Math.random() * upperBound); 
    while(present.has(randIndex)) {
        randIndex = Math.floor(Math.random() * upperBound); 
    }
    return randIndex;
}
