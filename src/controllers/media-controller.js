// CONTROLLER = modelin ja viewin "välikäsi" - tässä apissa API JSON
// kuuntelee tapahtumia näkymästä
// vastaa näkymän päivittämisestä

import {
  addMediaItem,
  fetchMediaItems,
  fetchMediaItemsByID,
} from '../models/media-model.js';

// GET ALL
const getItems = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'Database error'});
  }
};

// GET ID
const getID = async (req, res) => {
  // implementoi trycatch
  const id = parseInt(req.params.id);
  const item = await fetchMediaItemsByID(id);
  console.log(id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

// POST - add new item
const postItem = async (req, res) => {
  console.log('post req body', req.body);
  console.log('post req file', req.file);
  const newItem = {
    // user-id hardcoded
    user_id: 1,
    title: req.body.title,
    description: req.body.description,
    filename: req.file.filename,
    filesize: 10,
    media_type: req.file.mimetype,
    created_at: new Date().toISOString(),
  };
  const id = await addMediaItem(newItem);
  if (!id) {
    return res.status(404).json({message: 'ID not found', id: id});
  }
  res.status(201).json({message: 'Item added', id: id});
};

// PUT
const putItem = (req, res) => {
  // etitään id, jota muokataan
  const id = parseInt(req.params.id);
  const item = mediaItems.findIndex((item) => item.media_id === id);

  if (item !== -1) {
    mediaItems[item] = {...mediaItems[item], ...req.body};
    res.json({message: 'Item updated', item: mediaItems[item]});
  } else {
    // Jos kohdetta ei löydy, palautetaan 404-virhe
    res.status(404).json({message: 'Item not found'});
  }
};

// DEL
const deleteMedia = (req, res) => {
  const id = parseInt(req.params.id);
  const media = mediaItems.findIndex((item) => item.media_id === id);

  if (media !== -1) {
    res.json({message: 'Media deleted'});
    mediaItems.splice(media, 1);
  } else {
    res.status(404).json({message: 'Media item not found'});
  }
};

export {getItems, getID, postItem, putItem, deleteMedia};
