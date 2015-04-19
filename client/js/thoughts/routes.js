angular
  .module('quantum')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.thoughts', {
        abstract: true,
        url: '/thoughts',
        templateUrl: 'views/thoughts/main.html',
        controller: 'ThoughtController'
      })
      .state('app.thoughts.detail', {
        url: '/:id',
        templateUrl: 'views/thoughts/detail.html',
        resolve: {
          thought: function(Thought, $stateParams) {
            return Thought.findById({id: $stateParams.id},
              function(data) {
                console.log(data)
              },
              function(err) {
                console.log(err)
              }
            );
          }
        },
        controller: function($scope, thought, Thought) {
          $scope.thought = thought;
        }
      });
    $urlRouterProvider.otherwise('/app');
  });

