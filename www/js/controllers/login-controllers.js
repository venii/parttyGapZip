angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,OpenFB,LoginService) {
    //serviço de loggout
    LoginService.loggout(function(){
      //envia para login apos logout
      OpenFB.logout();
      $state.go("app.login");
    });
})
.controller('LoginFBCtrl', function($scope,$state,$ionicViewService,LoginService,UtilsService) {
  //fluxo login -> main
  $scope.loginf = function(){
     //verifica se é mobile     
     if(UtilsService.isMob()){
              LoginService.doLogin(function(response){
                //se o login for verdadeiro salva a resposta e envia para o controlador main
                LoginService.saveFBAuthObj(response); 
                $state.go('app.main');
              });
              

     }else{
              LoginService.doLogin(function(response){
                //se o login for verdadeiro salva a resposta e envia para o controlador main
                LoginService.saveFBAuthObj(response); 
                $state.go('app.main');          
              });
              

     }
  };
   
});