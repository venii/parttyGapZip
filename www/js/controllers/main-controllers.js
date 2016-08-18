angular.module('main.controllers', ['starter'])
.controller('MainCtrl', function($scope,$state,
                              UtilsService,MainService,
                              $ionicLoading,$ionicViewService,$localStorage) {
    //fluxo login -> [main] -> registration
    //se for mobile, no arquivo de push tem o redirecionamento para o controlador registration

    //carrega loading com msg
    $ionicLoading.show({
          template: 'Carregando servidor de mensagem ...'
    });

    if(UtilsService.isMob()){
       //registra os pushes  
       MainService.registerPushNotification(function(){
          //esconde loading
          $ionicLoading.hide();
          //registra serviço de mobile
          MainService.registerPushNotificationOnMobile(); 
       });          
      
    }else{
        //para versao web nao tem push , grava token web, esconde loading e envia para registration
        MainService.saveDeviceToken('web');
        $ionicLoading.hide();
        $state.go('app.registration');
    }
    
    $scope.sess = MainService.getDeviceToken();

});