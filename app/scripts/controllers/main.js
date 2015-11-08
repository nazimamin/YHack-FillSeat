'use strict';

/**
 * @ngdoc function
 * @name fillSeat.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fillSeat
 */
angular.module('fillSeat')
    .controller('MainCtrl', function ($rootScope, $scope, $location, $http, $mdToast, shareData) {
        $scope.origin = ["BOS", "FLL", "JFK", "LGB", "MCO", "SFO", "SJU"];
        $scope.destination = ["BOS", "FLL", "JFK", "LGB", "MCO", "SFO", "SJU"];

        $scope.number = 0;
        $scope.isInvite = true;

        $scope.showInvite = function () {
            $scope.showInvite = false;
        };

        $scope.postData = function (option, destinationOption, quantity, dealsView) {
            if (option === destinationOption) {
                $mdToast.showSimple('Your origin and destination can not be same.');
            } else {
                $scope.number = quantity;
                $http({
                    method: 'POST',
                    url: 'http://172.26.10.41:3000/api/getDeals',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: {
                        src: option,
                        des: destinationOption,
                        qty: quantity
                    }
                }).then(function successCallback(response) {
                        //asynchronously grabs the response
                        console.log(response.data);
                        if (response.data.length < 1) {
                            $mdToast.showSimple('Sorry, your search did not match any deals. :( Try again!');
                            $location.path('/');
                        } else {
                            shareData.setDeals(response.data);
                            $location.path('deals');
                        }

                    },
                    function errorCallback(response) {
                        $location.path('nodeal');
                    });

            }
            console.log(option, destinationOption, quantity);
        };
    });