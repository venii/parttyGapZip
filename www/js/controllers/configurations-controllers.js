angular.module('configurations.controllers', ['ionic'])

.controller('ConfigurationsCtrl', function ($scope,$localStorage,$ionicLoading,Preferencias,LoginService) {
  
  $scope.iam = null;
  $scope.lookingfor = null;
  $scope.token = null;
  $scope.tipoDevice = null;

  $scope.atualizaPreferencias = function(){
  	  var data = {"id": $localStorage.fbid,
                  "iam"        : $scope.iam,
                  "lookingfor" : $scope.localStorage,
                  "token"      : $localStorage.token,
                  "tipoDevice" : $localStorage.tipoDevice
                  };

  	  Preferencias.update(data,function(r){
  	  	console.log(r);
  	  });

      //alert("#");
  };
});