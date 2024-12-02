import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin, deleteMedia} from '../controllers/auth-controller.js';
import {postUser} from '../controllers/user-contoller.js';
import {authenticateToken} from '../middlewares/authenticaton.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": {
 *         "message": "username/password invalid",
 *         "status": 401
 *       }
 *     }
 */

// POST http://localhost:3000/api/auth/login
authRouter
  .route('/login')

  /**
   * @api {post} /login Login
   * @apiVersion 1.0.0
   * @apiName PostLogin
   * @apiGroup Authentication
   * @apiPermission all
   *
   * @apiDescription Sign in and get an authentication token for the user.
   *
   * @apiParam {String} username Username of the user.
   * @apiParam {String} password Password of the user.
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "username": "johnd",
   *      "password": "examplepass"
   *    }
   *
   * @apiSuccess {String} token Token for the user authentication.
   * @apiSuccess {Object} user User info.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "Logged in successfully",
   *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwid
   *                XNlcm5hbWUiOiJ1dXNpMSIsImVtYWlsIjoidXVzaTFAZXhhbXBsZS5jb20
   *                iLCJ1c2VyX2xldmVsX2lkIjoyLCJpYXQiOjE3MDEyNzkzMjJ9.3TbVTcXS
   *                dryTDm_huuXC_U1Lg4rL0SOFyn_WAsC6W0Y"
   *      "user": {
   *        "user_id": 21,
   *        "username": "johnd",
   *        "email": "johnd@example.com",
   *        "user_level_id": 2
   *      }
   *    }
   *
   * @apiUse UnauthorizedError
   */
  .post(postLogin);

// onko token validi -> check token  AJA APIDOC node ./node_modules/apidoc/bin/apidoc ."/src"
// GET http://localhost:3000/api/auth/me
authRouter
  .route('/me')
  /**
   * @api {get} /auth/me Get user info
   * @apiVersion 1.0.0
   * @apiName GetMe
   * @apiGroup Authentication
   * @apiPermission token
   * @apiHeader {String} Authorization Bearer token.
   * @apiHeaderExample {json} Header-Example:
   *    {
   *      "Authorization": "Bearer <token>",
   *    }
   * @apiSuccess {Object} user User info.
   * @apiSuccess {Number} user.user_id Id of the User.
   * @apiSuccess {String} user.username Username of the User.
   * @apiSuccess {String} user.email email of the User.
   * @apiSuccess {Number} user.user_level_id User level id of the User.
   * @apiSuccess {Number} user.iat Token creation timestamp.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "user_id": 21,
   *       "username": "johnd",
   *       "email": "johnd@example.com",
   *       "user_level_id": 2,
   *       "iat": 1701279021
   *     }
   *
   * @apiError InvalidToken Authentication token was invalid.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 403 Forbidden
   *     {
   *       "message": "invalid token"
   *     }
   */
  .get(authenticateToken, getMe);

// USER VALIDATION
// POST http://localhost:3000/api/auth/register
authRouter
  .route('/register')
  /**
   * @api {post} /register Register
   * @apiVersion 1.0.0
   * @apiName PostRegister
   * @apiGroup Authentication
   * @apiPermission all
   *
   * @apiDescription Create a new user account. Input is validated for username, password, and email.
   *
   * @apiParam {String} username Username for the new user (3-20 characters, alphanumeric).
   * @apiParam {String} password Password for the new user (minimum 8 characters).
   * @apiParam {String} email Email address for the new user (valid email format).
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "username": "NewUser",
   *      "password": "salasana",
   *      "email": "user@example.com"
   *    }
   *
   * @apiSuccess {String} message Confirmation message.
   * @apiSuccess {Object} user Created user information.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 201 Created
   *    {
   *      "message": "User registered successfully",
   *      "user": {
   *        "user_id": 22,
   *        "username": "NewUser",
   *        "email": "user@example.com"
   *      }
   *    }
   *
   * @apiError ValidationError Input validation failed.
   * @apiErrorExample Error-Response:
   *    HTTP/1.1 400 Bad Request
  * {
        "error": {
          "message": "Validation erros: username ,password ",
          "status": 400
        }
      }
   *
   * @apiUse UnauthorizedError
   */

  .post(
    body('username').trim().isAlphanumeric().isLength({min: 3, max: 20}),
    body('password').isLength({min: 8}),
    body('email').isEmail(),
    validationErrorHandler, // käytetään validoinnin error handleria ennen kuin postataan uusi käyttäjä
    postUser,
  ); // body middleware -validointi -> parametriin mitkä kohdat validoiidaan
// validoinnin rajaukset validaattorissa, ei tietokannoissa
// trimmi sanitaattori

// DELETE http://localhost:3000/api/auth/delete/media/12
authRouter
  .route('/delete/media/:id')

  /**
   * @api {delete} /delete/media/:id Delete Media Item with Authorization
   * @apiVersion 1.0.0
   * @apiName DeleteMediaItemWithAuth
   * @apiGroup Media
   * @apiPermission token
   *
   * @apiDescription Delete a media item by its unique ID. Requires a valid authentication token. Only the user who owns the media item can delete it.
   *
   * @apiHeader {String} Authorization Bearer token for authentication.
   *
   * @apiParam {Number} id The unique identifier of the media item to delete (URL parameter).
   *
   * @apiParamExample {json} Request-Example:
   *    DELETE http://localhost:3000/api/delete/media/22
   *    Authorization: Bearer <token>
   *
   * @apiSuccess {String} message A success message confirming the deletion.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "Media item deleted successfully."
   *    }
   *
   * @apiError UnauthorizedError Invalid or missing authentication token, or the user does not have permission to delete the item.
   * @apiErrorExample Unauthorized-Error-Response:
   *    HTTP/1.1 401 Unauthorized
   *    {
   *      "error": {
   *        "message": "Unauthorized - can't delete this item.",
   *        "status": 401
   *      }
   *    }
   *
   * @apiError NotFoundError Media item not found or no permission to delete it.
   * @apiErrorExample NotFound-Error-Response:
   *    HTTP/1.1 404 Not Found
   *    {
   *      "error": {
   *        "message": "Media item not found or you do not have permission to delete it.",
   *        "status": 404
   *      }
   *    }
   */

  .delete(authenticateToken, deleteMedia);

export default authRouter;
