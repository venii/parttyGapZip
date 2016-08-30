angular.module('app.profile-service', ['starter'])
.service('ProfileService',  function(
    $localStorage,
    $http,
    $cordovaDevice,
    $q,
    UtilsService,
    HOST_API
    ) {
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

      this.uploadPhoto = function (blob,slot){
          var defer = $q.defer();
          
          $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
          
          var formData = new FormData();
          var fbid = $localStorage.fbid;

          formData.append("fbif",  fbid); 
          formData.append("photo", blob); 
          formData.append("slot",  slot); 

          var xhr = new XMLHttpRequest();
             
          xhr.open("POST",  HOST_API+"/perfil/upload_image/"+fbid);  
          xhr.onload = function (e) {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  defer.resolve(xhr);
                }else{
                  defer.resolve(xhr);
                }
              }
          };
          
          xhr.onerror = function (e) {
              defer.reject(xhr.statusText);
          };

          xhr.send(formData);

          return defer.promise;
      }
    
  });
