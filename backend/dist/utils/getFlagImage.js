import { readFile } from "fs/promises";
async function getFlagImage(fileName) {
    try {
        const img = await readFile(new URL(`../../static/images/flags/${fileName}`, import.meta.url));
        return img;
    }
    catch (err) {
        console.log('ERROR AT getFlagImage');
        throw err;
    }
}
export default getFlagImage;
