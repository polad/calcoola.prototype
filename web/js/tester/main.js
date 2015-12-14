require([
  'dojo/query',
  'tester/App'
], function(query, TesterApp) {
  new TesterApp().
    placeAt(query('body')[0]).
    startup();
});
