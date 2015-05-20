(function () {
	'use strict';

	angular
		.module('firebaseAuth')
		.factory('FirebaseAuth', FirebaseAuth);

	/* @ngInject */
	function FirebaseAuth($firebaseAuth, FIREBASE_REF) {
		var ref = new Firebase(FIREBASE_REF);
		return $firebaseAuth(ref);
	}

})();
