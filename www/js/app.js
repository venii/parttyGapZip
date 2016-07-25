angular.module('starter', [	 'ionic',
							               'ui.bootstrap',
                             'openfb',
                             'ionic.service.core',
                             'ionic.service.push',
                             'ng',
                             'ngCordova',
                             'ngStorage',
                             'ngIOS9UIWebViewPatch',
							 /*CONTROLLERS*/                              
                             'app.menu',
                             'login.controllers',
                             'main.controllers',
                             'registration.controllers',
                             'configurations.controllers',
                             'events.controllers',
                             'matches.controllers',
                             'cards-animation-matches.controllers',
                             'newmatchesfound.controllers',
                             'profile.controllers',
                             'chat.controllers',

                             /*SERVICES*/
                             'app.menu-service',
                             'app.login-service',
                             'app.main-service',
                             'app.chat-service',
                             'app.registration-service',
                             'app.profile-service',
                             'app.event-service',
                             'app.match-service',
                             'app.graph-service',
                             'app.sql-service'
  ])
  .run(function($ionicPlatform,OpenFB,SQLService) {

    $ionicPlatform.ready(function() {
      /*Inicia o DB*/
      SQLService.createSchema();
    });

  })
  .config(function($sceDelegateProvider,$stateProvider, $urlRouterProvider,$httpProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://*.facebook.*/**'
    ]);
  	//Routes do app
    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/core/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.loggedout', {
      url: "/loggedout",
      views: {
        'menuContent': {
          templateUrl: "templates/login/loggedout.html",
          controller: 'LoggedOutCtrl'
        }
      }
    })
    .state('app.chat', {
      url: "/chat/:idfb",
      views: {
        'menuContent': {
          templateUrl: "templates/chat/chat.html",
           controller: 'ChatCtrl'
        }
      }
    })
    .state('app.main', {
      url: "/main",
      views: {
        'menuContent': {
          templateUrl: "templates/core/main.html",
          controller: 'MainCtrl'
        }
      }
      
    })
    .state('app.registration', {
      url: "/registration",
      views: {
        'menuContent': {
          templateUrl: "templates/core/registration.html",
          controller: 'RegistrationCtrl'
        }
      } 
    })
    .state('app.login', {
        url: "/login",
        views: {
          'menuContent': {
            templateUrl: "templates/login/loginfb.html",
            controller: 'LoginFBCtrl'
          }
        }
    })
    .state('app.configurations', {
      url: "/configurations",
      views: {
        'menuContent': {
          templateUrl: "templates/configurations/configurations.html",
          controller: 'ConfigurationsCtrl'
        }
      },
      
    }).state('app.events', {
      url: "/events",
      views: {
        'menuContent': {
          templateUrl: "templates/events/events.html",
          controller: 'EventsCtrl'
        }
      },
    }).state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/profile/profile.html",
          controller: 'ProfileCtrl'
        }
      },
    }).state('app.matches', {
      url: "/matches",
      params : { dataEvent: null },      
      views: {
        'menuContent': {
          templateUrl: "templates/matches/matches.html",
          controller: 'MatchesCtrl'
        }
      },onExit: function(MatchService){
      	  //mostra menu do topo
          MatchService.showTopMenu();
      }    
    }).state('app.newmatchesfound', {
      url: "/newmatchesfound",
      views: {
        'menuContent': {
          templateUrl: "templates/newmatchesfound/newmatchesfound.html",
          controller: 'NewMatchesFoundCtrl'
        }
      },onExit: function(){
      		//Ajuste de CSS
            angular.element(document.querySelector('#menuAPP')).removeClass('hidden');   
      },onEnter: function(){
      		//Ajuste de CSS
            angular.element(document.querySelector('#menuAPP')).addClass('hidden');
            angular.element(document.querySelector('#newmatchesfoundView')).css("margin-top", "-40px");
      }
    }).state('app.newmatchesfound_receive', {
      url: "/newmatchesfound_receive",
      views: {
        'menuContent': {
          templateUrl: "templates/newmatchesfound/newmatchesfound.html",
          controller: 'NewMatchesFoundReceiveCtrl'
        }
      },onExit: function(){
      		//Ajuste de CSS
            angular.element(document.querySelector('#menuAPP')).removeClass('hidden');   
      },onEnter: function(){
      		//Ajuste de CSS
            angular.element(document.querySelector('#menuAPP')).addClass('hidden');
            angular.element(document.querySelector('#newmatchesfoundView')).css("margin-top", "-40px");
      }
      
    });
    //Se não tiver autenticado vai para o login
    $urlRouterProvider.otherwise('/app/login');

  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

 
  }])
  .config(['$compileProvider', function($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
  }]);
