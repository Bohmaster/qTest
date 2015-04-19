angular
  .module('quantum')
  .controller('GroupController', function($rootScope, $scope, $stateParams, $http, Operator, Group, $modal) {

    $scope.addGroup = function() {
      Group.create({
        name: $scope.group.name,
        description: $scope.group.description,
        operatorId: $rootScope.currentUser.id
      }, function(data) {
        console.log(data);
        $rootScope.$broadcast('group.added', data);
        $scope.$close(data);
      }, function(err) {
        console.log(err);
      });
    };
  });
