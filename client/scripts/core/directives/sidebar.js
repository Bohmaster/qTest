angular
	.module('quantum')
    .directive('sidebar', function() {
    	return {
    		restrict: 'E',
    		templateUrl: 'views/elements/sidebar.html'
    	}
    });