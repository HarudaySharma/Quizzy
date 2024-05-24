export default function getRandomIndex(present, upperBound) {
    let idx = Math.floor(Math.random() * upperBound);
    // return any idx after 10 retries
    let RETRYCOUNT = 10;
    while (RETRYCOUNT-- && present.has(idx)) {
        idx = Math.floor(Math.random() * upperBound);
    }
    return idx;
}
