/* globals angular */
/**
 * Controls the resource create.
 *
 * @module ch.maenulabs.rest.angular.controller
 * @class Create
 */
angular.module('ch.maenulabs.rest.angular.controller').factory('ch.maenulabs.rest.angular.controller.Create', [
	'ch.maenulabs.rest.angular.event.eventifyAction',
	'ch.maenulabs.rest.angular.event.eventifyValidation',
	function (eventifyAction, eventifyValidation) {
		return [
			'$scope',
			'resource',
			function ($scope, resource) {
				this.resource = resource;
				eventifyValidation($scope, this.resource);
				this.create = eventifyAction($scope, this.resource, 'create');
			}
		];
	}
]);