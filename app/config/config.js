(function () {
	'use strict';

	var core = angular.module('core', ['DEBUG_ENV', 'js-data']);

	core.constant('FIREBASE_REF', 'https://resplendent-heat-2502.firebaseio.com/');

	core.config(configure);

	/* @ngInject */
	function configure(
		DEBUG_ENV,
		$stateProvider,
		$urlRouterProvider,
		$locationProvider,
		DSFirebaseAdapterProvider,
		FIREBASE_REF
	) {
		DSFirebaseAdapterProvider.defaults.basePath = FIREBASE_REF;

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/404');

		$stateProvider
			.state('application.notfound', {
				url: '/404',
				views: {
					'application@': {
						templateUrl: '404.html'
					}
				}
			})
			.state('error', {
				url: '/503',
				views: {
					'application@': {
						templateUrl: '503.html'
					}
				}
			});
	}

})();
