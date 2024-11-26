import multer from 'multer';
import {customError} from './error-handler.js';

// lisättävä data tallennetaan uploads kansioon
// multer conifg -> käytetään tässä filun validointia
const upload = multer({
  dest: 'uploads/',
  limits: {fileSize: 1024 * 1024 * process.env.MAX_FILE_SIZE}, // upload file size limit
  fileFilter: (req, file, cb) => {
    // tiedostotyypit mitkä hyväksyy
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      // accept file
      cb(null, true);
    } else {
      // reject file
      const error = customError('File invalid!', 400);
      cb(error, false);
    }
  },
});
export default upload;
