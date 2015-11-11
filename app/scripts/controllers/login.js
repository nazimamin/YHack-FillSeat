'use strict';

/**
 * @ngdoc function
 * @name jetblueApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the jetblueApp
 */
angular.module('fillSeat')
    .controller('LoginCtrl', function ($http, $scope, $location, $mdToast, shareData) {
        $scope.register = function (email, password) {
            if (!email || !password) {
                $mdToast.showSimple("Either your username and/or password are empty!");
            } else {
                $http({
                    'method': 'POST',
                    'url': 'http://192.168.1.130:3000/api/register',
                    'header': 'apllication/json',
                    'data': {
                        e: email,
                        p: password
                    }
                }).then(function successCallback(response) {
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
        };
        $scope.login = function (email, password) {
            if (!email || !password) {
                $mdToast.showSimple("Either your username and/or password are empty!");
            } else {
                $http({
                        'method': 'POST',
                        'url': 'http://192.168.1.130:3000/api/login',
                        'header': 'application/json',
                        'data': {
                            e: email,
                            p: password
                        }
                    }).then(function successCallback(response) {
                        $location.path('invite');
                    }),
                    function errorCallback(response) {
                        console.log(response);
                    }
                shareData.setDeals([email, password]);
            }
        };
    });