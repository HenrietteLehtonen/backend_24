import express from 'express';
import multer from 'multer';
import {
  getItems,
  getID,
  postItem,
  putItem,
  deleteMedia,
} from '../controllers/media-controller.js';

const upload = multer({dest: 'uploads/'});

// router
const mediaRouter = express.Router();

// Media endpoint
mediaRouter.route('/').get(getItems).post(upload.single('file'), postItem);

mediaRouter
  .route('/:id')
  .get(getID)
  .put((req, res) => {
    res.status(501).json({message: 'Under construction'});
  })
  .delete(deleteMedia);

export default mediaRouter;
