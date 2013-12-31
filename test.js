'use strict';
var packageDeps = require('./index');
var assert = require('assert');
//var inspect = require('util').inspect;
var is = require('is2');
var _ = require('lodash');

describe('package-deps findAll', function() {
    it('throws with non-string argument', function() {
        var deps;
        try {
            deps = packageDeps.findAll();
        } catch(err) {
            assert.ok(err.message === 'pathToPackageJson argument is not str');
            return;
        }
        throw new Error('findAll unexpectedly worked.');
    });

    it('throws with an empty string argument', function() {
        var deps;
        try {
            deps = packageDeps.findAll();
        } catch(err) {
            assert.ok(err.message === 'pathToPackageJson argument is not str');
            return;
        }
        throw new Error('findAll unexpectedly worked.');
    });

    it('finds all the dependencies with "./"', function() {
        var expected = { dependencies:
            {  async: '0.2.9', debug: '0.7.4', have: '0.2.3', is2: '0.0.11', lodash: '2.4.1' }};

        var deps = packageDeps.findAll('./');
        assert.deepEqual(deps.dependencies, expected.dependencies);
        assert.ok(is.nonEmptyStr(deps.packageJson));
        assert.ok(is.nonEmptyObj(deps.async));
        assert.ok(is.nonEmptyObj(deps.debug));
        assert.ok(is.nonEmptyObj(deps.have));
        assert.ok(is.nonEmptyObj(deps.is2));
        assert.ok(is.nonEmptyObj(deps.lodash));
    });

    it('finds all the dependencies', function() {
        var expected = { dependencies:
            { async: '0.2.9', debug: '0.7.4', have: '0.2.3', is2: '0.0.11', lodash: '2.4.1' }
        };

        var deps = packageDeps.findAll('./package.json');
        assert.deepEqual(deps.dependencies, expected.dependencies);
        assert.ok(is.nonEmptyStr(deps.packageJson));
        assert.ok(is.nonEmptyObj(deps.async));
        assert.ok(is.nonEmptyObj(deps.debug));
        assert.ok(is.nonEmptyObj(deps.have));
        assert.ok(is.nonEmptyObj(deps.is2));
        assert.ok(is.nonEmptyObj(deps.is2.dependencies));
        assert.ok(is.nonEmptyStr(deps.is2.dependencies['deep-is']));
        assert.ok(is.nonEmptyObj(deps.is2['deep-is']));
    });

    it('finds only top-level dependencies, depth=1', function() {
        var expected = { dependencies:
            { async: '0.2.9', debug: '0.7.4', have: '0.2.3', is2: '0.0.11', lodash: '2.4.1' }
        };

        var depth = 1;
        var deps = packageDeps.findAll('./package.json', depth);
        assert.deepEqual(deps.dependencies, expected.dependencies);
        assert.ok(is.nonEmptyStr(deps.packageJson));
        assert.ok(is.nonEmptyObj(deps.async));
        assert.ok(is.nonEmptyObj(deps.debug));
        assert.ok(is.nonEmptyObj(deps.have));
        assert.ok(is.nonEmptyObj(deps.is2));
        assert.ok(_.keys(deps.is2).length === 1);
        assert.ok(is.nonEmptyObj(deps.lodash));
    });

    it('finds all dependencies, depth=2', function() {
        var expected = { dependencies:
            { async: '0.2.9', debug: '0.7.4', have: '0.2.3', is2: '0.0.11', lodash: '2.4.1' }
        };

        var depth = 2;
        var deps = packageDeps.findAll('./package.json', depth);
        assert.deepEqual(deps.dependencies, expected.dependencies);
        assert.ok(is.nonEmptyStr(deps.packageJson));
        assert.ok(is.nonEmptyObj(deps.async));
        assert.ok(is.nonEmptyObj(deps.debug));
        assert.ok(is.nonEmptyObj(deps.have));
        assert.ok(is.nonEmptyObj(deps.is2));
        assert.ok(is.nonEmptyObj(deps.is2.dependencies));
        assert.ok(is.nonEmptyStr(deps.is2.dependencies['deep-is']));
        assert.ok(is.nonEmptyObj(deps.is2['deep-is']));
    });
});

