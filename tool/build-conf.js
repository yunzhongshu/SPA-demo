
requirejs.config({
    paths: {
        'jquery': '../dep/jquery/jquery.min',
        'text': '../dep/requirejs/text',
        'bootstrap': '../dep/bootstrap/js/bootstrap.min',
        'jsrender': '../dep/jsrender/jsrender.min',
        'urianchor': '../dep/urianchor/jquery.uriAnchor',
        'requirejs': '../dep/requirejs/require',
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

