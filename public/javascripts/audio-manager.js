
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
      defer.resolve(this.buffers[name]);
    } else {
      if (this.pendingBuffers[name]) {
        this.listenTo(this.pendingBuffers[name], 'audioDataLoaded', function(bufferData) {
          defer.resolve(bufferData);
        });
      }
    }
    return defer.promise.bind(this);
  };
  AudioManager.fn.playBuffer = function(bufferName, startTime) {
    startTime = startTime || 0;
    if (this.sources[bufferName] && this.sources[bufferName].stop) {
      this.sources[bufferName].stop();
    }
    //(this.buffers[bufferName])  this.sources[bufferName] = this.buffers[bufferName];
    var defer = Promise.defer();
    if (this.buffers[bufferName]) {
      if (this.sources[bufferName]) {
        bufferName.stop(0);
      }
      this.sources[bufferName] = this.buffers[bufferName].createSource(this.context);
      defer.resolve(this.sources[bufferName]);
    } else if (this.pendingBuffers[bufferName]) {
      var buffer = this.pendingBuffers[bufferName];
      buffer.on('audioDataLoaded', _.bind(function() {
        this.sources[bufferName] = buffer.createSource(this.context);
        defer.resolve(this.sources[bufferName]);
      }, this));
    }
    //we chain the start time part and then return a promise to be called after
    return defer.promise.bind(this).then(function(source) {
      source.connect(this.context.destination);
      source.start(startTime);
    });
  };


  registerModule('AudioManager', AudioManager);




}).call(this);


