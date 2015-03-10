(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
blocchat = angular.module('BlocChat', ['firebase', 'ui.router', 'ui.bootstrap', 'ngCookies']);


blocchat.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeCtrl',
    templateUrl: '/templates/home.html'
  });
}]);


blocchat.run(['$cookies', '$modal', function($cookies, $modal) {
 
  if (!$cookies.blocChatCurrentUser || $cookies.blocChatCurrentUser === ''){
    
     $modal.open({
      template: '<div class="modal-header">\
                    <h3 class="modal-title">Set a username</h3>\
                  </div>\
                  <div class="modal-body">\
                    <p>This name will appear when you send messages</p>\
                    <input type="text" ng-model="newUser">\
                  </div>\
                  <div class="modal-footer">\
                  <button class="btn btn-primary" ng-click="addUser(newUser)">Set username</button>\
                </div>',
      controller: 'UserModalInstanceCtrl',
      size: 'sm'
    });   
  }

  
}]);


blocchat.controller('HomeCtrl', ['$scope', 'Room', 'Message',  function($scope, Room, Message) {
  $scope.rooms = Room.all; 
  
  
  $scope.select = function(roomId){
    $scope.activeRoom = $scope.rooms.$getRecord(roomId);
    $scope.messages = Room.messages($scope.activeRoom.$id);
  };

  $scope.sendMessage = function(){
    Message.send($scope.newMessage, $scope.activeRoom.$id);
    $scope.newMessage = "";
  };
  
}]);



blocchat.controller('ModalCtrl', function($scope, $modal) {

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


blocchat.controller('UserModalInstanceCtrl', function($scope, $modalInstance, $cookieStore) {

  $scope.addUser = function(username) {
    $cookieStore.put('blocChatCurrentUser', username);
    $modalInstance.close()
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
      var messagesArray = $firebase(ref.child('messages').orderByChild('roomid').equalTo(roomID)).$asArray();
      return messagesArray;
    }
  };
}]);



blocchat.factory('Message', ['$firebase', '$cookieStore', function($firebase, $cookieStore) {
  var ref = new Firebase("https://blocchat.firebaseio.com/");
  var messages = $firebase(ref.child('messages')).$asArray();
  
  return {
    send: function(newMessage, roomID) {
      messages.$add({
        content: newMessage,
        sentat: Firebase.ServerValue.TIMESTAMP,
        roomid: roomID,
        username: $cookieStore.get('blocChatCurrentUser')
      });
    }
  }
}]);




},{}]},{},[1]);