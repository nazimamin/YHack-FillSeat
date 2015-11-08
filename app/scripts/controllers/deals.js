'use strict';

/**
 * @ngdoc function
 * @name fillsSeat.controller:DealsCtrl
 * @description
 * # DealsCtrl
 * Controller of the fillsSeat
 */
angular.module('fillSeat')
    .controller('DealsCtrl', function ($http, $scope, shareData, $location) {
        $scope.deals = shareData.getDeals();
        $scope.changeview = function () {
            $location.path('login');
        };
    });