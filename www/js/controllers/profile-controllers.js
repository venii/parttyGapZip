angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($scope, $state,


      ProfileService,RegistrationService,
      LoginService) {
     
      $scope.nome = RegistrationService.getUserFbName();
      $scope.mydesc = {};
      
      $scope.changedphoto = false;


      $scope.processForm = function(){
        
        setTimeout(function(){

            var postData = {
            
              "sess_fb": $localStorage.token,
              "ent_user_fbid" : $localStorage.usuarioData.ent_fbid,
              "ent_pers_desc" : $scope.mydesc.desc
            };

            $http.get($localStorage.editprofile,{params: postData}).then(function(resp) {
                //alert($localStorage.photoProfile64 );
                alert("Atualizado");

            });
                
        },1000);

      };
    
      $scope.changephoto = function(){
        ProfileService.openPhotoPicker(function(results){
            var fbid = RegistrationService.getUserFbID();
              
            //METODO WEB
            if(typeof(results.convertBase64) != "undefined"){
              var base64 = ProfileService.getBase64ActualImage();
              
              ProfileService.uploadPhoto(fbid,base64,function(xhr){
                  alert("Imagen Alterada");
              });
           
            //METODO PARA DISPOSITIVOS
            }else{
              ProfileService.converImageBase64("imgPIC",function(base64){
                
                ProfileService.uploadPhoto(fbid,base64,function(xhr){
                    alert("Imagen Alterada");
                });
              });
            }
            
        });
      };

      var fbid = RegistrationService.getUserFbID();
      var token = LoginService.getToken();
      

      ProfileService.getProfile(token,fbid,function(profilePic,persDesc){
         $scope.imgPIC = profilePic;
         $scope.mydesc.desc = persDesc;
      });
});