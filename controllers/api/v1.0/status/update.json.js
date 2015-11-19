/**
 * Created by yanbiao on 10/29/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        var author = req.body.author;
        var title = req.body.title;
        var content = req.body.content;
        var lat = req.body.lat;
        var long = req.body.long;
        var images = req.body.images;
        var tag = req.body.tag;
        console.log(req.body);
        var result = {
            success: true,
            errorCode: 0,
            data : {
                statusid: 0
            }
        };
        // check content
        if (content == null) {
            result.success = false;
            result.errorCode = -1;
            res.send(result);
        }
        // check author
        var User = Model.User;
        User.find({where: {guid: author}}).then(function (user) {
            if (user == null) {
                result.success = false;
                result.errorCode = -2;
                res.send(result);
            } else {
                var Status = Model.Status;
                var newStatus = Status.build({
                    authorId: user.guid,
                    title: title,
                    content: content,
                    images: images,
                    tag: tag,
                    lat: lat,
                    long: long
                });
                newStatus.save().error(function(anotherTask) {
                    result.success = false;
                    res.send(result);
                }).then(function onSuccess(item) {
                    result.success = true;
                    result.data.statusid = item.id;
                    res.send(result);
                });
            }
        }).error(function (err) {
            result.success = false;
            result.errorCode = -2;
            res.send(result);
        });
    });
};


