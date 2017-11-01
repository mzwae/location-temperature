angular
  .module('temperatureApp')
  .controller('homeCtrl', homeCtrl);

function homeCtrl(dataService, $scope) {
  var vm = this;
  vm.buttonStatus = true;
  vm.displayResults = false;
  vm.showErrorMsg = false;
  vm.ErrorMsg = "";

  vm.getCoordinates = function (position) {
    vm.lat = position.coords.latitude;
    vm.long = position.coords.longitude;
    vm.data = {
      lat: vm.lat,
      long: vm.long
    };
    dataService.sendCoords(vm.data)
      .success(function (res, status) {

        vm.temperature = res.temperature;
        vm.timezone = res.timezone;
        vm.googleMapKey = res.key;
        vm.displayResults = true;
        vm.buttonStatus = false;

      })
      .error(function (err) {
        console.log(err);
      });
  };

  vm.showError = function (error) {

    switch (error.code) {
      case error.PERMISSION_DENIED:
        vm.ErrorMsg = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        vm.ErrorMsg = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        vm.ErrorMsg = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        vm.ErrorMsg = "An unknown error occurred.";
        break;
    }
    
   
    $scope.$apply(function () {
      vm.showErrorMsg = true;
    });
   

  }

  vm.getLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(vm.getCoordinates, vm.showError);

    } else {
      vm.showErrorMsg = true;
      vm.ErrorMsg = 'Geolocation is not supported by this browser';
    }
  };


}