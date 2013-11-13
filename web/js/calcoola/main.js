require([
    "dojo/query",
    "dojo/store/Memory",
    "calcoola/Application",
    "calcoola/data/calculators"
], function(query, Memory, Application, calculators) {
    var calculatorStore = new Memory({ data: calculators });
    new Application({ calculatorStore: calculatorStore }).
        placeAt(query("body")[0]).
        startup();
});