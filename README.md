webaudio-basics
===============

playing around with the webaudio api

to start a, initialize the object. open your console
  var AudioManager = requestModule('AudioManager');
  var AudioFile = requestModule('AudioFile');
  window.audioManager = new AudioManager();
  audioManager.loadAudioObject('weatherman', new AudioFile('/sounds/The_Dada_Weatherman_-_Circle_of_Sea.mp3', audioManager.context));
  audioManager.loadAudioObject('feverDub', new AudioFile('/sounds/PDF_-_Fever_Dub.mp3', audioManager.context));
  
  audioManager.playBuffer('weatherman');
  audioManager.playBuffer('feverDub');



