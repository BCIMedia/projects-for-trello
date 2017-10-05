// Saves options to chrome.storage
function save_options() {
  var projectName = document.getElementById('projectName').value;
  var colorHex = document.getElementById('colorHex').value;
  if(projectName != "" && colorHex != ""){
    var _tmp = {}
    _tmp[projectName] = colorHex
    chrome.storage.sync.set(_tmp, function(){ });
    restore_options()
  }else{
    alert("Must specify a Project name and Color");
  }
}

function delete_option(option) {
  chrome.storage.sync.remove(option, function () {
    restore_options();
  });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    document.getElementById("list").innerHTML = '';
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(null, function(items) {
    // TODO: work on
    for (item in items) {
      var node = document.createElement("div");
      node.innerHTML = "<span class='color-swath' style='background:"+items[item]+";'></span>"+
        "<label class='project-name'>" + item + "</label>" +
        "<button class='delete-button' data-name='"+item+"'>X</button>";
      document.getElementById("list").appendChild(node);
    }
    $(".delete-button").click(function(){
      console.log($(this).data("name"));
      delete_option($(this).data("name"));
    });
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
