(function() {
	'use strict';

	angular.module('sign-up')
		/* @ngInject */
		.config(function ($stateProvider) {

			var SignUp = {
				name: 'application.sign-up',
				url: '/sign-up',
				views: {
					'content@application': {
						templateUrl: 'modules/sign-up/sign-up.template.html',
						controller: 'SignUp',
						controllerAs: 'signUp'
					}
				},
				resolve: {
					newUser: function(Auth) {
						return Auth.me;
					}
				}
			};

			$stateProvider.state(SignUp);
		});
})();
