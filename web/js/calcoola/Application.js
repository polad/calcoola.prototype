define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_Container",
    "./Category",
    "./Calculator"
], function(declare, array, lang, _WidgetBase, _Container, Category, Calculator) {
    return declare([ _WidgetBase, _Container ], {
        
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
                    addCalculator(this._buildCalculator({ calculator: calculator} ));
            }));
        },
        
        getCategoryWidget: function(category) {
            return array.filter(this.getChildren(), function(widget) {
                return widget.get("category") === category;
            })[0];
        },
        
        addCategoryWidget: function(/* calcoola/entity/Category */ category) {
            widget = this._buildCategoryWidget(category);
            this.addChild(widget);
            return widget;
        },
        
        _buildCategoryWidget: function(/* calcoola/entity/Category */ category) {
            return new Category({ category: category });
        },
        
        _buildCalculator: function(arguments) {
            return new Calculator(arguments);
        }
    });
});