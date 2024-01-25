import express from 'express';
import cors from 'cors';
import {userRouter} from "./routes/user.js";

export const apiPath = '/api/v1'
const port = 3000

const app = express()
app.get('/heartbeat', (req, res) => {
    res.send('I am alive')
})
app.use(cors())
app.use(apiPath + '/users', userRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})