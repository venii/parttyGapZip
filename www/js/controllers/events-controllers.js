angular.module('events.controllers', ['starter'])

.controller('EventsCtrl', function ($scope,$localStorage,$http,$ionicScrollDelegate) {
  $scope.clickGridEvents = function(item,index){
  	console.log(item);
  	
  	if(item.name != undefined){
  		alert("abrindo: "+item.name);
  	}
  };


   $scope.checkScroll = function () {

        var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
        var maxTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollView().__maxScrollTop;

        if (currentTop >= maxTop)
        {


        		console.log("$scope.tamanho_eventos "+$scope.tamanho_eventos);
        	   if($scope.tamanho_eventos == 0)
        	   	return ;
	           var postData = {
                
                "sessfb": $localStorage.token,
                "next": $scope.nextpag
              };

			   $http.get($localStorage.geteventsfb,{params: postData}).then(function(resp) {
			   		if(resp.data.data.next == $scope.nextpag)
			   			return ;

			   		for ( dado in resp.data.data) {

				      $scope.items.push(resp.data.data[dado]);
				    }
			   		$scope.tamanho_eventos = resp.data.data.length;
			   		$scope.nextpag = resp.data.next;
			   		$scope.prevpag = resp.data.previous;
			   			
			   });
        }
    };

	  var postData = {
	                
	                "sessfb": $localStorage.token
	              };
	   $http.get($localStorage.geteventsfb,{params: postData}).then(function(resp) {
	   		//console.log(resp);
	   		$scope.items = resp.data.data;
	   		$scope.nextpag = resp.data.next;
	   		$scope.prevpag = resp.data.previous;
	   			
	   });

}).controller('ControllerListEventsCtrl', function($scope) {
 $scope.shouldShowDelete = false;
 $scope.shouldShowReorder = false;
 $scope.listCanSwipe = true
});