webaudio-basics
===============

playing around with the webaudio api

to start a, initialize the object. open your console

var AudioManager = requestModule('AudioManager');
var AudioFile = requestModule('AudioFile')
var audioManager = new AudioManager();
audioManager.loadAudioObject('weatherman', new AudioFile('/sounds/The_Dada_Weatherman_-_Circle_of_Sea.mp3')).then(function() {
  this.playBuffer('weatherman', 0);
})

var audioFile = new (requestModule('AudioFile'))('/sounds/The_Dada_Weatherman_-_Circle_of_Sea.mp3');


audioFile.play();
