const express = require('express');

const router = express.Router();
//ejemplo categories/1/products/10
router.get('/:categoryId/products/:productId',(req,res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

module.exports = router;
