'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Beacon', ['ionic', 'config', 'Beacon.controllers','Beacon.filters','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  user: 'user'
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent' :{
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent' :{
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.requests', {
      url: '/requests',
      views: {
        'menuContent' :{
          templateUrl: 'templates/requests.html',
          controller: 'RequestsCtrl'
        }
      }
    })

    .state('app.request', {
      url: '/requests/:requestId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/request.html',
          controller: 'RequestCtrl'
        }
      }
    })

    .state('app.addRequest', {
      url: '/addRequest',
      views: {
        'menuContent' :{
          templateUrl: 'templates/addRequest.html',
          controller: 'AddRequestCtrl'
        }
      }
    })
    .state('app.requesting', {
      url: '/requesting',
      views: {
        'menuContent' :{
          templateUrl: 'templates/requesting.html',
          controller: 'RequestingCtrl'
        }
      }
    })
    .state('app.questions', {
      url: '/profile/questions',
      views: {
        'menuContent' :{
          templateUrl: 'templates/questions.html',
          controller: 'QuestionsCtrl'
        }
      }
    })
    .state('app.question', {
      url: '/profile/questions/:questionId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/question.html',
          controller: 'QuestionCtrl'
        }
      }
    })


    .state('app.login', {
      url: '/login',
      views: {
        'menuContent' :{
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
