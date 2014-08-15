define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-class",
    "dojo/number",
    "dojox/lang/functional/object",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "text!./templates/Calculator.html",
    "./Tag",
    "./Argument",
    "dijit/TitlePane"
], function(declare, lang, array, domClass, number, objFunctions, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetTemplate, Tag, Argument) {
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: WidgetTemplate,
        
        baseClass: "Calculator",
        
        calculator: null,
        
        postCreate: function() {
            this.inherited(arguments);
            this.on("calculate", lang.hitch(this, "_updateResultNode"));
        },
        
        _setCalculatorAttr: function(calculator) {
            calculator.name && (this.nameNode.set("title", calculator.name));
            calculator.uom && (this.uomNode.innerHTML = calculator.uom);
            this._setCategories(calculator.categories);
            this._setDescription(calculator.description);
            this._setupArgs(calculator.args);
            this._set("calculator", calculator);
        },
        
        _setCategories: function(categories) {
            array.forEach(categories || [], lang.hitch(this, function(category) {
                var categoryWidget = this._buildTag({ value: category });
                this.on("destroy", lang.hitch(categoryWidget, "destroy"));
                categoryWidget.placeAt(this.categoryContainer);
            }));
        },
        
        _setupArgs: function(args) {
            var argumentsObj = {};
            objFunctions.forIn(args, lang.hitch(this, function(argument, name) {
                var widget = this._buildArgument(argument);
                widget.placeAt(this.argumentContainer).
                    on("change", lang.hitch(this, function(newValue) {
                        argumentsObj[name] = newValue;
                        this.calculate(argumentsObj);
                    }));
                this.on("destroy", lang.hitch(widget, "destroy"));
            }));
        },
        
        _buildArgument: function(argument) {
            return new Argument(argument);
        },
        
        calculate: function(args) {
            var result = null;
            if (this.calculator && this.calculator.formula) {
                var formula = eval("(function(args){return "+this.calculator.formula+";})");
                if (lang.isFunction(formula)) {
                    result = number.round(formula(args), this.calculator.decimals || 2);
                }
            }
            this.onCalculate(result);
        },
        
        _updateResultNode: function(result) {
            if (result === undefined || result === null || result === Infinity || isNaN(result)) {
                result = "";
            }
            this.resultNode.innerHTML = result;
        },
        
        _setDescription: function(description) {
            description && (this.descriptionNode.innerHTML = description);
            domClass.toggle(this.descriptionNode, "hidden", !description);
        },
        
        _buildTag: function(attributes) {
            return new Tag(attributes);
        },
        
        onCalculate: function(result) {}
    });
});