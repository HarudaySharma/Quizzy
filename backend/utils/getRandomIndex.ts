export default function getRandomIndex(present: number[], upperBound: number): number {
    let randIndex: number = Math.floor(Math.random() * upperBound); 
    while(present.includes(randIndex)) {
        randIndex = Math.floor(Math.random() * upperBound); 
    }
    return randIndex;
}
