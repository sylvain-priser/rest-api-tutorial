const IntController = require('./controllers/int.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/int', [
        IntController.insert
    ]);
    app.get('/int', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        IntController.list
    ]);
    app.get('/int/:Id', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        //PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        IntController.getById
    ]);
    app.patch('/int/:Id', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        IntController.patchById
    ]);
};
