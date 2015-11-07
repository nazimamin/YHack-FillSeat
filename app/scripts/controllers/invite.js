'use strict';

/**
 * @ngdoc function
 * @name jetblueApp.controller:InviteCtrl
 * @description
 * # InviteCtrl
 * Controller of the jetblueApp
 */
angular.module('jetblueApp')
  .controller('InviteCtrl', '$scope', '$html', function ($scope, $html) {
    $scope.invite = function(emails){
		$http({
			method: 'POST',
			url: 'http://172.26.10.41:5000/api/invite',
			headers: {
				'Content-type': 'application/json'
			},
			data: { email: emails }
			}).then(function successCallback(response){
				console.log(response);
			}, function errorCallback(response){
				console.log(response);
			});
	};
  });
