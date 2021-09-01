class  Menu {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.mysql = require('mysql');
    const config = this.req.app.get('config');
    delete require.cache[config.root +'/config/mysql.json'];
    this.cfg = require(config.root +'/config/mysql.json').devDB;
  }
  addMenu() {

  }
  getList() {
    const me = this;
    const connection = me.mysql.createConnection(me.cfg);
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
