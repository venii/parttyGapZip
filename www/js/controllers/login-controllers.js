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
  alert('LoginFBCtrl ');
  $ionicViewService.nextViewOptions({
    disableBack: true 
  });
  
  $scope.loginf = function(){
      
      $ionicViewService.nextViewOptions({
        disableBack: true
      });
      //alert("@0");
       if(openFB.isMob()){
        //alert("@1");
           document.addEventListener("deviceready", function () {
             if($localStorage.token == undefined){
                  //alert("@2");
                   $cordovaOauth.facebook("574073299368611", ["email"]).then(function(result) {
                              // results
                               //alert("@");
                              $scope.tokenfbview = result.access_token;
                              $localStorage.token = result.access_token;
                              //console.log(result);
                             
                               $state.go('app.main');
                              //$location.path("/main");
                              
                              
                          }, function(error) {
                             // alert("#");
                               $ionicViewService.nextViewOptions({
                                  disableBack: true
                                });
                              $state.go('app.loggedout');
                          });
              }else{
                  //alert("@3 "+$localStorage.token);
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


  alert($localStorage.token);
  alert(openFB.isMob());
  //aply timeout
  //REDIR PARA MAIN SE TIVER SESSION
  //verificar o motivo
  // ios n entra no document.
  if($localStorage.token != undefined){
     $ionicSideMenuDelegate.canDragContent(true);
     $state.go('app.main');
  }
 
   
});