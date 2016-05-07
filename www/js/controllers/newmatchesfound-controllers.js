angular.module('newmatchesfound.controllers', ['starter','cards-animation-matches.controllers'])

.controller('NewMatchesFoundCtrl', function (SendMatchesToWS,$ionicViewService,$templateRequest, $sce, $compile,$rootScope,$scope,$localStorage,$http,$ionicScrollDelegate,$ionicLoading,$state,$stateParams,$ionicSideMenuDelegate,SendMatchesToWS) {
  		  //tela para mostrar quando der matches apos avaliaçao de cards
        //se o resultado do invite der positivo , o servidor retornará um match e enviará para este controlador apos 
        //enviar a avaliaçao dos cards a api do party

        $ionicViewService.nextViewOptions({
          disableBack: true
        });

        
        //ajuste de layout
        angular.element(document.querySelector('#menuAPP')).addClass('hidden');
        angular.element(document.querySelector('#newmatchesfoundView')).css("margin-top", "-40px");
    
        heightClient = angular.element(document.querySelector('#newmatchesfoundView'))[0].offsetHeight;
        angular.element(document.querySelector('#newmatchesfoundView')).css("min-height", (heightClient+40)+"px");

        //carrega dados necessario para mostrar no template
        $scope.eventinfoJSON = $rootScope.eventData;
        $scope.msgmatch = $rootScope.newMatchFoundData.errMsg;
        $scope.nameMe = $localStorage.usuarioData.ent_first_name;
        $scope.nameInvited = $rootScope.newMatchFoundData.uName;
    	 
        $scope.urlInvited = $rootScope.newMatchFoundData.pPic;
        $scope.urlMe = $localStorage.usuarioData.urlProfilepic;

        //volta para eventos
    	  $scope.returnToEvents = function(){
            $ionicViewService.nextViewOptions({
              disableBack: true
            });

            $state.go('app.events');
        }

        //limpa newMatchFoundData
        $rootScope.newMatchFoundData = null;
  }).controller('NewMatchesFoundReceiveCtrl', function (SendMatchesToWS,$ionicViewService,$templateRequest, $sce, $compile,$rootScope,$scope,$localStorage,$http,$ionicScrollDelegate,$ionicLoading,$state,$stateParams,$ionicSideMenuDelegate,SendMatchesToWS) {
        
        //controlador iniciado quando usuario clica no push ou push chega ao dispositivo movel dele

        $ionicViewService.nextViewOptions({
          disableBack: true
        });
        
        //ajuste de css
        angular.element(document.querySelector('#menuAPP')).addClass('hidden');
        angular.element(document.querySelector('#newmatchesfoundView')).css("margin-top", "-40px");
        
        //configura variaveis para a view usar
        $scope.msgmatch = $rootScope.newMatchFoundData.errMsg;
        $scope.nameMe = $localStorage.usuarioData.ent_first_name;
        $scope.nameInvited = $rootScope.newMatchFoundData.uName;
         
        $scope.urlInvited = $rootScope.newMatchFoundData.pPic;
        $scope.urlMe = $localStorage.usuarioData.urlProfilepic;

        //volta a eventos
        $scope.returnToEvents = function(){
            $ionicViewService.nextViewOptions({
              disableBack: true
            });
            $state.go('app.events');
        }

        //limpa newMatchFoundData
        $rootScope.newMatchFoundData = null;
  });