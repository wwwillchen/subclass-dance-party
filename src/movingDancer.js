var makeMovingDancer = function(top, left, timeBetweenSteps){
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node[0].className = "dancer movingDancer";
};

makeMovingDancer.prototype = Object.create(makeDancer.prototype);
makeMovingDancer.prototype.constructor = makeMovingDancer;
makeMovingDancer.prototype.step = function(){  // call the old version of step at the beginning of any call to this new version of step
  var bindDancer = makeDancer.prototype.step.bind(this);
  bindDancer();
  this.$node.toggle();
};
