import http from 'http';
import {getItems, getID, postItem} from './items.js';
const hostname = '127.0.0.1';
const port = 3000;
// http://localhost:3000/items

// luodaan palvelin
// callback funktio -> odottaa että kutsutaan
const server = http.createServer((req, res) => {
  // tarkastetaan url ja metodi
  const {url, method} = req;
  console.log('url:', url, 'method:', method);

  // jos on GET
  if (url === '/items' && method === 'GET') {
    getItems(res);

    // GET ID
  } else if (url === '/items/2' && method === 'GET') {
    getID(req, res);

    // jos on POST
  } else if (url === '/items' && method === 'POST') {
    postItem(req, res);

    // ei löydy
  } else {
    //  not found response
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: '404', message: 'not found'}));
  }
});

// serverin metodi 3 parametrilla, port, hostname, funktio mikä ajetaan)
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
