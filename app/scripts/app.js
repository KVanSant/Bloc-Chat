blocchat = angular.module('BlocChat', ['firebase', 'ui.router', 'ui.bootstrap']);


blocchat.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeCtrl',
    templateUrl: '/templates/home.html'
  });
}]);



blocchat.controller('HomeCtrl', ['$scope', 'Room', 'Message', function($scope, Room, Message) {
  $scope.rooms = Room.all; 
  $scope.messages = Message.all;

  $scope.select = function(room){
    $scope.selected = room;
    console.log(room.$id); 
  };
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
    },
    messages: function(roomID){
      ref.child('messages').orderByChild('roomid').equalTo('roomID');
    }
  };
}]);


 blocchat.factory('Message', ['$firebase', function($firebase){
  var ref = new Firebase("https://blocchat.firebaseio.com/");
  var messages = $firebase(ref.child('messages')).$asArray();

  return {
    all: messages
  };
 }]);



