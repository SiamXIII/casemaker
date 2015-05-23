angular.module('casemaker')
    .factory('Wares', function ($resource, CONFIG) {
        return $resource(CONFIG.serverUrl + "/api/wares/:params", {}, {
            get: {
                method: 'GET',
                isArray: true
            },
            query: {
                method: 'GET',
                isArray: false
            }
        });
    })
    .factory('Search', function ($resource, CONFIG) {
        return $resource(CONFIG.serverUrl + "/api/search/wares", {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    })
    .factory('Categories', function ($resource, CONFIG) {
        return $resource(CONFIG.serverUrl + "/api/categories/:params", {}, {
            get: {
                method: 'GET',
                isArray: true
            },
            query: {
                method: 'GET',
                isArray: false
            }
        });
    })
    .factory('Slides', function ($resource, CONFIG) {
        return $resource(CONFIG.serverUrl + "/api/slides/:params", {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
    })
    .factory('Orders', function ($resource, CONFIG) {
        return $resource(CONFIG.serverUrl + "/api/orders/:params", {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
    })
    .factory('Promos', function ($resource, CONFIG) {
        return $resource(CONFIG.serverUrl + "/api/promos/:params", {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
    });