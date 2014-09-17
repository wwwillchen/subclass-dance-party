var makeBlinkyDancer = function(top, left, timeBetweenSteps){
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node[0].className = "dancer blinkyDancer";
};

makeBlinkyDancer.prototype = Object.create(makeDancer.prototype);
makeBlinkyDancer.prototype.constructor = makeBlinkyDancer;
makeBlinkyDancer.prototype.step = function(){  // call the old version of step at the beginning of any call to this new version of step
  var bindDancer = makeDancer.prototype.step.bind(this);
  bindDancer();
  this.$node.toggle();
};
