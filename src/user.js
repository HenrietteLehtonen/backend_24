// USERS ENDPOINT

const userData = [
  {
    user_id: 260,
    username: 'VCHar',
    password: '********',
    email: 'vchar@example.com',
    user_level_id: 1,
    created_at: '2020-09-12T06:56:41.000Z',
  },
  {
    user_id: 305,
    username: 'Donatello',
    password: '********',
    email: 'dona@example.com',
    user_level_id: 1,
    created_at: '2021-12-11T06:00:41.000Z',
  },
  {
    user_id: 3609,
    username: 'Anon5468',
    password: '********',
    email: 'x58df@example.com',
    user_level_id: 3,
    created_at: '2023-04-02T05:56:41.000Z',
  },
];

// METODIT

// kaikki

const getUsers = (res) => {
  res.json(userData);
};

// get id
const getUserID = (req, res) => {
  const id = parseInt(req.params.id);
  const user = userData.find((item) => item.user_id === id);
  if (user) {
    if (req.query.format === 'plain') {
      res.send(user.name);
    } else {
      res.json(user);
    }
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

// lisää

const addUser = (req, res) => {
  console.log('post req body', req.body);
  const newUser = req.body;
  newUser.user_id = userData[userData.length - 1].user_id + 1;
  userData.push(newUser);
  res.status(201).json({message: 'User added', id: newUser.user_id});
};

// POISTA
const delUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = userData.findIndex((item) => item.user_id === id);

  if (user !== -1) {
    res.json({message: 'User:' + id + ' deleted succesfully.'});
    userData.splice(user, 1);
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

export {getUsers, getUserID, addUser, delUser};
