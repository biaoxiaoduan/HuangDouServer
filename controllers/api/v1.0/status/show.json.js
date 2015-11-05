/**
 * Created by yanbiao on 11/5/15.
 */
var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        console.log('home_timeline called');
        var statusId = req.query.statusId;
        var result = {
            success: true,
            error: '',
            data: {}
        };
        var Status = Model.Status;
        if (statusId == null) {
            result.success = false;
            result.error = 'invalid params';
            res.send(result);
            return;
        }
        Status.find({
            where: {
                id: statusId
            }
        }).then(function (status) {
            result.statusId = status.id;
            result.authorId = status.authorId;
            result.title = status.title;
            result.content = status.content;
            result.images = status.images;
            result.tag = status.tag;
            result.lat = status.lat;
            result.long = status.long;
            result.success = true;
            res.send(result);
        }).error(function (err) {
            result.success = false;
            result.error = err;
            res.send(result);
        });
    });
};
