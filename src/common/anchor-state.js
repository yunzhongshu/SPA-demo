define([
    'jquery',
    'urianchor',
], function($){

    'use strict';

    var stateMap = {
            prior_anchor_map: {},
            anchor_map : {}
        },
        configMap = {
            default_map : {
                page: 'home'
            }
        },
        copyAnchorMap, changeAnchorPart, onHashchange, getCurrentAnchorMap, getCurrentPage,
        pageChange, isInvalidAnchorMap;


    (function(){

        $.uriAnchor.configModule({
            schema_map : {
                page: true,
                color: true,
            }
        });


    })();

    copyAnchorMap = function () {
        //if(!stateMap.anchor_map.hasOwnProperty('page')){
        //    stateMap.anchor_map = configMap.default_map;
        //}
        return $.extend( true, {}, stateMap.anchor_map );
    };


    // Begin DOM method /changeAnchorPart/
// Purpose    : Changes part of the URI anchor component
// Arguments  :
//   * arg_map - The map describing what part of the URI anchor
//     we want changed.
// Returns    :
//   * true  - the Anchor portion of the URI was updated
//   * false - the Anchor portion of the URI could not be updated
// Actions    :
//   The current anchor rep stored in stateMap.anchor_map.
//   See uriAnchor for a discussion of encoding.
//   This method
//     * Creates a copy of this map using copyAnchorMap().
//     * Modifies the key-values using arg_map.
//     * Manages the distinction between independent
//       and dependent values in the encoding.
//     * Attempts to change the URI using uriAnchor.
//     * Returns true on success, and false on failure.
//
    changeAnchorPart = function ( arg_map ) {
        var
            anchor_map_revise = copyAnchorMap(),
            bool_return       = true,
            key_name, key_name_dep;

        // Begin merge changes into anchor map
        KEYVAL:
            for ( key_name in arg_map ) {
                if ( arg_map.hasOwnProperty( key_name ) ) {

                    // skip dependent keys during iteration
                    if ( key_name.indexOf( '_' ) === 0 ) { continue KEYVAL; }

                    // update independent key value
                    anchor_map_revise[key_name] = arg_map[key_name];

                    // update matching dependent key
                    key_name_dep = '_' + key_name;
                    if ( arg_map[key_name_dep] ) {
                        anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                    }
                    else {
                        delete anchor_map_revise[key_name_dep];
                        delete anchor_map_revise['_s' + key_name_dep];
                    }
                }
            }
        // End merge changes into anchor map

        // Begin attempt to update URI; revert if not successful
        try {
            $.uriAnchor.setAnchor( anchor_map_revise );
        }
        catch ( error ) {
            // replace URI with existing state
            $.uriAnchor.setAnchor( stateMap.anchor_map,null,true );
            bool_return = false;
        }
        // End attempt to update URI...

        return bool_return;
    };


    isInvalidAnchorMap = function(map){

        return !map.hasOwnProperty('page');

    };


    onHashchange = function ( /*event*/ ) {
        var  anchor_proposed_map;
        stateMap.prior_anchor_map = copyAnchorMap();

        // attempt to parse anchor
        try {
            anchor_proposed_map = $.uriAnchor.makeAnchorMap();
            if(isInvalidAnchorMap(anchor_proposed_map)){
                $.uriAnchor.setAnchor(configMap.default_map, null, true);
                return false;
            }
        }
        catch ( error ) {
            $.uriAnchor.setAnchor( stateMap.prior_anchor_map, null, true );
            return false;
        }

        stateMap.anchor_map = anchor_proposed_map;
        return true;

    };

    pageChange = function(){

        if(onHashchange()){
            return stateMap.anchor_map['page'] !== stateMap.prior_anchor_map['page'];
        }
        return false;
    };


    getCurrentAnchorMap = function(){
        return stateMap.anchor_map;
    };

    return {
        copyAnchorMap : copyAnchorMap,
        changeAnchorPart: changeAnchorPart,
        onHashchange: onHashchange,
        pageChange: pageChange,
        getCurrentAnchorMap : getCurrentAnchorMap,
        getCurrentPage: function(){
            return stateMap.anchor_map['page'];
        }
    }


});