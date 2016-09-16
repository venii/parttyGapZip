angular.module('login.controllers', ['starter'])
.controller('LoginFBCtrl', function($scope,$state,$localStorage,LoginService,GraphService,Perfil,Preferencias) {
  //fluxo login -> main
  $scope.showLoginSpinner = false;

  $scope.loginf = function(){
     //verifica se é mobile
    $scope.showLoginSpinner = true;
    LoginService.autenticarFB().then(function(response){

      GraphService.getMeFB().then(function(response){
        LoginService.savePerfil(response);
        
        $localStorage.fbid = response.id;
        
        if(!$localStorage.imgCover){
          $localStorage.imgCover = response.picture.data.url;
        }
        
        Perfil.save(response, function(r) {
          $scope.showLoginSpinner = false;  

          var data_pref = {};
          data_pref.id = $localStorage.fbid;

          Preferencias.get(data_pref,function(r2){

              $localStorage.Configurations_Mensagem = r2.Mensagem;
              
              if(r2.Mensagem == "NENHUM_REGISTRO_ENCONTRADO"){
                $state.go('app.configurations');
              }else{
                $state.go('app.events');
              }
          });

          
        });

        
      });
    });
              
  };
  
});