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
        var score = req.body.score;

        var result = {
            success: true,
            errorCode: 0
        };

        var Rate = Model.Rate;
        Rate.find({
            where: {
                userId: uuid,
                psId: target
            }
        }).then(function (re) {
            if (re === null) {
                var newRate = Rate.build({
                    userId: uuid,
                    psId: target,
                    score: score
                });
                newRate.save().then(function onSuccess(shit) {
                    res.send(result);
                }).error(function(error){
                    console.log(error);
                    result.success = false;
                    res.send(result);
                });
            } else {
                re.updateAttributes({
                    score:score
                }).then(function(){
                    res.send(result);
                }).error(function(err){
                    console.log(err);
                    result.success = false;
                    res.send(result);
                });
            }
        });

    });
};
