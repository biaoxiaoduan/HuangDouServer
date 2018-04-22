/**
 * Created by yanbiao on 04/21/18.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        var uuid = req.body.uuid;
        var target = req.body.target;

        var result = {
            success: true,
            errorCode: 0
        };

        var Collect = Model.Collect;
        var newCollect = Collect.build({
            userId: uuid,
            psId: target
        });
        newCollect.save().then(function onSuccess(shit) {
            res.send(result);
        }).error(function(error){
            console.log(error);
            result.success = false;
            res.send(result);
        });

    });
};
