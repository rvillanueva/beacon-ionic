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

  $scope.doLogin = function (credentials) {
    AuthService.login($scope.loginData)
    .then(function(user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      $scope.modal.hide();
      $scope.loginData.password = null;
    }, function (error) {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      console.log('failed')
      $scope.loginData.password = null;
    });
  };

  $scope.logout = function() {
    AuthService.logout();
  };

  $ionicModal.fromTemplateUrl('templates/addRequest.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.beaconModal = modal;
  });

  $scope.closeBeacon = function() {
    $scope.beaconModal.hide();
  },

  $scope.addBeacon = function() {
    $scope.beaconModal.show();
    console.log('showing modal')
  };

  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (AuthService.isAuthenticated()==null){
      $scope.login();
    }
  });

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
    $scope.beaconModal.hide();
    $location.path('/app/requesting');
  }
})
.controller('RequestingCtrl', function($scope) {
});
