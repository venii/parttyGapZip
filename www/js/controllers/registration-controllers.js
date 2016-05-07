angular.module('registration.controllers', ['starter'])

.controller('RegistrationCtrl', function($scope, 
                                          $ionicLoading,
                                          $state,
                                          MainService,
                                          RegistrationService,LoginService) {
      
      //fluxo login -> main -> [registration] -> events
      //                                      -> configurations (se for newUser)

      //pega o tipo de dispositivo
      var deviceType = MainService.getDeviceToken();
      
      $ionicLoading.show({
          template: 'Procurando por usuario...'
      });

      //pega sessao em json do facebook da local storage
      RegistrationService.getFBSessJSON(function(resp) {

          RegistrationService.verifyFBSessJSON(resp,function(){
              //se a sessao for invalida volta para o login para revalidar FB
              $state.go('app.login');  
          });

          //atualiza usuario e troca foto de perfil se necessario
          RegistrationService.saveUserData(resp);
          RegistrationService.updateDeviceDetailsJSON(resp,deviceType);      
          RegistrationService.changeCoverMenuPhoto(resp.data.usuario.picture.data.url);
          
          var userData = RegistrationService.getUserData();
          
          //autentica os dados no servidor do partty
          RegistrationService.loginParttyJSON(function(resp){
              $ionicLoading.hide();
              //se é um novo usuario envia para configuraçoes a primeira vez
              RegistrationService.isNewUser(resp,function(){
                $state.go('app.configurations');
              });
              //se nao envia direto para eventos
              $state.go('app.events');

          },function(err){
            //se ocorrer um erro envia para login
            $ionicLoading.hide();
            $state.go('app.login');
          });
              
          
      });
});