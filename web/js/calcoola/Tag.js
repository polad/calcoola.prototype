define([
    "dojo/_base/declare",
    "dijit/_WidgetBase"
], function(declare, _WidgetBase) {
    return declare([ _WidgetBase ], {
        baseClass: "Tag",
        
        value: null,
        
        _setValueAttr: function(value) {
            this.domNode.innerHTML = value;
            this._set("value", value);
        }
    });
});