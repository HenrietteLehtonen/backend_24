// MOCK DATA
// huom! JS MUOTO

const mediaItems = [
  {
    media_id: 9632,
    filename: 'cat1.jpg',
    filesize: 887574,
    title: 'Harmaa kissi',
    description: '',
    user_id: 1606,
    media_type: 'image/jpeg',
    created_at: '2023-10-16T19:00:09.000Z',
  },
  {
    media_id: 9626,
    filename: 'cat.jpg',
    filesize: 60703,
    title: 'Avaruus kissi',
    description: 'My Photo',
    user_id: 3671,
    media_type: 'image/jpeg',
    created_at: '2023-10-13T12:14:26.000Z',
  },
  {
    media_id: 9625,
    filename: 'cat3.jpg',
    filesize: 30635,
    title: 'Oranssi kissi',
    description: 'friends',
    user_id: 260,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T20:03:08.000Z',
  },
  {
    media_id: 9592,
    filename: 'cat4.jpg',
    filesize: 48975,
    title: 'Munckin kissi',
    description: '',
    user_id: 3609,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:59:05.000Z',
  },
  {
    media_id: 9590,
    filename: 'cat5.jpg',
    filesize: 23829,
    title: 'Pikku kissi',
    description: 'Light setup in basement',
    user_id: 305,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:56:41.000Z',
  },
];

// GET ALL
const getItems = (res) => {
  res.json(mediaItems);
};

// GET ID
const getID = (req, res) => {
  const id = parseInt(req.params.id);
  const item = mediaItems.find((item) => item.media_id === id);
  if (item) {
    if (req.query.format === 'plain') {
      res.send(item.name);
    } else {
      res.json(item);
    }
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

// POST
const postItem = (req, res) => {
  console.log('post req body', req.body);
  const newItem = req.body;
  newItem.media_id = mediaItems[mediaItems.length - 1].id + 1;
  mediaItems.push(newItem);
  res.status(201).json({message: 'Item added', id: newItem.media_id});
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

export {getItems, getID, postItem, putItem, deleteMedia, mediaItems};
