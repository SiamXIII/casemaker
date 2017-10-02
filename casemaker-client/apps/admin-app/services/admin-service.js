angular.module('casemaker-admin')
.factory('Wares', function ($resource, CONFIG) {
	return $resource(CONFIG.serverUrl + "/api/wares/:params", {}, {
		get: {
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
.factory('Services', function ($resource, CONFIG) {
	return $resource(CONFIG.serverUrl + "/api/services/:params", {}, {
		get: {
			method: 'GET',
			isArray: true
		}
	});
});