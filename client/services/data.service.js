(function () {
    /*Data service for pulling data from the API*/
    function dataService($http) {

        var sendCoords = function (coords) {
          return $http.post('/api/v1/geodata', coords);
        };
      
      
        
        return {
          sendCoords: sendCoords
        };
      };


      angular
        .module('temperatureApp')
        .service('dataService', dataService);

    })();