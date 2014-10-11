define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/_base/fx",
    "dojo/fx",
    "dojo/fx/easing",
    "dojo/dom-style",
    "dojo/dom-class",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/_Container",
    "dojo/store/Memory",
    "./Calculator",
    "./FilterField",
    "text!./templates/Application.html",
    "calcoola/SearchBox"
], function(declare, array, lang, baseFx, fx, fxEasing, domStyle, domClass, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container, Memory, Calculator, FilterField, WidgetTemplate) {
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container ], {
        templateString: WidgetTemplate,
        
        baseClass: "CalcoolaApplication",
        
        /* dojo/store/api/Store */
        calculatorStore: null,
        
        /* dojo/store/api/Store */
        categoryStore: null,
        
        postCreate: function() {
            this.inherited(arguments);
            this.searchBox.set({
                store: this.calculatorStore,
                queryExpr: "${0}"
            });
            var searchBoxContainer = this.searchBoxContainer;
            var containerNode = this.containerNode;
            var filterContainer = this.filterContainer;
            var appNode = this.domNode;
            var onSearchHandle = this.on("search", function(results) {
                fx.chain([
                    fx.slideTo({
                        node: searchBoxContainer,
                        duration: 1500,
                        easing: fxEasing.quintInOut,
                        top: 10,
                        beforeBegin: function() {
                            domStyle.set(searchBoxContainer, {
                                margin: "0px auto",
                                top: searchBoxContainer.offsetTop
                            });
                        },
                        onEnd: function() {
                            domClass.remove(appNode, "init");
                        }
                    }),
                    fx.combine([
                        baseFx.fadeIn({
                            node: containerNode
                        }),
                        baseFx.fadeIn({
                            node: filterContainer
                        })
                    ])
                ]).play();
                onSearchHandle.remove();
            });
        },
        
        renderCalculators: function(calculators) {
            this._clearCalculators();
            this._setupCategoryStore();
            array.forEach(calculators, lang.hitch(this, function(calculator, index) {
                this.addCalculator(calculator);
                if (index >= calculators.length-1) {
                    this._setupCategoryFilter();
                }
            }));
        },
        
        addCalculator: function(/* calcoola/entity/Calculator */ calculator) {
            this._registerCategories(calculator.categories);
            var calculatorWidget = this._buildCalculator({ calculator: calculator });
            this.on("clearCalculators", lang.hitch(calculatorWidget, "destroy"));
            this.addChild(calculatorWidget);
            return calculatorWidget;
        },
        
        _buildCalculator: function(attributes) {
            return new Calculator(attributes);
        },
        
        _searchCalculators: function(results, query, options) {
            this.onSearch(results);
            this.renderCalculators(results);
        },
        
        _clearCalculators: function() {
            this.onClearCalculators();
            this.onClearFilters();
        },
        
        _registerCategories: function(categories) {
            var store = this.categoryStore;
            array.forEach(categories, lang.hitch(this, function(category) {
                if (!store.get(category)) {
                    store.add(this._buildCategoryObject(category));
                }
            }));
        },
            
        _buildCategoryObject: function(category) {
            return { id: category, name: category };
        },
        
        _setupCategoryFilter: function() {
            if (!this.categoryStore) {
                this._setupCategoryStore();
            }
            var categoryFilter = this._buildCategoryFilter({
                name: "Found in categories:",
                store: this.categoryStore,
                sort: [ { attribute: "name" } ]
            });
            this.on("clearFilters", lang.hitch(categoryFilter, "destroy"));
            categoryFilter.placeAt(this.filterContainer);
        },
        
        _buildCategoryFilter: function(attributes) {
            return new FilterField(attributes);
        },
        
        _setupCategoryStore: function() {
            this.categoryStore = this._buildCategoryStore();
        },
        
        _buildCategoryStore: function(attributes) {
            return new Memory(attributes);
        },
        
        /** Custom Events **/
        onSearch: function(results) {},
        onClearCalculators: function() {},
        onClearFilters: function() {}
    });
});