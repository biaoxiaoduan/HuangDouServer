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
        var ref = req.body.ref;

        var result = {
            success: true,
            errorCode: 0,
            data: {
            }
        };

        var BeforePS = Model.BeforePS;
        var newPS = BeforePS.build({
            authorId: uuid,
            image: image,
            description: description,
            refImage: ref
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
