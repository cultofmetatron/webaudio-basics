(function() {

  var AudioManager = requestModule('AudioManager');
  var AudioFile = requestModule('AudioFile');
  var audioManager = new AudioManager();
  audioManager.loadAudioObject('weatherman',
      new AudioFile('/sounds/The_Dada_Weatherman_-_Circle_of_Sea.mp3', audioManager.context)).then(function() {
    this.playBuffer('weatherman', 0);
  });
  audioManager.loadAudioObject('feverDub',
      new AudioFile('/sounds/PDF_-_Fever_Dub.mp3', audioManager.context)).then(function() {
    this.playBuffer('feverDub', 0);
  });



  


}).call(this);
