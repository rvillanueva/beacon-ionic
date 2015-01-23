'use strict';

/**
* @ngdoc service
* @name beaconApp.apiFactory
* @description
* # apiFactory
* Factory in the beaconApp.
*/

angular.module('Beacon')
.factory('AuthService', function ($q) {

  // Dev team: Will need to be rewritten for IBM intranet auth system

  var authService = {};
  var ref = new Firebase("https://ibmbeacon.firebaseio.com");

  var login = function(credentials){
    var deferred = $q.defer();
    // Keep the factory function but need to change authentication system below
    console.log('initiated')
    ref.authWithPassword({
      email    : credentials.username,
      password : credentials.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        deferred.reject('bad!')
      } else {
        console.log("Authenticated successfully with payload:", authData);
        var isNewUser;
        ref.child('users').child(authData.uid).once('value', function(snapshot) {
          // Checks if user is listed in database
          isNewUser = (snapshot.val() == null);
          if (authData && isNewUser) {
            // If no record of new user, the user's profile into database so we can add information onto it
            ref.child("users").child(authData.uid).set(authData);
            console.log('Added to user database')
          }
        });
        deferred.resolve('good!');
        console.log('sent promise');
      }
    });
    return deferred.promise;
  }


  return {
    login: login
  }

});
