var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      var result = "";
      switch (response["result"]) {
        case "0" :
          result = "0 弗氏海豚 (Lagenodelphis Hoset)";
          break;
        case "1" :
          result = "1 花紋海豚 (Grampus Griseus)";
          break;
        case "2" :
          result = "2 瓶鼻海豚 (Tursiops Truncatus)";
          break;
        case "3" :
          result = "3 粉紅海豚 (Pink Dolphin)";
          break;
        default :
          result = "4 大西洋黑白海豚 (Cephalorhynchus Hectori)";
      }
      el("result-label").innerHTML = `Result = ${result}`;
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

