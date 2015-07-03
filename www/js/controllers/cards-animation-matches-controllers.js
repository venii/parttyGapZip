angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing'])


.controller('card-stack-playground', function ($scope,$rootScope,$ionicSideMenuDelegate,$localStorage) {
         
        $ionicSideMenuDelegate.canDragContent(false);
        console.log($rootScope.matchesData);
        
        $scope.cards = [];
        
        if($rootScope.matchesData.data.length > 0){
            //alert("@");
            angular.forEach($rootScope.matchesData.data, function(value, key) {
                if(value.id != $localStorage.usuarioData.ent_fbid)
                    $scope.cards.push(value);
            });

        }else{
            $ionicViewService.nextViewOptions({
              disableBack: true
            });
            alert("Não há matches.")
            $state.go("app.events");
        }
        

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