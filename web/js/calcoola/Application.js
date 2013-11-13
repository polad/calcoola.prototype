define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "./Category",
    "./Calculator",
    "text!./templates/Application.html"
], function(declare, array, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Category, Calculator, WidgetTemplate) {
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        
        templateString: WidgetTemplate,
        
        /* dojo/store/api/Store */
        calculatorStore: null,
        
        postCreate: function() {
            this.inherited(arguments);
            this.renderCalculators(this.calculatorStore);
        },
        
        renderCalculators: function(/* dojo/store/api/Store */ calculatorStore) {
            if (calculatorStore) {
                calculatorStore.query().forEach(lang.hitch(this, "addCalculator"));
            }
        },
        
        addCalculator: function(/* calcoola/entity/Calculator */ calculator) {
            array.forEach(calculator.categories, lang.hitch(this, function(category) {
                (this.getCategoryWidget(category) ||
                 this.addCategoryWidget(category)).
                    addChild(this._buildCalculator({ calculator: calculator} ));
            }));
        },
        
        getCategoryWidget: function(category) {
            var widgets = array.filter(this.getChildren(), function(widget) {
                return widget.getCategoryName &&
                    (widget.getCategoryName() === category);
            });
            return (widgets.length > 0) ? widgets[0] : null;
        },
        
        addCategoryWidget: function(/* calcoola/entity/Category */ category) {
            widget = this._buildCategoryWidget(category);
            this.addChild(widget);
            return widget;
        },
        
        _buildCategoryWidget: function(/* calcoola/entity/Category */ category) {
            return new Category({ category: category });
        },
        
        addChild: function(/*dijit/_WidgetBase*/ child, /*Integer?*/ insertIndex) {
            this.containerNode.addChild.apply(this.containerNode, arguments);
        },
        
        _buildCalculator: function(arguments) {
            return new Calculator(arguments);
        }
    });
});