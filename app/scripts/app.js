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
            .when('/nodeal', {
                templateUrl: 'views/nodeal.html',
                controller: 'MainCtrl',
                controllerAs: 'nodeal'
            })
            .when('/invite', {
                templateUrl: 'views/invite.html',
                controller: 'InviteCtrl',
                controllerAs: 'invite'
            })
            .otherwise({
                redirectTo: '/'
            });
        // $locationProvider.html5Mode(true);
    });