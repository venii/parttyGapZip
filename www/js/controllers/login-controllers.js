angular.module('login.controllers', ['starter'])
.controller('LoggedOutCtrl', function($scope,$state,$location,$cordovaOauth,$localStorage,$ionicViewService,OpenFB,$ionicSideMenuDelegate) {
    
    $ionicSideMenuDelegate.canDragContent(false);

    delete $localStorage.token;
    delete $localStorage;

    OpenFB.logout();
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    
    $state.go("app.login");

})
.controller('LoginFBCtrl', function($scope,$state,$location,$cordovaNetwork,$cordovaOauth,$localStorage,$ionicViewService,$ionicSideMenuDelegate) {
  //remove o history back quando usa GO() !
  console.log('Controller: LoginFBCtrl ');
  $ionicViewService.nextViewOptions({
    disableBack: true 
  });
  
  $scope.loginf = function(){
      



      $ionicViewService.nextViewOptions({
        disableBack: true
      });

       if(openFB.isMob()){


          if(!$cordovaNetwork.isOnline()){
              alert("Sem acesso a internet");
              return 0;
          }

           console.log("openFB.isMob() : "+openFB.isMob());
           
           document.addEventListener("deviceready", function () {
             if($localStorage.token == undefined){
                   console.log("$localStorage.token : undefined");
                   
                   $cordovaOauth.facebook("574073299368611", ["email"]).then(function(result) {
                              // results
                              console.log("@AUTH FACEBOOK");
                              $scope.tokenfbview = result.access_token;
                              $localStorage.token = result.access_token;
                              console.log(result);
                             
                               $state.go('app.main');
                              //$location.path("/main");
                              
                              
                          }, function(error) {
                              //alert("#");
                               console.log("error");
                               $ionicViewService.nextViewOptions({
                                  disableBack: true
                                });
                              $state.go('app.loggedout');
                          });
              }else{
                  console.log("@app.main "+$localStorage.token);
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




  //aply timeout
  //REDIR PARA MAIN SE TIVER SESSION
  //verificar o motivo
  // ios n entra no document.

  setTimeout(function(){
    
      if($localStorage.token != undefined){
         console.log("token without deviceready: "+$localStorage.token);
         $ionicSideMenuDelegate.canDragContent(true);

         if(openFB.isMob()){
               console.log("IS MOB without deviceready ");
               ionic.Platform.ready(function(){
                 //  alert("ionic ready");
                   console.log("ionic ready");
                    if($cordovaNetwork.isOnline()){
                    
                         $state.go('app.main');
                    }else{
                      alert("Sem acesso a internet");
             
                    }
               });
         }else{
             //alert("webready");
              console.log("not is mob ionic ready");
             $state.go('app.main');
         }

     }
  },1000);
 
   
}).controller('CarouselDemoCtrl', function ($scope,GeradorService) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [];



 // slides.push({/*image : 'img/gal/gal_img1.jpg'*/ , text : ''});
  //slides.push({/*image : 'img/gal/gal_img2.jpg'*/ , text : ''});
  slides.push({ text : 'Marque encontros e paquere na balada!', cor: GeradorService.randomColor()});
  slides.push({ text : 'Marque encontros e paquere na balada!', cor: GeradorService.randomColor()});
  
  /*
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '//placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }*/
  "#"+((1<<24)*Math.random()|0).toString(16)
}).service('GeradorService',function($sce,$compile,$localStorage,$ionicViewService,$http,$rootScope,$state,$ionicLoading,$templateRequest,$ionicSideMenuDelegate,$ionicScrollDelegate) {
          
           this.randomColor = function(){
              return "#"+((1<<24)*Math.random()|0).toString(16);
           };
  });