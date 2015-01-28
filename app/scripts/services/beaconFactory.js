'use strict';

/**
 * @ngdoc service
 * @name Beacon.beaconFactory
 * @description
 * # beaconFactory
 * Factory in the beaconApp.
 */
angular.module('Beacon')
  .factory('beaconFactory', function ($http, $rootScope, AuthService) {

    //require the Twilio module and create a REST client

    var twilioPhone = '+16506514557'
    // Public API here
    // Dev Team: will need to rewrite for IBM backend
    return {
      request: function (request) {
        var data = {
          from: twilioPhone,
          to: '+14154123689', // Need to add selection function to identify best fit person,
          text: 'Test successful!',
        }


        $http.post('localhost:3000/sendmsg', data).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
        //return '';
      }
    };
  });
