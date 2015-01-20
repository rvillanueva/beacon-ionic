'use strict';

/**
 * @ngdoc service
 * @name beaconApp.apiFactory
 * @description
 * # apiFactory
 * Factory in the beaconApp.
 */
angular.module('Beacon')
  .factory('apiFactory', function ($rootScope) {

    var users = {
      0: {
        name: 'Ryan Villanueva',
        role: 'Innovation Consultant',
        industry: {
          0: 'energy',
          1: 'industrial',
          2: 'aerospace',
          importance: '1',
        },
        service: {
          0: 'ix',
          1: 'ais',
          2: 'sa'
        },
        availability: {
          start: '2015-01-02',
          hours: 44,
          end: '2015-02-02'
        },
        location:"White Plains, NY",
        about: "General badass, etc etc and so on and so forth.",
        test: 'energy',
      },
      1: {
        name: 'Leo Ohannesian',
        role: 'Dude',
        industry: {
          0: 'S&A',
          1: 'Organizational Something',
          2: 'Test'
        },
        availability: {
          start: '2015-01-02',
          hours: 44,
          end: '2015-02-02'
        },
        location: "New York City, NY"
      },
      2: {
        name: 'Bruce Banner',
        role: 'Scientist',
        industry: {
          0: 'life',
          1: 'telecom',
          2: 'banking'
        },
        service: {
          0: 'sa',
          1: 'ams',
          2: 'sap'
        },
        availability: {
          start: '2015-01-02',
          hours: 20,
          end: '2015-02-02'
        },
        location: "New York City, NY"
      },
      3: {
        name: 'Jean Gray',
        role: 'X-Instructor',
        industry: {
          0: 'finance',
          1: 'education',
          2: 'travel'
        },
        service: {
          0: 'sa',
          1: 'ams',
          2: 'sap'
        },
        availability: {
          start: '2015-01-02',
          hours: 32,
          end: '2015-02-02'
        },
        location: "Xavier\'s School for the Gifted"
      }

    }

    var projects = {
      0: {
        name: 'Mission Implausible',
        industry: 'telecom',
        owner: 1,
        availability: {
          start: '2015-01-02',
          hours: 44,
          end: '2015-02-02'
        },
        desc: "Save the world from the biggest supervillain.",
        service: 'sa',
        status: 'open',
      },
      1: {
        name: 'Avengers Initiative',
        industry: 'industrial',
        owner: 1,
        availability: {
          start: '2015-02-01',
          hours: 44,
          end: '2015-02-23'
        },
        desc: "Defend against alien invaders.",
        service: 'ais',
        status: 'matched'
      }
    }

    var industries = {
      aerospace: {
        name: 'Aerospace & Defense',
      },
      automotive: {
        name: 'Automotive'
      },
      banking: {
        name: 'Banking',
      },
      finance: {
        name: 'Financial Markets'
      },
      chemicals: {
        name: 'Chemicals & Petroleum'
      },
      distribution: {
        name: 'Consumer Products'
      },
      education: {
        name: 'Education',
      },
      electronics: {
        name: 'Electronics',
      },
      energy: {
        name: 'Energy & Utilities',
      },
      government: {
        name: 'Government',
      },
      healthcare: {
        name: 'Healthcare',
      },
      industrial: {
        name: 'Industrial Products',
      },
      insurance: {
        name: 'Insurance',
      },
      life: {
        name: 'Life Sciences',
      },
      media: {
        name: 'Media & Entertainment',
      },
      retail: {
        name: 'Retail',
      },
      telecom: {
        name: 'Telecommunications',
      },
      travel: {
        name: 'Travel & Transportation',
      },
    }

    var services = {
      ais: {
        name: 'Application Innovation Services',
      },
      sa: {
        name: 'Strategy & Analytics',
      },
      oracle: {
        name: 'Oracle',
      },
      sap: {
        name: 'SAP',
      },
      ams: {
        name: 'Application Management Services',
      },
      bas: {
        name:'Business Analytics & Strategy',
      },
      ix: {
        name: 'Interactive Experience & Mobile',
      },
      appdev:{
        name: 'Application Development & Innovation'
      },
      ea: {
        name: 'Enterprise Applications'
      },
      gps: {
        name: 'Global Process Services'
      }
    }

    var importance = {
      0:{
        desc: 'Not important',
        value: null
      },
      1:{
        desc: 'Somewhat important',
        value: 1
      },
      2:{
        desc: 'Very important',
        value: 2
      }
    }

    var self = users[$rootScope.selfId]

    // Public API here
    return {
      users: function () {
        return users;
      },
      user: function (id) {
        return users[id];
      },
      projects: function () {
        return projects;
      },
      project: function (id) {
        return projects[id];
      },
      industries: function(){
        return industries;
      },
      services: function(){
        return services;
      },
      importance: function(){
        return importance;
      },
      self: function(){
        return self;
      },
      myProjects: function(){
        //need to filter for owned
        return projects;
      },
      addProject: function(){
        //push new project and request key
        //return key
        var projectKey = 2
        return projectKey;
      },
      saveProfile: function(){
        return 'Saved';
      },
      rankProfile: function(project){
        //write matching function here
        return 'Error';
      },
      rankProfiles: function(project){
        //runk rankProfile across all profiles
        return 'Error';
      },
      rankProject: function(profile){
        //for each project, match
        // industry prefs, service prefs, skill prefs, location prefs
        return 'Error';
      },
      rankProjects: function(profile){
        //run rankProject for all projects
        return 'Error';
      }
    };
  });
