angular
  .module('quantum')
  .controller('ThoughtController', function($rootScope, $scope, Operator, Thought) {

    $scope.addThought = function() {
      Thought.create({
        description: $scope.thought.description,
        operatorId: $rootScope.currentUser.id
      }, function(data) {
        console.log(data);
        $rootScope.$broadcast('thought.added', data);
        $scope.$close(data);
      }, function(err) {
        console.log(err);
      });
    }
  });
