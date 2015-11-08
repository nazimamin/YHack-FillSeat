'use strict';

/**
 * @ngdoc function
 * @name fullSeat.controller:InviteCtrl
 * @description
 * # InviteCtrl
 * Controller of the jetblueApp
 */
angular.module('fillSeat')
    .controller('InviteCtrl', function ($scope, $http, $mdToast, shareData) {
        $scope.added = [];
        $scope.userInfo = shareData.getDeals();

        $scope.invite = function () {

            if ($scope.added.length < 1) {
                $mdToast.showSimple("Add people before inviting.");
            } else {
                console.log($scope.userInfo);
                $http({
                    method: 'POST',
                    url: 'http://172.26.10.41:3000/api/invite',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: {
                        email: [$scope.userInfo, $scope.added]
                    }
                }).then(function successCallback(response) {
                    $mdToast.showSimple("Invitation sent");
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
        };
        $scope.addPerson = function (n, e) {
            if (!n || !e) {
                $mdToast.showSimple("Either name and/or email is blank or wrong!");
            } else {
                $scope.added.push({
                    name: n,
                    email: e,
                    statuss: 'pending'
                });
            }
        }
    });