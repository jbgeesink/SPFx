import * as angular from 'angular';
import HomeController from './HomeController';

const app: angular.IModule = angular.module('ExternalWebpart', ["kendo.directives"]);

app
  .controller('HomeController', HomeController);