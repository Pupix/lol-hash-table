/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    // Vars
    var XP   = require('expandjs'),
        util = require('lol-hash-util'),
        IniParser = require('lol-ini-parser');

    /**************************************************************************/

    module.exports = function hashMapFromFile(path, cb) {
        var tmp = {},
            ini = new IniParser();

        ini.read(path, function (err, data) {
            if (err) { return cb(err, null); }

            XP.forOwn(data, function (sub, key) {
                tmp[key] = {};
                XP.forOwn(sub, function (val, subkey) {
                    tmp[key][subkey] = util.inibinHash(key, subkey);
                });
            });

            cb(null, tmp);
        });
    };

}());
