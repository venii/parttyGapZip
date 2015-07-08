angular.module('cards-animation-matches.controllers', ['starter', 'gajus.swing','ngAnimate', 'toastr'])

.controller('card-stack-playground', function ($scope,parttyUtils,$rootScope,$ionicSideMenuDelegate,$localStorage,toastr) {
    $scope.$on("eventSendToWSMatches", function (args) {
            //args.state would have the state.
            console.log(args);
        });
})
.controller('card-stack-playground', function (SendMatchesToWS,$scope,parttyUtils,$rootScope,$ionicSideMenuDelegate,$localStorage,toastr) {
         
         heightClient = angular.element(document.querySelector('.menu-content.pane'))[0].offsetHeight;
         
         angular.element(document.querySelector('#viewport')).css("min-height", heightClient+"px");
         //angular.element(document.querySelector('#cardscontainer')).css("min-height", (heightClient-200)+"px");
         
        $ionicSideMenuDelegate.canDragContent(false);
        //console.log($rootScope.matchesData);
        



        $scope.cards = [];
        $scope.cardrest = 0;

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
        
        $scope.cardrest = $rootScope.matchesData.data.length-1;
        
        $scope.clickLeft = function(){
            
           
                    index = ($scope.cardrest);
                    console.log(index);
                    $scope.cards[index].animateclass = 'moveleft';
                    $scope.cards[index].actionclick = 1;
                    //$scope.cards.splice(index, 1);
                    
                    $scope.cardrest--;
            if($scope.cardrest < 0){
                SendMatchesToWS.sendMatches($scope.cards);
            }
               
        }

        $scope.clickRight = function(){
            
                     index = ($scope.cardrest);
                     console.log(index);
                     $scope.cards[index].animateclass = 'moveright';
                     $scope.cards[index].actionclick = 2;
                     //$scope.cards.splice(index, 1);  
                     $scope.cardrest--;
                     console.log($scope.cards);
             if($scope.cardrest < 0){
                    SendMatchesToWS.sendMatches($scope.cards);
               
             }         
        }

        
        

    }).service('SendMatchesToWS', function() {
            //FUNÇAO COM A LOGICA DE COMO MANDAR OS DADOS
            this.prepareArray = function(arrayMatches) { 
                    console.log("prepareArray");
                    return arrayMatches;
                };
            
            this.sendMatches = function(arrayMatches) { 
                    console.log("sendMatches");
                    this.prepareArray(arrayMatches);
                    return false; 
            };
             
            
    });