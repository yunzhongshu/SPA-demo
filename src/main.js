
requirejs.config({
    baseUrl: 'dep',
    paths: {
        'src': '../src',     // ../js目录
        'jquery': 'jquery/jquery.min',
        'text': 'requirejs/text',
        'bootstrap': 'bootstrap/js/bootstrap.min',
        'jsrender': 'jsrender/jsrender.min',
        'urianchor': 'urianchor/jquery.uriAnchor',
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




require(['src/common/router']);
