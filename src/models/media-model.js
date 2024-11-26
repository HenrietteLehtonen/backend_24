// MODEL = MITEN DATAA KÄSITELLÄÄN JA PÄIVITETÄÄN
// ( datan hakeminen, käsittely, tallennus)
// toiminto millä haetaan tietokannasta

import promisePool from '../lib/database.js';

// GET ALL MEDIA ITEMS
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

// GET MEDIA BY MEDIA ID
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

// POST CREATE NEW ITEM
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
  try {
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (error) {
    console.error('addMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

// Lisätty PUT
const updateMediaItem = async (id, userId, updatedItem) => {
  const sql = `UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ? AND user_id = ?`;
  const params = [updatedItem.title, updatedItem.description, id, userId];
  try {
    const result = await promisePool.query(sql, params);
    console.log('updateMediaItem', result);
    return result[0].affectedRows;
  } catch (error) {
    console.error('updateMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

// DELETE ITEM BY ID
const deleteMediaItembyID = async (media_id, user_id) => {
  try {
    const sql = `DELETE FROM MediaItems WHERE media_id = ?`;
    const [result] = await promisePool.query(sql, [media_id, user_id]);
    return result.affectedRows;
  } catch (error) {
    console.error('deleteMediaItembyID', error.message);
  }
};

export {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemsByID,
  updateMediaItem,
  deleteMediaItembyID,
};
