import express from 'express';
import {
  deleteUserByID,
  getUserId,
  getUsers,
} from '../controllers/user-contoller.js';

// user router
const userRouter = express.Router();

// User endpoint yleinen
userRouter
  .route('/')
  /**
   * @api {get} /users Get All Users
   * @apiVersion 1.0.0
   * @apiName GetUsers
   * @apiGroup User
   * @apiPermission token
   *
   * @apiDescription Get a list of all users. Requires a valid authentication token.
   *
   * @apiHeader {String} Authorization Bearer token for authentication.
   *
   * @apiSuccess {Object[]} users List of all users.
   * @apiSuccess {Number} users.user_id The unique identifier of the user.
   * @apiSuccess {String} users.username The username of the user.
   * @apiSuccess {String} users.email The email address of the user.
   * @apiSuccess {Number} users.user_level_id The user level ID.
   * @apiSuccess {String} users.created_at The timestamp when the user was created.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
   *      {
   *        "user_id": 1,
   *        "username": "JohnDoe",
   *        "email": "johndoe@example.com",
   *        "user_level_id": 2,
   *        "created_at": "2024-11-26T09:00:56.000Z"
   *      },
   *      {
   *        "user_id": 2,
   *        "username": "JaneSmith",
   *        "email": "janesmith@example.com",
   *        "user_level_id": 2,
   *        "created_at": "2024-11-26T09:00:56.000Z"
   *      },
   *      {
   *        "user_id": 10,
   *        "username": "UUutuus",
   *        "email": "newuser@example.com",
   *        "user_level_id": 2,
   *        "created_at": "2024-11-26T15:21:59.000Z"
   *      },
   *      {
   *        "user_id": 11,
   *        "username": "AdminUser",
   *        "email": "admin@example.com",
   *        "user_level_id": 1,
   *        "created_at": "2024-11-26T16:45:21.000Z"
   *      },
   *      {
   *        "user_id": 12,
   *        "username": "NewUser",
   *        "email": "user@example.com",
   *        "user_level_id": 1,
   *        "created_at": "2024-11-27T13:01:02.000Z"
   *      }
   *    ]
   *
   * @apiError UnauthorizedError Invalid or missing authentication token.
   * @apiErrorExample Unauthorized-Error-Response:
   *    HTTP/1.1 401 Unauthorized
   *    {
   *      "error": {
   *        "message": "Invalid or missing token.",
   *        "status": 401
   *      }
   *    }
   *
   * @apiError DatabaseError Error fetching users from the database.
   * @apiErrorExample Database-Error-Response:
   *    HTTP/1.1 503 Service Unavailable
   *    {
   *      "error": {
   *        "message": "Database error",
   *        "status": 503
   *      }
   *    }
   */
  .get(getUsers);

// TODO User endpoint id
userRouter
  .route('/:id')

  /**
   * @api {get} /users/:id Get User by ID
   * @apiVersion 1.0.0
   * @apiName GetUserById
   * @apiGroup User
   * @apiPermission token
   *
   * @apiDescription Fetch a user by their unique user ID. Requires authentication.
   *
   * @apiParam {Number} id The unique identifier of the user.
   *
   * @apiHeader {String} Authorization Bearer token for authentication.
   *
   * @apiSuccess {Number} user_id The unique identifier of the user.
   * @apiSuccess {String} username The username of the user.
   * @apiSuccess {String} email The email address of the user.
   * @apiSuccess {Number} user_level_id The user level ID.
   * @apiSuccess {String} created_at The timestamp when the user was created.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "user_id": 1,
   *      "username": "JohnDoe",
   *      "email": "johndoe@example.com",
   *      "user_level_id": 2,
   *      "created_at": "2024-11-26T09:00:56.000Z"
   *    }
   *
   * @apiError UnauthorizedError Invalid or missing authentication token.
   * @apiErrorExample Unauthorized-Error-Response:
   *    HTTP/1.1 401 Unauthorized
   *    {
   *      "error": {
   *        "message": "Invalid or missing token.",
   *        "status": 401
   *      }
   *    }
   *
   * @apiError NotFoundError User not found by ID.
   * @apiErrorExample NotFound-Error-Response:
   *    HTTP/1.1 404 Not Found
   *    {
   *      "error": {
   *        "message": "User not found by id",
   *        "status": 404
   *      }
   *    }
   *
   * @apiError DatabaseError Error fetching user from the database.
   * @apiErrorExample Database-Error-Response:
   *    HTTP/1.1 503 Service Unavailable
   *    {
   *      "error": {
   *        "message": "Database error",
   *        "status": 503
   *      }
   *    }
   */
  .get(getUserId)

  /**
   * @api {delete} /users/:id Delete User by ID
   * @apiVersion 1.0.0
   * @apiName DeleteUserById
   * @apiGroup User
   * @apiPermission token
   *
   * @apiDescription Deletes a user by their unique user ID. Requires authentication.
   *
   * @apiParam {Number} id The unique identifier of the user.
   *
   * @apiHeader {String} Authorization Bearer token for authentication.
   *
   * @apiSuccess {String} message Confirmation message that the user was deleted.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "User deleted 1 22"
   *    }
   *
   * @apiError UnauthorizedError Invalid or missing authentication token.
   * @apiErrorExample Unauthorized-Error-Response:
   *    HTTP/1.1 401 Unauthorized
   *    {
   *      "error": {
   *        "message": "Invalid or missing token.",
   *        "status": 401
   *      }
   *    }
   *
   * @apiError NotFoundError User not found by ID.
   * @apiErrorExample NotFound-Error-Response:
   *    HTTP/1.1 404 Not Found
   *    {
   *      "error": {
   *        "message": "User not found",
   *        "status": 404
   *      }
   *    }
   *
   * @apiError DatabaseError Error deleting user from the database.
   * @apiErrorExample Database-Error-Response:
   *    HTTP/1.1 503 Service Unavailable
   *    {
   *      "error": {
   *        "message": "Database error",
   *        "status": 503
   *      }
   *    }
   */

  .delete(deleteUserByID);

export default userRouter;
