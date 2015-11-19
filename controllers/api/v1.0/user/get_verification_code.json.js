/**
 * Created by shangshangli on 15/11/15.
 */
var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var telNum = req.query.telNum;
        var result = {
            success: true,
            errorCode: 0,
            data: {
                code: ''
            }
        };
        var User = Model.User;
        User.find({
            where: {
                telNum: telNum
            }
        }).then(function (user ) {
            if (user == null) {
                result.success = true;
                result.data.code = '1234';
                result.errorCode = 1;
                res.send(result);
            } else {
                result.success = false;
                result.data.existing = true;
                res.send(result);
            }
        }).error(function (error) {
            console.log(error);
            result.success = false;
            result.errorCode = -1;
            res.send(result);
        });
    });
}
