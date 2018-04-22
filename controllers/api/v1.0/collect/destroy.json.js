/**
 * Created by yanbiao on 04/21/18.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        var id = req.body.id;
        var result = {
            success: true,
            errorCode: 0,
            data: {
            }
        };
        var Collect = Model.Collect;
        Collect.find({
            where: {
                id: id
            }
        }).then(function (re) {
            if (re != null){
                Collect.destroy({where:{id : id}}).then(function(msg){
                    result.success = true;
                    res.send(result);
                });
            } else {
                console.log('other');
                result.success = false;
                res.send(result);
            }
        }).error(function(error){
            console.log(error);
            result.success = false;
            res.send(result);
        });
    });
};
