
(function() {
  //AudioManager manages a set of audio streams before running them into the 
  //destination
  var AudioManager = function() {
    this.buffers = {};
    
  };

  AudioManager.prototype = Object.create({});
  _.extend(AudioManager, Backbone.Events);
  AudioManager.fn = AudioManager.prototype;
  AudioManager.fn.loadBuffer = function() {
    
  };
  AudioManager.fn.playBuffer = function(bufferName) {
  
  };


  registerModule('AudioManager', AudioManager);




}).call(this);


