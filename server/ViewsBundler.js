const Bundler = require('parcel-bundler');
const Path = require('path');

export default class ViewsBundler {
    constructor(viewsDir, outFile, outDir) {
        this.entryFiles = Path.join(__dirname, viewsDir || '../views/*');

        console.log(this.entryFiles);

        this.options = {
            outDir: outDir || './dist/views/', // The out directory to put the build files in, defaults to dist
            outFile: outFile || 'index.html', // The name of the outputFile
            publicUrl: './', // The url to server on, defaults to dist
            watch: true, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
            cache: true, // Enabled or disables caching, defaults to true
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
        let entryFiles = Path.join(__dirname, '../views/*');

        let options = {
            outDir: './dist/views/', // The out directory to put the build files in, defaults to dist
            outFile: 'index.html', // The name of the outputFile
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

        const bundler = new Bundler(entryFiles, options);

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

    getDefault = () => {
        let bundler = new Bundler(this.entryFiles, this.options);
        return bundler;
    }
}

