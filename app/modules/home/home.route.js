(function() {
	'use strict';

	angular.module('home')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Home = {
				name: 'application.home',
				url: '/home',
				views: {
					'content@application': {
						templateUrl: 'modules/home/home.template.html',
						controller: 'Home',
						controllerAs: 'home'
					}
				}
			};

			$stateProvider.state(Home);
		});
})();
