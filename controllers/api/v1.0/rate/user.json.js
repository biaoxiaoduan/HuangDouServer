/**
 * Created by yanbiao on 04/21/18.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var id = req.query.id;

        var result = {
            success: true,
            errorCode: 0,
            data: {
                count: 0,
                list: []
            }
        };
        var condition = {
            where: {
                psId: id
            }
        };

        var Rate = Model.Rate;
        Rate.findAll(condition).then(function (collects) {
            if (collects == null || collects.length === 0) {
                result.success = true;
                result.data.count = 0;
                console.log(result);
                res.send(result);
            } else {
                result.data.count = collects.length;
                for (var i = 0; i < collects.length; i++) {
                    result.data.list.push(collects[i].userId);
                }
                res.send(result);
            }
        }).error(function(error){
            result.success = false;
            res.send(result);
        });
    });
};
