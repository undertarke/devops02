//  yarn add express multer @aws-sdk/client-s3
import express from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from "fs";

const app = express();
app.use(express.json())
app.listen(8088)


const storage = multer.diskStorage({
    destination: process.cwd() + "/images",
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

    const file = req.file;
    const fileContent = fs.readFileSync(process.cwd() + "/images/" +
        file.filename);

    const uploadParams = {
        Bucket: "000214268315-s3",
        Body: fileContent,
        Key: file.filename,
        ContentType: file.mimetype
    }

    s3.send(new PutObjectCommand(uploadParams));
    fs.unlinkSync(process.cwd() + "/images/" + file.filename);
    res.send("done")
})