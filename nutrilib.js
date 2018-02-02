nutrilib = (function () {
  var nutrient = require('./nutrient');
  var eaten = require('./eaten');

  function calculateNutrient (food, nutrient) {
    sum = 0;

    for (var name in food) {
      if (food.hasOwnProperty(name)) {
        sum += nutrient[name] * (food[name] / 100);
      }
    }

    return sum;
  }

  return {
    calculateNutrient,
    nutrient,
    eaten
  };
})();

module.exports = nutrilib;
