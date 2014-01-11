(function() {

  var AudioObject = function() {
    this.context = this._createContext();
  
  };
  AudioObject.prototype = Object.create({});
  _.extend(AudioObject.prototype, Backbone.Events);
  AudioObject.fn = AudioObject.prototype;
  AudioObject.createContext


  registerModule('AudioObject', AudioObject);





}).call(this);
