'use strict';
angular.module('Beacon.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, USER_ROLES,
  AuthService, $location, $rootScope, AUTH_EVENTS) {

  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
    console.log('current user set as ' + user)
  };

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.doLogin = function (credentials) {
    AuthService.login($scope.loginData)
    .then(function(user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      $scope.modal.hide();
    }, function (error) {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      console.log('failed')
    });
  };

  // Perform the login action when the user submits the login form
//  $scope.doLogin = function() {
//    AuthService.login($scope.loginData)
//    $timeout(function() {
//      $scope.closeLogin();
//    }, 1000);
//  }

})

.controller('HomeCtrl', function($scope, apiFactory) {
  $scope.beacon = false;
  if ($scope.beacon){
    $scope.beaconStyle = 'button-positive';
  } else {
    $scope.beaconStyle = 'button-light';
  }
  $scope.firstResponder = function(){
  };
  $scope.toggleResponder = function(){
    if ($scope.beacon){
      $scope.beacon = false;
      $scope.beaconStyle = 'button-light';
      apiFactory.ready('false');
    } else if (!$scope.beacon){
      $scope.beacon = true;
      $scope.beaconStyle = 'button-positive';
      apiFactory.ready('true');
    }
  }
})

.controller('LoginCtrl', function ($scope) {
})

.controller('ProfileCtrl', function($scope) {
})

.controller('RequestsCtrl', function($scope, $filter, apiFactory) {
  $scope.requests = apiFactory.myRequests();
})

.controller('RequestCtrl', function($scope) {
})


.controller('AddRequestCtrl', function($scope, $location, apiFactory) {
  $scope.request ={
    status: 'open',
    created: new Date().getTime(),
    // Should really be server-assigned
    hours: 1
  };
  $scope.industryKey = apiFactory.traitKey('industry');
  $scope.serviceKey = apiFactory.traitKey('service');
  $scope.submit = function(){
    console.log($scope.requestName);
    console.log($scope.request);
    apiFactory.addRequest($scope.request);
    $location.path('/app/requesting');
  }
})
.controller('RequestingCtrl', function($scope) {
});
