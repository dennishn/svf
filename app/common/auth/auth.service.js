(function () {
	'use strict';

	angular
		.module('Auth')
		.service('Auth', Auth);

	/* @ngInject */
	function Auth($q, FirebaseAuth, User, UserMapping, Location) {

		var service = {
			signIn: signIn,
			signOut: signOut,
			me: undefined
		};

		FirebaseAuth.$onAuth(function(authData) {
			//alert(authData)
		});

		return service;

		function signIn() {
			console.log('signin')

			var deferred = $q.defer();

			FirebaseAuth.$authWithOAuthRedirect('facebook')
				.then(function(authData) {
					console.info('User authenticationed: ', authData);

					/*
					 Flow
					 Facebook Auth
					 > if UserMapping[authData.auth.uid]
					 A mapping exists, find the user that belongs to this mapping
					 > service.me = User.find(userMapping[user-id])
					 > else
					 A mapping doesnt exist, create a new user
					 > User.create(data)
					 > service.me = result
					 */

					var usr;

					UserMapping.find(authData.auth.uid)
						.then(function(mapping) {

							//console.info('Mapping exists, looking up user');

							User.find(mapping['user-id'])
								.then(function(user) {
									//console.info('User found, assigning user', user);
									service.me = user;
									deferred.resolve(user);
								})
								.catch(function(e) {
									console.error(e);
									deferred.reject(e);
								});
						})
						.catch(function(e) {

							//console.warn('Mapping does not exist, creating a user');

							var newUser = User.createInstance({'facebook-id': authData.auth.uid});
							newUser.parseFromFacebook(authData.facebook.cachedUserProfile);
							console.log(newUser);
							User.create(newUser)
								.then(function(user) {

									usr = user;
									//console.info('User created, creating map', user);

									return UserMapping.create({
										id: authData.auth.uid,
										'user-id': user.id
									});

								})
								.then(function() {

									return Location.create({
										id: usr.id
									});

								})
								.then(function() {

									//console.info('Map created, assigning user', user);
									service.me = usr;
									deferred.resolve(service.me);
									usr = undefined;

								})
								.catch(function(e) {
									console.error(e);
									usr = undefined;
									deferred.reject(e);
								});

						});

				})
				.catch(function(e) {
					//alert(e)
					console.log(e);
				});

			return deferred.promise;
		}

		function signOut() {
			service.me = undefined;
			FirebaseAuth.$unauth();
		}

	}

})();
