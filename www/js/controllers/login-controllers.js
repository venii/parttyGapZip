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
  $scope.showLoginSpinner = false;

  $scope.loginf = function(){
     //verifica se é mobile
    $scope.showLoginSpinner = true;
    LoginService.autenticarFB().then(function(response){

      GraphService.getMeFB().then(function(response){
        LoginService.savePerfil(response);


        Perfil.save(response, function(r) {
          console.log(r);
          /*
             
                response.configuracoes

                response.token = LoginService.getToken();
                if(UtilsService.isIOS()){
                    response.tipomobile = "IOS";
                }else if(UtilsService.isAndroid()){
                    response.tipomobile = "ANDROID";
                }else{
                    response.tipomobile = "WEB";
                }



          */
          $scope.showLoginSpinner = false;
          $state.go('app.events');
        });

        
      });
    });
              
   
  };
   
});