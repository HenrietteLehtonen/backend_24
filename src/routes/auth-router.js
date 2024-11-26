import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin, deleteMedia} from '../controllers/auth-controller.js';
import {postUser} from '../controllers/user-contoller.js';
import {authenticateToken} from '../middlewares/authenticaton.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const authRouter = express.Router();

// POST http://localhost:3000/api/auth/login
authRouter.route('/login').post(postLogin);

// onko token validi -> check token
// GET http://localhost:3000/api/auth/me
authRouter.route('/me').get(authenticateToken, getMe);

// USER VALIDATION
// POST http://localhost:3000/api/auth/register
authRouter.route('/register').post(
  body('username').trim().isAlphanumeric().isLength({min: 3, max: 20}),
  body('password').isLength({min: 8}),
  body('email').isEmail(),
  validationErrorHandler, // käytetään validoinnin error handleria ennen kuin postataan uusi käyttäjä
  postUser,
); // body middleware -validointi -> parametriin mitkä kohdat validoiidaan
// validoinnin rajaukset validaattorissa, ei tietokannoissa
// trimmi sanitaattori

// DELETE http://localhost:3000/api/auth/delete/media/12
authRouter.route('/delete/media/:id').delete(authenticateToken, deleteMedia);

export default authRouter;
