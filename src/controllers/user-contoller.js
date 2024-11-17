import {fetchUsers} from '../models/user-model.js';

// GET ALL
const getUsers = async (req, res) => {
  try {
    res.json(await fetchUsers());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'Database error'});
  }
};
export {getUsers};
