angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,$location,$cordovaOauth,$localStorage,$ionicViewService,OpenFB,$ionicSideMenuDelegate) {
    
    $ionicSideMenuDelegate.canDragContent(false);

    delete $localStorage.token;
    delete $localStorage;

    OpenFB.logout();
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    
    $state.go("app.login");

})
.controller('LoginFBCtrl', function($scope,$state,$ionicViewService,LoginService,UtilsService) {
  
  $ionicViewService.nextViewOptions({
    disableBack: true 
  });
  
  $scope.loginf = function(){
     
     if(UtilsService.isMob()){

        if(!LoginService.isAuthFb()){

              LoginService.doLogin(function(response){
                LoginService.saveFBAuthObj(response); 
                $state.go('app.main');
              });
              
         }else{                  
              $state.go('app.main');
         }

        
         
     }else{
          
         if(!LoginService.isAuthFb()){

              LoginService.doLogin(function(response){
                LoginService.saveFBAuthObj(response); 
                $state.go('app.main');          
              });
              
         }else{                  
              $state.go('app.main');
         }

     }
  };
   
});