require([
    "dojo/query",
    "dojo/store/JsonRest",
    "calcoola/Application",
    "calcoola/data/calculators"
], function(query, JsonRest, Application, calculators) {
    var calculatorStore = new JsonRest({ target: "/api/calculators" });
    new Application({ calculatorStore: calculatorStore }).
        placeAt(query("body")[0]).
        startup();
});