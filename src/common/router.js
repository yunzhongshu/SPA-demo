require([
    'jquery',
    'src/common/router-conf',
    'src/common/anchor-state',
    'text',
    'jsrender',


], function($, routerConf, anchorState){

    'use strict';

    var jqueryMap = {
            $container : $('#page')
        },
        route, router, changePage, changeHash;

    /**
     * 注册路由
     * @param path　路径
     * @param templateId　模板id
     * @param controller 页面js名称
     */
    route = function(path, templateId, controller){

        routes[path] = {
            templateId : templateId,
            controller : controller
        }

    };

    /**
     * 路由处理
     */
    router = function(){

        if(anchorState.pageChange()){

            changePage();

        } else {

            //页面没有修改，则只是修改了参数
            changeHash();

        }


    };

    changePage = function(){

        var route = routerConf.getConf( anchorState.getCurrentPage());

        if(route.controller && route.templateId && jqueryMap.$container){

            require(['text!src/'+route.templateId+'-tpl.html', 'src/' +route.controller], function(pageTpl, controller){

                var template = $.templates(pageTpl);

                jqueryMap.$container.html(template.render({}));

                if(controller.init && typeof controller.init === 'function'){
                    controller.init();
                }

            });

        }
    };


    changeHash = function(){

        var route = routerConf.getConf( anchorState.getCurrentPage());

        if(route.controller){

            require(['src/' +route.controller], function(controller){

                if(controller.changeHash && typeof controller.changeHash === 'function'){
                    controller.changeHash();
                }
            });

        }

    };


    $(function(){

        window.addEventListener('hashchange', function(){
            router();
        });

        router();
    });


    return {
        route : route,
        router: router
    }


});
