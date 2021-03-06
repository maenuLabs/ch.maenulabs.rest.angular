/* globals angular */
/**
 * Wraps a resource action to emit events.
 *
 * @module ch.maenulabs.rest.angular.eventify
 * @class action
 */
angular.module('ch.maenulabs.rest.angular.eventify').factory('ch.maenulabs.rest.angular.eventify.action', [
	'$q',
	function ($q) {
		/**
		 * Installs an eventifyer on the action on the specified resource in the specified scope to emit events on pending, success and error.
		 * 
		 * @method action
		 * 
		 * @param {Scope} $scope The scope
		 * @param {String} resource The resource property name
		 * @param {String} action The action name to perform
		 * 
		 * @return {Function} Returns a promise, resolved on success or rejected on error.
		 *     Arguments are passed on to the wrapped function.
		 */
		return function ($scope, resource, action) {
			return function () {
				var deferred = $q.defer();
				$scope.$emit('ch.maenulabs.rest.angular.eventify.action.Pending', action, $scope[resource]);
				$scope[resource][action].apply(resource, arguments).then(function (response) {
					$scope.$emit('ch.maenulabs.rest.angular.eventify.action.Resolved', action, $scope[resource], response);
					deferred.resolve(response);
				}, function (response) {
					$scope.$emit('ch.maenulabs.rest.angular.eventify.action.Rejected', action, $scope[resource], response);
					deferred.reject(response);
				}, function (response) {
					$scope.$emit('ch.maenulabs.rest.angular.eventify.action.Notified', action, $scope[resource], response);
					deferred.notify(response);
				});
				return deferred.promise;
			};
		};
	}
]);
