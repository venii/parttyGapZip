angular.module('starter')

.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}])

.directive('noImg',['$compile','$timeout','$filter', function($compile,$timeout,$filter) {
    return {
        
        restrict: 'A',

        link: function(scope, element, attrs){
            var getExtensionUrl = $filter('getExtensionUrl');
            var fileExtension = getExtensionUrl(element[0].src);

            if(fileExtension != "svg"){

                element[0].style.display = "none";

                var spinnerIndex = document.querySelectorAll('ion-spinner').length;
            
                var spinner = $compile("<ion-spinner class='spinner2_"+spinnerIndex+" fade-in'></ion-spinner>")(scope);
                angular.element(element[0].parentElement).append(spinner);

                $timeout(function () {
                    
                    element[0].onload = function(e){
                        element[0].style.display = "block";
                        element[0].classList.add("fade-in");
                        angular.element(document.querySelector('.spinner2_'+spinnerIndex)).remove();
                    }

                    element[0].onerror = function(e){
                        element[0].src = "img/noimg.png";
                        angular.element(document.querySelector('.spinner2_'+spinnerIndex)).remove();
                    }
                    
                    var urlToload = element[0].src;

                    //carrega IMAGEM como blob
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';

                    xhr.onload = function() {
                        var blob = xhr.response;
                        element[0].src = urlToload;
                    };
 
                    xhr.open('GET', urlToload);
                    
                    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                    //xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE');
                    xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type,Connection');
                    
                    xhr.send();       
                },1000,true);
            }
        }

    };
}])
.filter('getExtensionUrl',function(){
  
      return function(url){

        if(url !== null){
          var splitUrl = url.split('.').pop();

          return splitUrl;
        }
        
        return null;

      }
})

.filter('getImgType',function(){
        
        return function(url){
        if(url == null)
          return "none";

            return 'image/'+url.split('.').pop();

        }
})

.filter('getImgName',function(){
      
      return function(url){

        if(url === undefined)
          url = "";
        return url.split('/').pop();

      }
});