angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,$location,$cordovaOauth,$localStorage,$ionicViewService,OpenFB) {
    delete $localStorage.token;
    delete $localStorage;

    OpenFB.logout();
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    $state.go("app.login");

})
.controller('LoginFBCtrl', function($scope,$state,$location,$cordovaOauth,$localStorage,$ionicViewService,$ionicSideMenuDelegate) {
  //remove o history back quando usa GO() !
  console.log('Controller: LoginFBCtrl ');
  $ionicViewService.nextViewOptions({
    disableBack: true 
  });
  
  $scope.loginf = function(){
      
      $ionicViewService.nextViewOptions({
        disableBack: true
      });

       if(openFB.isMob()){
           console.log("openFB.isMob() : "+openFB.isMob());
           
           document.addEventListener("deviceready", function () {
             if($localStorage.token == undefined){
                   console.log("$localStorage.token : undefined");
                   
                   $cordovaOauth.facebook("574073299368611", ["email"]).then(function(result) {
                              // results
                              console.log("@AUTH FACEBOOK");
                              $scope.tokenfbview = result.access_token;
                              $localStorage.token = result.access_token;
                              console.log(result);
                             
                               $state.go('app.main');
                              //$location.path("/main");
                              
                              
                          }, function(error) {
                              alert("#");
                               $ionicViewService.nextViewOptions({
                                  disableBack: true
                                });
                              $state.go('app.loggedout');
                          });
              }else{
                  console.log("@app.main "+$localStorage.token);
                  //$location.path("/main");
                  
                  $ionicViewService.nextViewOptions({
                    disableBack: true
                  });

                  $state.go('app.main');
              }
          
            });
         }else{
              
             if($localStorage.token == undefined){

                  openFB.init({ appId  : '574073299368611' });
                  

                  openFB.login(function(response){
                    
                    $scope.tokenfbview = response.authResponse.token;
                    $localStorage.token = response.authResponse.token;

                    $ionicViewService.nextViewOptions({
                      disableBack: true
                    });
                    
                    $state.go('app.main');

                  }, {scope: 'email'});
                
              }else{
                   
                   $scope.tokenfbview = openFB.getToken();

                   $ionicViewService.nextViewOptions({
                    disableBack: true
                   });

                   $state.go('app.main');
              }

         }
  };




  //aply timeout
  //REDIR PARA MAIN SE TIVER SESSION
  //verificar o motivo
  // ios n entra no document.

  setTimeout(function(){
      alert("#");
      if($localStorage.token != undefined){
         console.log("token without deviceready: "+$localStorage.token);
         $ionicSideMenuDelegate.canDragContent(true);

         if(openFB.isMob()){
               console.log("IS MOB without deviceready ");
               ionic.Platform.ready(function(){
                 //  alert("ionic ready");
                   console.log("ionic ready");

                   $state.go('app.main');
               });
         }else{
             //alert("webready");
              console.log("not is mob ionic ready");
             $state.go('app.main');
         }

     }
  },1000);
 
   
});