// MOCK DATA

const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
];

// GET ALL
const getItems = (res) => {
  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.end(JSON.stringify(items));
  res.json(items);
};

// GET ID
const getID = (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
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
  newItem.id = items[items.length - 1].id + 1;
  items.push(newItem);
  res.status(201).json({message: 'Item added', id: '0'});
};

export {getItems, getID, postItem};
