angular
	.module('quantum')
	.directive('navbar', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/elements/navbar.html'
		}
	})