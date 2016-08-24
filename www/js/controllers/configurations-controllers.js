angular.module('configurations.controllers', ['ionic'])

.controller('ConfigurationsCtrl', function ($scope,$localStorage,$ionicLoading,Preferencias) {
  
  $scope.iam = null;
  $scope.lookingfor = null;
  $scope.token = null;
  $scope.tipoMobile = null;

  $scope.atualizaPreferencias = function(){
  	  var data = {};
  	  
  	  console.log($scope);

  	  Preferencias.save(data,function(r){
  	  	console.log(r);
  	  });

      //alert("#");
  };
});