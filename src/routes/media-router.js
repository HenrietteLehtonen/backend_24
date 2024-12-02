import express from 'express';
import {
  getItems,
  getID,
  postItem,
  putItem,
  deleteMedia,
} from '../controllers/media-controller.js';
import {authenticateToken} from '../middlewares/authenticaton.js';
import 'dotenv/config';
import {body} from 'express-validator';
import upload from '../middlewares/upload-media.js';

// router
const mediaRouter = express.Router();

// Media endpoint
mediaRouter
  .route('/')

  /**
   * @api {get} /media/items Get All Media Items
   * @apiVersion 1.0.0
   * @apiName GetAllMediaItems
   * @apiGroup Media
   * @apiPermission all
   *
   * @apiDescription Retrieve all media items from the database.
   *
   * @apiSuccess {Object[]} mediaItems List of media items.
   * @apiSuccess {Number} mediaItems.media_id Unique identifier for the media item.
   * @apiSuccess {Number} mediaItems.user_id User ID of the uploader.
   * @apiSuccess {String} mediaItems.filename File name of the media item.
   * @apiSuccess {Number} mediaItems.filesize Size of the file in bytes.
   * @apiSuccess {String} mediaItems.media_type MIME type of the media item.
   * @apiSuccess {String} mediaItems.title Title of the media item.
   * @apiSuccess {String} [mediaItems.description] Description of the media item (optional).
   * @apiSuccess {String} mediaItems.created_at Timestamp when the item was created.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
   *      {
   *        "media_id": 1,
   *        "user_id": 1,
   *        "filename": "sunset.jpg",
   *        "filesize": 1024,
   *        "media_type": "image/jpeg",
   *        "title": "Sunset",
   *        "description": "A beautiful sunset",
   *        "created_at": "2024-11-26T09:00:56.000Z"
   *      },
   *      {
   *        "media_id": 2,
   *        "user_id": 2,
   *        "filename": "sample.mp4",
   *        "filesize": 20480,
   *        "media_type": "video/mp4",
   *        "title": "Sample Video",
   *        "description": "A sample video file",
   *        "created_at": "2024-11-26T09:00:56.000Z"
   *      }
   *    ]
   *
   * @apiError DatabaseError Unable to retrieve data from the database.
   * @apiErrorExample Error-Response:
   *    HTTP/1.1 503 Service Unavailable
   *    {
   *      "error": "Database error!",
   *      "status": 503
   *    }
   */

  .get(getItems)

  /**
   * @api {post} /media Add New Media Item
   * @apiVersion 1.0.0
   * @apiName PostMediaItem
   * @apiGroup Media
   * @apiPermission token
   *
   * @apiDescription Add a new media item to the system. Requires an authenticated user and a file upload.
   *
   * @apiHeader {String} Authorization Bearer token for authentication.
   *
   * @apiParam {String} title Title of the media item (5-50 characters).
   * @apiParam {String} [description] Description of the media item (optional).
   * @apiParam {File} file File to upload (image/video).
   *
   * @apiParamExample {multipart/form-data} Request-Example:
   *    POST http://localhost:3000/api/media
   *    Authorization: Bearer <token>
   *    Content-Type: multipart/form-data; boundary=----Boundary
   *
   *    ------Boundary
   *    Content-Disposition: form-data; name="title"
   *
   *    Lisätty kuva autentikoinnilla
   *    ------Boundary
   *    Content-Disposition: form-data; name="description"
   *
   *    Esimerkki description
   *    ------Boundary
   *    Content-Disposition: form-data; name="file"; filename="image.jpg"
   *    Content-Type: image/png
   *
   *    < ./cat2.png
   *    ------Boundary--
   *
   * @apiSuccess {String} message Confirmation message.
   * @apiSuccess {Number} id ID of the newly created media item.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 201 Created
   *    {
   *      "message": "Item added",
   *      "id": 21
   *    }
   *
   * @apiError InvalidFile Missing or invalid file upload.
   * @apiErrorExample Error-Response:
   *    HTTP/1.1 404 Not Found
   *    {
   *      "error": "Invalid or missing file!",
   *      "status": 404
   *    }
   *
   * @apiError InvalidInput Validation failed for input fields.
   * @apiErrorExample Error-Response:
   *    HTTP/1.1 400 Bad Request
   *    {
   *      "error": "Validation failed",
   *      "details": [
   *        "Title must be between 5 and 50 characters"
   *      ]
   *    }
   *
   * @apiError UnauthorizedError Authentication token is missing or invalid.
   * @apiErrorExample Error-Response:
   *    HTTP/1.1 401 Unauthorized
   *    {
   *      "error": "Unauthorized access",
   *      "status": 401
   *    }
   */

  .post(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({min: 5, max: 50}),
    postItem,
  );

