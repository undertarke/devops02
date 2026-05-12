import express from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createOrUpdate, readAllHinhAnhs } from './db.js'
import serverless from 'serverless-http';
import fs from 'fs';


if (!fs.existsSync("/tmp/images")) {
    fs.mkdirSync("/tmp/images", { recursive: true });
}

const app = express();

app.use(express.json())

const storage = multer.diskStorage({
    destination:  "/tmp/images",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage })

const s3 = new S3Client({
    credentials: {
        accessKeyId: "",
        secretAccessKey: ""
    },
    region: "ap-southeast-1"
})

app.post("/upload", upload.single("image"), async (req, res) => {


    const { file } = req

    const bodyStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: "000214268315-s3",
        Body: bodyStream,
        Key: file.filename,
        ContentType: file.mimetype
    }

    s3.send(new PutObjectCommand(uploadParams));

    const { success, data } = await createOrUpdate({
        "id": Date.now(),
        "url": file.filename,
        "title": file.originalname,
        "description": file.size.toString()
    })

    res.send({ success, data, tt: process.cwd() })

})

// app.listen(8081)
export const handler = serverless(app)