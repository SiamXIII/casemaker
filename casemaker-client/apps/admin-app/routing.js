angular.module('casemaker-admin')
    .config(function ($routeProvider) {
        $routeProvider.when('/wares', {
            controller: 'waresCtrl',
            templateUrl: 'apps/admin-app/views/wares.html',
            access: {requiredLogin: true}
        });
        $routeProvider.when('/orders', {
            controller: 'ordersCtrl',
            templateUrl: 'apps/admin-app/views/orders.html',
            access: { requiredLogin: true }
        });
        $routeProvider.when('/services', {
            controller: 'extraCtrl',
            templateUrl: 'apps/admin-app/views/extra.html',
            access: { requiredLogin: true }
        });
        $routeProvider.when('/categories', {
            controller: 'categoriesCtrl',
            templateUrl: 'apps/admin-app/views/categories.html',
            access: { requiredLogin: true }
        });
        $routeProvider.when('/slides', {
            controller: 'slidesCtrl',
            templateUrl: 'apps/admin-app/views/slides.html',
            access: { requiredLogin: true }
        });
        $routeProvider.when('/services', {
            controller: 'servicesCtrl',
            templateUrl: 'apps/admin-app/views/services.html',
            access: { requiredLogin: true }
        });
        $routeProvider.when('/login', {
            templateUrl: 'apps/admin-app/views/login.html',
            controller: 'AdminUserCtrl',
            access: { requiredLogin: false }
        });
        $routeProvider.when('/', {
            access: { requiredLogin: true }
        });
        $routeProvider.when('', {
            access: { requiredLogin: true }
        });
        $routeProvider.otherwise({redirectTo: '/'});
    })
    .run(function ($rootScope, $location, AuthenticationService) {
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            if (nextRoute.access && nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
                $location.path('/login');
            }
        });
    });