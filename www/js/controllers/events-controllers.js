angular.module('events.controllers', ['starter'])

.controller('EventsCtrl', function ($scope,$rootScope,$stateParams,$localStorage,$http,$ionicScrollDelegate,$ionicLoading,$state,$ionicViewService) {
  
  //angular.element(document.querySelector('#menuAPP')).removeClass('hidden');
  console.log($stateParams);
  $scope.clickGridEvents = function(item,index){
  	//console.log(item);
  	
  	if(item.name != undefined){
  		$ionicViewService.nextViewOptions({
          disableBack: false
        });
        
        $rootScope.eventData = item;
  		$state.go('app.matches',{"idevent" : item.id});

  		//alert("abrindo: "+item.name);
  	}
  };

   

   $scope.checkScroll = function () {
   		
   		if($scope.nextpag == null)
   			return ;

        var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
        var maxTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop;

        if (currentTop >= maxTop)
        {


        	   
	           
	           var postData = {
                
                "sessfb": $localStorage.token,
                "next": $scope.nextpag
              };

              $ionicLoading.show({
		          template: 'Carregando mais Eventos...'
		      });

             if($scope.loadingscrollevents == undefined){
               $scope.loadingscrollevents = true;
			   $http.get($localStorage.geteventsfb,{params: postData}).then(function(resp) {
			   		$ionicLoading.hide();

			   		if(resp.data == null || resp.data.error){
			   			
			   			return ;
			   		}
			   		

			   		for ( dado in resp.data.data) {

				      $scope.items.push(resp.data.data[dado]);
				    }
			   		

			   		$scope.nextpag = resp.data.next;
			   		$scope.prevpag = resp.data.previous;
			   		$scope.loadingscrollevents = false;	
			   		$scope.loadingscrollevents = undefined;
			   });
			}
            console.log("var $scope.loadingscrollevents "+$scope.loadingscrollevents);
        }
    };

	  var postData = {
	                
	                "sessfb": $localStorage.token
	              };


	   $http.get($localStorage.geteventsfb,{params: postData}).then(function(resp) {
	   		//console.log(resp);
	   		if(resp.data == null || resp.data.error){
			   	alert("Autentique com o Facebook novamente.");
			   	$localStorage.token = "";
			   	$state.go("app.login");		
	   			return ;
	   		}
	   			
	   		$scope.items = resp.data.data;
	   		$scope.nextpag = resp.data.next;
	   		$scope.prevpag = resp.data.previous;
	   			
	   });

}).controller('ControllerListEventsCtrl', function($scope) {
 $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true
});