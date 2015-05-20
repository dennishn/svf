(function () {
	'use strict';

	angular
		.module('User')
		.factory('User', User);

	/* @ngInject */
	function User(DS, Schemator) {

		var schemator = new Schemator();

		//console.log(schemator.availableDataTypes());
		//console.log(schemator.availableRules());

		var UserSchema = schemator.defineSchema('User', {
			id: {
				type: 'string',
				nullable: false
			}
		});

		return DS.defineResource({
			name: 'User',
			endpoint: 'users',
			validate: function(resource, data, cb) {

				//var errors = _validateUser(data);
				//
				//if(errors) {
				//	cb(errors);
				//}

				cb(null, data);

			},
			methods: {
				fullName: function() {
					return this.firstName + ' ' + (this.middleName || '') + ' ' + this.lastName;
				},
				parseFromFacebook: function(facebookUser) {

					var map = {
						firstName: facebookUser.first_name,
						middleName: facebookUser.middle_name,
						lastName: facebookUser.last_name || undefined,
						gender: facebookUser.gender || undefined,
						picture: facebookUser.picture.data.url
					};

					angular.extend(this, map);

				}
			}
		});

		function _validateUser(data) {
			return UserSchema.validateSync(data);
		}

	}

})();
