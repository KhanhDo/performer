module.exports.params = function(keyboard) {
  //should contain distance from one note to another, in half steps;
  var distances = {};
  distances[-12] = keyboard.keys[12].model.position.x - keyboard.keys[0].model.position.x;
  distances[-11] = keyboard.keys[12].model.position.x - keyboard.keys[1].model.position.x;
  distances[-10] = keyboard.keys[12].model.position.x - keyboard.keys[2].model.position.x;
  distances[-9] = keyboard.keys[12].model.position.x - keyboard.keys[3].model.position.x;
  distances[-8] = keyboard.keys[12].model.position.x - keyboard.keys[4].model.position.x;
  distances[-7] = keyboard.keys[12].model.position.x - keyboard.keys[5].model.position.x;
  distances[-6] = keyboard.keys[12].model.position.x - keyboard.keys[6].model.position.x;
  distances[-5] = keyboard.keys[12].model.position.x - keyboard.keys[7].model.position.x;
  distances[-4] = keyboard.keys[12].model.position.x - keyboard.keys[8].model.position.x;
  distances[-3] = keyboard.keys[12].model.position.x - keyboard.keys[9].model.position.x;
  distances[-2] = keyboard.keys[12].model.position.x - keyboard.keys[10].model.position.x;
  distances[-1] = keyboard.keys[12].model.position.x - keyboard.keys[11].model.position.x;
  distances[1] = keyboard.keys[1].model.position.x - keyboard.keys[0].model.position.x;
  distances[2] = keyboard.keys[2].model.position.x - keyboard.keys[0].model.position.x;
  distances[3] = keyboard.keys[3].model.position.x - keyboard.keys[0].model.position.x;
  distances[4] = keyboard.keys[4].model.position.x - keyboard.keys[0].model.position.x;
  distances[5] = keyboard.keys[5].model.position.x - keyboard.keys[0].model.position.x;
  distances[6] = keyboard.keys[6].model.position.x - keyboard.keys[0].model.position.x;
  distances[7] = keyboard.keys[7].model.position.x - keyboard.keys[0].model.position.x;
  distances[8] = keyboard.keys[8].model.position.x - keyboard.keys[0].model.position.x;
  distances[9] = keyboard.keys[9].model.position.x - keyboard.keys[0].model.position.x;
  distances[10] = keyboard.keys[10].model.position.x - keyboard.keys[0].model.position.x;
  distances[11] = keyboard.keys[11].model.position.x - keyboard.keys[0].model.position.x;
  distances[12] = keyboard.keys[12].model.position.x - keyboard.keys[0].model.position.x;
  return distances;
};