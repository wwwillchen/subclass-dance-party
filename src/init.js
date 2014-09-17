$(document).ready(function(){
  window.dancers = [];

  $('.lineUp').on('click',function(){
    $('.blinkyDancer').css({'left': '10px'});
    $('.movingDancer').css({'left': '10px'})
  });

  $('body').on('click', '.Pokeball', function(){
      for (var i = 0; i < window.dancers.length; i++) {
        if (window.dancers[i]['$node'].hasClass("Pokeball")) {
          window.dancers.splice(i, 1);
        }
      }
    $(this).remove();
  });


  $('body').on('click', '.dancer', function(){

      var left = parseInt($(this).css("left"),10);
      var top = parseInt($(this).css("top"),10);
      var smallestDistance = 2000;
      var closestElement;
      var closestTop;
      var closestLeft;
      var closestHealth;
      var closestThing;
      for (var i = 0; i < window.dancers.length; i++) {
        var otherTop = parseInt(window.dancers[i]['$node'][0]['style']['top'],10);
        var otherLeft = parseInt(window.dancers[i]['$node'][0]['style']['left'],10);
        var n = Math.sqrt(Math.pow((left - otherLeft),2) + Math.pow((top - otherTop),2));
        if (n && n < smallestDistance) {
          smallestDistance = n;
          closestElement = window.dancers[i]['$node'][0];
          closestTop = parseInt(window.dancers[i]['$node'][0]['style']['top'],10);
          closestLeft = parseInt(window.dancers[i]['$node'][0]['style']['left'],10);
          closestHealth = window.dancers[i]['health'];
          closestThing = i;
        }
      }
      var callback;
      if (window.dancers[closestThing]['health'] > 1) {
        window.dancers[closestThing]['health']--;
        window.dancers[closestThing]['$node'][0]['childNodes'][0]['textContent'] = 'Health ' + window.dancers[closestThing]['health'];
      } else {
        window.dancers[closestThing]['$node'][0]['childNodes'][0]['textContent'] = 'Health 0';
        window.dancers[closestThing]['$node'][0]['className'] = 'Pokeball';
        if ($(this).hasClass("movingDancer")) {
          $(this).addClass("transformCharzard");
        }
        if ($(this).hasClass("blinkyDancer")){
          $(this).addClass("transformPikachu")
        }
      }

      $(this).addClass("dancerRotate");
      $(this).animate({
        left: closestLeft,
        top: closestTop
      },1000,function(){
        $(this).animate({
        left:left,
        top: top
      },1000,function(){$(this).removeClass('dancerRotate');})});
      console.log($(this)[0]['childNodes'][0]['dataset']['health']);

    });




  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random() + 10,
      $("body").width() * Math.random(),
      Math.random() * 3000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);

    });
});

