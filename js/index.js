function changeTextArea() {
  var tArea = document.getElementById("myTextArea");
  var outDiv = document.getElementById("letters-container");
  var saveButton = document.getElementById("save-btn");

  outDiv.style = "display: block;";

  if (tArea.value === "" || tArea.value.match(/^[\d\s]+$/g)) {
    outDiv.innerHTML = "";
    outDiv.hidden = true;
    saveButton.style = "display: none;";
  } else {
    var textFiltred = filter(tArea.value);

    outDiv.hidden = false;

    outDiv.innerHTML = `<div class="flex-box"> ${textToImages(
      textFiltred
    )} <span id="mark">vnicius.github.io/neytype</span> </div>`;

    saveButton.style = "display: block;";
  }
}

function filter(text) {
  var result = text
    .toUpperCase()
    .replace(
      /([^A-Z\sÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž])+/g,
      ""
    );
  result = removeAccents(result);
  return result;
}

function removeAccents(text) {
  let accents =
    "ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
  let accentsOut =
    "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  text = text.split("");
  text.forEach((letter, index) => {
    let i = accents.indexOf(letter);
    if (i != -1) {
      text[index] = accentsOut[i];
    }
  });
  return text.join("");
}

function textToImages(text) {
  var inner = '<div class="flex-box-letters">';

  text.split("").forEach(letter => {
    if (letter === "\n" || letter === " ") {
      inner += "</div>";
      inner += '<div class="flex-box-letters">';
    } else {
      inner += `<img class="letter" src="images/letters/${letter}.png" alt="${letter}" />`;
    }
  });

  inner += "</div>";

  return inner;
}

function updateCanvas() {
  html2canvas(document.getElementById("letters-container")).then(canvas => {
    document.body.appendChild(canvas);
    console.log(canvas);
    var link = document.getElementById("download-link");
    link.href = canvas.toDataURL({
      format: "png",
      left: 0,
      top: 0,
      width: canvas.width,
      height: canvas.height
    });
    link.dowload = "neytype.png";
  });
}

function genCanvas() {
  html2canvas(document.getElementById("letters-container")).then(canvas => {
    canvas.toBlob(blob => {
      saveAs(blob, "neytype.png");
    });
  });
}