// TSEKKAA NÄÄ !! ylempi ja alempi
mediaRouter
  .route('/:id')

  /**
   * @api {get} /media/:id Get Media Item by ID
   * @apiVersion 1.0.0
   * @apiName GetMediaByID
   * @apiGroup Media
   * @apiPermission all
   *
   * @apiDescription Retrieve a specific media item by its unique ID.
   *
   * @apiParam {Number} id The unique identifier of the media item.
   *
   * @apiSuccess {Number} media_id Unique identifier for the media item.
   * @apiSuccess {Number} user_id User ID of the uploader.
   * @apiSuccess {String} filename File name of the media item.
   * @apiSuccess {Number} filesize Size of the file in bytes.
   * @apiSuccess {String} media_type MIME type of the media item.
   * @apiSuccess {String} title Title of the media item.
   * @apiSuccess {String} [description] Description of the media item (optional).
   * @apiSuccess {String} created_at Timestamp when the item was created.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "media_id": 2,
   *      "user_id": 2,
   *      "filename": "sample.mp4",
   *      "filesize": 20480,
   *      "media_type": "video/mp4",
   *      "title": "Sample Video",
   *      "description": "A sample video file",
   *      "created_at": "2024-11-26T09:00:56.000Z"
   *    }
   *
   * @apiError NotFound The media item with the specified ID does not exist.
   * @apiErrorExample Error-Response:
   *    HTTP/1.1 404 Not Found
   *    {
   *      "error": {
   *        "message": "Item not found!",
   *        "status": 404
   *      }
   *    }
   */
  .get(getID)

  /**
   * @api {put} /media/:id Update Media Item by ID
   * @apiVersion 1.0.0
   * @apiName UpdateMediaItem
   * @apiGroup Media
   * @apiPermission token
   *
   * @apiDescription Update an existing media item by its unique ID. Requires a valid authentication token.
   *
   * @apiHeader {String} Authorization Bearer token for authentication.
   *
   * @apiParam {Number} id The unique identifier of the media item to update (URL parameter).
   * @apiParam {String} title The new title for the media item (5-50 characters).
   * @apiParam {String} [description] An optional description for the media item.
   * @apiParam {File} [file] An optional new file to replace the existing one.
   *
   * @apiParamExample {json} JSON-Request-Example:
   *    PUT http://localhost:3000/api/media/22
   *    Content-Type: application/json
   *    Authorization: Bearer <token>
   *
   *    {
   *      "title": "NEW TITLE FROM PUT with authorization",
   *      "description": "Item modified"
   *    }
   *
   * @apiSuccess {String} message A success message confirming the update.
   * @apiSuccess {Number} id The ID of the updated media item.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "Item updated",
   *      "id": "22"
   *    }
   *
   * @apiError UnauthorizedError Invalid or missing authentication token.
   * @apiErrorExample Unauthorized-Error-Response:
   *    HTTP/1.1 401 Unauthorized
   *    {
   *      "error": {
   *        "message": "Invalid token",
   *        "status": 401
   *      }
   *    }
   *
   * @apiError NotFoundError Media item not found or user has no permission to edit it.
   * @apiErrorExample NotFound-Error-Response:
   *    HTTP/1.1 404 Not Found
   *    {
   *      "error": {
   *        "message": "Media Item not found or no permission to edit",
   *        "status": 404
   *      }
   *    }
   */
  .put(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({min: 5, max: 50}),
    putItem,
  )

  /**
   * @api {delete} /media/:id Delete Media Item by ID
   * @apiVersion 1.0.0
   * @apiName DeleteMediaItem
   * @apiGroup Media
   * @apiPermission none
   *
   * @apiDescription Delete a media item by its unique ID. No authentication or authorization is required.
   *
   * @apiParam {Number} id The unique identifier of the media item to delete (URL parameter).
   *
   * @apiParamExample {json} Request-Example:
   *    DELETE http://localhost:3000/api/media/22
   *
   * @apiSuccess {String} message A success message confirming the deletion.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "Media with id 22 deleted successfully"
   *    }
   *
   * @apiError NotFoundError Media item not found.
   * @apiErrorExample NotFound-Error-Response:
   *    HTTP/1.1 404 Not Found
   *    {
   *      "error": {
   *        "message": "Item not found",
   *        "status": 404
   *      }
   *    }
   */

  .delete(deleteMedia);

export default mediaRouter;
