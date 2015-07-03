angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing'])


.controller('CardsCtrl', function($scope,$ionicSideMenuDelegate) {
  console.log($ionicSideMenuDelegate);
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.cards = [
        {name: 'foo'},
        {name: 'bar'}
    ];
    $scope.remove = function (index) {
        $scope.cards.splice(index, 1);
    }
    $scope.add = function (name) {
        $scope.cards.push({name: name});
    };
})

.controller('CardCtrl', function($scope) {
  
}).controller('card-stack-playground', function ($scope) {
        $scope.cards = [
            {name: 'clubs', symbol: '♣'},
            {name: 'diamonds', symbol: '♦'},
            {name: 'hearts', symbol: '♥'},
            {name: 'spades', symbol: '♠'}
        ];

        $scope.throwout = function (eventName, eventObject) {
            console.log('throwout', eventObject);
        };

        $scope.throwoutleft = function (eventName, eventObject) {
            console.log('throwoutleft', eventObject);
        };

        $scope.throwoutright = function (eventName, eventObject) {
            console.log('throwoutright', eventObject);
        };

        $scope.throwin = function (eventName, eventObject) {
            console.log('throwin', eventObject);
        };

        $scope.dragstart = function (eventName, eventObject) {
            console.log('dragstart', eventObject);
        };

        $scope.dragmove = function (eventName, eventObject) {
            console.log('dragmove', eventObject);
        };

        $scope.dragend = function (eventName, eventObject) {
            console.log('dragend', eventObject);
        };
    });