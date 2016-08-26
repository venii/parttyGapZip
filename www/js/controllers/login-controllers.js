angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,OpenFB,LoginService) {
    //serviço de loggout
    LoginService.loggout(function(){
      //envia para login apos logout
      OpenFB.logout();
      $state.go("login");
    });
})
.controller('LoginFBCtrl', function($scope,$state,$ionicViewService,LoginService,UtilsService,GraphService,SQLService,Perfil,$localStorage) {
  //fluxo login -> main
  $scope.showLoginSpinner = false;

  $scope.loginf = function(){
     //verifica se é mobile
    $scope.showLoginSpinner = true;
    LoginService.autenticarFB().then(function(response){

      GraphService.getMeFB().then(function(response){
        LoginService.savePerfil(response);
        
        $localStorage.fbid = response.id;

        Perfil.save(response, function(r) {
          $scope.showLoginSpinner = false;
          $state.go('app.events');
        });

        
      });
    });
              
   
  };
   
});