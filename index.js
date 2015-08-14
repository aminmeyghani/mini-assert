'user strict';
/*
  Couple of helpers
*/

/*
  checks if input is an array.
*/
function isArray (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}
/* The main assert function
  usage:
  assert('Description ...', [ [inputs, as, array, of, arrays] ], someFn)(desiredOutput);
*/
module.exports = function (desc, args, fn) {
  return function (result) {
    var ø = Object.create({});
    var computed = (fn !== undefined) ? (fn.apply(ø, args)) : (args);
    var didPass;
    if (isArray(args)) {
     didPass = computed
              .map(function (c, i) { return c === result[i];})
              .filter(function (args) { return !args; }).length === 0;
    } else {
      didPass = (computed === result);
    }
    console.log(desc);
    if (!didPass) {
      console.error('--> Failed: ', computed, '≠', result);
    } else {
      console.log('√', computed, '=', result);
    }
  };
};
