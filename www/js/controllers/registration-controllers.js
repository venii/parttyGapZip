angular.module('registration.controllers', ['starter'])

.controller('RegistrationCtrl', function($scope, 
                                          $ionicLoading,
                                          $state,
                                          MainService,
                                          RegistrationService) {

      var deviceType = MainService.getDeviceToken();
      
      $ionicLoading.show({
          template: 'Procurando por usuario...'
      });

      RegistrationService.getFBSessJSON(function(resp) {
          RegistrationService.verifyFBSessJSON(resp,function(){
            $state.go('app.login');  
          });

          RegistrationService.saveUserData(resp);
          RegistrationService.updateDeviceDetailsJSON(resp,deviceType);      
          RegistrationService.changeCoverMenuPhoto(resp);
          
          var userData = RegistrationService.getUserData();
          
          RegistrationService.loginParttyJSON(function(resp){
              $ionicLoading.hide();
              
              RegistrationService.isNewUser(resp,function(){
                $state.go('app.configurations');
              });
              $state.go('app.events');


          },  function(err){
            $ionicLoading.hide();
            alert("Problema com o servidor.");
            $state.go('app.login');

          });
              
          
      });
});