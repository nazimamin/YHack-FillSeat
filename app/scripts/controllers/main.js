'use strict';

/**
 * @ngdoc function
 * @name ndtndtApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ndtndtApp
 */
angular.module('fillSeat')
    .controller('MainCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
$scope.origin = ["BOS", "FLL", "JFK", "LGB", "MCO", "SFO", "SJU"];
    $scope.destination = ["BOS", "FLL", "JFK", "LGB", "MCO", "SFO", "SJU"];
    $scope.number = 0;
    $scope.isInvite = true;
    $scope.showInvite = function(){
    	$scope.showInvite = false;
    };
	$scope.postData = function(option, destinationOption, quantity) {
		if (option === destinationOption){
			$mdToast.showSimple('Be careful! Your destination and arrival are the same change one and try again.');
		}
		else{
			$scope.number = quantity;
			console.log($scope.number);
			$http({
		    	method: 'POST',
		    	url: 'http://172.26.10.41:5000/api/getdeals',
		    	headers: {
		    		'Content-type': 'application/json' 
		    	},
		    	data: {src: option,
		    			des: destinationOption,
		    			qty: quantity}
			    }).then(function successCallback(response){
			    	//asynchronously grabs the response
			    	console.log(response);
			    	//$scope.deals = response;
			    	$scope.deals = {'destination' : 'BOS',
			    					'origin': 'JFK',
			    					'price': '258.67',
			    					'date': 'November 7, 2015',
			    					'empty': '62'};
			    	$location.path(deals);
			    }, function errorCallback(response){
			    	console.log(response);
			    	$scope.deals = [{'destination' : 'BOS',
			    					'origin': 'JFK',
			    					'price': '258.67',
			    					'date': 'November 7, 2015',
			    					'empty': '62'},
			    					{'destination' : 'LGB',
			    					'origin': 'JFK',
			    					'price': '135.08',
			    					'date': 'November 7, 2015',
			    					'empty': '41'}];
			    	$location.path(deals);
		    });
		}
		console.log(option, destinationOption, quantity);
	};
    }]);