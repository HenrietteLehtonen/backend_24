// CONTROLLER = modelin ja viewin "välikäsi" - tässä apissa API JSON
// kuuntelee tapahtumia näkymästä
// vastaa näkymän päivittämisestä

import {customError} from '../middlewares/error-handler.js';
import {
  addMediaItem,
  fetchMediaItems,
  fetchMediaItemsByID,
  updateMediaItem,
  deleteMediaItembyID,
} from '../models/media-model.js';

// GET ALL
const getItems = async (req, res, next) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    // res.status(503).json({error: 503, message: 'Database error'});
    return next(customError('Database error!', 503));
  }
};

// GET MEDIA by ID
const getID = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const item = await fetchMediaItemsByID(id);
    console.log(id);
    if (item) {
      res.json(item);
    } else {
      return next(customError('Item not found!', 404));
      // res.status(404).json({message: 'Item not found'});
    }
  } catch (error) {
    console.error('Get items', error.message);
    // res.status(503).json({error: 503, message: 'Database error'});
    return next(customError('Database error', 503));
  }
};

// POST - add new item
const postItem = async (req, res, next) => {
  console.log('post req body', req.body);
  console.log('post req file', req.file);
  if (!req.file) {
    // return res.status(400).json({message: 'File not found!'});
    return next(customError('Invalid or missing file!', 404));
  }
  const newItem = {
    // user-id luetaan authentikation middlewaresta
    user_id: req.user.user_id,
    title: req.body.title,
    description: req.body.description,
    filename: req.file.filename,
    filesize: 10,
    media_type: req.file.mimetype,
    created_at: new Date().toISOString(),
  };
  const id = await addMediaItem(newItem);
  if (!id) {
    // return res.status(404).json({message: 'ID not found', id: id});
    return next(customError(`ID ${id} not found!`, 404));
  }
  res.status(201).json({message: 'Item added', id: id});
};

// PUT MODIFY ITEM
const putItem = async (req, res, next) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  console.log('put req body put-item', req.body);
  const newDetails = {
    title,
    description,
  };
  try {
    const itemsEdited = await updateMediaItem(
      req.params.id,
      req.user.user_id,
      newDetails,
    );
    // if no items were edited (id was not found in DB), return 404
    if (itemsEdited === 0) {
      // return res
      //   .status(404)
      //   .json({message: 'Media Item not found or no permission to edit'});
      return next(
        customError(`Media Item not found or no permission to edit`, 404),
      );
    } else if (itemsEdited === 1) {
      return res.status(200).json({message: 'Item updated', id: req.params.id});
    }
  } catch (error) {
    console.error(error);
    return next(customError(`Something went wrong...`, 505));
  }
};

// // DEL - poisto ilman valtuutusta
const deleteMedia = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const item = await deleteMediaItembyID(id);
  console.log(id);
  if (item) {
    res.status(200).json({message: `Media with id ${id} deleted succesfully`});
  } else {
    // res.status(404).json({message: 'Item not found'});
    return next(customError(`Item not found`, 404));
  }
};

export {getItems, getID, postItem, putItem, deleteMedia};
