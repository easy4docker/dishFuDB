module.exports = (req, res, next)=> {
  switch (req.params.module) {
    case 'application':
      delete require.cache[__dirname +'/application.js'];
      const Application = require(__dirname +'/application.js');
      const application = new Application(req, res, next);
      if (!!req.body.action && typeof application[req.body.action] === 'function') {
        application[req.body.action]();
      } else {
        application.actionError();
      }
      break
    case 'community':
      delete require.cache[__dirname +'/community.js'];
      const Community = require(__dirname +'/community.js');
      const community = new Community(req, res, next);
      if (!!req.body.action && typeof community[req.body.action] === 'function') {
        community[req.body.action]();
      } else {
        community.actionError();
      }
      break

    case 'menu':
      delete require.cache[__dirname +'/menu.js'];
      const Menu = require(__dirname +'/menu.js');
      const menu = new Menu(req, res, next);
      if (!!req.body.action && typeof menu[req.body.action] === 'function') {
        community[req.body.action]();
      } else {
        community.actionError();
      }
      break

    default: 
      res.send({status: 'failure', message: 'wrong or missing module!'});
    break;
  }
}