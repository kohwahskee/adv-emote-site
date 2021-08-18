var cnt = 0;
wnd = document.getElementById("photopea").contentWindow;
const urlParams = new URLSearchParams(window.location.search);
const pepegaSignLink =
  "https://kohwahskee.github.io/adv-emote-site/assets/PepegaSign.psd";
const PETlink =
  "https://kohwahskee.github.io/adv-emote-site/assets/PETTHEEMOTE.psd";
const hazmatLink =
  "https://kohwahskee.github.io/adv-emote-site/assets/pepeHazmat.psd";
const signLink =
  "https://kohwahskee.github.io/adv-emote-site/assets/PeepoSign.psd";
const signALink =
  "https://kohwahskee.github.io/adv-emote-site/assets/peepoSignAnimated.psd";
const lurkLink = "https://kohwahskee.github.io/adv-emote-site/assets/lurk.psd";
const clapSign = "https://kohwahskee.github.io/adv-emote-site/assets/clapSign.psd";
const comicLink = "https://kohwahskee.github.io/adv-emote-site/assets/comic.ttf";
const comiciLink = "https://kohwahskee.github.io/adv-emote-site/assets/comici.ttf";
const comicbLink =
  "https://kohwahskee.github.io/adv-emote-site/assets/comicbd.ttf";

const emote = urlParams.get("e");

window.addEventListener('load', function () {
  setStatus('emoteLoading');
  if (emote) {
    if (emote === 'lurk') { window.addEventListener('message', lurkEmote) }
    else if (emote === 'sign') { window.addEventListener('message', signEmote) }
    else if (emote === 'signA') { window.addEventListener('message', signAEmote) }

  }
});

function preferencesPerEmote(_textLayerName, _defaultFont, _emote, _fileFormat, _enabledOptions) {
  textLayerName = _textLayerName;
  defaultFont = _defaultFont;
  fontList["Default"] = defaultFont;
  whichEmote = _emote;
  fileFormat = _fileFormat;
  enabledOptions = _enabledOptions;
}

function lurkEmote() {
  preferencesPerEmote('user', 'ComicSansMS-Italic', 'lurk', 'png');

  cnt++;
  console.log(cnt);
  if (cnt == 1) {
    console.log(cnt);
    var loadFont1 = `app.open("${comiciLink}")`;
    var loadImage = `app.open("${lurkLink}", false)`;
    wnd.postMessage(loadFont1, "*");
    wnd.postMessage(loadImage, "*");
  }
  if (cnt == 4) {
    console.log("printed");
    var emoteName = urlParams.get("name") || '[text here]';
    console.log(emoteName);
    var changeName = `var nameLayer = app.activeDocument.layers.getByName('user');nameLayer.textItem.contents = '${emoteName}'`;
    wnd.postMessage(changeName, "*");
    console;
  }
  if (cnt == 5) {
    const emoteName = urlParams.get("name") || '[text here]';
    exportEmote('png', 'lurk', emoteName);
    window.removeEventListener('message', lurkEmote);
  }
}

function signEmote(e) {
  preferencesPerEmote('TEXT_HERE', 'ComicSansMS', 'signA', 'gif');

  cnt++;
  console.log(cnt);
  if (cnt == 1) {
    var loadFont1 = `app.open("${comicLink}")`
    var loadImage = `app.open("${signLink}", false)`;
    wnd.postMessage(loadFont1, '*');
    wnd.postMessage(loadImage, "*");
  }
  if (cnt == 4) {
    console.log('printed');
    var emoteName = urlParams.get('name');
    console.log(emoteName);
    var changeName = `var reText = '${emoteName}';var tLayer = app.activeDocument.layers.getByName('TEXT_HERE');var tLength = reText.length;if (tLength <= 4){tLayer.textItem.size = 65;tLayer.textItem.contents = reText;}else if (tLength <= 7){tLayer.textItem.size = 40;tLayer.textItem.contents = reText;}else
      {tLayer.textItem.size = 25;tLayer.textItem.contents = reText;}`;
    wnd.postMessage(changeName, "*");

  }
  if (cnt == 5) {
    const emoteName = urlParams.get("name") || '[text here]';
    exportEmote('png', 'sign', emoteName);
    window.removeEventListener('message', signEmote);
  }
}

