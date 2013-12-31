'use strict';
var have = require('have');
var _ = require('lodash');
var is = require('is2');
var fs = require('fs');
var path = require('path');
//var debug = require('debug')('find-package-deps');

/**
 * Finds all dependancies for a path to a package.json. It will read the
 * dependencies and find all the sub-dependencies.
 * @param {String} pathToPackageJson Path to the package.json file.
 * @param {Number} [depth] How far down the dep tree to go. OPtional
 * @return {Object} An object describing the dependencies. 
 */
exports.findAll = function(pathToPackageJson, depth) {
    have(arguments, { pathToPackageJson: 'str' });
    if (pathToPackageJson === '')
        throw new Error('pathToPackageJson is an empty str');
    var bname = path.basename(pathToPackageJson);
    if (bname !== 'package.json')
        pathToPackageJson = path.join(pathToPackageJson, 'package.json');
    pathToPackageJson = path.resolve(pathToPackageJson);
    var modules = {};
    getModules(pathToPackageJson, modules, 0, depth);
    return modules;
};

/**
 * A recursive synchronous function to iterate over all the dependencies
 * in package.json. The data is colleceted in modules parameter.
 * @param {String} pathToPackageJson The path to the package.json.
 * @param {Object} modules The object to store the results.
 * @param {Boolean} doNotRecurse Only return the top-level dependendcies.
 * @private
 */
function getModules(pathToPackageJson, report, cnt, max) {
    have(arguments, { pathToPackageJson: 'str', report: 'obj' });
    if (!fs.existsSync(pathToPackageJson))  return;

    var mod;
    try {
        mod = require(pathToPackageJson);
    } catch(err) {
        return;
    }

    if (!mod)  return;
    if (mod.dependencies && is.obj(mod.dependencies) &&
        _.keys(mod.dependencies).length) {
        if (max === undefined || (max && (cnt < max))) {
            report.dependencies = mod.dependencies;
        }
    }
    report.packageJson = pathToPackageJson;
    if (cnt === max) return;

    var dir = path.join(path.dirname(pathToPackageJson), 'node_modules');

    // for each dependency, recursively iterate
    _.forOwn(mod.dependencies, function(ver, modName) {
        var nextPackJson = path.join(dir, modName, 'package.json');
        report[modName] = {};
        getModules(nextPackJson, report[modName], cnt+1, max );
    });
}

