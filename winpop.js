$(document).ready(function(){
  createBackground();
  registerWindows();
  registerButtons();
});

var map = {};

function createBackground(){
  $("body").append($("<div>").attr("id", "winpopBack").css({
    "min-height":"100vh",
    "height":"100vh",
    "min-width":"100vw",
    "width":"100vw",
    "z-index":"3",
    "position":"fixed",
    "left":"0",
    "top":"0",
    "background-color":"#0008",
    "opacity":"0",
    "display":"none"
  }).click(function(){
    toggleWindow($("[active=1]").attr("tag"));
  }));
}

function registerWindows(){
  windows = $('[window]')
  windows.each(function(){
    var tag = $(this).attr("tag");
    if(tag == ""){
      console.log("Error: tagless window!");
    }else if(map[tag]!=undefined){
      console.log("Error: tag "+tag+" was already used!");
    }else{
      map[tag]=$(this);
      applyAtrributes(tag);
    }
  });
}


function applyAtrributes(tag){
  map[tag].addClass("winpop");
  map[tag].css("opacity", "0");
  map[tag].css("position", "fixed");
  //map[tag].css("position", "fixed");
  map[tag].css("z-index", "4");
  if(isUndefined(tag, "styling")){
    map[tag].css("opacity", "0");
    map[tag].css("display", "none");

  }else{
    map[tag].css("border", "solid black 3px")

  }

  if(isUndefined(tag, "width")){
      map[tag].css("min-width", "40vw");
      map[tag].css("width", "40vw");

      map[tag].css("left", "30vw");


  }else{
    map[tag].css("min-width", map[tag].attr("width")+"vw");
    map[tag].css("width", map[tag].attr("width")+"vw");

    map[tag].css("left", (parseInt(50 - map[tag].attr("width")/2))+"vw");
  }

  if(isUndefined(tag, "height")){
      map[tag].css("min-height", "70vh");
      map[tag].css("height", "70vh");

  }else{
    map[tag].css("min-height", map[tag].attr("height")+"vh");
    map[tag].css("height", map[tag].attr("height")+"vh");
  }

  if(isUndefined(tag, "back")){
    map[tag].attr("back", "#0008");
  }

  if(isUndefined(tag, "fill")){
    map[tag].css("background-color", "white");
  }else{
    map[tag].css("background-color", map[tag].attr("fill"));
  }

  map[tag].css("margin", "0 auto");
}

function isUndefined(tag, property){
  return map[tag].attr(property) == undefined;
}

function getWindow(tag){
  if(map[tag] == undefined){
    console.log("Error: no window with that tag was defined");
  }else{
    return map[tag];
  }
}

function toggleWindow(tag){
  var opacity = map[tag].css("opacity");
  if(parseInt(opacity) == 1){
    console.log("k");
    map[tag].attr("active", "0");
    map[tag].animate({
      opacity:0
    }, complete = function(){
      map[tag].css("display", "none");
    });
    $("#winpopBack").animate({
      opacity:0
    }, complete = function(){
      $("#winpopBack").css("display", "none");
    });
  }else{
    console.log("kk");
    map[tag].attr("active", "1");
    map[tag].css("display", "block");
    $("#winpopBack").css("display", "block");

    map[tag].animate({
      opacity:1
    });

    $("#winpopBack").animate({
      opacity:1
    });
  }
}

function registerButtons(){
  $("[toggleWindow]").each(function(){
    tag = $(this).attr("toggleWindow");
    if(map[tag]==undefined){
      console.log("Error: Button has wrong tag");
    }else{
      $(this).click(function(){
        toggleWindow($(this).attr("toggleWindow"));
      })
    }
  });
}
