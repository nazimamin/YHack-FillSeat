'use strict';

/**
 * @ngdoc overview
 * @name fillsSeat
 * @description
 * # fillSeat
 *
 * Main module of the application.
 */
angular
    .module('fillSeat', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/deals', {
                templateUrl: 'views/deals.html',
                controller: 'DealsCtrl',
                controllerAs: 'deals'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .otherwise({
                redirectTo: '/'
            });
        // $locationProvider.html5Mode(true);
    });