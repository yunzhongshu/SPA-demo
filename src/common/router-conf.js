define(function(){

    var routerConf = {

        'home': {
            page : 'home',
            templateId: 'home/home',
            controller: 'home/home'
        },
        'admin': {
            page: 'admin',
            templateId: 'admin/admin',
            controller: 'admin/admin'
        }



    };

    return {
        getConf : function(path){
            var route = routerConf[path];
            if(!route){
                return routerConf['home'];
            }
            return route;

        }
    }

});
