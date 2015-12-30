/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')
var cache = require('rediscache')

module.exports = function (router) {

    router.post('/', function (req, res) {
        var searchKey = req.body.searchKey;
        searchKey = searchKey.toLowerCase();
        var count = req.body.count;
        var Highschool = Model.Highschool;
        var result = {
            success: true,
            errorCode: 0,
            data: {
                count: 0,
                list:[]
            }};
        cache.connect(6379).configure({
            expiry: 86400
        });
        cache.fetch('highschoolList').otherwise(function(deferred, cacheKey) {
            Highschool.findAll().then(function (schools) {
                var schoolList = {list:[]};
                for (var i = 0; i < schools.length; i++) {
                    var school = schools[i];
                    var item = {'id': school.highschoolID, 'name': school.highschoolName};
                    schoolList.list.push(item);
                }
                deferred.resolve(schoolList);
            }).error(function (err) {
                result.success = false;
            });


        }).then(function(models) {
            //console.log(models);
            // We have the data so we can output it to the browser!
            for (var i = 0; i < models.list.length; i++) {
                var name = models.list[i].name.toLowerCase();
                var index = name.indexOf(searchKey);
                if (index==0) {
                    result.data.list.push({id: models.list[i].id, name: models.list[i].name});
                    result.data.count += 1;
                }
                if (result.data.count == count) {
                    break;
                }
            }
            res.send(result);

        }).fail(function(e) {
            console.log('fail ' + e);
            // Invoked when you reject the promise above.
            res.send([]);

        });
    });
};


