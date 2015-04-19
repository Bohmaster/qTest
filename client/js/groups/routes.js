angular
  .module('quantum')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.groups', {
        abstract: true,
        url: '/groups',
        templateUrl: 'views/groups/main.html',
        controller: 'GroupController'
      })
      .state('app.groups.detail', {
        url: '/:id',
        templateUrl: 'views/groups/detail.html',
        resolve: {
          group: function(Group, $stateParams) {
            return Group.findById({id: $stateParams.id},
              function(data) {
                console.log(data)
              },
              function(err) {
                console.log(err)
              }
            );
          },
          operator: function(Group, $stateParams) {
            return Group.operator({id: $stateParams.id},
              function(data) {
                console.log(data);
              },
              function(err) {
                console.log(err);
              }
            )
          },
          operators: function(Group, $stateParams) {
            return Group.operators({id: $stateParams.id},
              function(data) {
                console.log(data);
              },
              function(err) {
                console.log(err);
              }
            )
          },
          id: function($stateParams) {
            return $stateParams.id
          }
        },
        controller: "MembersController"
      }
      );
    $urlRouterProvider.otherwise('/app');
  });

