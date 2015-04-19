angular
	.module('quantum', [
		'ui.router',
		'lbServices',
		'ui.bootstrap'
	])
	.run(function($rootScope, $state, $location) {
		var app;
		$rootScope.app = app = {};
		app.title = "Dialogue";

    $rootScope.$state = $state;
    $rootScope.$location = $location;

    $rootScope.currentUser = {
      token: undefined,
      id: undefined,
      username: undefined
    }
	})
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope, $window, $location) {
      return {
        request: function (cfg) {
         return $q.when(cfg);
        },
        response: function (res) {
          var token, id, username;
          token = $window.localStorage['$LoopBack$accessTokenId'];
          id    = $window.localStorage['$LoopBack$currentUserId'];
          username = $window.localStorage['$LoopBack$currentUser'];

          if (token) {
            $rootScope.currentUser = {
              token: token,
              id: id,
              username: username
            };
          }
          return $q.when(res);
        }
      }
    });
  })
	.controller('AuthController', function($rootScope, $scope, $location, $window, Operator) {
    $scope.login = function() {
      Operator.login(
        {username: $scope.username,
         password: $scope.password},
        function(value, responseHeaders) {
          $window.localStorage['$LoopBack$currentUser'] = value.user.username;
          $window.location.reload();
        },
        function(httpResponse) {
        	console.log(httpResponse);
        }
      );
    };

    $scope.logout = function() {
      Operator.logout(
        function(value, responseHeaders) {
          $window.localStorage['$LoopBack$currentUser'] = "";
          $window.location.reload();
        },
        function(httpResponse) {
          console.log(httpResponse);
        }
      )
    }
	});
