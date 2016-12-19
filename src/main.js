
requirejs.config({
    baseUrl: 'asset/js',
    paths: {
        'jquery': 'vendors/jquery',
        'text': 'vendors/util',
        'bootstrap': 'vendors/jquery',
        'jsrender': 'vendors/jquery',
        'urianchor': 'vendors/jquery',
        'common/router': 'commons',
        'common/anchor-state': 'commons',
    },
    shim: {
        'jquery': {
            exports:'$'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'jsrender': {
            deps: ['jquery']
        },
        'urianchor': {
            deps: ['jquery']
        }

    }
});



require(['common/router']);
