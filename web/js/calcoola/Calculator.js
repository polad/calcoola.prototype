define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojox/lang/functional/object",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "text!./templates/Calculator.html",
    "./Argument",
    "dijit/TitlePane"
], function(declare, lang, objFunctions, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetTemplate, Argument) {
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: WidgetTemplate,
        
        baseClass: "Calculator",
        
        calculator: null,
        args: null,
        
        postCreate: function() {
            this.inherited(arguments);
            this.on("calculate", lang.hitch(this, "_updateResultNode"));
        },
        
        _setCalculatorAttr: function(calculator) {
            this.calculator = calculator;
            this.nameNode.set("title", calculator.name);
            this.uomNode.innerHTML = calculator.uom;
            this._setupArgs(calculator.args);
        },
        
        _setupArgs: function(args) {
            this.args = {};
            objFunctions.forIn(args, lang.hitch(this, function(argument, name) {
                var widget = this._buildArgument(argument);
                widget.placeAt(this.containerNode).
                    on("change", lang.hitch(this, function(newValue) {
                        this.args[name] = newValue;
                        this.calculate(this.args);
                    }));
                this.on("destroy", lang.hitch(widget, "destroy"));
            }));
        },
        
        _buildArgument: function(argument) {
            return new Argument(argument);
        },
        
        calculate: function(args) {
            var result = (this.calculator && lang.isFunction(this.calculator.formula)) ? this.calculator.formula(args) : null;
            this.onCalculate(result);
        },
        
        _updateResultNode: function(result) {
            this.resultNode.innerHTML = result;
        },
        
        onCalculate: function(result) {}
    });
});