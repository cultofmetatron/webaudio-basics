
(function() {
  //AudioManager manages a set of audio streams before running them into the 
  //destination
  var AudioManager = function(options) {
    options = options || {};
    this.context = options.context || this._createContext();
    this.buffers = {};
    this.pendingBuffers = {};
    this.sources = {};
  };

  AudioManager.prototype = Object.create({});
  _.extend(AudioManager.prototype, Backbone.Events);
  AudioManager.fn = AudioManager.prototype;
  AudioManager.fn._createContext = function() {
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
  //ques up an audioFile to load. returns a promise for when its loaded
  AudioManager.fn.loadAudioObject = function(name, audioObject) {
    var defer = Promise.defer();
    if (audioObject.isReady()) {
      this.buffers[name] = audioObject;
      defer.resolve(audioObject);
      this.trigger('loaded', name);
    } else {
      this.pendingBuffers[name];
      audioObject.on('audioDataLoaded', _.bind(function() {
        this.buffers[name] = audioObject;
        delete this.pendingBuffers[name];
        defer.resolve(audioObject);
        this.trigger('loaded', name);
      }, this));
    }
    return defer.promise.bind(this);
  };
  AudioManager.fn.getBuffer = function(name) {
    var defer = Promise.defer();
    if (this.buffers[name]) {
      defer.resolve({
        name: name, 
        buffer: this.buffers[name]
      });
    } else {
      if (this.pendingBuffers[name]) {
        this.once(this.pendingBuffers[name], 'audioDataLoaded', function(bufferData) {
          return defer.resolve({
            name: name, 
            buffer: bufferData
          });
        });
      }
    }
    return defer.promise.bind(this);
  };
  //takes an object with {name: "*", buffer:"*"}
  AudioManager.fn.createSource = function(bufferData) {
      var name = bufferData.name;
      var buffer = bufferData.buffer;
      if (this.sources[name]) {
        sources[name].stop();
        delete sources[name];
      }
      this.sources[name] = buffer.createSource(this.context);
      var source = this.sources[name];
      return source;
  };
  AudioManager.fn.playBuffer = function(bufferName, startTime) {
    startTime = startTime || 0;
    return this.getBuffer(bufferName)
      .then(this.createSource)
      .then(function(source) {
        source.connect(this.context.destination);
        source.start(startTime);
      });
  };

  registerModule('AudioManager', AudioManager);




}).call(this);


