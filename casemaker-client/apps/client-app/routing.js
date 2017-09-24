angular.module('casemaker')
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/catalog', {
            controller: 'catalogCtrl',
            templateUrl: '/casemaker-client/apps/client-app/views/catalog.html'
        }).when('/catalog/:category', {
            controller: 'categoryCtrl',
            templateUrl: '/casemaker-client/apps/client-app/views/category.html'
        }).when('/catalog/:category/:ware', {
            controller: 'wareCtrl',
            templateUrl: '/casemaker-client/apps/client-app/views/ware.html'
        }).when('/catalog/:category/:ware/design', {
            controller: 'wareDesignCtrl',
            templateUrl: '/casemaker-client/apps/client-app/views/ware-design.html'
        }).when('/search', {
            controller: 'searchCtrl',
            templateUrl: '/casemaker-client/apps/client-app/views/search.html'
        }).when('/extra', {
            controller: 'extraCtrl',
            templateUrl: '/casemaker-client/apps/client-app/views/extra.html'
        }).when('/', {
            controller: 'mainCtrl',
            templateUrl: '/casemaker-client/apps/client-app/views/main.html'
        }).otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });