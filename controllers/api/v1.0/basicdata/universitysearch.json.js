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
        var University = Model.University;
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
        cache.fetch('universityList').otherwise(function(deferred, cacheKey) {
            University.findAll().then(function (universities) {
                var universityList = {list:[]};
                for (var i = 0; i < universities.length; i++) {
                    var university = universities[i];
                    var item = {'id': university.universityID, 'name': university.universityName};
                    universityList.list.push(item);
                }
                deferred.resolve(universityList);
            }).error(function (err) {
                result.success = false;
            });


        }).then(function(models) {
            //console.log(models);
            // We have the data so we can output it to the browser!
            for (var i = 0; i < models.list.length; i++) {
                var name = models.list[i].name.toLowerCase();
                if (name.startsWith(searchKey)) {
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


