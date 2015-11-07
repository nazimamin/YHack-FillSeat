/**
 * @ngdoc service
 * @name desktopApp.shareData
 * @description
 * # shareData
 * Service in the desktopApp.
 */
angular.module('fillSeat')
    .service('shareData', function () {
        var deals = [];
        return {
            setDeals: function (value) {
                deals = value;
            },
            getDeals: function () {
                return deals;
            }
        }
    });