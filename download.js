(function(map) {
  map.zoomControl.setPosition("bottomright");
  const div = document.createElement("div");
  div.setAttribute("style", "position:absolute;top:5px;left:5px;width:auto;height:auto;z-index:2000");
  const button = document.createElement("button");
  button.innerHTML = "download";
  div.appendChild(button);
  document.body.appendChild(div);

  button.addEventListener("click", function() {
    const json = {
      "type": "FeatureCollection",
      "features": []
    };
    map.eachLayer(function(layer) {
      if (layer.feature)
        json.features.push(layer.feature);
    });

    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    saveAs(blob, `landformclassification_${new Date().getTime()}.json`);
  });

})(GSI.GLOBALS.map);
