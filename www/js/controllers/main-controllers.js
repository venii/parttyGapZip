angular.module('main.controllers', ['starter'])

.controller('MainCtrl', function($scope, $stateParams,OpenFB,$localStorage,$cordovaToast,$ionicLoading,$ionicViewService,$state,parttyUtils) {
    //console.log(device.platform);
    
    //parttyUtils.logPartty(window.plugins.pushNotification);
   // console.log(ProgressIndicator);
    //alert("@");
    //alert(openFB.isMob());
    console.log("ismob?"+openFB.isMob());
    if(openFB.isMob()){
        
        $ionicLoading.show({
          template: 'Carregando servidor de mensagem ...'
        });
                 
       document.addEventListener("deviceready", function () {
            
            $scope.isLoadedMain = true;
            window.plugins.pushNotification.register(successHandler,errorHandler,
                  {"senderID":"244606470402", "ecb":"onNotificationGCM"});

       });
       
       alert("$scope.isLoadedMain: "+$scope.isLoadedMain);
       
       if($scope.isLoadedMain == undefined){
          $ionicViewService.nextViewOptions({
            disableBack: true
          });

          $state.go('app.registration');
       }
      
    }else{
        //alert("@@@");
        //$ionicLoading.show({
        //  template: 'Carregando servidor de mensagem (web) ...'
        //});

        //$ionicViewService.nextViewOptions({
        //  disableBack: true
        //});





        $localStorage.devicetoken = 'web';
        $state.go('app.registration');
    }
    
    $scope.sess = $localStorage.token;

});