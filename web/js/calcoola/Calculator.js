define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/number",
    "dojox/lang/functional/object",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "text!./templates/Calculator.html",
    "./Argument",
    "dijit/TitlePane"
], function(declare, lang, domClass, number, objFunctions, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetTemplate, Argument) {
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
            this._setDescription(calculator.description);
            this._setupArgs(calculator.args);
            this._set("calculator", calculator);
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
            if (this.calculator && lang.isFunction(this.calculator.formula)) {
                result = number.round(this.calculator.formula(args), this.calculator.decimals || 2);
            }
            this.onCalculate(result);
        },
        
        _updateResultNode: function(result) {
            if (result === undefined || result === null || isNaN(result)) {
                result = "";
            }
            this.resultNode.innerHTML = result;
        },
        
        _setDescription: function(description) {
            description && (this.descriptionNode.innerHTML = description);
            domClass.toggle(this.descriptionNode, "hidden", !description);
        },
        
        onCalculate: function(result) {}
    });
});