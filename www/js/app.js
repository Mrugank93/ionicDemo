// Ionic Starter App
angular.module('ionicApp', ['ionic', 'ionicApp.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.carwashes', {
    url: '/carwashes',
    views: {
      'menuContent': {
        templateUrl: 'templates/carwashes.html',
        controller: 'CarwashesCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/carwashes/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/carwash.html',
        controller: 'CarwashCtrl'
      }
    }
  })

  .state('app.locations', {
      url: '/locations',
      views: {
        'menuContent': {
          templateUrl: 'templates/locations.html',
          controller: 'LocationsCtrl'
        }
      }
   })

   .state('app.customers', {
     url: '/customers',
     views: {
       'menuContent': {
         templateUrl: 'templates/customers.html',
         controller: 'CustomersCtrl'
       }
     }
   })

   .state('app.customer', {
     url: '/customers/:id',
     views: {
       'menuContent': {
         templateUrl: 'templates/customer.html',
         controller: 'CustomerCtrl'
       }
     }
   })

   .state('app.location', {
      url: '/locations/:lId',
      views: {
        'menuContent': {
          templateUrl: 'templates/location.html',
          controller: 'LocationCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
