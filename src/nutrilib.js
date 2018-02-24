var nutrilib = (function () {
  var nutrient = require('./decentralizedNutrient.js');
  var eaten = require('./eaten');
  var recipes = require('./recipes');
  var users = require('./users.js');

  function calculateNutrient (amount, reagentName, nutrientName) {
    return nutrient[reagentName][nutrientName] * (amount / 100);
  }

  function showMeTheHorror (reagents, servings = 1) {
    var reagentName, nutrientName, nutrientSum = {};

    var foundNutrients = {};
    var theHorror = {
      servings
    };

    for (reagentName in reagents) {
      for (nutrientName in nutrient[reagentName]) {
        if (reagents.hasOwnProperty(reagentName) &&
            nutrient[reagentName].hasOwnProperty(nutrientName)) {

          nutrientSum[nutrientName] =
            nutrientSum[nutrientName] || 0;

          nutrientSum[nutrientName] +=
            calculateNutrient(reagents[reagentName],
                              reagentName,
                              nutrientName);

          foundNutrients[nutrientName] = true;

        }
      }
    }

    theHorror.missingNutrients =
      findMissingNutrients(Object.keys(foundNutrients),
                           Object.keys(reagents));
    theHorror.nutrients = nutrientSum;

    return theHorror;
  }

  // requiredNutrients is an array of nutrient names
  // reagents is an array of reagentNames
  function findMissingNutrients (requiredNutrients, reagents) {
    var missing = {};

    requiredNutrients.forEach((nutrientName)=> {
      reagents.forEach((reagentName)=>{
        if (!nutrient[reagentName] ||
            !nutrient[reagentName][nutrientName]) {
          missing[reagentName] = missing[reagentName] || {};
          missing[reagentName][nutrientName] = true;
        }
      });
    });

    return missing;
  }

  function takeABit (food, bitWeight) {
    var totalWeight = 0;
    var bit = {};
    var reagent;

    for (reagent in food) {
      if (food.hasOwnProperty(reagent)) {
        totalWeight += food[reagent];
      }
    }


    for (reagent in food) {
      if (food.hasOwnProperty(reagent)) {
        bit[reagent] = (food[reagent] / totalWeight) * bitWeight;
      }
    }

    return bit;
  };

  function combine (toCombine) {
    var combined = {};

    toCombine.forEach((reagents) => {
      for (var reagentName in reagents) {
        if (reagents.hasOwnProperty(reagentName)) {
          combined[reagentName] = combined[reagentName] || 0;
          combined[reagentName] += reagents[reagentName];
        }
      }
    });

    return combined;
  };

  return {
    calculateNutrient: calculateNutrient,
    nutrient: nutrient,
    eaten: eaten,
    showMeTheHorror : showMeTheHorror,
    takeABit : takeABit,
    recipes : recipes,
    combine : combine
  };
})();

module.exports = nutrilib;


// nutrilib.
//   showMeTheHorror(nutrilib.eaten[1].
//                   dinner, 2);
// nutrilib.
//   showMeTheHorror(nutrilib.eaten[nutrilib.eaten.length - 1].
//                   desayuno);
// nutrilib.showMeTheHorror(nutrilib.eaten[nutrilib.eaten.length - 1].eaten);
// var bit = nutrilib.takeABit(nutrilib.eaten[nutrilib.eaten.length-1].cena, 35);
// console.log("THE BIT==================================================");
// console.log(bit);
// nutrilib.showMeTheHorror(bit);
