define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "text!./templates/Category.html",
    "dijit/TitlePane"
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetTemplate) {
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: WidgetTemplate,
        
        category: null,
        
        postCreate: function() {
            this.inherited(arguments);
            this.containerNode.set("title", this.category);
        },
        
        addCalculator: function(/*calcoola/Calculator*/ calculator, /*Integer?*/ insertIndex) {
            this.containerNode.addChild.apply(this.containerNode, arguments);
        }
    });
});