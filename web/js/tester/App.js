define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/request',
  'dojo/string',
  'dojo/dom-construct',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'text!./templates/App.html',
  // Modules used in a template
  'dijit/layout/LayoutContainer',
  'dijit/layout/ContentPane',
  'dijit/form/Textarea',
  'dijit/form/Button'
], function(declare, lang, array, request, string, domConstruct, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetTemplate) {
  return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
    templateString: WidgetTemplate,
    testResultTemplate: '<div class="Box TestResult ${status}"><div class="TestName">${name}</div><div class="TestMessage">${message}</div></div>',
    errorTemplate: '<div class="Box Error">${message}</div>',

    baseClass: 'App',

    _onTestButtonClick: function(e) {
      var data = {
        calculators: this.calculators.value
      };
      request.post('/api/tester', {
        data: data,
        handleAs: 'json'
      }).then(lang.hitch(this, 'renderResults'),
        lang.hitch(this, function(err) {
          var message = err.response.data ? err.response.data.error : 'Error testing provided formulas. Check your syntax.'
          this.showError(message);
      }));
    },

    renderResults: function(results) {
      domConstruct.empty(this.testResultsContainer);
      array.forEach(results || [], lang.hitch(this, 'renderTestResult'));
    },

    renderTestResult: function(result) {
      result.message = result.message || '';
      var template = string.substitute(this.testResultTemplate, result);
      domConstruct.place(domConstruct.toDom(template), this.testResultsContainer);
    },

    showError: function(message) {
      domConstruct.empty(this.testResultsContainer);
      var template = string.substitute(this.errorTemplate, { message: message });
      domConstruct.place(domConstruct.toDom(template), this.testResultsContainer);
    }
  });
});
