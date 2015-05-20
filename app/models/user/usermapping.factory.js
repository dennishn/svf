(function () {
	'use strict';

	angular
		.module('UserMapping')
		.factory('UserMapping', UserMapping);

	/* @ngInject */
	function UserMapping(DS) {

		return DS.defineResource({
			name: 'UserMapping',
			endpoint: 'user-mappings/facebook'
		});

	};

})();
