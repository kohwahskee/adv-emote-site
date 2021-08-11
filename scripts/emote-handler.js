var cnt = 0;
wnd = document.getElementById("photopea").contentWindow;
const urlParams = new URLSearchParams(window.location.search);
const pepegaSignLink =
  "https://kohwahskee.github.io/emoteEditor/assets/PepegaSign.psd";
const PETlink =
  "https://kohwahskee.github.io/emoteEditor/assets/PETTHEEMOTE.psd";
const hazmatLink =
  "https://kohwahskee.github.io/emoteEditor/assets/pepeHazmat.psd";
const signLink =
  "https://kohwahskee.github.io/emoteEditor/assets/PeepoSign.psd";
const signALink =
  "https://kohwahskee.github.io/emoteEditor/assets/peepoSignAnimated.psd";
const lurkLink = "https://kohwahskee.github.io/emoteEditor/assets/lurk.psd";
const clapSign = "https://kohwahskee.github.io/emoteEditor/assets/clapSign.psd";
const comicLink = "https://kohwahskee.github.io/emoteEditor/assets/comic.ttf";
const comiciLink = "https://kohwahskee.github.io/emoteEditor/assets/comici.ttf";
const comicbLink =
  "https://kohwahskee.github.io/emoteEditor/assets/comicbd.ttf";

const emote = urlParams.get("e");

window.addEventListener('load', function () {
  setStatus('emoteLoading');
  if (emote) {
    if (emote === 'lurk') { window.addEventListener('message', lurkEmote) };
  }         
});


function lurkEmote() {
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
        if (bytes < 1000) return Math.round(bytes*10)/10 + ' B';
        else if (bytes >= 1000 && bytes < 1000000) return Math.round((bytes / 1000)*10)/10 + ' KB';
        else if (bytes >= 1000000) return Math.round((bytes / 1000000) * 10) / 10 + ' MB';
      }
      
      setStatus("emoteLoaded");
    }

  }, { once: true });

}
