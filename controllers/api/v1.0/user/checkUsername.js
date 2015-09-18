/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var userName = req.query.userName;
        var User = Model.User;
        var result = {'success': true, 'exist': false};
        User.find({where: {username: userName}}).then(function (user) {
            result.success = true;
            if (user == null)
                result.exist = false;
            else
                result.exist = true;
            res.send(result);
        }).error(function (err) {
            result.success = false;
            res.send(result);
        });
    });
};


