// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ui.bootstrap',
                              'starter.controllers','sociogram.controllers','openfb',
                                 'ionic.service.core','ionic.service.push','ng',
                                      'app.controllers',
                                      ,'login.controllers',
                                      ,'main.controllers',
                                      ,'registration.controllers',
                                      ,'configurations.controllers','events.controllers'])

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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.loggedout', {
    url: "/loggedout",
    views: {
      'menuContent': {
        templateUrl: "templates/loggedout.html"
      }
    }
  })
  .state('app.chat', {
    url: "/chat",
    views: {
      'menuContent': {
        templateUrl: "templates/chat.html",
         controller: 'ChatCtrl'
      }
    }
  })

  .state('app.main', {
    url: "/main",
    views: {
      'menuContent': {
        templateUrl: "templates/main.html",
        controller: 'MainCtrl'
      }
    },
    
  })
  
  .state('app.registration', {
    url: "/registration",
    views: {
      'menuContent': {
        templateUrl: "templates/registration.html",
        controller: 'RegistrationCtrl'
      }
    },
    
  })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent': {
          templateUrl: "templates/loginfb.html",
          controller: 'LoginFBCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  }).state('app.configurations', {
    url: "/configurations",
    views: {
      'menuContent': {
        templateUrl: "templates/configurations.html",
        controller: 'ConfigurationsCtrl'
      }
    },
    
  }).state('app.events', {
    url: "/events",
    views: {
      'menuContent': {
        templateUrl: "templates/events.html",
        controller: 'EventsCtrl'
      }
    },
    
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
}]);
