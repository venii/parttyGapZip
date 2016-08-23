angular.module('app.registration-service', ['starter','app.utils-service','app.registration-service','app.login-service','ngCordova'])
.service('RegistrationService',  function(
    $localStorage,$ionicViewService,
    $http,$cordovaDevice,

    
    /*
      Nosso servicos
    */
    UtilsService,
    LoginService,
    MainService
    ) {

  

      //função para salvar os dados do usuario
      this.saveUserData = function(resp){
          
          var profilePic = null;
          
          try{
            profilePic = resp.data.usuario.picture.data.url;
          }catch(err){
            console.log('saveUserData: '+err);
          }

          try{
            var postData = {
                  "ent_first_name"  : resp.data.usuario.name,
                  "ent_sex"         : (resp.data.usuario.gender == "male" ? 1 : 2),
                  "ent_device_type" : MainService.getDeviceType(),
                  "ent_push_token"  : MainService.getDeviceToken(),
                  "ent_auth_type"   : 1,
                  "ent_fbid"        : resp.data.usuario.id,
                  "urlProfilepic"   : profilePic
            };

            $localStorage.usuarioData = postData;
          }catch(err){
            console.log('saveUserData(2): '+err);
          }
      }

      //função para pegar json de dados do usuario
      this.getUserData = function(){
        return $localStorage.usuarioData;
      }

      //função para pegar o ID do FB do usuario
      this.getUserFbID = function(){
        return $localStorage.usuarioData.ent_fbid;
      }

      //função para pegar o usuario do FB do usuario
      this.getUserFbName = function(){
        return $localStorage.usuarioData.ent_first_name;
      }
      
      //função para trocar a coverPhoto no menu
      this.changeCoverMenuPhoto = function(url){
        try{
          angular.element(document.querySelector('#profilecontentmenu')).html("<img src='"+url+"' style='border-radius: 40px / 20px ;width:64px;height:64px' width='64' heigth='64' />");
        }catch(err){
          console.log("changeCoverMenuPhoto: "+err);
        }

      }

  });
