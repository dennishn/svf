(function () {
	'use strict';

	angular
		.module('index')
		.controller('Index', Index);

	/* @ngInject */
	function Index(Auth) {
		/*jshint validthis: true */
		var vm = this;
		vm.authenticate = authenticate;

		function authenticate(){
			Auth.signIn().then(function(user) {
				console.log(user);
			});
		}
	}

})();
