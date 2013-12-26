'use strict';
var have = require('have');
var is = require('is2');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
//var debug = require('debug')('find-package-deps');

exports.findAll = function(pathToPackageJson) {
    have(arguments, { pathToPackageJson: 'str' });
    pathToPackageJson = path.resolve(pathToPackageJson);
    var modules = {};
    getModules(pathToPackageJson, 'test', modules);
    return modules;
};

/**
 * A recursive synchronous function to iterate over all the dependencies
 * in package.json. The data is colleceted in modules parameter.
 * @param {String} pathToPackageJson The path to the package.json.
 * @param {String} name The name of the current module.
 * @param {Object} modules The object to store the results.
 */
function getModules(pathToPackageJson, name, modules) {
    have(arguments, { pathToPackageJson: 'str', name: 'str', modules: 'obj' });
    if (!fs.existsSync(pathToPackageJson))  return;

    var module;
    try {
        module = require(pathToPackageJson);
    } catch(err) {
        return;
    }
    if (!module)  return;

    if (is.empty(module.dependencies))
        modules.depVersions = undefined;
    else
        modules.depVersions = module.dependencies;

    var dir = path.join(path.dirname(pathToPackageJson), 'node_modules');

    // for each dependency, recursively iterate
    _.forOwn(module.dependencies, function(ver, modName) {
        var nextPackJson = path.join(dir, modName, 'package.json');
        modules[modName] = {};
        getModules(nextPackJson, modName, modules[modName] );
    });
}

