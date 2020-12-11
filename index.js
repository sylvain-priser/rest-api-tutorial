require('log-timestamp');

const config = require('./common/config/env.config.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AuthorizationRouter = require('./authorization/routes.config');
const CRG_SIC_Router = require('./crg_sic/routes.config');

console.log('index.js : Step #01');

app.use(function (req, res, next) {
    console.log('index.js : Step #02 : app.use()');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        console.log('index.js : Step #02.a : returns 200');
        return res.sendStatus(200);        
    } else {
        console.log('index.js : Step #02.b : returns next()');
        return next();
    }
});

console.log('index.js : Step #03');

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
CRG_SIC_Router.routesConfig(app);

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
