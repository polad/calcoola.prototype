define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/when",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_Container",
    "./Tag",
    "text!./templates/FilterField.html"
], function(declare, lang, array, when, _WidgetBase, _TemplatedMixin, _Container, Tag, WidgetTemplate) {
    return declare([ _WidgetBase, _TemplatedMixin, _Container ], {
        templateString: WidgetTemplate,
        
        baseClass: "FilterField",
        
        store: null,
        
        sort: null,
        
        name: "",
        
        _setStoreAttr: function(store) {
            this._set("store", store);
            this.update();
        },
        
        _setNameAttr: function(name) {
            this.nameNode.innerHTML = name;
            this._set("name", name);
        },
        
        update: function() {
            if (this.store) {
                when(this.store.query(null, { sort: this.sort }), lang.hitch(this, function(items) {
                    items.forEach(lang.hitch(this, "_addItem"));
                }));
            }
        },
        
        _addItem: function(item, insertIndex) {
            this.addChild(this._buildTag({ value: item.name }), insertIndex);
        },
        
        _removeItem: function(item) {
        },
        
        _buildTag: function(attributes) {
            return new Tag(attributes);
        }
    });
});