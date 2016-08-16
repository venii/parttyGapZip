angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,OpenFB,LoginService) {
    //serviço de loggout
    LoginService.loggout(function(){
      //envia para login apos logout
      OpenFB.logout();
      $state.go("login");
    });
})
.controller('LoginFBCtrl', function($scope,$state,$ionicViewService,LoginService,UtilsService,GraphService,SQLService,Perfil) {
  //fluxo login -> main
  $scope.loginf = function(){
     //verifica se é mobile
    LoginService.autenticarFB().then(function(response){

      GraphService.getMeFB().then(function(response){
        LoginService.savePerfil(response);
        
        Perfil.save(response, function(r) {
          $state.go('app.events');
        });

        
      });
    });
              
   
  };
   
});