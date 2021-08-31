module.exports = (req, res, next)=> {
  const config = req.app.get('config');
  const mysql      = require('mysql');
  const cfg = require(config.root +'/config/mysql.json').devDB;
  const connection = mysql.createConnection(cfg);
  connection.connect();
  connection.query('show tables;', function (error, results) {
    if (error) {
      res.send({err: error});
    } else {
      res.send({status: 'successq', data: results, dirname:__dirname});
    }
  });
  connection.end();
  return true;
}