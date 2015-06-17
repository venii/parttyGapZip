angular.module('modal.controllers', ['starter'])

.controller('ModalDobCtrl', function ($scope, $modalInstance) {

  //$scope.items = items;
  //$scope.selected = {
  //  item: $scope.items[0]
 // };

  $scope.ok = function () {
    //$modalInstance.close($scope.selected.item);
    alert("@");
  };

  $scope.cancel = function () {
   // $modalInstance.dismiss('cancel');
   alert("@#");
  };
});