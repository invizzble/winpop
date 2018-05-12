$(document).ready(function(){
  createBackground();
  registerWindows();
  registerButtons();
});


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
      registerScenes(tag);
      applyAtrributes(tag);
    }
  });
}

function  registerScenes(tag){
  if(map[tag].children("[scene]").length != 0){
     if(map[tag].children("[scene=default]").length != 1){
       console.log("Warning: window with tag "+tag+" has no unique default scene!");
     }
     map[tag].scenes={};
  }
  map[tag].children("[scene]").each(function(){
    var scene = $(this).attr("scene");

    if(map[tag].scenes[scene] != undefined){
      console.log("Error: window with tag "+tag+" has scene "+scene+" defined multiple times");
    }else if(scene==""){
      console.log("Error: window with tag "+tag+" has scene without id");
    }else{
      //console.log(scene);
      map[tag].scenes[scene] = $(this);
      applySceneAttributes($(this));
    }
  });
  if(map[tag].scenes != undefined){
    registerSceneButtons(tag);
  }
}

function applyAtrributes(tag){
  map[tag].addClass("winpop");
  map[tag].css("position", "fixed");
  map[tag].css("padding-top", "2vh");
  map[tag].css("padding-bottom", "2vh");
  map[tag].css("padding-left", "2vw");
  map[tag].css("padding-right", "2vw");

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

function applySceneAttributes(scene){
  scene.css({
    "position":"relative",
    "height":"100%",
    "width":"100%"
  });
  if(scene.attr("styling") == undefined){
    scene.css("display","none")
  }
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

function showWindow(tag, scene="default"){
  map[tag].attr("active", "1");
  map[tag].css("display", "block");
  $("#winpopBack").css("display", "block");
  if(map[tag].scenes != undefined){
    map[tag].scenes[scene].css("display","block");
  }
  map[tag].animate({
    opacity:1
  });

  $("#winpopBack").animate({
    opacity:1
  });
}

function hideWindow(tag){
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
  $("[scene]").css("display","none");
}

function toggleWindow(tag){
  var opacity = map[tag].css("opacity");
  if(parseInt(opacity) == 1){
    //console.log("k");
    hideWindow(tag);
  }else{
    //console.log("kk");
    showWindow(tag);
  }
}

function changeScene(tag, scene){
  if(map[tag].scenes[scene]==undefined){
    console.log("Error: no scene with id "+scene + " in window with tag "+tag);
  }else{
    $("[scene]").css("display","none");
    map[tag].scenes[scene].css("display","block");
  }
}

function registerSceneButtons(win){
  $("[tag="+win+"] [setScene]").each(function(){
    $(this).click(function(){changeScene(win, $(this).attr("setScene"))});
  });
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
