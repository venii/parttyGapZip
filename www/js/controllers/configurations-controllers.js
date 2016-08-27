angular.module('configurations.controllers', ['ionic'])

.controller('ConfigurationsCtrl', function ($scope,$localStorage,$ionicLoading,Preferencias,LoginService) {
  
  $scope.iam = 'man';
  $scope.token = null;
  $scope.tipoDevice = null;

  $scope.lookingfor = [
    { text: "Homen", value:"man",    checked: true },
    { text: "Mulher", value:"woman", checked: false }
  ];

  $scope.atualizaPreferencias = function(){
  	  
      var data = {"id"         : $localStorage.fbid,
                  "iam"        : $scope.iam,
                  "lookingfor" : $scope.localStorage,
                  "token"      : $localStorage.token,
                  "tipoDevice" : $localStorage.tipoDevice
                  };

  	  Preferencias.update(data,function(r){
  	  	console.log(r);
  	  });
  };
});