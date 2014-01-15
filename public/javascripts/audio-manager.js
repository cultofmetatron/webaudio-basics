
(function() {
  //AudioManager manages a set of audio streams before running them into the 
  //destination
  var AudioManager = function(options) {
    options = options || {};
    this.context = options.context || this._createContext();
    this.buffers = {};
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
    } else {
      audioObject.on('audioDataLoaded', _.bind(function() {
        this.buffers[name] = audioObject;
        defer.resolve(audioObject);
      }, this));
    }
    return defer.promise.bind(this);
  };

  AudioManager.fn.playBuffer = function(bufferName, startTime) {
    

  };


  registerModule('AudioManager', AudioManager);




}).call(this);


