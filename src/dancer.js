// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps){
  this.time = timeBetweenSteps;
  this.health = 3;

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"><span class="health" data-health=' + this.health + '>' + "Health: " + this.health + '</span></span>');

  //this.step();
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);
};

makeDancer.prototype.step = function(){
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  var binded = this.step.bind(this);
  setTimeout(function() {binded()}, this.time);

};

makeDancer.prototype.setPosition = function(top, left){
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

makeDancer.prototype.lineUp = function(){
  this.$node[0].css({'left': '10px'});
};
