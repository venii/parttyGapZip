angular.module('modal.controllers', ['starter'])

.controller('ModalDobCtrl', function ($scope, $modalInstance,$localStorage,$http,$state) {

  $scope.ok = function () {
    var date = $scope.dt;
    var dd = date.getDate();
	  var mm = date.getMonth()+1; //January is 0!

	  var yyyy = date.getFullYear();
	  
  	var postData = {
  	    
  	    "ent_fbid": $localStorage.usuarioData.ent_fbid,
  	    "dob" : yyyy+"-"+mm+"-"+dd
  	};
   
    $http.get($localStorage.updatedob,{params: postData}).then(function(resp) {
      $modalInstance.close($scope.dt);
    	$state.go('app.configurations');
    });
    
  };

});