'use strict';

var traceur = require('traceur');
require('traceur-source-maps').install(traceur);

var whitelist = [];

// TODO: Abstract

traceur.require.makeDefault(function (modulePath) {
    var isDependency = modulePath.indexOf('node_modules') !== -1;
    var isWhitelistedPackage = whitelist.some(function (whitelistItem) {
        return modulePath.indexOf(whitelistItem) !== -1;
    });

    return ! isDependency || isWhitelistedPackage;
});
