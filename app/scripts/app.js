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
 // $scope.room = Rooms; 

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


blocchat.controller('ModalInstanceCtrl', function($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


blocchat.factory('Room', ['$firebase', function($firebase) {
  var ref = new Firebase("https://blocchat.firebaseio.com/");
  var rooms = $firebase(ref.child('rooms')).$asArray();

  addRoom = function(room) {
    rooms.$add(room);
    newRoom = "";
  };

  return {
    all: rooms
  }
}]);



