define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojox/lang/functional/object",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "text!./templates/Calculator.html",
    "dijit/registry",
    "dijit/form/NumberTextBox",
], function(declare, lang, domConstruct, objFunctions, _WidgetBase, _TemplatedMixin, WidgetTemplate, registry, NumberTextBox) {
    return declare([ _WidgetBase, _TemplatedMixin ], {
        templateString: WidgetTemplate,
        baseClass: "Calculator",
        
        calculator: null,
        args: null,
        
        postCreate: function() {
            this.on("calculate", lang.hitch(this, "_updateResultNode"));
        },
        
        _setCalculatorAttr: function(calculator) {
            this.calculator = calculator;
            this.nameNode.innerHTML = calculator.name;
            this._setupArgs(calculator.args);
        },
        
        _setupArgs: function(args) {
            this.args = {};
            objFunctions.forIn(args, lang.hitch(this, function(argument, name) {
                var argumentDom = this._buildArgument(argument);
                domConstruct.place(argumentDom, this.containerNode);
                var widget = registry.findWidgets(argumentDom)[0];
                widget.on("change", lang.hitch(this, function(newValue) {
                    this.args[name] = newValue;
                    this.calculate(this.args);
                }));
            }));
        },
        
        _buildArgument: function(argument) {
            var argumentNode = domConstruct.create("div");
            var inputBox = new NumberTextBox();
            this.on("destroy", function() {
                inputBox.destroy();
            });
            domConstruct.create("label", {
                innerHTML: argument.label,
                for: inputBox.get("id")
            }, argumentNode);
            inputBox.placeAt(argumentNode);
            domConstruct.create("div", { innerHTML: argument.uom }, argumentNode);
            return argumentNode;
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