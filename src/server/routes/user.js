import express from 'express';
import {userRepo} from "../database/database.js";
import cors from "cors";

export const userRouter = express.Router()
userRouter.use(express.json())
userRouter.use(cors())

const respondWithUser = (user, res) => {
    user ? res.send(user) : res.sendStatus(400)
}

userRouter.get('/', (req, res) => {
    const users = userRepo.list()
    res.send(users)
})

userRouter.get('/:id', (req, res) => {
    const user = userRepo.find(req.params.id)
    respondWithUser(user, res)
})

userRouter.post('/', (req, res) => {
    const id = userRepo.add(req.body)
    const user = userRepo.find(id)
    respondWithUser(user, res)
})

userRouter.put('/:id', (req, res) => {
    const user = userRepo.update(req.params.id, req.body)
    respondWithUser(user, res)
})

userRouter.delete('/:id', (req, res) => {
    const user = userRepo.find(req.params.id)
    if (user) {
        userRepo.remove(req.params.id)
        res.send(204)
    } else {
        res.send(400)
    }
})