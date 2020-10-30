const router = require('express').Router();

const path = require('path');
const readFile = require('../utils/read-file.js');

const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  readFile(jsonDataPath)
    .then((data) => res.send(data))
    .catch((err) => (res.status(500).json({ message: `На сервере произошла ошибка ${err}` })));
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  readFile(jsonDataPath)
    .then((data) => {
      const userToFind = data.find((user) => user._id === id);
      return userToFind;
    })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => res.status(500).json({ message: `На сервере произошла ошибка ${err}` }));
});

module.exports = router;
