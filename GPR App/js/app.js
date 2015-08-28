// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


angular.module('appgpr', ['ionic','ngCordova', 'appgpr.controllers', 'appgpr.services','angular.filter','ngResource'])

.config(function($compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|local|file):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content|x-wmapp0):|data:image\//);
})

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova ) {
     // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $rootScope.ClubId='41567cd0-4c06-11e5-ae0b-391e9e071642';
    $rootScope.UserLoggedin='';
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
	
  	.state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl',
        /*onEnter: function($state, Auth){
            if(!Auth.isLoggedIn()){
               $state.go('login');
            }
        }*/
  	})
    
    .state('app.teams', {
      url: "/teams",
      views: {
        'menuContent' :{
          templateUrl: "templates/teams.html",
          controller: 'GameCtrl'
        }
      }
    })
  
    .state('app2', {
      url: "/app2",
      abstract: true,
      templateUrl: "templates/menuBack.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
     .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })
    .state('app.squad', {
      url: "/squad",
      views: {
        'menuContent' :{
          templateUrl: "templates/squad.html"
        }
      }
    })
    .state('app2.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
  
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

