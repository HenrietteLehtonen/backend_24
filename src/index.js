// EXPRESS SERVER
import express from 'express';
import mediaRouter from './routes/media-router.js';
import authRouter from './routes/auth-router.js';
import userRouter from './routes/user-router.js';
// import {getUserID, addUser, delUser} from './user.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handler.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;
// http://localhost:3000/api/media

// set pystytään tehdä asetuksia
app.set('view engine', 'pug');
app.set('views', 'src/views');

// JSON PARSIMINEN expressillä
app.use(express.json());

// app.use() -> käytä sulkujen sisällä olevaa metodia
// "palvelee" staattisia tiedostoja public kansiosta (html, css,kuvat, jne)
app.use(express.static('public'));

// Uploaded media files
app.use('/uploads', express.static('uploads'));

// API DOCS website
app.use('/api', express.static('doc'));

// API documentation with pug - ei toimi - APIDOCS ajaa "päälle"
//- http://localhost:3000/api
// app.get('/api', (req, res) => {
//   res.render('index', {
//     title: 'API PUG documentation',
//     message: 'Hello from index.js row 31',
//     // esimData: mediaItems,
//   });
// });

// USER AUTHERNTICATION ENDPOINT
app.use('/api/auth', authRouter);

// MEDIA ENDPOINT ROUTER
app.use('/api/media/', mediaRouter);

/**
 *
 */

// USER ENDPOINT ROUTER
app.use('/api/user', userRouter);

// ERROR HANDLERIT
// notFoundHandler toimii oletusreittinä
app.use(notFoundHandler);

// geneerinen error handleri -> mikä tahansa viirrhe tapahtuu, käytetään tätä virheiden käsittelyyn
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Express server running at http://${hostname}:${port}/`);
});
