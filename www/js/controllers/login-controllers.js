angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,OpenFB,LoginService) {
    //serviço de loggout
    LoginService.loggout(function(){
      //envia para login apos logout
      OpenFB.logout();
      $state.go("app.login");
    });
})
.controller('LoginFBCtrl', function($scope,$state,$ionicViewService,LoginService,UtilsService,GraphService) {
  //fluxo login -> main
  $scope.loginf = function(){
     //verifica se é mobile
    LoginService.doLogin().then(function(response){
      console.log(response);
      GraphService.getEvents();
      GraphService.getEventAttending(1308632732499261);
      //se o login for verdadeiro salva a resposta e envia para o controlador main
      //LoginService.saveFBAuthObj(response); 
      //$state.go('app.main');
    });
              
   
  };
   
});