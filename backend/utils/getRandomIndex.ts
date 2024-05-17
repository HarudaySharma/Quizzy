export default function getRandomIndex(present: Set<number>, upperBound: number): number {
    let idx: number = Math.floor(Math.random() * upperBound); 
    // return any idx after 10 retries
    let RETRYCOUNT = 10;
    while(RETRYCOUNT-- && present.has(idx)) {
        idx = Math.floor(Math.random() * upperBound); 
    }
    return idx;
}
