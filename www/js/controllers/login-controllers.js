angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,OpenFB,LoginService) {
  
    LoginService.loggout(function(){
      OpenFB.logout();
      
      $state.go("app.login");
    
    });
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