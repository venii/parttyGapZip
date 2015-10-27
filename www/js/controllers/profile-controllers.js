angular.module('profile.controllers', ['starter'])

.controller('ProfileCtrl', function($scope, $stateParams,$modal,$localStorage,$ionicLoading,$http,$ionicViewService,$state,$cordovaDatePicker) {
     
      $scope.nome = $localStorage.usuarioData.ent_first_name;
      $scope.mydesc = {};
      $scope.Personal_Desc = "";

      $scope.changedphoto = false;

      $scope.loadImage = function(){
          
          var widthI = 300;
          var heightI = 150;

          var obj = document.querySelector('#imgPIC');
         // alert("width: "+obj.width+" height: "+obj.height);
          console.log(obj.constructor.name);
          console.log(obj.src);
          var c = document.createElement("CANVAS");
          var ctx = c.getContext("2d");
          
          c.width = widthI;
          c.height = heightI;

          //ctx.drawImage(obj, 0, 0,obj.width-100,obj.height);
          ctx.drawImage(obj, 0, 0,widthI,heightI);
          //DIMINUIR QUALIDADE DA IMAGEM PARA DIMINUIR OS BITS VAO SER PASSADOS POR GET
          base64 = c.toDataURL();
          //alert("width: "+c.width+" height: "+c.height);
          /*var postData = {
            
               
                "ent_user_fbid" : $localStorage.usuarioData.ent_fbid,
                "ent_index_id" : 0,
                "ent_userimage" : base64
            };*/

          $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

          var filename = obj.src.replace(/^.*[\\\/]/, '');
          console.log("filename "+filename);
          if(filename != "noimg.png" && $scope.changedphoto ){
           // alert("###");

           /*
            $http.jsonp($localStorage.upload_user_image,{params : postData}).then(function(resp){
                console.log(resp.data.errMsg);
                //alert("1##" + resp.data.errMsg);

                if(resp.data.errNum == "18"){
                  angular.element(document.querySelector('#profilecontentmenu')).append("<img src='"+base64+"' style='border-radius: 150px;' width=64 heigth=64 />");
                  alert("Sua foto de perfil foi trocada.");
                }

            },function(err){parttyUtils.logPartty(err)});*/
            /*var postData = {
            
               
                "ent_user_fbid" : $localStorage.usuarioData.ent_fbid,
                "ent_image_flag" : 1,
                "ent_image_name" : 'profile_photo_'+$localStorage.usuarioData.ent_fbid+".png",
                "ent_image_chunk" : base64
            };*/

            var formData = new FormData();
              //formData.append("ent_user_fbid", $localStorage.usuarioData.ent_fbid);
              //formData.append("ent_index_id", 0); 
              //formData.append("ent_userimage", base64); 


              formData.append("ent_user_fbid", $localStorage.usuarioData.ent_fbid);
              formData.append("ent_image_flag", 1); 
              formData.append("ent_image_chunk", base64); 
              formData.append("ent_image_name", 'profile_photo_'+$localStorage.usuarioData.ent_fbid+".png"); 

              //Send form via AJAX
              var xhr = new XMLHttpRequest();
              //xhr.open("POST", $localStorage.upload_user_image);  
             
              xhr.open("POST",  $localStorage.uploadchunk);  
              xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    alert("Imagem Alterada com sucesso.");
                  } else {
                    console.error(xhr.statusText);
                  }
                }
              };
              xhr.onerror = function (e) {
                console.error(xhr.statusText);
              };


              xhr.send(formData);

          }
          //alert("#@#");
      };  
      

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
        
        window.imagePicker.getPictures(
            function(results) {
                
               
                $scope.changedphoto = true;
                $scope.imgPIC = results[0];
                $scope.$apply();

                
            }, function (error) {
                console.log('Error: ' + error);
            },
            {
              maximumImagesCount: 1,
              width: 800,
              height: 800,
              quality: 50
            }
        );

      };

      var postData = {
            
            "sess_fb": $localStorage.token,
            "ent_user_fbid" : $localStorage.usuarioData.ent_fbid
      };



       console.log("getprofile 1");
        //PEGA INFORMAÇOES NO WS DE USUARIO FACEBOOK
      $http.get(  $localStorage.getprofile,{params: postData}).then(function(resp) {
          //alert(resp.data.images);
          console.log("getprofile 2");
          console.log(resp);
          $scope.imgPIC = resp.data.profilePic;
          $scope.mydesc.desc = resp.data.persDesc;
      });
      console.log("getprofile 3");


});