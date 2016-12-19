define([
    'jquery',
    'common/anchor-state',
], function($, anchorState){


    var changeHash,
        initAction;


    changeHash = function(){

        var anchorMap = anchorState.getCurrentAnchorMap();

        if(anchorMap.color){
            $('h2').css('color', anchorMap.color);
        }

    };


    initAction = function(){

        $('#home-color-btn').click(function(){

            anchorState.changeAnchorPart({
                color : 'red'
            });

        });

    };



    return {
        init : function(){
            initAction();
        },
        changeHash : changeHash,

    }
});
