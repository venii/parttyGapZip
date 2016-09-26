angular.module('configurations.controllers', ['ionic'])

.controller('ConfigurationsCtrl', function ($scope,$localStorage,$ionicPopup,$timeout,Preferencias) {
  
  $scope.init = function(){

    $scope.showspiner = true;

    $scope.iam = 'man';

    $scope.lookingfor = [
      { text: "Homen", value:"man",    checked: true },
      { text: "Mulher", value:"woman", checked: false }
    ];

    var data = {};
    data.id = $localStorage.fbid;

    $timeout(function(){
      Preferencias.get(data,function(r){

        if(r.Mensagem != "NENHUM_REGISTRO_ENCONTRADO"){
          $scope.iam = r.Preferencias.iam;
          if(r.Preferencias.lookingfor !== undefined){
            $scope.lookingfor = r.Preferencias.lookingfor;
          }
        }

        $scope.showspiner = false;
      });
    });
    
  }
  $scope.init();

  $scope.atualizaPreferencias = function(){
    var iam = $scope.iam;

    var data = {  "id"         : $localStorage.fbid,
                  "iam"        : iam,
                  "lookingfor" : $scope.lookingfor,
                  "token"      : $localStorage.token,
                  "tipoDevice" : $localStorage.tipoDevice
                };

  	Preferencias.update(data,function(r){
      $localStorage.Configurations_Mensagem = "";
      $localStorage.iam = iam;
      
  	  $ionicPopup.show({
                        title:'Sucesso',
                        template:'Suas Preferencias foram atualizadas.',
                         buttons: [
                                    {text : 'Fechar'}
                                  ]
                      });
  	});
  };

  $scope.updateIam = function(iam){
    $scope.iam = iam;
  }
});