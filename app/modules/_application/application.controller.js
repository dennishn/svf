(function () {
	'use strict';

	angular
		.module('application')
		.controller('Application', Application);

	/* @ngInject */
	function Application($scope, $state, Auth, isAuthenticated) {
		/*jshint validthis: true */
		var vm = this;

		var states = {
			login: 'application.index',
			logout: 'application.index',
			register: 'application.sign-up',
			home: 'application.home'
		};

		vm.authenticate = authenticate;
		vm.unauthenticate = unauthenticate;

		$scope.$watch(function() {
			return Auth.me;
		}, function(newUser, oldUser) {
			console.log('User update', newUser, oldUser);
			if(!newUser) {
				delete vm.user;
				return;
			}
			vm.user = newUser;
		});

		function authenticate() {
			Auth.signIn()
				.then(function(user) {
					// If user does not have username, it must be a new profile
					if(!user.username) {
						$state.go(states.register);
					} else {
						$state.go(states.home);
					}

				})
				.catch(function(e) {
					$state.go(states.login);
				});
		}

		function unauthenticate() {
			Auth.signOut();
			$state.go(states.logout);
		}
	}

})();
