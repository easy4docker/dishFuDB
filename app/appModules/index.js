module.exports = (req, res, next)=> {
  switch (req.params.module) {
    case 'application':
      delete require.cache[__dirname +'/application.js'];
      const Application = require(__dirname +'/application.js');
      const application = new Application(req, res, next);
      application.run();
      break
    default: 
      const config = req.app.get('config');
      const mysql      = require('mysql');
      delete require.cache[config.root +'/config/mysql.json'];
      const cfg = require(config.root +'/config/mysql.json').devDB;
      const connection = mysql.createConnection(cfg);
      connection.connect();
      connection.query('show tables;', function (error, results) {
        if (error) {
          res.send({err: error});
        } else {
          res.send({status: 'success', data: results});
        }
      });
      connection.end();
    break;
  }
}