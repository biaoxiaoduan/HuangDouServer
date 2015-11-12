/**
 * Created by yanbiao on 11/12/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var statusId = req.query.statusId;
        var result = {
            success: true,
            error: '',
            data: {comments:[]}
        };
        var Comments = Model.Comments;
        Comments.findAll({
            where:{
                statusId: statusId
            },
            order: 'id DESC'
        }).then(function (comments) {
            for (var i = 0; i < comments.length; i++) {
                var comment = comments[i];
                var item = {
                    commentId: comment.id,
                    authorId: comment.authorId,
                    parentId: comment.parentId,
                    content: comment.content,
                    lat: comment.lat,
                    long: comment.long
                };
                result.data.comments.push(item);
            }
            res.send(result);
        }).error(function (err){
            result.success = false;
            res.send(result);
        });
    });
}
