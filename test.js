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
        var expected = { dependencies:
            {  async: '0.2.9', debug: '0.7.4', have: '0.2.3', is2: '0.0.11', lodash: '2.4.1' },
            packageJson: '/Users/edmond/src/package-deps/package.json',
            async: { packageJson: '/Users/edmond/src/package-deps/node_modules/async/package.json' },
            debug: { packageJson: '/Users/edmond/src/package-deps/node_modules/debug/package.json' },
            have: { packageJson: '/Users/edmond/src/package-deps/node_modules/have/package.json' },
            is2:
            { dependencies: { 'deep-is': '0.1.2' },
              packageJson: '/Users/edmond/src/package-deps/node_modules/is2/package.json',
              'deep-is': { packageJson: '/Users/edmond/src/package-deps/node_modules/is2/node_modules/deep-is/package.json' } },
            lodash: { packageJson: '/Users/edmond/src/package-deps/node_modules/lodash/package.json' } };

        var deps = packageDeps.findAll('./');
        assert.deepEqual(deps, expected);
    });

    it('finds all the dependencies', function() {
        var expected = { dependencies:
            { async: '0.2.9', debug: '0.7.4', have: '0.2.3', is2: '0.0.11', lodash: '2.4.1' },
            packageJson: '/Users/edmond/src/package-deps/package.json',
            async: { packageJson: '/Users/edmond/src/package-deps/node_modules/async/package.json' },
            debug: { packageJson: '/Users/edmond/src/package-deps/node_modules/debug/package.json' },
            have: { packageJson: '/Users/edmond/src/package-deps/node_modules/have/package.json' },
                is2:
                  { dependencies: { 'deep-is': '0.1.2' },
                    packageJson: '/Users/edmond/src/package-deps/node_modules/is2/package.json',
                    'deep-is': {packageJson: '/Users/edmond/src/package-deps/node_modules/is2/node_modules/deep-is/package.json' } },
            lodash: { packageJson: '/Users/edmond/src/package-deps/node_modules/lodash/package.json' } };

        var deps = packageDeps.findAll('./package.json');
        assert.deepEqual(deps, expected);
    });
    it('finds only top-level dependencies', function() {
        var expected = { dependencies:
            { async: '0.2.9', debug: '0.7.4', have: '0.2.3', is2: '0.0.11', lodash: '2.4.1' },
            packageJson: '/Users/edmond/src/package-deps/package.json',
            async: { packageJson: '/Users/edmond/src/package-deps/node_modules/async/package.json' },
            debug: { packageJson: '/Users/edmond/src/package-deps/node_modules/debug/package.json' },
            have: { packageJson: '/Users/edmond/src/package-deps/node_modules/have/package.json' },
            is2: { packageJson: '/Users/edmond/src/package-deps/node_modules/is2/package.json' },
            lodash: { packageJson: '/Users/edmond/src/package-deps/node_modules/lodash/package.json' } };

        var doNotRecurse = true;
        var deps = packageDeps.findAll('./package.json', doNotRecurse);
        assert.deepEqual(deps, expected);
    });
});

