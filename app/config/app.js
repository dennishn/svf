(function() {
	'use strict';
	//Firebase.enableLogging(true, true);
	/**
	 * @ngdoc overview
	 * @name svfUsers
	 * @description
	 * # svfUsers
	 *
	 * Main module of the application.
	 */
	angular
		.module('svfUsers', [
			'js-data',
			'ngAnimate',
			'ngSanitize',
			'ngTouch',
			'ui.router',
			'core',
			'DEBUG_ENV',
			'mm.foundation',
			'Schemator',
			'application',
			'index',
			'firebaseAuth',
			'home',
			'Auth',
			'User',
'UserMapping',
'sign-up',
'profile',
			/* ---> Do not delete this comment (ngImports) <--- */
	]);
})();
