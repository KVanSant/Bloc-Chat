(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
blocchat = angular.module('BlocChat', ['firebase', 'ui.router', 'ui.bootstrap']);


blocchat.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'Home.controller',
    templateUrl: '/templates/home.html'
  });
}]);



blocchat.controller('Home.controller', ['$scope', 'Room', function($scope, Room) {
 $scope.room = Room.all; 

}]);


blocchat.controller('ModalCtrl', function ($scope, $modal) {

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });
  };
});


blocchat.controller('ModalInstanceCtrl', function($scope, $modalInstance, Room) {
  
  $scope.addRoom = function() {
    Room.create($scope.newRoom);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


blocchat.factory('Room', ['$firebase', function($firebase) {
  var ref = new Firebase("https://blocchat.firebaseio.com/");
  var rooms = $firebase(ref.child('rooms')).$asArray();

  
  return {
    all: rooms,
    create: function(room){
      rooms.$add({room: room});
    }
  };
}]);




},{}]},{},[1]);