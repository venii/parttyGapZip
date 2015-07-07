angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing','ngAnimate', 'toastr'])


.controller('card-stack-playground', function ($scope,$rootScope,$ionicSideMenuDelegate,$localStorage,toastr) {
         
         heightClient = angular.element(document.querySelector('.menu-content.pane'))[0].offsetHeight;
         
         angular.element(document.querySelector('#viewport')).css("min-height", heightClient+"px");

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
        
        $scope.clickLeft = function(){
            element = document.querySelector('.cardnoanimate');
            //console.log(rpp);
            angular.element(element).removeClass('cardnoanimate').addClass('moveleft');
        }

        $scope.clickRight = function(){
            element = document.querySelector('.cardnoanimate');
            //console.log(rpp);
            angular.element(element).removeClass('cardnoanimate').addClass('moveright');
        }
        /*
        $scope.moveup = function(){
            element = document.querySelector('.cardnoanimate');
            //console.log(rpp);
            angular.element(element).removeClass('cardnoanimate').addClass('moveleft');

            
        }*/
        
        $scope.throwout = function (eventName, eventObject) {
            //console.log('throwout', eventObject);
        };

        $scope.throwoutleft = function (eventName, eventObject) {
            //console.log('throwoutleft', eventObject);
            toastr.clear();
            toastr.error('No','Noop',
                    { 'positionClass' : 'toast-bottom-full-width', 
                      'timeOut' : 1000,});
        };

        $scope.throwoutright = function (eventName, eventObject) {
            //console.log('throwoutright', eventObject);
            toastr.clear();
             toastr.success('Yes','Yah',
                    { 'positionClass' : 'toast-bottom-full-width', 
                      'timeOut' : 1000,});
        };

        $scope.throwin = function (eventName, eventObject) {
            //console.log('throwin', eventObject);
        };

        $scope.dragstart = function (eventName, eventObject) {
            //console.log('dragstart', eventObject);
        };

        $scope.dragmove = function (eventName, eventObject) {
            if(eventObject.throwDirection > 0){
                //alert("@");
                angular.element(document.querySelector('#viewport')).css("height", "auto");
                angular.element(document.querySelector('#viewport')).css("background", "green linear-gradient(to right,white 60%,green)");
                //angular.element(document.querySelector('#viewport')).css("linear-gradient", "-40px");
            }
            if(eventObject.throwDirection < 0){
                 angular.element(document.querySelector('#viewport')).css("height", "auto");
                angular.element(document.querySelector('#viewport')).css("background", "red linear-gradient(to left,white 60%,red)");
                //angular.element(document.querySelector('#viewport')).css("linear-gradient", "-40px");
            }



            console.log('dragmove', eventObject);
        };

        $scope.dragend = function (eventName, eventObject) {
            //console.log('dragend', eventObject);
            setTimeout(function(){
                angular.element(document.querySelector('#viewport')).css("background", "white");
            },100);
        };
    });