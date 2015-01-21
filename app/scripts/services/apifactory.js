'use strict';

/**
 * @ngdoc service
 * @name beaconApp.apiFactory
 * @description
 * # apiFactory
 * Factory in the beaconApp.
 */
angular.module('Beacon')
  .factory('apiFactory', function ($rootScope, $firebase) {

    var ref = new Firebase("https://ibmbeacon.firebaseio.com/");

    // Public API here
    return {
      users: function () {
        // Returns a list of all user unique ids

        return '';
      },
      user: function (id) {
        // Returns all info for a user
        return '';
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
      self: function(){
        return '';
      },
      myRequests: function(){
        //need to filter for owned
        var userId = 1;
        var sync = $firebase(ref.child('requests').orderByChild('requestorId').equalTo(userId));
        var myRequests = sync.$asArray();

        return myRequests;
      },
      addRequest: function(request){
        //push new project and request key
        //return key
        ref.child('requests').push(request)
        console.log('sent')
        return 'Sent';
      },
      saveProfile: function(){
        return 'Saved';
      },
      rankProfile: function(project){
        //write matching function here
        return 'Error';
      },
      rankProfiles: function(project){
        //rank rankProfile across all profiles
        return 'Error';
      }
    };
  });
