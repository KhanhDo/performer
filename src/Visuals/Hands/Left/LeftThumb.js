var Finger = require('../Finger.js').Finger;

var LeftThumb = module.exports.LeftThumb = function(handInfo) {
  Finger.call(this, handInfo.keyboard);
  var thumbGeometry = new THREE.CubeGeometry(handInfo.thumbWidth, handInfo.thumbHeight, handInfo.thumbLength);
  var thumbMaterial = new THREE.MeshLambertMaterial({color: handInfo.thumbColor});
  var thumbPosition = new THREE.Vector3(0, 0.30, 0.6);
  this.model = new THREE.Mesh(thumbGeometry, thumbMaterial);
  this.model.position.copy(thumbPosition);
  this.originalY = thumbPosition.y;
  this.number = 1;
  var distances = this.distances;

  this.moveAsNeeded = function(finger, newPosition, newNote) {
    var curX = this.currentPos.x;
    var delta = newPosition - curX;
    switch (finger) {
    case 5:
      this.pinkyRules(delta, curX, newNote);
      break;
    case 4:
      this.ringRules(delta,curX,newNote);
      break;
    case 3:
      this.middleRules(delta,curX,newNote);
      break;
    case 2:
      this.indexRules(delta,curX,newNote);
    }
  };

  this.pinkyRules = function(delta, curX, newNote) {
    if ( delta > distances[-12] && delta < distances[-5]) { //this is like the 'stretch' zone
      return;
    } else if (delta > 0 && delta < distances[1]) { //this is when the pinky crosses over thumb
      var _this = this;
      setTimeout(_this.moveToNote(newNote + 7), 100);
    }else { //definitely move
      this.moveToNote(newNote + 7);
    }
  };
  this.ringRules = function(delta, curX, newNote) {
    if ( delta > distances[-9] && delta < distances[-4] ) {
      return;
    }else if (delta > 0 && delta < distances[2]) { //this is when the ring crosses over thumb
      var _this = this;
      setTimeout(_this.moveToNote(newNote + 5), 100);
    }else {
      this.moveToNote(newNote + 5);
    }
  };
  this.middleRules = function(delta, curX, newNote) {
    if ( delta > distances[-7] && delta < distances[-2] ) {
      return;
    }else if (delta > 0 && delta < distances[4]) { //this is when the middle crosses over thumb
      var _this = this;
      setTimeout(_this.moveToNote(newNote + 4), 100);
    }else {
      this.moveToNote(newNote + 4);
    }
  };
  this.indexRules = function(delta, curX, newNote) {
    if ( delta > distances[-4] && delta < 0 ) {
      return;
    }else if (delta > 0 && delta < distances[2]) { //this is when the index crosses over thumb
      var _this = this;
      setTimeout(_this.moveToNote(newNote + 2), 100);
    }else {
      this.moveToNote(newNote + 2);
    }
  };
  this.setUpNewTween = function() {
    var _this = this;
    var update = function() {
      _this.model.position.x = _this.currentPos.x;
      _this.model.position.y = _this.currentPos.y + 0.1
      _this.model.position.z = _this.currentPos.z + 0.2;
    };
    var easing = TWEEN.Easing.Quadratic.Out;

    var tween = new TWEEN.Tween(this.currentPos)
      .to(this.newPos, 150)
      .easing(easing)
      .onUpdate(update);

    tween.start();
  };
};

LeftThumb.prototype = Object.create(Finger.prototype);
LeftThumb.prototype.constructor = LeftThumb;
