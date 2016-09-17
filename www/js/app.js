angular.module('starter', [	 'ionic',
							               'ui.bootstrap',
                             'openfb',
                             'ionic.service.core',
                             'ionic.service.push',
                             'ng',
                             'ngCordova',
                             'ngStorage',
                             'ngResource',
                             'ngIOS9UIWebViewPatch',
                             /*CONTROLLERS*/                              
                             'app.menu',
                             'login.controllers',
                             
                             'events.controllers',
                             
                             'matches.controllers',
                             'configurations.controllers',
                             'matchesfound.controllers',
                             
                             'profile.controllers',
                             'chat.controllers',
                             /*SERVICES*/
                             'app.menu-service',
                             'app.login-service',
                             'app.chat-service',
                             'app.profile-service',
                             'app.match-service',
                             'app.graph-service',

                             'app.sql-service',
                             'app.resources-service'							              

  ])
  .value("HOST_API","http://127.0.0.1:8080")
  .run(function($ionicPlatform,$state,$rootScope,SQLService,UtilsService,$localStorage,$ionicPopup) {

    $ionicPlatform.ready(function() {
      /*Inicia o DB*/
      //SQLService.deleteSchema();
      SQLService.createSchema();
      if(UtilsService.isIOS()){
          $localStorage.tipoDevice = "IOS";
      }else if(UtilsService.isAndroid()){
          $localStorage.tipoDevice = "ANDROID";
      }else{
          $localStorage.token = "";
          $localStorage.tipoDevice = "WEB";
      }

     
    });

    $rootScope.$on('$stateChangeStart', function(event, newUrl, oldUrl){
      //console.log(oldUrl,newUrl);
      
        //console.log('$localStorage.Configurations_Mensagem',$localStorage.Configurations_Mensagem,oldUrl,newUrl);
        
        if($localStorage.hasOwnProperty('Configurations_Mensagem')){
          if($localStorage.Configurations_Mensagem == 'NENHUM_REGISTRO_ENCONTRADO'){
            
            if(newUrl.url){
              if(newUrl.url != "/configurations" && newUrl.url != "/login"){
                 $ionicPopup.show({
                        title:'Atenção',
                        template:'Atualize suas Preferencias.',
                         buttons: [
                                    {text : 'Fechar'}
                                  ]
                      });
                event.preventDefault();  
              }
            }
          }
        }
    });

  })

  .config(function($sceDelegateProvider,$stateProvider, $urlRouterProvider,$httpProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://*.facebook.*/**',
      'http://localhost.*/**',
      'http://127.0.0.1:8080/**',
    ]);

    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/core/menu.html",
      controller: 'AppCtrl'
    })

    .state('login', {
        url: "/login",
        templateUrl: "templates/login/loginfb.html",
    })
    
    .state('app.configurations', {
      cache: false,
      url: "/configurations",
      views: {
        'menuContent': {
          templateUrl: "templates/configurations/configurations.html",
          controller: 'ConfigurationsCtrl'
        }
      },
      
    })
    
    .state('app.events', {
      url: "/events",
      views: {
        'menuContent': {
          templateUrl: "templates/events/events.html",
          controller: 'EventsCtrl'
        }
      },
    })

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/profile/profile.html",
          controller: 'ProfileCtrl'
        }
      },
    })

    .state('matches', {
      url: "/matches/:id_event",   
      templateUrl: "templates/matches/matches.html",
      
    })

    .state('matchesfound', {
      url: "/matchesfound",
      templateUrl: "templates/matchesfound/matchesfound.html",
    })

    .state('app.chat', {
      url: "/chat/:idfb",
      views: {
        'menuContent': {
          templateUrl: "templates/chat/chat.html",
           controller: 'ChatCtrl'
        }
      }
    });
    
    //Se não tiver autenticado vai para o login
    $urlRouterProvider.otherwise('/login');
  
  }).factory('$exceptionHandler', ['$log','$injector' , function($log,$injector) {
    return function myExceptionHandler(exception, cause) {
      
      $log.warn(exception, cause);

      if(exception.hasOwnProperty('code')){
        if(exception.code == 190){
          $log.warn(exception, cause);
          var LoginService = $injector.get("LoginService");
          var $state       = $injector.get("$state");
         
          LoginService.loggout();
          $state.go('login');

        }
      }
    };
  }]);;
