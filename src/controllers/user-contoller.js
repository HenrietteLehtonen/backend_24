import {
  fetchUsers,
  addUser,
  getUserbyID,
  deleteUser,
} from '../models/user-model.js';
import {customError} from '../middlewares/error-handler.js';
import bcrypt from 'bcryptjs';

// GET ALL USERS
const getUsers = async (req, res) => {
  try {
    res.json(await fetchUsers());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'Database error'});
  }
};

// POST USER - lisätään käyttäjä
const postUser = async (req, res, next) => {
  const user = req.body; // tallennetaan useriin username,ss,email jos menee validoinnista läpi
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  console.log('hash', hashedPassword);
  user.password = hashedPassword;
  try {
    const newUserId = await addUser(req.body);
    res.json({message: 'new user added', user_id: newUserId});
  } catch (error) {
    console.error('postUser', error.message);
    // res.status(503).json({error: 503, message: 'Database error'});
    return next(customError(error.message, 503));
  }
};

// TODO GET USER BY ID, DELETE USER, UPDATE USER

// GET USER BY ID
const getUserId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserbyID(id);
    console.log(id, user);
    if (user) {
      res.json(user);
    } else {
      return next(customError('User not found by id', 404));
    }
  } catch (error) {
    console.error('Get user by id', error.message);
    res.status(503).json({error: 503, message: 'Database error'});
  }
};

// DELETE USER BY USER ID
const deleteUserByID = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await deleteUser(id);
    console.log(user, id);
    if (user) {
      res.json({message: 'User deleted' + user + id});
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error(`Can't delete user by id`, error.message);
    res.status(503).json({error: 503, message: 'Database error'});
  }
};

export {getUsers, postUser, getUserId, deleteUserByID};
