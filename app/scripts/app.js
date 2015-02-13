blocchat = angular.module('BlocChat', ['firebase', 'ui.router', 'ui.bootstrap']);


blocchat.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'Home.controller',
    templateUrl: '/templates/home.html'
  });
}]);



blocchat.controller('Home.controller', ['$scope', '$firebase', 'Room', function($scope, $firebase, $modal, Room) {
  $scope.room = Rooms; 
  
  $scope.open = function(size) {

    var modalInstance = $modal.open({
      templateUrl: '/templates/modal.html',
      controller: 'ModalInstanceCtrl',
      size: size
    })
  };

}]);

blocchat.controller('ModalInstance',['$scope', '$firebase', function($scope, $firebase) {




}]);



blocchat.factory('Room', ['$firebase', function($firebase) {
  var ref = new Firebase("https://blocchat.firebaseio.com/");
  var rooms = $firebase(ref.child('rooms')).$asArray();

  addRoom = function(room) {
    rooms.$add({room: room});
    newRoom = "";
  };

  return {
    all: rooms
  }
}]);



