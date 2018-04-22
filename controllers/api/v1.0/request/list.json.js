/**
 * Created by yanbiao on 04/21/18.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        var uuid = req.body.uuid;
        var result = {
            success: true,
            errorCode: 0,
            data: {
                count: 0,
                list: []
            }
        };
        var BeforePS = Model.BeforePS;
        BeforePS.findAll({
            where: {
                authorId: uuid
            }
        }).then(function (contents) {
            if (contents == null){
                result.success = true;
                result.data.count = 0;
                res.send(result);
            } else {
                result.success = true;
                result.data.count = contents.length;
                for (var i = 0; i < contents.length; i++) {
                    result.data.list.push(contents[i]);
                }
            }
        }).error(function(error){
            console.log(error);
            result.success = false;
            res.send(result);
        });
    });
};
