(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name svfUsers
	 * @description
	 * # svfUsers
	 *
	 * Main module of the application.
	 */
	angular
		.module('svfUsers')
		.run(run);

		function run($rootScope, $state, DS, DSFirebaseAdapter, Auth, FirebaseAuth, User, UserMapping) {

			DS.registerAdapter('firebase', DSFirebaseAdapter, { default: true });

			$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
				$rootScope.currentState = toState;
				$rootScope.previousState = fromState;
			});

		}
})();
