/**
 * Created by yanbiao on 04/21/18.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log(req.body);
        var uuid = req.body.uuid;
        var image = req.body.image;
        var description = req.body.description;
        var target = req.body.target;

        var result = {
            success: true,
            errorCode: 0,
            data: {
            }
        };

        var AfterPS = Model.AfterPS;
        var newPS = AfterPS.build({
            authorId: uuid,
            image: image,
            description: description,
            target: target
        });
        newPS.save().then(function onSuccess(shit) {
            res.send(result);
        }).error(function(error){
            console.log(error);
            result.success = false;
            res.send(result);
        });

    });
};
