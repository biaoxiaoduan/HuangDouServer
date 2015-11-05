/**
 * Created by yanbiao on 11/5/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log("delete status " + req.query.statusId);
        var Status = Model.Status;
        var statusId = req.query.statusId;
        var result = {
            success:true,
            error: '',
            deletedId: 0
        };
        if (statusId == null || statusId == undefined) {
            result.success = false;
            result.error = 'invalid params';
            res.send(result);
            return;
        }
        Status.destroy({where:{id : statusId}}).then(function(msg){
            result.success = true;
            result.deletedId = statusId;
            res.send(result);
        }).error(function(err){
            result.success = false;
            result.deletedId = statusId;
            result.error = err;
            res.send(result);
        });
    });
}
