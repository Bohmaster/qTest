angular
	.module('quantum')
	.controller('MainController', function($rootScope, $scope, Operator, Thought, Group, $modal) {
		$scope.thoughts = [];
    $scope.groups = [];

    loadThoughts();
    loadGroups();

    function loadThoughts () {
      Thought.find({
        filter: {operatorId: $rootScope.currentUser.id}
      }, function(data) {
        $scope.thoughts = data;
      }, function(err) {
        console.log(err);
      })
    }

    function loadGroups () {
      Group.find({
        filter: {operatorId: $rootScope.currentUser.id}
      }, function(data) {
        console.log(data);
        $scope.groups = data;
      }, function(err) {
        console.log(err);
      })
    }

    $scope.modalThought = function() {
      $modal.open({
        templateUrl: 'views/thoughts/add.html',
        controller: 'ThoughtController'
      })
    };

    $scope.$on('thought.added', function(data) {
      loadThoughts();
      console.log('sabe');
    });

    $scope.modalGroup = function() {
      $modal.open({
        templateUrl: 'views/groups/add.html',
        controller: 'GroupController'
      })
    };

    $scope.$on('group.added', function(data) {
      loadGroups();
      console.log('sabe');
    });
	});
