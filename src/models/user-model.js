import promisePool from '../lib/database.js';

const fetchUsers = async () => {
  // korvataan haku tietokannasta
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('Database error: ' + e.message);
  }
};

export {fetchUsers};
