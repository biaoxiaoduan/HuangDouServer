/**
 * Created by yanbiao on 11/11/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        var author = req.body.author;
        var content = req.body.comment;
        var statusId = req.body.statusId;
        var commentId = req.body.commentId;
        var lat = req.body.lat;
        var long = req.body.long;
        var Comments = Model.Comments;
        var result = {'success':true, errorInfo:'', commentId:0};
        var newComments = Comments.build({
            authorId: author,
            content: content,
            statusId: statusId,
            parentId: commentId,
            lat: lat,
            long: long
        });
        newComments.save().error(function(anotherTask) {
            result.success = false;
            res.send(result);
        }).then(function onSuccess(item) {
            result.success = true;
            result.commentId = item.id;
            res.send(result);
        });
    });
}
