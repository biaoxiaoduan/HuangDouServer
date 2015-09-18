/**
 * Created by yanbiao on 9/18/15.
 */
'use strict';

var Model = require('../../../../models')

module.exports = function (router) {

    router.get('/', function (req, res) {
        var countryID = req.query.countryID;
        var University = Model.University;
        var result = {'success':'ture', 'data':[]};
        University.findAll({where:{countryID:countryID}}).then(function(universities){
            for (var i = 0; i < universities.length; i++) {
                var university = universities[i];
                //console.log(country.countryName);
                var item = {'id':university.universityID, 'name':university.universityName};
                //console.log(item);
                result.data.push(item);
            }
            res.send(result);
        }).error(function(err){
            result.success = false;
            res.send(result);
        });

    });
};


