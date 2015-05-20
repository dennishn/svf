(function() {
	'use strict';

	angular.module('application')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Application = {
				name: 'application',
				abstract: true,
				views: {
					'application@': {
						templateUrl: 'modules/_application/application.template.html',
						controller: 'Application',
						controllerAs: 'application',
						resolve: {
							isAuthenticated: function(FirebaseAuth) {
								return FirebaseAuth.$getAuth();
							}
						}
					}
				}
			};

			$stateProvider.state(Application);
		});
})();
