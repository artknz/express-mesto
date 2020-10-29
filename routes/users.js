const router = require('express').Router()
const readFile = require('../utils/read-file.js')

const path = require('path')

const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json')

router.get('/users', (req, res) => {
  readFile(jsonDataPath)
    .then(data => res.send(data))
})

router.get('/users/:id', (req, res) => {
  const { id } = req.params
  readFile(jsonDataPath)
    .then(data => {
      const userToFind = data.find(user => user._id === id)
      return userToFind
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Нет пользователя с таким id" })
      }
      res.send(user)
    })
})

module.exports = router