angular.module('ionicApp.controllers', [])

.controller('AppCtrl', function($scope) {
  $scope.first = "As the manager of a chain of car wash facilities, I have to keep track of the number of cars that are serviced each day at different carwashes. For this I want an app that lists the multiple car wash facilities that I manage. Further I also want to know what the details of each car wash facility like average service time, total collections, utilization rate etc";
  $scope.second = "Use the ionic starter app to show a list of car wash facilities. On clicking each car wash navigate to a new page which displays the details of the car wash. Use a timeout function to model a server request for fetching the details of car wash. All values can be randomly generated.";
})

.controller('HomeCtrl', function($scope) {
  console.log("Homecontroller");
})

.controller('CarwashesCtrl', function($rootScope, $http, $q, $ionicLoading, $timeout) {

  // show loading
  $ionicLoading.show({
    template: 'Loading...',
    duration: 3000
  }).then(function() {
    console.log("The loading indicator is now displayed");
  });

  // APIs
  var names = $http.get("js/carwashes.json"),
    customers = $http.get("js/users.json"),
    cars = $http.get("js/cars.json");
  // locations is just a demo json data to demonstrate the usage of  $q (promises) to run request asynchronously

  function getDatas() {
    $q.all([names, customers, cars]).then(function(results) {
      angular.forEach(results, function(obj, index) {
        console.log("API %d", index + 1);
        console.log(obj);
        // carwashes
        $rootScope.carwashesDetails = [];

        if (obj.status == 200 && index == 0)
          $rootScope.carwashes = obj.data;

        // customers
        if (obj.status == 200 && index == 1)
          $rootScope.customers = obj.data;

        // cars
        if (obj.status == 200 && index == 2) {
          $rootScope.cars = obj.data;

          $ionicLoading.hide().then(function() {
            console.log("The loading indicator is now hidden");
          });
        }

      });
    });
  }
  // to show loading and demonstrate $timeout
  $timeout(getDatas, 500);
})

.controller('CarwashCtrl', function($scope, $rootScope, $stateParams, $state, $timeout) {
  $scope.customers_cars = [];
  // get individual details
  if (!$rootScope.carwashes || !$rootScope.cars)
    $state.go('app.carwashes');

  function getCarwash(cars, collection, avgTime) {
    angular.forEach($rootScope.carwashes, function(obj) {
      if (obj.id == $stateParams.id) {
        $scope.carwashDetails = obj;
        $scope.carwashDetails.cars = cars;
        $scope.carwashDetails.totalCollection = collection;
        $scope.carwashDetails.averageTime = avgTime;
        console.log($scope.carwashDetails);
      }
    });
  }

  // process data
  angular.forEach($rootScope.cars, function(cars, index) {
    angular.forEach($rootScope.customers, function(cust, index1) {
      if (cars.cust_id == $stateParams.id && parseInt(cars.user_id) == cust.id) {
        cars.users_detail = cust;
      }

      if (index1 + 1 == $rootScope.customers.length) {
        if (index + 1 == $rootScope.cars.length) {
          var newCars = [],
            collection = 0,
            avgTime = 0;

          angular.forEach($rootScope.carwashes, function(obj, final1) {
            angular.forEach($rootScope.cars, function(cars, final2) {
              if (obj.id == $stateParams.id && parseInt(cars.cust_id) == obj.id) {
                collection = parseInt(collection) + parseInt(cars.cost);
                avgTime = parseInt(avgTime) + parseInt(cars.service_time);
                newCars.push(cars);
              }

              if (final2 + 1 == $rootScope.cars.length) {
                if (final1 + 1 == $rootScope.carwashes.length) {
                  // console.log(collection);
                  avgTime = avgTime / newCars.length;
                  getCarwash(newCars, collection, avgTime);
                }
              }
            });
          });
        }
      }
    });
  });
})

// JUST to demonstrate $http request
.controller('LocationsCtrl', function($scope, $http, $stateParams) {
  // normal request
  $http.get("js/carwashes.json").then(function(result) {
    $scope.locations = [];
    angular.forEach(result.data, function(obj) {
      var found = $scope.locations.some(function(el) {
        return el.location === obj.location;
      });
      if (!found)
        $scope.locations.push(obj);
      // console.log($scope.locations);
    });
  });
})

.controller('LocationCtrl', function($scope, $stateParams) {})

.controller('CustomersCtrl', function($rootScope, $http, $q, $ionicLoading, $timeout) {

  // show loading
  $ionicLoading.show({
    template: 'Loading...',
    duration: 3000
  }).then(function() {
    console.log("The loading indicator is now displayed");
  });

  // APIs
  $http.get("js/users.json").then(function(resp) {
    $rootScope.customers = resp.data;

    $ionicLoading.hide().then(function() {
      console.log("The loading indicator is now hidden");
    });
  });
})

.controller('CustomerCtrl', function($scope, $rootScope, $stateParams, $state) {
  if (!$rootScope.customers)
    $state.go('app.customers');

  angular.forEach($rootScope.customers, function(obj) {
    if (obj.id == $stateParams.id) {
      $scope.customer = obj;
    }
  });
})

.filter('secondsToHHmmss', function($filter) {
  return function(seconds) {
    return $filter('date')(new Date(0, 0, 0).setSeconds(seconds), 'HH:mm');
  };
});
