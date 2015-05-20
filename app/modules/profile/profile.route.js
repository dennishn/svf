(function() {
	'use strict';

	angular.module('profile')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Profile = {
				name: 'application.profile',
				url: '/profile',
				views: {
					'content@application': {
						templateUrl: 'modules/profile/profile.template.html',
						controller: 'Profile',
						controllerAs: 'profile'
					}
				}
			};

			$stateProvider.state(Profile);
		});
})();
