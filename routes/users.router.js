const express = require('express');
//const faker = require('faker');
const router = express.Router();

router.get('/',(req,res)=>{
  //const users = [];
  res.send('Estas en users')
})

module.exports = router;
