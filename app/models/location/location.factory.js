(function () {
	'use strict';

	angular
		.module('location')
		.factory('Location', Location);

	/* @ngInject */
	function Location(DS) {

		return DS.defineResource({
			name: 'Location',
			endpoint: 'locations'
		});

	}

})();
