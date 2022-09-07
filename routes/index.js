var express = require('express');
var router = express.Router();

router.get('*', function(req, res){
  res.status(404).send('what???');
});

module.exports = router;
