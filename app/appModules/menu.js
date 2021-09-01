class  Menu {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.mysql = require('mysql');

  }
  addMenu() {

  }
  getList() {
    const me = this;
    const config = me.req.app.get('config');
    delete require.cache[config.root +'/config/mysql.json'];
    const cfg = require(config.root +'/config/mysql.json').devDB;
    const connection = me.mysql.createConnection(cfg);
    connection.connect();
    const sql = "SELECT * FROM communityDoc";
    connection.query(sql, function (err, result, fields) {
      if (err) {
        me.res.send({status: 'failure', message:err.message});
      } else {
        me.res.send({status: 'success', data: result});
      }
    });
    connection.end();
  }
  actionError() {
    const me = this;
    me.res.send({status: 'failure',  message: 'Action Error!'});
  }
}
module.exports  = Menu;
