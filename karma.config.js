var webpack = require('webpack');
var path = require('path');
module.exports = function (config) {
    config.set({
        browsers: ['Chrome'], //run in Chrome
        singleRun: true, //just run once by default
        frameworks: ['mocha'], //use the mocha test framework
        files: [
            'tests.webpack.js' //just load this file
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-coverage',
            'karma-mocha-reporter',
            'karma-coverage-istanbul-reporter'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['mocha', 'coverage',  'coverage-istanbul'], //report results in this format
        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: ["babel-loader"]
                    },
                    {
                        test: /\.(js|jsx)/,
                        include: [path.resolve(__dirname, "src")],
                        exclude: [path.resolve(__dirname, "test"), /node_modules/],
                        loader: 'istanbul-instrumenter-loader',
                        enforce: 'post',
                        options:{
                            esModules: true,
                            produceSourceMap: true
                        }
                    }
                ]
            }

        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },
        coverageReporter: {
            type: 'html', //produces a html document after code is run
            dir: path.join(__dirname, 'target/coverage'), //path to created html doc
        },
        coverageIstanbulReporter: {
            reports: [ 'html', 'text-summary', 'json' ],
            dir: path.join(__dirname, 'target/coverage'),
            // fixWebpackSourcePaths: true,
            // skipFilesWithNoCoverage: true,

        }

    });
};