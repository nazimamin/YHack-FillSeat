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
                    url: 'http://172.26.10.41:5000/api/getDeals',
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
                    console.log(response);
                    //$scope.deals = response;
                    $scope.deals = {
                        'destination': 'BOS',
                        'origin': 'JFK',
                        'price': '258.67',
                        'date': 'November 7, 2015',
                        'empty': '62'
                    };

                    $location.url(dealsView);

                }, function errorCallback(response) {

                    $scope.deals = [{
                            'destination': 'BOS',
                            'origin': 'JFK',
                            'price': '258.67',
                            'date': 'November 7, 2015',
                            'empty': '62'
                        },
                        {
                            'destination': 'LGB',
                            'origin': 'JFK',
                            'price': '135.08',
                            'date': 'November 7, 2015',
                            'empty': '41'
                        }];
                    shareData.setDeals($scope.deals);
                    $location.path('deals');

                    console.log($scope.deals);
                });

            }
            console.log(option, destinationOption, quantity);
        };
    });
