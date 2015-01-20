'use strict';
angular.module('Beacon.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  }
})

.controller('HomeCtrl', function($scope) {
})

.controller('ProfileCtrl', function($scope) {
})

.controller('RequestsCtrl', function($scope) {
  $scope.requests = [
{ title: 'Rescue kitten from tree', id: 1 },
{ title: 'Locate Timmy (check well)', id: 2 },
{ title: 'Save Gotham', id: 3 },
{ title: 'Receive key to the city', id: 4 },
{ title: 'See Auntie May', id: 5 },
{ title: 'Buy eggs', id: 6 }
  ];
})

.controller('RequestCtrl', function($scope, $stateParams) {
});
