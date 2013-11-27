define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/_Container",
    "./Category",
    "./Calculator",
    "text!./templates/Application.html",
    "dijit/form/TextBox"
], function(declare, array, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container, Category, Calculator, WidgetTemplate) {
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container ], {
        templateString: WidgetTemplate,
        baseClass: "CalcoolaApplication",
        
        /* dojo/store/api/Store */
        calculatorStore: null,
        
        postCreate: function() {
            this.inherited(arguments);
            this.renderCalculators();
        },
        
        renderCalculators: function(/* String|Object|Function */ query) {
            this._clearCalculators();
            if (this.calculatorStore) {
                this.calculatorStore.query(query).forEach(lang.hitch(this, "addCalculator"));
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
            this.on("clearCalculators", lang.hitch(widget, "destroy"));
            this.addChild(widget);
            return widget;
        },
        
        _buildCategoryWidget: function(/* calcoola/entity/Category */ category) {
            return new Category({ category: category });
        },
        
        _buildCalculator: function(arguments) {
            return new Calculator(arguments);
        },
        
        _searchCalculators: function(name) {
            this.renderCalculators(lang.hitch(this, function(calculator) {
                return this._queryByName(calculator, name);
            }));
        },
        
        _queryByName: function(calculator, searchedName) {
            return searchedName && array.every(searchedName.split(" "), function(word) {
                return (calculator.name || "").toLowerCase().
                    indexOf((word || "").toLowerCase()) !== -1;
            });
        },
        
        _clearCalculators: function() {
            this.onClearCalculators();
        },
        
        onClearCalculators: function() {}
    });
});