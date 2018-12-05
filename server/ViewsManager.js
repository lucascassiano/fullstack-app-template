import config from "./config.json";
const fs = require('fs');
const Bundler = require('parcel-bundler');
const Path = require('path');
const sendevent = require('sendevent');

function findFilesInDir(startPath, filter) {
    var results = [];

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return null;
    }

    var files = fs.readdirSync(startPath);

    for (var i = 0; i < files.length; i++) {
        var filename = Path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            results = results.concat(findFilesInDir(filename, filter)); //recurse
        }
        else if (filename.indexOf(filter) >= 0) {
            console.log('-- found: ', filename);
            results.push(filename);
        }
    }
    return results;
}


export default class ViewsBundler {
    constructor(callback, options) {
        this.viewsDir = config.viewsDir || Path.join(__dirname, '../views');
        this.entryFiles = findFilesInDir(this.viewsDir, '.html');
        this.events = sendevent('/eventstream');

        this.options = {
            outDir: config.outDir || './dist/views/', // The out directory to put the build files in, defaults to dist
            publicUrl: config.public || './', // The url to server on, defaults to dist
            watch: true, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
            cache: false, // Enabled or disables caching, defaults to true
            cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
            contentHash: false, // Disable content hash from being included on the filename
            minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
            scopeHoist: false, // turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
            target: 'browser', // browser/node/electron, defaults to browser
            logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
            hmr: true, //Enable or disable HMR while watching
            hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
            sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
            hmrHostname: '', // A hostname for hot module reload, default to ''
            detailedReport: false // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
        };
    }

    runBundle = async (callback) => {
        const bundler = new Bundler(this.entryFiles, this.options);

        //checking if callback is a function
        callback = typeof (callback) == 'function' ? callback : null;

        bundler.on('buildEnd', () => {
            if (callback)
                callback(true);
        });

        bundler.on('buildError', () => {
            if (callback)
                callback(false);
        });

        const bundle = await bundler.bundle();
    }


    runBuild = async (callback) => {

        let options = {
            outDir: './dist/views/', // The out directory to put the build files in, defaults to dist
            publicUrl: './', // The url to server on, defaults to dist
            watch: false, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
            cache: false, // Enabled or disables caching, defaults to true
            contentHash: true, // Disable content hash from being included on the filename
            minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
            scopeHoist: false, // turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
            target: 'browser', // browser/node/electron, defaults to browser
            logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
            hmr: false, //Enable or disable HMR while watching
            hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
            sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
            hmrHostname: '', // A hostname for hot module reload, default to ''
            detailedReport: true // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
        };

        const bundler = new Bundler(this.entryFiles, options);

        bundler.on('buildEnd', () => {
            if (callback)
                callback(true);
        });

        bundler.on('buildError', () => {
            if (callback)
                callback(false);
        });

        const bundle = await bundler.bundle();
    }

    middlewareBundler = () => {
        this.bundler = new Bundler(this.entryFiles, this.options);
        return this.bundler.middleware();
    }

    middlewareReload = () => {
        return this.events;
    }

    /*function that is called when app is ended bundling*/
    reload = (success, msg) => {
        this.events.broadcast({ msg: 'reload' });
    }

}

