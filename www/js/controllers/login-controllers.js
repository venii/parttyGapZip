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
.controller('LoginFBCtrl', function($scope,$state,$location,
  $cordovaNetwork,$cordovaOauth,$localStorage,$ionicViewService,$ionicSideMenuDelegate,
  LoginService,UtilsService) {
  

  $ionicViewService.nextViewOptions({
    disableBack: true 
  });
  
  $scope.loginf = function(){
     
     if(UtilsService.isMob()){

        if(!LoginService.isAuthFb()){

              LoginService.doLogin(function(response){
                LoginService.saveFBAuthObj(response); 
                $state.go('app.main');
              });
              
         }else{                  
              $state.go('app.main');
         }

        
         
     }else{
          
         if(!LoginService.isAuthFb()){

              LoginService.doLogin(function(response){
                LoginService.saveFBAuthObj(response); 
                $state.go('app.main');          
              });
              
         }else{                  
              $state.go('app.main');
         }

     }
  };
   
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