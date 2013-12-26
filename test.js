'use strict';
var packageDeps = require('./index');
var assert = require('assert');

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
        var expected = {
            depVersions: {
                async: '0.2.9',
                debug: '0.7.4',
                have: '0.2.3',
                is2: '0.0.11',
                lodash: '2.4.1'
            },
            async: { depVersions: undefined },
            debug: { depVersions: undefined },
            have: { depVersions: undefined },
            is2: {
                depVersions: { 'deep-is': '0.1.2' },
                'deep-is': { depVersions: undefined }
            },
            lodash: { depVersions: undefined }
        };

        var deps = packageDeps.findAll('./');
        assert.deepEqual(deps, expected);
    });

    it('finds all the dependencies', function() {
        var expected = {
            depVersions: {
                async: '0.2.9',
                debug: '0.7.4',
                have: '0.2.3',
                is2: '0.0.11',
                lodash: '2.4.1'
            },
            async: { depVersions: undefined },
            debug: { depVersions: undefined },
            have: { depVersions: undefined },
            is2: {
                depVersions: { 'deep-is': '0.1.2' },
                'deep-is': { depVersions: undefined }
            },
            lodash: { depVersions: undefined }
        };

        var deps = packageDeps.findAll('./package.json');
        assert.deepEqual(deps, expected);
    });
});

