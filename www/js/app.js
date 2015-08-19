// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
try{
  angular.module('starter', ['ionic','ui.bootstrap',
                                'starter.controllers','sociogram.controllers','openfb',
                                   'ionic.service.core','ionic.service.push','ng',
                                        'app.controllers',
                                        ,'login.controllers',
                                        ,'main.controllers',
                                        ,'registration.controllers',
                                        ,'configurations.controllers'
                                        ,'events.controllers'
                                        ,'matches.controllers',
                                       'cards-animation-matches.controllers',
                                       'newmatchesfound.controllers',
                                       'profile.controllers'])

  .run(function($ionicPlatform,OpenFB) {

  //  OpenFB.init('574073299368611','http://parttyionic.ddns.net:8100/',window.localStorage);

     //OpenFB.init('574073299368611','http://parttyionic.ddns.net:8100/oauthcallback.html',window.localStorage);


    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      console.log(window.plugins.pushNotification);
    });
  })

  .config(function($stateProvider, $urlRouterProvider,$httpProvider) {


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
      },
      
    })
    
    .state('app.registration', {
      url: "/registration",
      views: {
        'menuContent': {
          templateUrl: "templates/core/registration.html",
          controller: 'RegistrationCtrl'
        }
      },
      
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
      //remover de app para nao carregar o side menu =)
    }).state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/profile/profile.html",
          controller: 'ProfileCtrl'
        }
      },
      //remover de app para nao carregar o side menu =)
    }).state('app.matches', {
      url: "/matches/:idevent",
      views: {
        'menuContent': {
          templateUrl: "templates/matches/matches.html",
          controller: 'MatchesCtrl'
        }
      },onExit: function(){
            angular.element(document.querySelector('#menuAPP')).removeClass('hidden');
          
      },onEnter: function(){

            angular.element(document.querySelector('#menuAPP')).addClass('hidden');
            //angular.element(document.querySelector('#matchesView')).addClass('menuUptoTop');


            angular.element(document.querySelector('#matchesView')).css("margin-top", "-40px");
            
            //angular.element(document.querySelector('#matchesView')).css("margin-top", "-40px");
            //alert("@#");
      }
      
    }).state('app.newmatchesfound', {
      url: "/newmatchesfound",
      views: {
        'menuContent': {
          templateUrl: "templates/newmatchesfound/newmatchesfound.html",
          controller: 'NewMatchesFoundCtrl'
        }
      },onExit: function(){
            angular.element(document.querySelector('#menuAPP')).removeClass('hidden');
          
      },onEnter: function(){

            angular.element(document.querySelector('#menuAPP')).addClass('hidden');
            //angular.element(document.querySelector('#matchesView')).addClass('menuUptoTop');


            angular.element(document.querySelector('#newmatchesfoundView')).css("margin-top", "-40px");
            
            //angular.element(document.querySelector('#matchesView')).css("margin-top", "-40px");
            //alert("@#");
      }
      
    }).state('app.newmatchesfound_receive', {
      url: "/newmatchesfound_receive",
      views: {
        'menuContent': {
          templateUrl: "templates/newmatchesfound/newmatchesfound.html",
          controller: 'NewMatchesFoundReceiveCtrl'
        }
      },onExit: function(){
            angular.element(document.querySelector('#menuAPP')).removeClass('hidden');
          
      },onEnter: function(){

            angular.element(document.querySelector('#menuAPP')).addClass('hidden');
            //angular.element(document.querySelector('#matchesView')).addClass('menuUptoTop');


            angular.element(document.querySelector('#newmatchesfoundView')).css("margin-top", "-40px");
            
            //angular.element(document.querySelector('#matchesView')).css("margin-top", "-40px");
            //alert("@#");
      }
      
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');


    
  }).config(['$ionicAppProvider', function($ionicAppProvider) {
    // Identify app
    $ionicAppProvider.identify({
      // The App ID (from apps.ionic.io) for the server
      app_id: '93517726',
      // The public API key all services will use for this app
      api_key: '55d0b73b57dbec9303196edb48750c9ffd85236e5ed35f12'
    });
  }]).config(['$httpProvider', function($httpProvider) {
    // Identify app
    $httpProvider.defaults.useXDomain = true;
     delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]).config(['$compileProvider', function($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
        }]);
}catch(err){
  alert(err.message);
}