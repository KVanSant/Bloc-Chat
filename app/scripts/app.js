blocchat = angular.module('BlocChat', ['firebase', 'ui.router']);

blocchat.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'Home.controller',
    templateUrl: '/templates/home.html'
  });


blocchat.controller('Home.controller', ['$scope', '$firebase',  function($scope, $firebase) {
  var ref = new Firebase("https://blocchat.firebaseio.com/");
  var sync = $firebase(ref);

}]);