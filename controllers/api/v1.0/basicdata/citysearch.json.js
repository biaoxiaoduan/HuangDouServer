/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')
var cache = require('rediscache')

module.exports = function (router) {

    router.post('/', function (req, res) {
        var searchKey = req.body.searchKey;
        var City = Model.City;
        var result = {
            success: true,
            errorCode: 0,
            data: {
                list:[]
            }};
        cache.connect(6379).configure({
            expiry: 86400
        });
        cache.fetch('words').otherwise(function(deferred, cacheKey) {
            console.log('otherwise');
            // Read the file because we don't have a cache object currently.
            //var pp = JSON.parse(result);
            deferred.resolve(result);

        }).then(function(models) {
            console.log('models');
            // We have the data so we can output it to the browser!
            res.send(models);

        }).fail(function() {
            console.log('fail');
            // Invoked when you reject the promise above.
            res.send([]);

        });
        //City.findAll({where: {countryID: countryID}}).then(function (cities) {
        //    for (var i = 0; i < cities.length; i++) {
        //        var city = cities[i];
        //        var item = {'id': city.cityID, 'name': city.cityName};
        //        result.data.push(item);
        //    }
        //    res.send(result);
        //}).error(function (err) {
        //    result.success = false;
        //    res.send(result);
        //});
    });
};


