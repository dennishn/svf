(function () {
	'use strict';

	angular
		.module('sign-up')
		.controller('SignUp', SignUp);

	/* @ngInject */
	function SignUp($state, newUser, User) {
		/*jshint validthis: true */
		var vm = this;

		vm.newUser = newUser;

		vm.createUser = createUser;

		function createUser() {
			User.update(vm.newUser.id, vm.newUser).then(function() {
				$state.go('application.home');
			});
		}
	}

})();
