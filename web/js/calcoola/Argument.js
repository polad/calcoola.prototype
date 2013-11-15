define([
    "dojo/_base/declare",
    "dojo/dom-attr",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "text!./templates/Argument.html",
    "dijit/form/NumberTextBox"
], function(declare, domAttr, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetTemplate) {
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: WidgetTemplate,
        
        baseClass: "Argument",
        
        label: null,
        
        uom: null,
        
        postCreate: function() {
            this.inherited(arguments);
            domAttr.set(this.labelNode, "for", this.input.get("id"));
        },
        
        _setLabelAttr: function(value) {
            this.labelNode.innerHTML = value;
        },
        
        _setUomAttr: function(value) {
            this.uomNode.innerHTML = value;
        },
        
        onChange: function(newValue) {}
    });
});