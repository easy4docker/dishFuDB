class  Community {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.mysql = require('mysql');

  }
  publish() {
    const me = this;
    const config = me.req.app.get('config');
    delete require.cache[config.root +'/config/mysql.json'];
    const cfg = require(config.root +'/config/mysql.json').devDB;
    const connection = me.mysql.createConnection(cfg);
    connection.connect();
    const mapping = {
      docType : 'docType' ,
      publishCode :'publishCode',
      authCode: 'authCode',
      publisher: 'publisher',
      created: ()=>  new Date(),
      status: ()=> 0
    }
    const sql = "INSERT INTO communityDoc (" + Object.keys(mapping).join(',') + ") VALUES ?";
    const values =[];
    for (let k in mapping) {
      const func = (typeof mapping[k] === 'function') ?  true :  false;
      values.push((!me.req.body || !me.req.body.data[mapping[k]]) ? (func) ? mapping[k]() : '' 
          :  me.req.body.data[mapping[k]])
    }
    connection.query(sql, [[values]], function (err, result) {
      if (err) {
        me.res.send({status: 'failure', message:err.message});
      } else {
        me.res.send({status: 'success', data: result});
      }
    });
    connection.end();
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
    // 
  }
  actionError() {
    const me = this;
    me.res.send({status: 'failure',  message: 'Action Error!'});
  }
}
module.exports  = Community;
