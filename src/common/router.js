define([
    'jquery',
    'common/router-conf',
    'common/anchor-state',
    'text',
    'jsrender',


], function($, routerConf, anchorState){

    'use strict';

    var jqueryMap = {
            $container : $('#page')
        },
        runRouter, changePage, changeHash, startRouter;


    /**
     * 路由处理
     */
    runRouter = function(){

        if(anchorState.pageChange()){

            changePage();

        } else {

            //页面没有修改，则只是修改了参数
            changeHash();

        }

    };

    changePage = function(){

        var page = anchorState.getCurrentPage();

        if(jqueryMap.$container){

            require(['text!'+routerConf.getTemplateId(page), '' +routerConf.getController(page)], function(pageTpl, controller){

                var template = $.templates(pageTpl);

                jqueryMap.$container.html(template.render({}));

                if(controller.init && typeof controller.init === 'function'){
                    controller.init();
                }

            });

        }
    };


    changeHash = function(){

        var page = anchorState.getCurrentPage();

        require([routerConf.getController(page)], function(controller){

            if(controller.changeHash && typeof controller.changeHash === 'function'){
                controller.changeHash();
            }
        });

    };



    $(function(){

        window.addEventListener('hashchange', function(){
            runRouter();
        });

        runRouter();
    });


    return {
        runRouter: runRouter
    }


});
