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
                             'ionic.contrib.ui.tinderCards',
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
                             'app.profile-service',
                             'app.match-service',
                             'app.graph-service',
                             'app.sql-service',
                             'app.resources-service'							              
  ])
  .value("HOST_API","http://127.0.0.1")
  .run(function($ionicPlatform,$state,$rootScope,$cordovaPush,$ionicPopup,SQLService,$localStorage,UtilsService) {

    $ionicPlatform.ready(function() {
      /*Inicia o DB*/
      //SQLService.deleteSchema();
      
      if(UtilsService.isIOS()){
          $localStorage.tipoDevice = "IOS";
      }else if(UtilsService.isAndroid()){
          $localStorage.tipoDevice = "ANDROID";
      }else{
          $localStorage.token = "";
          $localStorage.tipoDevice = "WEB";
      }

      if(UtilsService.isMob()){
          $rootScope.db = window.openDatabase("dbapp_partty.db", "1.0", "parttyapp", 1000000);
      }else{
          $rootScope.db = window.openDatabase("dbapp_partty.db", "1.0", "parttyapp", 1000000);
      }

      SQLService.createSchema();
      

      /*PUSH*/
      if(UtilsService.isMob()){
        //IOS
        if(UtilsService.isIOS()){
            var iosConfig = {
              "badge": true,
              "sound": true,
              "alert": true,
            };

            $cordovaPush.register(iosConfig).then(function(deviceToken) {
                $localStorage.token = deviceToken;
            });

        }
        
        //ANDROID
        if(UtilsService.isAndroid()){
            var androidConfig = {
              "senderID": "709766240218",
            };

            $cordovaPush.register(androidConfig).then(function(result) {
              $localStorage.token = result;
              console.log()
            }, function(err) {
              // Error
            })

        }

        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            /*PUSH*/
            if(UtilsService.isIOS()){
              console.log(event);
              console.log(notification);
            }
            
            //ANDROID
            if(UtilsService.isAndroid()){
              if(notification.event == "registered"){
                $localStorage.token = notification.regid;
              }

              if(notification.event == "message"){
                console.log(notification);
              }
              

            }
        });

      }

    });

    $rootScope.$on('$stateChangeStart', function(event, newUrl, oldUrl){

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
      'http://192.168.0.13/**',
      'https://*.phonegap.com/**'
    ]);

    $stateProvider


    .state('login', {
        url: "/login",
        templateUrl: "templates/login/login.html",
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/core/menu.html",
      controller: 'AppCtrl'
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
      cache: false,
      url: "/matches/:id_event",   
      templateUrl: "templates/matches/matches.html",
      
    })

    .state('matchesfound', {
      cache: false,
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
  }]);

