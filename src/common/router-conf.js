define(function(){

    var routeMap={},
        defaultPage = 'home',
        configMap = {
            tpl_suffix: '-tpl.html',
            ctrl_suffix : '-ctrl'
        },
        routes = [
            {
                page : 'home',
                templateId: 'home',
                controller: 'home/home',
            },
            {
                page: 'admin',
                templateId: 'admin',
                controller: 'admin/admin',
            }

        ];

    (function(){

        routes.forEach(function(route){
            routeMap[route.page] = route;
        });

    }());




    return {
        getRoute : function(page){
            var route = routeMap[page];
            if(!route){
                return routeMap[defaultPage];
            }
            return route;
        },
        getTemplateId: function(page){
            return '../tpl/' + this.getRoute(page).templateId + configMap.tpl_suffix;
        },
        getController: function(page){
            return this.getRoute(page).controller + configMap.ctrl_suffix;
        }
    }

});
