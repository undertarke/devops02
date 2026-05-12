// yarn add express serverless-http

import express from 'express'
import serverless from 'serverless-http'

const app = express();
app.use(express.json());
app.get("/get-user", (req, res) => {
    res.send("HELLO serverless AWS !!")
})
app.post("/create-user", (req, res) => {
    res.send("POST HELLO serverless AWS !!")
})



export const handler = serverless(app)