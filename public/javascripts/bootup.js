(function() {
  window.templates = {};

  var $sources = $('script[type="text/template"]');
  $sources.each(function(index, el) {
    var $el = $(el);
    templates[$el.data('name')] = Handlebars.compile($el.html());
  });






}).call(this);
