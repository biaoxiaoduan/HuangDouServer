/**
 * Created by yanbiao on 11/11/15.
 */
var Model = require('../../../../models')

module.exports = function (router) {

    router.post('/', function (req, res) {
        console.log("delete status " + req.query.statusId);
        var Comments = Model.Comments;
        var author = req.body.author;
        var commentId = req.body.statusId;
        var result = {
            success:true,
            error: '',
            deletedId: 0
        };
        if (commentId == null || commentId == undefined) {
            result.success = false;
            result.error = 'invalid params';
            res.send(result);
            return;
        }
        Comments.destroy({where:{id : commentId}}).then(function(msg){
            result.success = true;
            result.deletedId = statusId;
            res.send(result);
        }).error(function(err){
            result.success = false;
            result.deletedId = statusId;
            result.error = err;
            res.send(result);
        });
    });
}
