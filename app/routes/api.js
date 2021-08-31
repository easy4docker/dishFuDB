var express = require('express');
var router = express.Router();

router.get('/:module/:id', function(req, res, next) {
  const config = req.app.get('config');
  delete require.cache[config.root +'/appModules/index.js'];
  const appEngine = require(config.root +'/appModules/index.js');
  appEngine(req, res, next);
  return true;
});

router.post('/:module/:id', function(req, res, next) {
  const config = req.app.get('config');
  delete require.cache[config.root +'/appModules/index.js'];
  const appEngine = require(config.root +'/appModules/index.js');
  appEngine(req, res, next);
  return true;
});

module.exports = router;
