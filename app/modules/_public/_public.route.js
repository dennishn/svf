(function() {
	'use strict';

	angular.module('public')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Public = {
				name: 'public',
				abstract: true,
				views: {
					'application@': {
						templateUrl: 'modules/_public/_public.template.html',
						controller: 'Public',
						controllerAs: '_public'
					}
				}
			};


			$stateProvider.state(Public);
		});
})();
