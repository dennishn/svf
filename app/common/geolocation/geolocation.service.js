(function () {
	'use strict';

	angular
		.module('geolocation')
		.service('GeoLocation', GeoLocation);

	/* @ngInject */
	function GeoLocation($q, $timeout, $window, $rootScope) {

		var service = {
			watchPosition: watchPosition,
			clearWatch: clearWatch,
			position: {}
		};

		var options = {
			enableHighAccuracy: true,
			maximumAge: 0
		};

		var watchId;

		return service;

		function watchPosition() {

			var deferred = $q.defer();

			if(_supported()) {

				if(!watchId) {
					watchId = $window.navigator.geolocation.watchPosition(
						function(position) {
							$rootScope.$apply(function() {

								service.position.coords = position.coords;
								service.position.timestamp = position.timestamp;

								$rootScope.$broadcast('GeoLocation.position.changed', service.position);

								delete service.position.error;

								deferred.resolve(service.position);
							});
						},
						function(error) {
							$rootScope.$apply(function() {

								service.position.error = error;

								$rootScope.$broadcast('GeoLocation.position.error', error);

								delete service.position.coords;
								delete service.position.timestamp;

								deferred.reject(error);
							});
						}, options);
				}

			} else {
				deferred.reject({error: {
					code: 2,
					message: 'This web browser does not support HTML5 Geolocation'
				}});
			}

			return deferred.promise;
		}

		function clearWatch() {
			if(watchId) {
				$window.navigator.geolocation.clearWatch(watchId);
				watchId = undefined;
			}
		}

		function _supported() {
			return 'geolocation' in $window.navigator;
		}

	}

})();
