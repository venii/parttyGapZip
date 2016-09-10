angular.module('app.resources-service', ['starter'])
/*PREFERENCIAS*/
.factory('Preferencias', function($resource,HOST_API) {
    /*Model de Preferencias*/
    var Preferencias = $resource(HOST_API+'/preferencias/:id',{ id: '@id' },
      
      { update: {method: 'PUT'} });

      

    Preferencias.prototype.update = function(cb) {
     
      return Preferencias.update({
      
        id: this.id
      
        }, angular.extend({}, this, {
      
          _id: undefined
        }), cb);
   
    };
    
    return Preferencias;
})
/*PREFERENCIAS*/
/*PERFIL*/
.factory('Perfil', function($resource,HOST_API) {
  	/*Model de Perfil*/
    var Perfil = $resource(HOST_API+'/perfil/:id',{ id: '@id' },
      
      { update: {method: 'PUT'} });

      

    Perfil.prototype.update = function(cb) {
     
      return Perfil.update({
      
        id: this.id
      
        }, angular.extend({}, this, {
      
          _id: undefined
        }), cb);
   
    };
    
  	return Perfil;
})
/*PERFIL*/
/*EVENTO*/
.factory('Evento', function($resource,HOST_API) {
    /*Model de Perfil*/
    var Evento = $resource(HOST_API+'/evento/:id',{ id: '@id' },
      
      { update: {method: 'PUT'} });

    Evento.prototype.update = function(cb) {
     
      return Evento.update({
      
        id: this.id
      
        }, angular.extend({}, this, {
      
          _id: undefined
        }), cb);
   
    };
    
    return Evento;
});
