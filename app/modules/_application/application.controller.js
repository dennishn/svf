(function () {
	'use strict';

	angular
		.module('application')
		.controller('Application', Application);

	/* @ngInject */
	function Application($scope, $state, Auth, isAuthenticated, GeoLocation, Location) {
		/*jshint validthis: true */
		var vm = this;

		GeoLocation.watchPosition()
			.then(function() {
				vm.location = GeoLocation.position;
			});

		var states = {
			login: 'public.index',
			logout: 'public.index',
			register: 'public.sign-up',
			home: 'application.home'
		};

		vm.unauthenticate = unauthenticate;

		$scope.$watch(function() {
			return Auth.me;
		}, function(newUser, oldUser) {
			if(!newUser) {
				delete vm.user;
				return;
			}
			vm.user = newUser;
		});

		function unauthenticate() {
			Auth.signOut();
			$state.go(states.logout);
		}

		$scope.$on('GeoLocation.position.changed', function(e, pos) {
			console.log(pos, vm.user);
			if(vm.user) {
				Location.update(vm.user.id, pos);
			}
		});

		$scope.$on('$destroy', function() {
			GeoLocation.clearWatch();
		});
	}

})();
