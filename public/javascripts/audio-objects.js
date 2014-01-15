(function() {

  var AudioObject = function(context) {
    this.context = context || this._createContext();
    this.modifiers = [];
  };
  AudioObject.prototype = Object.create({});
  _.extend(AudioObject.prototype, Backbone.Events);
  AudioObject.fn = AudioObject.prototype;
  
  AudioObject.fn.createSource = function() {
    
  };
  AudioObject.fn.getContext = function() {
    return this.context;
  };
  AudioObject.fn.addSourceModifier = function(fn) {
    this.modifiers.push(fn);
  };
  AudioObject.fn._createContext = function() {
    //create an audio context we can use
    var ContextClass = (window.AudioContext ||
      window.webkitAudioContext             ||
      window.mozAudioContext                ||
      window.oAudioContext                  ||
      window.msAudioContext);
    if (ContextClass) {
      var context = new ContextClass();
      return context;
    } else {

      console.error("sorry, this browser does not support the Webaudio api!");
    }
    return null;
  };

  registerModule('AudioObject', AudioObject);

  //audioFile loads in an object from a url and starts playing it
  AudioFile = function(url) {
    AudioObject.apply(this);
    //load the bugger and then call then
    this._ready = false;
    this.getBuffer(url)
      .then(_.bind(this.loadAudioData, this))
      .then(_.bind(this.play, this));
  };
  AudioFile.prototype = Object.create(AudioObject.prototype);
  AudioFile.fn = AudioFile.prototype;
  AudioFile.fn.getBuffer = function(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    var defer = Promise.defer();
    request.onload = _.bind(function() {
      defer.resolve(request.response);
      this.trigger('bufferDataLoaded', request.response);
    }, this);
    request.send(); //make the request
    return defer.promise;
  };
  AudioFile.fn.createSource = function() {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.bufferredAudio;
    return this.source;
  };
  AudioFile.fn.isReady = function() {
    return this._ready;
  };
  AudioFile.fn.play = function() {
    if (this.source && this.source.stop()) {
      this.source.stop();
    }
    this.createSource();
    this.source.connect(this.context.destination);
    this.source.start(0);
  };
  AudioFile.fn.loadAudioData = function(buffer) {
    var defer = Promise.defer();
    this.context.decodeAudioData(buffer, _.bind(function(bufferData) {
      this.bufferredAudio = bufferData;
      defer.resolve(this.bufferredAudio);
      this._ready = true;
      this.trigger('audioDataLoaded', bufferData);
    }, this), function() {});
    return defer.promise;
  };

  registerModule('AudioFile', AudioFile);


}).call(this);
