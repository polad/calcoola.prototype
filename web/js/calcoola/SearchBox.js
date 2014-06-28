define([
    "dojo/_base/declare",
    "dijit/form/TextBox",
    "dijit/form/_SearchMixin"
], function(declare, TextBox, _SearchMixin) {
    return declare([ TextBox, _SearchMixin ], {
        minCharsToSearch: 3,
        
        _startSearch: function(/*String*/ text) {
            if (text && text.length >= this.minCharsToSearch) {
                this.inherited(arguments);
            }
        }
    });
});