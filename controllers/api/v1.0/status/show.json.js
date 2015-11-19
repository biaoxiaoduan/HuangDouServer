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
            errorCode: 0,
            data: {}
        };
        var Status = Model.Status;
        if (statusId == null) {
            result.success = false;
            result.errorCode = -1;
            res.send(result);
            return;
        }
        Status.find({
            where: {
                id: statusId
            }
        }).then(function (status) {
            result.data.statusId = status.id;
            result.data.authorId = status.authorId;
            result.data.title = status.title;
            result.data.content = status.content;
            result.data.images = status.images;
            result.data.tag = status.tag;
            result.data.lat = status.lat;
            result.data.long = status.long;
            result.success = true;
            res.send(result);
        }).error(function (err) {
            result.success = false;
            result.errorCode = -2;
            res.send(result);
        });
    });
};
