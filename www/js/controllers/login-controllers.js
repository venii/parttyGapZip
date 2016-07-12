angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,OpenFB,LoginService) {
    //serviço de loggout
    LoginService.loggout(function(){
      //envia para login apos logout
      OpenFB.logout();
      $state.go("app.login");
    });
})
.controller('LoginFBCtrl', function($scope,$state,$ionicViewService,LoginService,UtilsService,GraphService) {
  //fluxo login -> main
  $scope.loginf = function(){
     //verifica se é mobile
    LoginService.doLogin().then(function(response){
      //console.log(response);
      GraphService.getEventsFB().then(function(r){
        for(var i in r.data){
          var evt = r.data[i];
          evt_id = evt.id;

          
          GraphService.addEvent(evt);
          
          console.log(evt_id);

          GraphService.getEventAttendingFB(evt_id).then(function(r2){
            

            for(var i2 in r2.data){
              var attending = r2.data[i2];
              console.log(evt_id,attending);
              GraphService.addAttendingToEvent(evt_id,attending); 
            }
          });
          
          //console.log(GraphService.getEvent(1308632732499261));
          //console.log(GraphService.removeEvent(1308632732499261));

        }
      });
      //GraphService.getEventAttendingFB(1308632732499261);
      //se o login for verdadeiro salva a resposta e envia para o controlador main
      //LoginService.saveFBAuthObj(response); 
      //$state.go('app.main');
    });
              
   
  };
   
});