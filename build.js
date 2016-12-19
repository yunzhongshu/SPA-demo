if (typeof define !== 'function') {
    // to be able to require file from node
    var define = require('amdefine')(module);
}

define(function () {

    var path = require('path');

    // app配置
    var apps = [
        {
            name: 'home/home-ctrl',
            module: 'home/home-ctrl'
        },
        {
            name: 'admin/admin-ctrl',
            module: 'admin/admin-ctrl'
        },
    ];


    function getBuildConf(isWatch) {

        var dir = (isWatch ? 'output-watch': 'output')  + '/asset/js';
        var buildConf = {
            //appDir: './src',
            baseUrl: './src',
            mainConfigFile: './tool/build-conf.js',
            dir: dir,
            optimizeCss: 'none',
            fileExclusionRegExp: /(\.scss|\.css|README|\.psd|-tpl\.html)$/,  //要忽略的文件
            removeCombined: true,
            optimize: isWatch? 'none' : 'uglify2',
            uglify2: {
                output: {
                    beautify: false
                },
                compress: {
                    sequences: false,
                    global_defs: {
                        DEBUG: false
                    }
                },
                warnings: true,
                mangle: false
            },
            modules: [
                {
                    name: 'vendors/jquery',
                    create: true,
                    include: [
                        'jquery',
                        'bootstrap',
                        'urianchor',
                        'jsrender',
                    ],
                },

                {
                    name: 'vendors/require',
                    create: true,
                    include: [
                        'requirejs'
                    ]
                },
                {
                    name: 'vendors/util',
                    create: true,
                    include: [
                        'text',
                    ],
                },
                {
                    name: 'commons',
                    create: true,
                    include: [
                        'common/router',
                        'common/anchor-state',
                    ],
                    exclude: [
                        'vendors/jquery', 'vendors/util', 'vendors/require'
                    ]
                },

            ]
        };

        var screenExclude = ['vendors/jquery', 'vendors/util', 'commons'];


        apps.forEach(function (item) {
            buildConf.modules.push({
                name: item.name,
                include :[
                    item.module
                ],
                exclude: screenExclude
            })
        });

        return buildConf;
    }


    return {
        getConf: getBuildConf
    };

});
