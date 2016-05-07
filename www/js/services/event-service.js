angular.module('app.event-service', ['starter','app.utils-service','app.registration-service','app.login-service','ngCordova'])
.service('EventService',  function(
    $localStorage,$ionicViewService,
    $http,$cordovaDevice,
    $ionicScrollDelegate,
    
    /*
      Nosso servicos
    */

    UtilsService,
    AdressService,
    LoginService,
    MainService,
    RegistrationService
    ) {
		  

      //função para pegar  primeira pagina de eventos do facebook pela api do partty
      this.getFirstEvent = function(token,callback){
        var postData = {
                  "sessfb": token
        };
        this.getEvents(postData,callback);
      }

      //função para pegar eventos do fb (atraves de paginas de referencias vindo da graph)
      this.getEvents = function(postData,callback){
        
        $http.get(AdressService.geteventsfb,{params: postData})
        .then(function(resp) {
            callback(resp);
              
        });

      }

      //função para validar token da graph api
      this.validateTokenFetchEvents = function(resp){
          if(resp.data == null || resp.data.error){
            return false;    
          }
          return true;
              
      }
      
      //função para verificar se é o fim da lista de eventos (utilizando as refs da graph api e scroll)
      this.isEndList = function(){
        var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
        var maxTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop;

        if (currentTop >= maxTop)
          return true;
        return false;
      }
  });
