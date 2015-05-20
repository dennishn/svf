(function() {
	'use strict';

	angular.module('index')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Index = {
				name: 'application.index',
				url: '/',
				views: {
					'content@application': {
						templateUrl: 'modules/index/index.template.html',
						controller: 'Index',
						controllerAs: 'index'
					}
				}
			};

			$stateProvider.state(Index);
		});
})();
