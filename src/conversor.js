function decentralize (obj) {
  var decentralized = {};

  for (var nutrient in obj) {
    for (var food in obj[nutrient]) {
      decentralized[food] = decentralized[food] || {};
      decentralized[food][nutrient] = obj[nutrient][food];
    }
  }

  return decentralized;
}

module.exports = {
  decentralize
};