function signAEmote(e) {
  preferencesPerEmote('TEXT_HERE', 'ComicSansMS', 'sign', 'png');

  cnt++;
  console.log(cnt);
  if (cnt == 1) {
    var loadFont1 = `app.open("${comicLink}")`
    var loadImage = `app.open("${signALink}", false)`;
    wnd.postMessage(loadFont1, '*');
    wnd.postMessage(loadImage, "*");
  }
  if (cnt == 4) {
    console.log('printed');
    var emoteName = urlParams.get('name');
    console.log(emoteName);
    var changeName = `var reText = '${emoteName}'; var tLength = reText.length; for (var x = 1; x <= 7; x++) { var group = app.activeDocument.layerSets.getByName('_a_holdSign' + x); var tLayer = group.layers.getByName('TEXT_HERE'); if (tLength <= 4) {
      tLayer.textItem.size = 65; tLayer.textItem.contents = reText; } else if (tLength <= 7) { tLayer.textItem.size = 40; tLayer.textItem.contents = reText; } else {
      tLayer.textItem.size = 25; tLayer.textItem.contents = reText; } } `;
    wnd.postMessage(changeName, "*");

  }
  if (cnt == 5) {
    const emoteName = urlParams.get("name") || '[text here]';
    exportEmote('gif', 'signA', emoteName);
    window.removeEventListener('message', signEmote);
  }
}
function changeFont(textLayer, fontName) {
  wnd.postMessage(
    `
  var textLayer = app.activeDocument.layers.getByName('${textLayer}');
  textLayer.textItem.font = '${fontName}';
  `,
    "*"
  );
}

function changeFontSize(textLayer, fontSize) {
  wnd.postMessage(
    `
  var textLayer = app.activeDocument.layers.getByName('${textLayer}');
  textLayer.textItem.size = new UnitValue(${fontSize}, px);
  `,
    "*"
  );
}

function changeFontColor(textLayer, fontColor) {
  wnd.postMessage(
    `
  var textLayer = app.activeDocument.layers.getByName('${textLayer}');
  var newColor = new SolidColor();
  newColor.rgb.hexValue = '${fontColor}';
  textLayer.textItem.color = newColor;
  `,
    "*"
  );
}

function changeEmoteText(textLayer, emoteText) {
  wnd.postMessage(
    `
    var textLayer = app.activeDocument.layers.getByName('${textLayer}');
    textLayer.textItem.contents = '${emoteText}';
  `,
    "*"
  );
}

function exportEmote(fileFormat, emote, emoteName) {

  var save = `app.activeDocument.saveToOE("${fileFormat}")`;
  wnd.postMessage(save, "*");
  window.addEventListener("message", (event) => {
    if (event.data !== "done") {
      const rawData = event.data;
      // ArrayBuffer -> Blob
      let imgBlob = new Blob([rawData], {
        type: `image/${fileFormat}`,
      });
      // Blob -> Image File
      let imgFile = new File([imgBlob], `emote.${fileFormat}`, {
        type: `image/${fileFormat}`,
      });
      var emoteOutput = document.getElementById("emote-output");
      emoteOutput.src = URL.createObjectURL(imgFile);


      let downloadName = emote;
      if (emoteName) {
        downloadName += emoteName.charAt(0).toUpperCase() + emoteName.slice(1);
      }

      if (downloadName.length >= 12) {
        downloadName = downloadName.substring(0, 11) + '...';
      }

      downloadButton.setAttribute(
        "download",
        `${downloadName}`
      );
      downloadButton.setAttribute("href", URL.createObjectURL(imgFile));

      // Populate info panel
      const sizeInfo = document.querySelector('.size-info').children[1];
      const nameInfo = document.querySelector('.name-info').children[1];
      const formatInfo = document.querySelector('.format-info').children[1];

      sizeInfo.innerText = convertByte(imgFile.size);
      nameInfo.innerText = `${downloadName}`;
      formatInfo.innerText = fileFormat

      function convertByte(bytes) {
        if (bytes < 1000) return Math.round(bytes * 10) / 10 + ' B';
        else if (bytes >= 1000 && bytes < 1000000) return Math.round((bytes / 1000) * 10) / 10 + ' KB';
        else if (bytes >= 1000000) return Math.round((bytes / 1000000) * 10) / 10 + ' MB';
      }

      setStatus("emoteLoaded");
    }

  }, { once: true });

}
