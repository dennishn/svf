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

			var pendingDoneLoading = true;
			var pendingState = {
				toState: {},
				toParams: {}
			};

			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				pendingDoneLoading = false;
				console.log(FirebaseAuth.$getAuth())
				if(FirebaseAuth.$getAuth() && !Auth.me) {
					console.log('youre authed but not registerred in the app');
					event.preventDefault();

					var newState = {
						toState: toState,
						toParams: toParams
					};
					var authData = FirebaseAuth.$getAuth();

					UserMapping.find(authData.auth.uid)
						.then(function(mapping) {

							User.find(mapping['user-id'])
								.then(function(user) {
									Auth.me = user;
									pendingDoneLoading = true;
									return $state.go('application.home');
								})
								.catch(function(e) {
									console.error(e);
									pendingDoneLoading = true;
									$state.go('application.index');
								});

						});

				} else if(FirebaseAuth.$getAuth() && Auth.me) {
					console.log('youre authed and registerred in the app');
					pendingDoneLoading = true;
					angular.noop();
				} else {
					console.log(pendingDoneLoading)
					if(!pendingDoneLoading) {
						angular.noop();
					} else {
						event.preventDefault();
						$state.go('application.index').then(function() {
							pendingDoneLoading = true;
						});
					}
					console.log('youre not authed, access denied!');

				}

				//if(toState.private === undefined || toState.private === true) {
				//	console.log('its ok!')
				//	angular.noop();
				//} else {
				//	event.preventDefault();
				//	$state.go('application.index');
				//	//$rootScope.$emit('$statePermissionError');
				//}

			});

			$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
				//console.log('statechangeerror', error);
				//var errorObj, redirectObj;
				//
				//error = (typeof error === 'object') ? error.message : error;
				//
				////wrappedService.logoutUser();
				//
				//if(angular.isDefined(toState.redirectMap) && angular.isDefined(toState.redirectMap[error])) {
				//	if(typeof toState.redirectMap[error] === 'string') {
				//		console.log('a')
				//		return $state.go(toState.redirectMap[error], {error: error}, {location: true, inherit: false});
				//	} else if(typeof toState.redirectMap[error] === 'object') {
				//		console.log('b')
				//		redirectObj = toState.redirectMap[error];
				//		return $state.go(redirectObj.state, {error: redirectObj.prefix + error}, {location: true, inherit: false});
				//	}
				//}
				//// Make sure the user is logged out
				//wrappedService.logoutUser();
				//return $state.go(errorState, {error: error}, {location: true, inherit: false});

			});

			DS.registerAdapter('firebase', DSFirebaseAdapter, { default: true });
		}
})();
