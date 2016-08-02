angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,OpenFB,LoginService) {
    //serviço de loggout
    LoginService.loggout(function(){
      //envia para login apos logout
      OpenFB.logout();
      $state.go("app.login");
    });
})
.controller('LoginFBCtrl', function($scope,$state,$ionicViewService,LoginService,UtilsService,GraphService,SQLService,Perfil) {
  //fluxo login -> main
  $scope.loginf = function(){
     //verifica se é mobile
    LoginService.autenticarFB().then(function(response){

      GraphService.getMeFB().then(function(response){
        LoginService.savePerfil(response);
       
        Perfil.save(response, function(r) {
                        console.log('save',r);
                        //data saved. do something here.
                      });
        
        console.log(response);

        Perfil.update(response, function(r) {
                        console.log('update',r);
                        //data saved. do something here.
                      });

        /*
        SQLService.insertIntoTable('fb_events',['id_fb_events','nome','data_evento']);
        SQLService.insertIntoTable('fb_events',['id_fb_events2','nome','data_evento']);
        SQLService.insertIntoTable('fb_events',['id_fb_events3','nome','data_evento']);


        SQLService.findById('fb_events','id_fb_events2').then(function(r){
          var obj = r[0];
          console.log(obj);
          
          obj.nome = "tiririca";

          SQLService.updateIntoTable('fb_events',obj,obj.id_fb_events);

          console.log(obj);
          
        });
        */
      });
      /*
      GraphService.getEventsFB().then(function(r){
        for(var i in r.data){
          var evt = r.data[i];
          evt_id = evt.id;
  
          GraphService.addEvent(evt);
          
          //console.log(evt_id);

          GraphService.getEventAttendingFB(evt_id).then(function(r2){
            console.log('r2',r2);

            for(var i2 in r2.attending.data){
              var att = r2.attending.data[i2];
              
              console.log(r2.eventFb,att);
              
              GraphService.addAttendingToEvent(r2.eventFb,att); 
            }
          });
          
          //console.log(GraphService.getEvent(1308632732499261));
          //console.log(GraphService.removeEvent(1308632732499261));

        }
      });*/
      //GraphService.getEventAttendingFB(1308632732499261);
      //se o login for verdadeiro salva a resposta e envia para o controlador main
      //LoginService.saveFBAuthObj(response); 
      //$state.go('app.main');
    });
              
   
  };
   
});