// EXPRESS SERVER
import express from 'express';
import {
  getItems,
  getID,
  postItem,
  mediaItems,
  putItem,
  deleteMedia,
} from './media.js';
import {getUserID, getUsers, addUser, delUser} from './user.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;
// http://localhost:3000/api/media

// set pystytään tehdä asetuksia
app.set('view engine', 'pug');
app.set('views', 'src/views');

// JSON PARSIMINEN
app.use(express.json());

// app.use() -> käytä sulkujen sisällä olevaa metodia
// "palvelee" staattisia tiedostoja public kansiosta (html, css,kuvat, jne)
// pääsee localhost:3000/index.html tai cat3.jpg
app.use(express.static('public'));

// Uploaded media files
// hakee mediakansiosta -> media mockdata
app.use('/media', express.static('media'));

// API documentation with pug
app.get('/api', (req, res) => {
  // res.render('<h1>Api DOC</h1>');
  // rendaa index.pug
  res.render('index', {
    title: 'API PUG documentation',
    message: 'Hello from index.js row 31',
    esimData: mediaItems,
  });
});

// HAKU METODIT MEDIA

// Käytetään media endpoint
app.get('/api/media', (req, res) => {
  getItems(res);
});

app.get('/api/media/:id', (req, res) => {
  // console.log('req.params', req.params);
  // res.send('ok');
  getID(req, res);
});

app.post('/api/media', (req, res) => {
  postItem(req, res);
});

app.put('/api/media/:id', (req, res) => {
  putItem(req, res);
});
app.delete('/api/media/:id', (req, res) => {
  deleteMedia(req, res);
});

// USERS
app.get('/api/user', (req, res) => {
  getUsers(res);
});

// USERS ID
app.get('/api/user/:id', (req, res) => {
  getUserID(req, res);
});

// ADD USER
app.post('/api/user', (req, res) => {
  addUser(req, res);
});

// DELETE USER
app.delete('/api/user/:id', (req, res) => {
  delUser(req, res);
});

app.listen(port, hostname, () => {
  console.log(`Express server running at http://${hostname}:${port}/`);
});
