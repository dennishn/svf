(function () {
	'use strict';

	angular
		.module('index')
		.controller('Index', Index);

	/* @ngInject */
	function Index(Auth, $state) {
		/*jshint validthis: true */
		var vm = this;
		vm.authenticate = authenticate;

		function authenticate() {
			Auth.signIn()
				.then(function(user) {
					// If user does not have username, it must be a new profile
					if(!user.username) {
						$state.go('public.sign-up');
					} else {
						$state.go('application.home');
					}

				})
				.catch(function(e) {
					$state.go(states.login);
				});
		}
	}

})();
