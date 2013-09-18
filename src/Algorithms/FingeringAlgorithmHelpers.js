var costDb = require('./CostAlgorithm.js').createCostDatabase();
var mod = module.exports;

mod.notes = {0:'C', 1:'C#', 2:'D', 3:'Eb', 4:'E', 5:'F', 6:'F#', 7:'G', 8:'G#', 9:'A', 10:'Bb', 11:'B'};

var polyPhonicOptions = {
  '2': [[1,2], [1,3], [1,4], [1,5], [2,3], [2,4], [2,5], [3,4], [3,5], [4,5]],
  '3': [[1,2,3], [1,2,4], [1,2,5], [1,3,4], [1,3,5], [1,4,5], [2,3,4], [2,3,5], [2,4,5], [3,4,5]],
  '4': [[1,2,3,4], [1,2,3,5], [1,2,4,5], [1,3,4,5], [2,3,4,5]],
  '5': [[1,2,3,4,5]]
};

var endCap = [
  {note: 'endCap'},
  {note: 'endCap'},
  {note: 'endCap'},
  {note: 'endCap'},
  {note: 'endCap'},
];

var makeNoteNode = function(notes, fingers) {
  //the notes and fingers property can have either one or multiple notes. 
  this.notes = notes;
  this.fingers = fingers;
  this.nodeScore = 0;
  this.bestPrev = undefined;
};

var makeLayer = function(noteNumber) {
  var layer = [];
  for (var finger = 1; finger <= 5; finger++) {
    var node = new makeNoteNode(noteNumber, finger);
    layer.push(node);
  }
  return layer;
};

var makePolyPhonicLayer = function(noteNumbers) {
  var layer = [];
  var options = polyPhonicOptions[noteNumbers.length]; // this grabs the appropriate list of options. 
  for (var i = 0; i < options.length; i++) {
    var fingerChoice = options[i];
    var node = makeNoteNode(noteNumbers, fingerChoice);
    layer.push(node);
  }
};

mod.makeRHNoteTrellis = function(midiData) {
  var curPlaying = [];
  var trellis = [];
  //putting the endCap at the beginning is a convenience so we don't have to have special conditions in the traversal loop.
  trellis.push(endCap);
  for (var pair = 0; pair < midiData.length; pair++) {
    var eventData = midiData[pair][0].event;
    var note = eventData.noteNumber;
    if (eventData.noteNumber >= 60 && eventData.subtype === 'noteOn') {
      var layer = makeLayer(note);
      trellis.push(layer);
    }
  }
  return trellis;
};

mode.makeRHPolyNoteTrellis = function(midiData) {
  //i'll need a 'currentlyPlaying' array, a 'newLayer' array, and a 'lastwasOn' variable that tracks if the last event was a noteOn or noteOff
  //noteOn event comes in, put the note in currentlyPlaying
  //noteOff event comes in... 
  // if 'lastwasOn' is true, then place all currentlyPlaying into newLayer, and remove the noteOff from currentlyPlaying
  // if 'lastwasOn' is false, then remove that note from currentlyPlaying, and don't push anything to newLayer.
  var curPlaying = [];
  var lastWasOn = false;
  var trellis = [];

  for (var pair = 0; pair < midiData.length; pair++) {
    var eventData = midiData[pair][0].event;
    var note = eventData.noteNumber;
    if (note >= 60 && eventData.subtype === 'noteOn') {
      curPlaying.push(note);
      lastWasOn = true;
    }
    if (note >= 60 && eventData.subtype === 'noteOff') {
      if (lastWasOn) {
        var node = makePolyPhonicLayer(curPlaying);
        trellis.push(node);
      }else {
        var notePlace = curPlaying.indexOf(note);
        curPlaying.splice(notePlace, 1);
        lastWasOn = false;
      }
    }
  }
  return trellis;
};

mod.makeRHnotesData = function(midiData) {
  var noteData = [];
  for (var pair = 0; pair < midiData.length; pair++) {
    var eventData = midiData[pair][0].event;
    if (eventData.noteNumber >= 60 && eventData.subtype === 'noteOn') {
      noteData.push(midiData[pair]);
    }
  }
  return noteData;
}

mod.computeCost = function(n1,n2,f1,f2) {
  if (n1 === 'endCap' || n2 === 'endCap') {
    return 0;
  }
  var key = n1 + ',' + n2 + ',' + f1 + ',' + f2;
  return costDb[key];
};

mod.findMin = function(layer) {
  var minNode;
  var minScore = Infinity;
  for (var node = 0; node < layer.length; node++) {
    if (layer[node].nodeScore < minScore) {
      minScore = layer[node].nodeScore;
      minNode = node;
    }
  }
  return minNode;
};