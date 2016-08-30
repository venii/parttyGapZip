angular.module('app.profile-service', ['starter'])
.service('ProfileService',  function(
    $localStorage,
    $http,
    $cordovaDevice,
    $q,
    
    /*
      Nosso servicos
    */

    UtilsService
    ) {
		

      var widthI = 300;
      var heightI = 150;

      //função para abrir galeria do mobile
      this.returnFoto = function(callback){
         var defer = $q.defer();

         if(UtilsService.isMob()){ 
          window.imagePicker.getPictures(
            function(results) {
              var uri = results[0];
              
              var xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';

              xhr.onload = function() {
                  var blob = xhr.response;               
                  q.resolve(blob);
              };

              xhr.open('GET', uri);
              xhr.send();

              
            },{
              maximumImagesCount: 1,
              width: 300,
              height: 300,
              quality: 20
            }
          );
        
        }else{
          
          element = document.querySelector("input[type=file]");
          element.click();
          
          element.onchange = function(){
            defer.resolve(element.files[0]);
          }
        }

        return defer.promise
      }

      //função para atualizar photo da api do partty
      this.uploadPhoto = function (fbid,base64photo,callback){
          $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
          var formData = new FormData();

          formData.append("ent_user_fbid", fbid);
          formData.append("ent_image_flag", 1); 
          formData.append("ent_image_chunk", base64photo); 
          formData.append("ent_image_name", 'profile_photo_'+fbid+".png"); 

          var xhr = new XMLHttpRequest();
             
          xhr.open("POST",  AdressService.uploadchunk);  
          xhr.onload = function (e) {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
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
