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
  
  $scope.loginf = function(){
     //verifica se é mobile     
     if(UtilsService.isMob()){
        //verifica se tem internet e se esta autenticado no facebook
        if(!LoginService.isAuthFb() && UtilsService.getInternetState()){
              //realiza login fb
              LoginService.doLogin(function(response){
                //se o login for verdadeiro salva a resposta e envia para o controlador main
                LoginService.saveFBAuthObj(response); 
                $state.go('app.main');
              });
              
         }else{                  
              $state.go('app.main');
         }

     }else{
         //verifica se nao estiver logado e autentica com o facebook      
         if(!LoginService.isAuthFb()){
              //realiza login fb
              LoginService.doLogin(function(response){
                //se o login for verdadeiro salva a resposta e envia para o controlador main
                LoginService.saveFBAuthObj(response); 
                $state.go('app.main');          
              });
              
         }else{                  
              $state.go('app.main');
         }
     }
  };

});