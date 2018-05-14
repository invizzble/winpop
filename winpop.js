$(document).ready(function(){
  createBackground();
  registerWindows();
  registerButtons();
});

map = {};


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
      map[tag]={};
      map[tag].window=$(this);
      map[tag].create = function(){};
      map[tag].destroy= function(){};
      registerScenes(tag);
      applyAtrributes(tag);
    }
  });
}

function  registerScenes(tag){
  if(map[tag].window.children("[scene]").length != 0){
     if(map[tag].window.children("[scene=default]").length != 1){
       console.log("Warning: window with tag "+tag+" has no unique default scene!");
     }
     map[tag].scenes={};
  }
  map[tag].window.children("[scene]").each(function(){
    var scene = $(this).attr("scene");

    if(map[tag].scenes[scene] != undefined){
      console.log("Error: window with tag "+tag+" has scene "+scene+" defined multiple times");
    }else if(scene==""){
      console.log("Error: window with tag "+tag+" has scene without id");
    }else{
      //console.log(scene);
      map[tag].scenes[scene] = {};
      map[tag].scenes[scene].scene = $(this);
      map[tag].scenes[scene].create=function(){};
      map[tag].scenes[scene].destroy=function(){};
      applySceneAttributes(map[tag].scenes[scene]);
    }
  });
  if(map[tag].scenes != undefined){
    registerSceneButtons(tag);
  }
}

function applyAtrributes(tag){
  map[tag].window.addClass("winpop");
  map[tag].window.css("position", "fixed");
  map[tag].window.css("padding-top", "2vh");
  map[tag].window.css("padding-bottom", "2vh");
  map[tag].window.css("padding-left", "2vw");
  map[tag].window.css("padding-right", "2vw");

  //map[tag].window.css("position", "fixed");
  map[tag].window.css("z-index", "4");
  if(isUndefined(tag, "styling")){
    map[tag].window.css("opacity", "0");
    map[tag].window.css("display", "none");

  }else{
    map[tag].window.css("border", "solid black 3px")

  }

  if(isUndefined(tag, "width")){
      map[tag].window.css("min-width", "40vw");
      map[tag].window.css("width", "40vw");

      map[tag].window.css("left", "30vw");


  }else{
    map[tag].window.css("min-width", map[tag].window.attr("width")+"vw");
    map[tag].window.css("width", map[tag].window.attr("width")+"vw");

    map[tag].window.css("left", (parseInt(50 - map[tag].window.attr("width")/2))+"vw");
  }

  if(isUndefined(tag, "height")){
      map[tag].window.css("min-height", "70vh");
      map[tag].window.css("height", "70vh");
      if(isUndefined(tag, "top")){
        map[tag].window.css("top","15vh");
      }else{
        map[tag].window.css("top", map[tag].attr("top"));

      }

  }else{
    map[tag].window.css("min-height", map[tag].window.attr("height")+"vh");
    map[tag].window.css("height", map[tag].window.attr("height")+"vh");
    if(isUndefined(tag, "top")){
      map[tag].window.css("top", (100-map[tag].window.attr("height"))/2 +"vh");
    }else{
      map[tag].window.css("top", map[tag].attr("top"));
    }
  }

  if(isUndefined(tag, "back")){
    map[tag].window.attr("back", "#0008");
  }

  if(isUndefined(tag, "fill")){
    map[tag].window.css("background-color", "white");
  }else{
    map[tag].window.css("background-color", map[tag].window.attr("fill"));
  }

  map[tag].window.css("margin", "0 auto");
}

function applySceneAttributes(scene){
  var sceneEl = scene.scene
  sceneEl.css({
    "position":"relative",
    "height":"100%",
    "width":"100%"
  });
  if(sceneEl.attr("styling") == undefined){
    sceneEl.css("display","none")
  }
}

function isUndefined(tag, property){
  return map[tag].window.attr(property) == undefined;
}

function getWindow(tag){
  if(map[tag].window == undefined){
    console.log("Error: no window with that tag was defined");
  }else{
    return map[tag].window;
  }
}

function showWindow(tag, scene="default"){
  map[tag].create();

  map[tag].window.attr("active", "1");
  map[tag].window.css("display", "block");
  $("#winpopBack").css("display", "block");
  if(map[tag].scenes != undefined){
    /*map[tag].scenes[scene].scene.css("display","block");
    map[tag].scenes[scene].create();*/
    changeScene(tag, scene);
  }
  map[tag].window.animate({
    opacity:1
  });

  $("#winpopBack").animate({
    opacity:1
  });
}

function hideWindow(tag){
  map[tag].destroy();

  map[tag].window.attr("active", "0");
  map[tag].window.animate({
    opacity:0
  }, complete = function(){
    map[tag].window.css("display", "none");
  });
  $("#winpopBack").animate({
    opacity:0
  }, complete = function(){
    $("#winpopBack").css("display", "none");
  });
  if(map[tag].scenes != undefined){
    var scene =   map[tag].scenes[$("[scene][active=1]").attr("scene")];
    scene.destroy();
    scene.scene.attr("active", "0");
    scene.scene.css("display", "none");
  }
}

function toggleWindow(tag){
  var opacity = map[tag].window.css("opacity");
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
    var old = $("[scene][active=1]").attr("scene");
    if(old != undefined){
      map[tag].scenes[old].destroy();
      map[tag].scenes[old].scene.css("display", "none");
      map[tag].scenes[old].scene.attr("active", "0");
    }
    map[tag].scenes[scene].create();
    map[tag].scenes[scene].scene.attr("active", "1");
    map[tag].scenes[scene].scene.css("display","block");
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
    if(map[tag].window==undefined){
      console.log("Error: Button has wrong tag");
    }else{
      $(this).click(function(){
        toggleWindow($(this).attr("toggleWindow"));
      })
    }
  });
}

function onCreateWindow(tag, handler){
  if(map[tag]!=undefined){
    map[tag].create = handler;
  }else{
    console.log("Error: cannot set onCreate because there is no window with tag "+tag);
  }
}

function onDestroyWindow(tag, handler){
  if(map[tag] != undefined){
    map[tag].destroy = handler;
  }else{
    console.log("Error: cannot set onDestroy because there is no window with tag "+tag);
  }
}

function onCreateScene(tag, scene, handler){
  if(map[tag] == undefined){
    console.log("Error: cannot set onCreate for scene "+scene+" because there is no window with tag "+tag);
  }else if(map[tag].scenes[scene] == undefined){
    console.log("Error: cannot set onCreate because there is no scene "+scene+" in window with tag "+tag);
  }else{
    map[tag].scenes[scene].create = handler;
  }
}

function onDestroyScene(tag, scene, handler){
  if(map[tag] == undefined){
    console.log("Error: cannot set onDestroy for scene "+scene+" because there is no window with tag "+tag);
  }else if(map[tag].scenes[scene] == undefined){
    console.log("Error: cannot set onDestroy because there is no scene "+scene+" in window with tag "+tag);
  }else{
    map[tag].scenes[scene].destroy = handler;
  }
}
