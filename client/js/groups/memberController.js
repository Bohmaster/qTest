angular
  .module('quantum')
  .controller('MembersController', function($rootScope, $scope, $modal, group, operator, operators, Group, Operator) {
      $scope.group = group;
      $scope.operators = operators;
      $scope.operator = operator;

      function loadOperators() {
        Group.operators({id: group.id},
          function(data) {
            console.log(data);
            $scope.operators = data;
          },
          function(err) {
            console.log(err);
          }
        );
      }

      $scope.modalMember = function() {
        $modal.open({
          templateUrl: 'views/groups/add_member.html',
          controller: function($scope, $rootScope, $stateParams, Group, Operator){
            $scope.addMember = function() {
              var id, username;
              username = $scope.member.username;
              id = $stateParams.id;

              Operator.findOne({filter: {
                where: {
                  username: username
                }}
              }, function(data) {
                Group.operators.link({
                    id: parseInt(id),
                    fk: data.id
                  }, null
                  , function(data) {
                    console.log(data);
                    $rootScope.$broadcast('member.added', {data: data});
                    $scope.$close(data);
                  }, function(err) {
                    console.log(err);
                  });
              }, function(err) {
                console.log(err);
              });
            };
          }
        });
      };

      $scope.deleteMember = function(o) {
        var id = group.id;
        var operatorId = o.id;

        console.log(id);
        console.log(operatorId);

        Group.operators.unlink({
            fk: operatorId,
            id: id}, null,
          function(data) {
            console.log(data);
            $rootScope.$broadcast('member.deleted');
          }, function(err) {
            console.log(err);
          });
      };

      $scope.$on('member.added', function(evt, args) {
        console.log(args.data);
        loadOperators();
      });

      $scope.$on('member.deleted', function(evt) {
        loadOperators();
      });
  });
