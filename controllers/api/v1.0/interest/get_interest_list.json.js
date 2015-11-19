/**
 * Created by shangshangli on 15/11/18.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log('get interest called');
        var role = req.query.role;
        var count = req.count;
        var result = {
            success: true, error: '', count:0, data:[]
        };
        var Interest = Model.Interest;
        Interest.findAll({
            order: 'hot DESC'
        }).then(function (interests) {
            if (interests == null) {
                result.success = true;
                result.count = 0;
                req.send(result);
            } else {
                result.count = interests.length;
                for (var i = 0; i < result.count; i++) {
                    if (interests[i].role == role)
                        result.data.push(interests[i].id);
                }

                if (result.data.length < count) {
                    for (var i = 0; i < result.count; i++) {
                        if (interests[i].role != role)
                            result.data.push(interests[i].id);
                        if (result.data.length > count)
                            break;
                    }
                }

                result.success = true;
                res.send(result);
            }
        }).error(function(error){
            result.success = false;
            res.send(result);
        });
    });
};
