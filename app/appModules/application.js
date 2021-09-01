class application {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.mysql = require('mysql');

  }
  run() {
    const me = this;
    const config = me.req.app.get('config');
    delete require.cache[config.root +'/config/mysql.json'];
    const cfg = require(config.root +'/config/mysql.json').devDB;
    const connection = me.mysql.createConnection(cfg);
    connection.connect();
    const mapping = {
      type : 'type' ,
      visitorFP :'visitorId',
      address: 'address',
      description: 'description',
      phone: 'phone',
      qualification: 'qualification'
    }
    const sql = "INSERT INTO application (" + Object.keys(mapping).join(',') + ") VALUES ?";
    const values =[];
    for (let k in mapping) {
      values.push((!me.req.body || !me.req.body.data[mapping[k]]) ? '':  me.req.body.data[mapping[k]])
    }
    connection.query(sql, [[values]], function (err, result) {
      if (err) {
        me.res.send({status: 'failure', message:err.message});
      } else {
        me.res.send({status: 'success', data: result});
      }
    });
    connection.end();
   
    // 
  }
}
module.exports  = application;
