(function() {
	'use strict';

	angular.module('index')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Index = {
				name: 'public.index',
				url: '/',
				views: {
					'content': {
						templateUrl: 'modules/index/index.template.html',
						controller: 'Index',
						controllerAs: 'index'
					}
				}
			};

			$stateProvider.state(Index);
		});
})();
