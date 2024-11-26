import express from 'express';
import {
  deleteUserByID,
  getUserId,
  getUsers,
} from '../controllers/user-contoller.js';

// user router
const userRouter = express.Router();

// User endpoint yleinen
userRouter.route('/').get(getUsers);

// TODO User endpoint id
userRouter.route('/:id').get(getUserId).delete(deleteUserByID);

export default userRouter;
