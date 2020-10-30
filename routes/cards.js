const router = require('express').Router();

const path = require('path');
const readFile = require('../utils/read-file.js');

const jsonDataPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  readFile(jsonDataPath)
    .then((data) => res.send(data))
    .catch((err) => (res.status(500).json({ message: `На сервере произошла ошибка ${err}` })));
});

module.exports = router;
