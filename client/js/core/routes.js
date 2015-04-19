angular
	.module('quantum')
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				abstract: true,
				url: '/app',
				templateUrl: 'views/app.html',
				controller: 'MainController'
			})
			.state('app.home', {
				url: '',
				templateUrl: 'views/home.html'
			});
		$urlRouterProvider.otherwise('/app');
	});