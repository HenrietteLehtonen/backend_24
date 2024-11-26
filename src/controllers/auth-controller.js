import jwt from 'jsonwebtoken';
import {selectUserbyUserName, getUserbyID} from '../models/user-model.js';

import 'dotenv/config';
import {customError} from '../middlewares/error-handler.js';
import {deleteMediaItembyID} from '../models/media-model.js';

// POST http://localhost:3000/api/auth/login
const postLogin = async (req, res, next) => {
  console.log('postLogin', req.body);
  const {username, password} = req.body;
  const user = await selectUserbyUserName(username, password);
  if (user) {
    const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({...user, token});
  } else {
    // res.sendStatus(401); korvataan error handler middlewarella
    return next(
      customError(`Unauthorized - username or password is invalid.`, 401),
    );
  }
};

// GET http://localhost:3000/api/auth/me
const getMe = async (req, res, next) => {
  try {
    const user = await getUserbyID(req.user.user_id);
    res.json({user_id: req.user.user_id, ...user});
  } catch (error) {
    console.error('getMe', error.message);
    // res.status(503).json({error: 503, message: error.message});
    return next(customError(error.message, 503));
  }
};

// DELETE MEDIA WITH AUTH TODO
const deleteMedia = async (req, res, next) => {
  try {
    // Haetaan mediaId reitistä ja user_id tokenista
    const mediaId = parseInt(req.params.id);
    const userId = req.user.user_id;
    const item = await deleteMediaItembyID(mediaId, userId);
    console.log(item);
    if (item) {
      res.status(200).json({message: 'Media item deleted successfully.'});
    } else {
      throw new Error(
        'Media item not found or you do not have permission to delete it.',
      );
    }
  } catch (error) {
    console.error('deleteMedia', error.message);
    // res.status(503).json({error: 503, message: error.message});
    return next(customError(`Unauthorized - can't delete this item.`, 401));
  }
};

export {postLogin, getMe, deleteMedia};
