const express = require('express');
const router = express.Router();
let users = [
  // ...
];

router.get('/users', (req, res) => {
  // ...
});

router.get('/users/:id', (req, res) => {
  // ...
});

router.delete('/users/:id', (req, res) => {
  // ...
});

router.post('/users', (req, res) => {
  // ...
});

module.exports = router;