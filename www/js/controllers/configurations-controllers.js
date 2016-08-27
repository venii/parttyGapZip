angular.module('configurations.controllers', ['ionic'])

.controller('ConfigurationsCtrl', function ($scope,$localStorage,$ionicLoading,Preferencias,LoginService) {
  $scope.showspiner = true;

  $scope.iam = 'man';

  $scope.lookingfor = [
    { text: "Homen", value:"man",    checked: true },
    { text: "Mulher", value:"woman", checked: false }
  ];


  var data = {};
  data.id = $localStorage.fbid;

  Preferencias.get(data,function(r){
    $scope.iam = r.Preferencias.iam;
    $scope.lookingfor = r.Preferencias.lookingfor;

    $scope.showspiner = false;
  });
  
  $scope.serverSideList = [
    { text: "Go", value: "go" },
    { text: "Python", value: "py" },
    { text: "Ruby", value: "rb" },
    { text: "Java", value: "jv" }
  ];

  $scope.atualizaPreferencias = function(){
    console.log($scope);
    var iam = $scope.iam;

    var data = {"id"         : $localStorage.fbid,
                  "iam"        : iam,
                  "lookingfor" : $scope.lookingfor,
                  "token"      : $localStorage.token,
                  "tipoDevice" : $localStorage.tipoDevice
                };

  	Preferencias.update(data,function(r){
  	  console.log(r);
  	});
  };

  $scope.updateIam = function(iam){
    $scope.iam = iam;
  }
});