import express from "express";
import { userRepo } from "../database/user.js";
import cors from "cors";

export const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(cors());

const respondWithUser = (user, res) => {
  user ? res.send(user) : res.sendStatus(400);
};

userRouter.get("/", (req, res) => {
  userRepo.list().then(users => res.send(users));
});

userRouter.get("/:id", (req, res) => {
  userRepo.find(req.params.id).then(user => respondWithUser(user, res));
});

userRouter.post("/", (req, res) => {
  userRepo.add(req.body)
    .then(id => userRepo.find(id))
    .then(user => respondWithUser(user, res));
});

userRouter.put("/:id", (req, res) => {
  userRepo.update(req.params.id, req.body).then(user => respondWithUser(user, res));
});

userRouter.delete("/:id", (req, res) => {
  userRepo.find(req.params.id).then(user => {
    if (user) {
      userRepo.remove(req.params.id).then(() => res.sendStatus(204));
    } else {
      res.sendStatus(400);
    }
  })
});
