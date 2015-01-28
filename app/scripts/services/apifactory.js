'use strict';

/**
 * @ngdoc service
 * @name beaconApp.apiFactory
 * @description
 * # apiFactory
 * Factory in the beaconApp.
 */
angular.module('Beacon')
  .factory('apiFactory', function ($rootScope, $firebase, $q, AuthService) {

    var ref = new Firebase("https://ibmbeacon.firebaseio.com/");

    var responseSync = $firebase(ref.child('responses'));
    var responseKey = responseSync.$asObject();

    // Public API here
    // Dev Team: will need to rewrite for IBM backend
    return {
      users: function () {
        // Returns a list of all user unique ids
        return '';
      },
      user: function (id) {
        // Returns all data for a user
        var sync = $firebase(ref.child('user').child(id));
        var user = sync.$asObject();
        return user;
      },
      projects: function () {
        // Returns a list of all project names
        return '';
      },
      project: function (id) {
        return '';
      },
      traitKey: function(type){
        // Returns JSON object with list of industry keys and names. Example: "industry" or "service"
        var sync = $firebase(ref.child('traitKey').child(type));
        var traitKey = sync.$asObject();
        return traitKey;
      },
      responseKey: function(type){
        // Returns JSON object with list of industry keys and names. Example: "industry" or "service"
        return responseKey[type];
      },
      self: function(){
        return '';
      },
      myRequests: function(){
        //need to filter for owned
        console.log(AuthService.isAuthenticated());
        if (AuthService.isAuthenticated() !== null){
          var userId = $rootScope.currentUser;
          var sync = $firebase(ref.child('requests').orderByChild('requestorId').equalTo(userId));
          var myRequests = sync.$asArray();
          console.log('Requests retrieved')
        } else {
          console.log('Error retrieving requests.')
          return 'Error retrieving requests.';
        }

        return myRequests;
      },
      addRequest: function(request){
        //push new project and request key
        //return key
        request.requestorId = $rootScope.currentUser;
        var newRequest = ref.child('requests').push(request);
        var newRequestId = newRequest.key();
        console.log(newRequestId)
        //beaconFactory.request(request)
        return newRequestId;
      },
      getProfile: function(){
        var deferred = $q.defer();
        // Promise is being fulfilled but for some reason can't access attributes
        if (AuthService.isAuthenticated() !== null){
          var userId = $rootScope.currentUser;
          var sync = $firebase(ref.child('users').child(userId).child('profile'));
          var profile = sync.$asObject();
          deferred.resolve(profile);
        } else {
          console.log('Error getting profile');
          deferred.reject('Error getting profile');
        }
        return deferred.promise;
      },
      saveProfile: function(data){
        var userId = $rootScope.currentUser;
        ref.child('users').child(userId).child('profile').update(data)
      },
      rankProfile: function(project){
        //write matching function here
        return 'Error';
      },
      rankProfiles: function(project){
        //rank rankProfile across all profiles
        return 'Error';
      },
      getQuestionsAnswered: function(){
        // Returns JSON object responses user has made with attached question text and response values
        var deferred = $q.defer();
        ref.child('users').child($rootScope.currentUser).child('responses').once('value', function(dataSnapshot) {
          var userResponses = dataSnapshot.val();
          console.log(userResponses)
          ref.child('questions').once('value', function(qDataSnapshot) {
            var questions = qDataSnapshot.val();
            console.log(questions)
            angular.forEach(userResponses, function(value, key) {
              var output = {};
              output[key] = {};
              output[key].value = value;
              output[key].text = questions[key].text;
              output[key].responses = responseKey[questions[key].responses]
              console.log(output)
              deferred.resolve(output)
            });
          });
        });
        return deferred.promise;
      },
      getQuestion: function(id){
        // Returns list of all questions
        var sync = $firebase(ref.child('questions').child(id));
        var question = sync.$asObject();
        return question;
      },
      getResponses: function(id){
        // Returns response for specific question ID
        var deferred = $q.defer();
        ref.child('questions').child(id).once('value', function(dataSnapshot) {
          var question = dataSnapshot.val();
          var sync = $firebase(ref.child('responses').child(question.responses));
          var responses = sync.$asObject();
          deferred.resolve(responses)
        });
        return deferred.promise;
      },
      saveResponse: function(questionId, responseId){
        ref.child('users').child($rootScope.currentUser).child('responses').child(questionId).update(responseId);
      },
      ready: function(toggle){
        // Readies individual profile to accept requests
        var userId = $rootScope.currentUser; //change to rootscope user
        ref.child('users').child(userId).child('profile').child('ready').set(toggle);
        console.log('Readiness set to ' + toggle);
      },
    };
  });
