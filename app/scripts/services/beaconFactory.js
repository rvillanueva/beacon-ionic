'use strict';

/**
 * @ngdoc service
 * @name beaconApp.apiFactory
 * @description
 * # apiFactory
 * Factory in the beaconApp.
 */
angular.module('Beacon')
  .factory('beaconFactory', function ($http, $rootScope, AuthService) {

    var twilioRef = 'https://api.twilio.com/2010-04-01/Accounts/ACfb610662bb1042b18f4e29fc4cb4f0eb/Messages';
    var twilioPhone = '+16506514557'
    // Public API here
    // Dev Team: will need to rewrite for IBM backend
    return {
      request: function (request) {
        var data = {
          from: twilioPhone,
          to: '+14154123689', // Need to add selection function to identify best fit person,
          body: 'Test successful!',
        }
        $http.post(twilioRef, data).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
        return '';
      }
    };
  });
