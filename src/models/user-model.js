// MODEL = MITEN DATAA KÄSITELLÄÄN JA PÄIVITETÄÄN
// ( datan hakeminen, käsittely, tallennus)
// toiminto millä haetaan tietokannasta

// tietokantayhteys
import promisePool from '../lib/database.js';

const fetchUsers = async () => {
  // haetaan tietokannasta
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('Database error: ' + e.message);
  }
};

// GET USER BY ID
const getUserbyID = async (id) => {
  try {
    const sql =
      'SELECT user_id, username, user_level_id FROM Users WHERE user_id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    return rows[0];
  } catch (error) {
    console.error('getUserbyID', error.message);
    throw new Error('Database error ' + error.message);
  }
};

// DELETE USER
const deleteUser = async (user_id) => {
  try {
    // const sql = `
    //     DELETE FROM Comments, Likes, Ratings, MediaItems WHERE user_id = ? AND
    //     DELETE FROM Users WHERE user_id = ?
    // `;
    // const [result] = await promisePool.query(sql, [user_id]);
    // Poista fk tiedot ensin
    await promisePool.query('DELETE FROM Comments WHERE user_id = ?', [
      user_id,
    ]);
    await promisePool.query('DELETE FROM Likes WHERE user_id = ?', [user_id]);
    await promisePool.query('DELETE FROM Ratings WHERE user_id = ?', [user_id]);
    await promisePool.query('DELETE FROM MediaItems WHERE user_id = ?', [
      user_id,
    ]);

    // Poista itse käyttäjä
    const [result] = await promisePool.query(
      'DELETE FROM Users WHERE user_id = ?',
      [user_id],
    );
    return result.affectedRows;
  } catch (e) {
    console.error('Cant delete user by user_id', e.message);
    throw new Error('Database error ' + e.message);
  }
};

// KIRJAUTUMINEN
const selectUserbyUserName = async (username) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, password, email, user_level_id FROM Users WHERE username = ?',
      [username],
    );
    return rows[0];
  } catch (error) {
    console.error('selectUserbyUserName', error.message);
    throw new Error('Database error ' + error.message);
  }
};

// ADD USER
const addUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;
    // user level id defaulttina 2 -> normi käyttäjä (id:1 admin)
    const params = [user.username, user.email, user.password, 1];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {fetchUsers, selectUserbyUserName, getUserbyID, addUser, deleteUser};
