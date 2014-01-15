(function() {
  window.templates = {};

  var $sources = $('script[type="text/template"]');
  $sources.each(function(index, el) {
    var $el = $(el);
    templates[$el.data('name')] = Handlebars.compile($el.html());
  });

  (function() {
    var modules = {};
    window.requestModule = function(name) {
      return modules[name];
    };
    window.registerModule = function(name, module) {
      modules[name] = module;
      return requestModule('name');
    };
    window.deleteModule = function(name) {
      delete modules[name];
      return null;
    };
  }).call(this);





}).call(this);

