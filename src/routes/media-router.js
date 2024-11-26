import express from 'express';
import {
  getItems,
  getID,
  postItem,
  putItem,
  deleteMedia,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authenticaton.js';
import 'dotenv/config';
import {body} from 'express-validator';
import upload from '../middlewares/upload-media.js';

// router
const mediaRouter = express.Router();

// Media endpoint
mediaRouter
  .route('/')
  .get(getItems)
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({min: 5, max: 50}),
    postItem,
  );

// TSEKKAA NÄÄ !! ylempi ja alempi
mediaRouter
  .route('/:id')
  .get(getID)
  .put(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({min: 5, max: 50}),
    putItem,
  )
  .delete(deleteMedia);

export default mediaRouter;
