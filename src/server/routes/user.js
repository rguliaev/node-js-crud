import express from 'express';
import {list} from "../database/database.js";

export const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    const users = list()
    res.send(users)
})