import { Request, Response, Router } from "express";
import getFlagImage from "../utils/getFlagImage.js";

const router = Router();

router.get('/flags/:fileName', async (req: Request, res: Response) => {
    const { fileName } = req.params;

    try {
        const img = await getFlagImage(fileName);

        let mimeType = 'image/png';
        if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
            mimeType = 'image/jpeg';
        } else if (fileName.endsWith('.gif')) {
            mimeType = 'image/gif';
        }

        res.setHeader('Content-Type', mimeType)
        res.send(img);
    }
    catch (err) {
        console.log(err, "ERROR AT FLAG GET ROUTE");
        res.status(500).send('Internal Server Error');
    }

})

export default router;
