/* global describe, it, beforeEach, expect, jasmine, module, inject */
describe('Create', function () {

	var $scope;
	var eventifyValidation;
	var eventifyAction;
	var eventifiedAction;
	var resource;
	var controller;
	
	beforeEach(module('ch.maenulabs.rest.angular.controller', function($provide) {
		eventifiedAction = jasmine.createSpy();
		eventifyValidation = jasmine.createSpy();
		eventifyAction = jasmine.createSpy().and.returnValue(eventifiedAction);
		$provide.value('ch.maenulabs.rest.angular.event.eventifyValidation', eventifyValidation);
		$provide.value('ch.maenulabs.rest.angular.event.eventifyAction', eventifyAction);
    }));

	beforeEach(inject(['$controller', '$rootScope', 'ch.maenulabs.rest.angular.controller.Create', function (_$controller_, _$rootScope_, _Create_) {
		resource = {};
		$scope = _$rootScope_.$new();
		controller = _$controller_(_Create_, {
			'$scope': $scope,
			'resource': resource
		});
	}]));

	it('should set the resource on the controller', function () {
		expect(controller.resource).toBe(resource);
	});

	it('should eventify the resource\'s validation', function () {
		expect(eventifyValidation).toHaveBeenCalledWith($scope, resource);
	});

	it('should eventify the resource\'s create', function () {
		expect(eventifyAction).toHaveBeenCalledWith($scope, resource, 'create');
		expect(controller.create).toBe(eventifiedAction);
	});

});