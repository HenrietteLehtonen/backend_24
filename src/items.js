// MOCK DATA

const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
];

// GET ALL
const getItems = (res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(items));
};

// GET ID
const getID = (req, res) => {
  const urlParts = req.url.split('/'); // // ['','items','1']
  const idToFind = parseInt(urlParts[2]); // [0,1,2] = 1

  const foundItem = items.find((item) => item.id === idToFind); // Etsi itemin id

  if (foundItem) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(foundItem)); // Lähetä löytynyt item
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Item not found'}));
  }
};

// POST
const postItem = (req, res) => {
  // alustetaan datalle taulukko
  let body = [];
  req
    // kuunnellan 'dataa' -> lisätään datan chunck / osa bodyyn (taulukkoon)
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      // kuunnellaan 'end'
      //  data buffer muotoinen -> yhdistetään data ja muutetaan merkkijonoksi
      body = Buffer.concat(body).toString();
      // bodyssa nyt request body merkkijonona
      console.log('req body', body);

      // tallennetaan bodyn data ITEM json objektiksi item muuttujaan

      // TODO: check largest id in array and increment by 1

      const item = JSON.parse(body);
      //item.id = items.length + 1; // EI NÄIN

      let newId = 1;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id > newId) {
          newId = items[i].id;
        }
      }
      item.id = newId + 1;

      items.push(item);

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Added items'}));
    });
};

export {getItems, getID, postItem};
