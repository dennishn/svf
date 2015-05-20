(function () {
	'use strict';

	angular
		.module('Auth')
		.run(AuthRun);

	/* @ngInject */
	function AuthRun($rootScope, $state, $window, Auth, FirebaseAuth, User, UserMapping) {

		var pendingDoneLoading = true;
		var pendingState = {
			toState: {},
			toParams: {}
		};

		var HASHED_URL_REGEX = /\/#/g;

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			pendingDoneLoading = false;
			console.log(toState, $state, 'stuff going down bro')

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
								//if(!pendingDoneLoading) {
								//	angular.noop();
								//} else {
									$state.go('public.index').then(function() {
										pendingDoneLoading = true;
									});
								//}
							});

					})
					.catch(function(e) {
						console.error(e, pendingDoneLoading, Auth);
						Auth.signOut();
						$state.go('public.index').then(function() {
							pendingDoneLoading = true;
						});
						//if(!pendingDoneLoading) {
						//	angular.noop();
						//} else {
						//	$state.go('public.index').then(function() {
						//		pendingDoneLoading = true;
						//	});
						//}
					});

			} else if(FirebaseAuth.$getAuth() && Auth.me) {
				console.log('youre authed and registerred in the app');
				pendingDoneLoading = true;
				angular.noop();
			} else {
				console.log(pendingDoneLoading)
				if($window.location.href.match(HASHED_URL_REGEX).length > 0 && !pendingDoneLoading) {

				}

				if(!pendingDoneLoading) {
					angular.noop();
				} else {
					event.preventDefault();
					$state.go('public.index').then(function() {
						pendingDoneLoading = true;
					});
				}
				console.log('youre not authed, access denied!');

			}

		});

		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
			console.log('statechangeerror', error);
		});

	}

})();
