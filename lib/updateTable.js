/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    // Vars
    var fs    = require('xp-fs'),
        XP    = require('expandjs'),
        table = require('./index'),
        hash  = require('./hashMapFromFile');

    /**************************************************************************/

    /**
     * Reads an .ini file, creates hashes from it and updates the table with the new hashes.
     *
     * @param {string} path
     * @param {Function} cb
     * @return {Object}
     */
    module.exports = function updateHashTable(path, cb) {
        var lines = '';

        hash(path, function (err, data) {
            if (err) { return cb(err, null); }
            XP.merge(table, data);

            lines += '/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */';
            lines += '\n';
            lines += '\n';
            lines += '(function () {';
            lines += '\n';
            lines += '\n';
            lines += '    "use strict";';
            lines += '\n';
            lines += '\n';
            lines += '    module.exports = {';
            lines += '\n';
            lines += '\n';

            XP.forOwn(table, function (sub, category) {
                lines += '        "' + category + '": {';
                lines += '\n';

                if (!XP.isEmpty(sub)) {
                    XP.forOwn(sub, function (hash, key) {
                        lines += '            "' + key + '": ' + hash + ',';
                        lines += '\n';
                    });

                    //Remove last comma
                    lines = lines.slice(0, lines.length - 2) + lines.slice(lines.length - 1);
                }

                lines += '        },';
                lines += '\n';
                lines += '\n';
            });

            //Remove last comma
            lines = lines.slice(0, lines.length - 3) + lines.slice(lines.length - 2);

            lines += '    };';
            lines += '\n';
            lines += '\n';
            lines += '}());';

            fs.writeFile('./index.js', lines, function (err) {
                cb(err);
            });

        });

    };

}());
