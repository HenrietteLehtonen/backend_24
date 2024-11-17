// MODEL = MITEN DATAA KÄSITELLÄÄN JA PÄIVITETÄÄN
// ( datan hakeminen, käsittely, tallennus)
// toiminto millä haetaan tietokannasta

import promisePool from '../lib/database.js';

const fetchMediaItems = async () => {
  // korvataan haku tietokannasta
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('Database error: ' + e.message);
  }
};

const fetchMediaItemsByID = async (id) => {
  try {
    // haetaan db
    const sql = 'SELECT * FROM MediaItems WHERE media_id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    throw new Error('Database error: ' + e.message);
  }
};

const addMediaItem = async (newItem) => {
  const sql = `INSERT INTO MediaItems 
              (user_id, title, description, filename, filesize, media_type)
              VALUES (?,?,?,?,?,?)`;
  const params = [
    newItem.user_id,
    newItem.title,
    newItem.description,
    newItem.filename,
    newItem.filesize,
    newItem.media_type,
  ];
  // implement try - catch
  try {
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (error) {
    console.error('addMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

export {fetchMediaItems, addMediaItem, fetchMediaItemsByID};
