angular.module('app.profile-service', ['starter','app.utils-service','app.registration-service','app.login-service','ngCordova'])
.service('ProfileService',  function(
    $localStorage,$ionicViewService,
    $http,$cordovaDevice,

    
    /*
      Nosso servicos
    */

    UtilsService,
    AdressService,
    LoginService,
    MainService,
    RegistratonService
    ) {
		
    	
      var widthI = 300;
      var heightI = 150;

      this.openPhotoPicker = function(callback){
          
          window.imagePicker.getPictures(
            function(results) {
                callback(results);
            },

            function (error) {
                console.log('Error: ' + error);
            },
            
            {
              maximumImagesCount: 1,
              width: 800,
              height: 800,
              quality: 50
            }
        );

      }

      this.getProfile = function(token,fbid,callback){
        
        var postData = {
              "sess_fb": token,
              "ent_user_fbid" : fbid
        };

        $http.get(AdressService.getprofile,{params: postData}).then(function(resp) {
          callback(resp.data.profilePic,resp.data.persDesc);
        });

      }

      // id => #imgPIC
      this.converImageBase64 = function(id,callback){
          try{
            var obj = document.querySelector('#'+id);
           
            var c = document.createElement("CANVAS");
            var ctx = c.getContext("2d");
            
            c.width = widthI;
            c.height = heightI;

            ctx.drawImage(obj, 0, 0,widthI,heightI);
            base64 = c.toDataURL();

            callback(base64);
          
          }catch(err){
            console.log("converImageBase64: "+err);
          }
      }

      this.saveProfile = function(token,fbid,desc,callback){
          var postData = {
            "sess_fb": token,
            "ent_user_fbid" : fbid,
            "ent_pers_desc" : desc
          };

          $http.get(AdressService.editprofile,{params: postData}).then(function(resp) {
                alert("Atualizado");
                callback(resp);
          });
      }

      this.uploadPhoto = function (fbid,base64photo,callback){
          $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
          var formData = new FormData();

          formData.append("ent_user_fbid", fbid);
          formData.append("ent_image_flag", 1); 
          formData.append("ent_image_chunk", base64photo); 
          formData.append("ent_image_name", 'profile_photo_'+fbid+".png"); 

          var xhr = new XMLHttpRequest();
             
          xhr.open("POST",  $localStorage.uploadchunk);  
          xhr.onload = function (e) {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  alert("Imagem Alterada com sucesso.");
                  
                  callback(xhr);
                  
                } else {
                  callback(xhr);
                }
              }
          };
          xhr.onerror = function (e) {
              console.error(xhr.statusText);
          };


          xhr.send(formData);

      }
  });
