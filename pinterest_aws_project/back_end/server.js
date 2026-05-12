import express from 'express'
import cors from 'cors'
import { createOrUpdate, readAllHinhAnhs } from './db.js'

const app = express();

app.use(express.json())
app.use(cors())

app.get("/image", async (req, res) => {
    const { success, data } = await readAllHinhAnhs()

    if (success) {
        return res.json({ success, data })
    }
    return res.status(500).json({ success: false, messsage: "Error" })

})

app.post('/image', async(req, res) => {
    const { success, data } = await createOrUpdate(req.body)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})

app.listen(8088)