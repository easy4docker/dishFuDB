module.exports = (req, res, next)=> {
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
  return true;
}