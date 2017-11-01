(function () {
  angular.module('temperatureApp', ['ngRoute']);
  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }


  angular
    .module('temperatureApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();
