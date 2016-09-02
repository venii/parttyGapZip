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
          
          var fbid = $localStorage.fbid;

          var formData = new FormData();
          
          formData.append("fbid",  fbid);
          formData.append("slot",  slot);
          formData.append("photo", blob); 
 

          $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
          $http.post(HOST_API+"/upload_image",formData, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
          })
          .success(function(xhr){
            defer.resolve(xhr);
          })
          .error(function(xhr){
            defer.reject(xhr);
          });
          
          return defer.promise;
      }

      this.loadCoverProfileFoto = function(){
        try{
          
          var url = $localStorage.imgCover;
          var profileDom = document.querySelector('#profileCover');

          if(profileDom.querySelector('img') === null){
            angular.element(profileDom).append("<img src='"+url+"' style='border-radius: 40px;' no-img width='64' heigth='64' />");
          }else{
            profileDom[0].src = url;
          }

        }catch(err){
          console.log("loadCoverProfileFoto:",err);
        }

      }
    
  });
