'use strict';
angular.module('Beacon.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, USER_ROLES,
  AuthService, $location, $rootScope, apiFactory, AUTH_EVENTS) {

  $scope.userRoles = USER_ROLES;

  $scope.setCurrentUser = function() {
    console.log(AuthService.isAuthenticated())
    var userData = AuthService.isAuthenticated();
    if (AuthService.isAuthenticated() !== null){
      console.log(AuthService.isAuthenticated())
      console.log('setting')
      $rootScope.currentUser = userData.uid;
      apiFactory.getProfile().then(function(data){
        $scope.currentUserProfile = data;
      })

      console.log('current user set as ' + userData.uid)
    }

  };

  $scope.setCurrentUser();

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    if (AuthService.isAuthenticated()==null){
      $scope.modal.show();
    }
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
    .then(function(authData) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser();
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

  // Add Answer Modal

  $ionicModal.fromTemplateUrl('templates/addAnswer.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.answerModal = modal;
  });

  $scope.closeAnswer = function() {
    $scope.answerModal.hide();
  },

  $scope.addAnswer = function() {
    $scope.answerModal.show();
  };

  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (AuthService.isAuthenticated()==null){
      $scope.login();
    }
  });

})

.controller('HomeCtrl', function($scope, apiFactory) {
  apiFactory.getProfile().then(function(data){
    // isn't passing attributes correctly
    $scope.setBeacon(data)
    console.log('passed ' + data.ready)
  }, function(reason){
    console.log('Failed: ' + reason)
  });

  $scope.setBeacon = function(profile){
    $scope.beacon = profile.ready;
    console.log(profile)
    console.log(profile.ready)

    if (typeof $scope.beacon == "undefined"){
      $scope.beacon = false;
      apiFactory.ready('false')
    } else if ($scope.beacon){
      $scope.beaconStyle = 'button-positive';
    } else {
      $scope.beaconStyle = 'button-light';
    }
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

.controller('ProfileCtrl', function($scope, $location, apiFactory) {
  apiFactory.getProfile().then(function(data){
    $scope.profile = data;
  })
  $scope.goAnswers = function(){
    $location.path('app/profile/answers')
  }
  $scope.saveProfile = function(){
    var profileSave = {};
    if (typeof $scope.profile.role !== "undefined"){
      profileSave.role = $scope.profile.role;
    };
    if (typeof $scope.profile.location !== "undefined"){
      profileSave.location = $scope.profile.location
    };
    if (typeof $scope.profile.about !== "undefined"){
      profileSave.about = $scope.profile.about
    };
    console.log(profileSave)
    apiFactory.saveProfile(profileSave)
  }
})

.controller('RequestsCtrl', function($scope, $filter, apiFactory) {
  $scope.requests = apiFactory.myRequests();
})

.controller('RequestCtrl', function($scope) {
})

.controller('AnswersCtrl', function($scope, $filter, apiFactory) {
  apiFactory.getQuestionsAnswered().then(function(data){
    $scope.questions = data;
  })
})

.controller('AddAnswerCtrl', function($scope, $location, apiFactory) {
  apiFactory.getNextQuestion().then(function(data){
    $scope.question = data;
  })
  $scope.saveResponse = function(questionId, responseId){
    apiFactory.saveResponse(questionId, responseId);
    apiFactory.getNextQuestion().then(function(data){
      $scope.question = data;
    })
  }
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
