// DEFAULT APPLY VALUES
let currFontValue = "Default", currFontSizeValue = "20px", currFontColorValue = 'undefined', currTextValue = '';
let textLayerName;
let defaultFont;
let fileFormat = 'png';
let enabledOptions = {};
let whichEmote;
const fontList = {
  "Default": defaultFont,
  "Pixel": "BPdots",
  "Handwritten": "Wagnasty",
  "Letter": "UnifrakturMaguntia",
  "Letter 2": "Satisfy-Regular",
  "Chalk": "AfterShok",
  "BlackOps": "BlackOpsOne-Regular"
}

// CONTAINERS
const prefWrappers = document.getElementsByClassName("pref-wrapper");
const scrollArrows = document.getElementsByClassName("scroll-arrows");
const settingsWrapper = document.getElementsByClassName("settings-wrapper")[0];
// FONT SIZE
const fontSizeButton = document.getElementsByClassName("dropIcon")[1];
const sizeOptions = document.getElementsByClassName("size-option");
const defaultFontSizeBox = document.getElementsByClassName("fontSize")[0];
const defaultFontSizeValue =
  document.getElementsByClassName("fontSizeValue")[0];
// FONT
const fontButton = document.getElementsByClassName("dropIcon")[0];
const fontOptions = document.getElementsByClassName("font-option");
const defaultFontBox = document.getElementsByClassName("font")[0];
const defaultFontValue = document.getElementsByClassName("fontValue")[0];

let isMinimized = true;
fontSizeButton.onclick = function () {
  dropList(
    1,
    sizeOptions,
    prefWrappers,
    fontSizeButton,
    defaultFontSizeBox,
    defaultFontSizeValue
  );
};
defaultFontValue.onclick = function () {
  dropList(
    0,
    fontOptions,
    prefWrappers,
    fontButton,
    defaultFontBox,
    defaultFontValue
  );
};
fontButton.onclick = function () {
  dropList(
    0,
    fontOptions,
    prefWrappers,
    fontButton,
    defaultFontBox,
    defaultFontValue
  );
};
function dropList(
  index,
  optionElements,
  wrapperElements,
  dropButton,
  defaultBox,
  defaultValue
) {
  console.log(isMinimized);
  if (isMinimized) {
    //open
    dropButton.style.transform = "rotate(180deg) translateY(50%)";
    let count = 0;
    for (let x = 0; x <= optionElements.length - 1; x++) {
      optionElements[x].style.transitionDelay = 15 * count + "ms";
      optionElements[x].classList.toggle("ANIMATION_option-expand");
      // Change default value to selected
      optionElements[x].onclick = function () {
        defaultValue.innerText = this.innerText;
        let count = 0;
        dropButton.style.transform = "translateY(-50%)";
        for (let x = optionElements.length - 1; x >= 0; x--) {
          optionElements[x].style.transitionDelay = 15 * count + "ms";
          optionElements[x].classList.toggle("ANIMATION_option-expand");
          count++;
        }

        defaultBox.style.borderBottomRightRadius = "1vw";
        defaultBox.style.borderBottomLeftRadius = "1vw";
        toggleWrapperAnimation();
        for (wrapper of wrapperElements) {
          wrapper.style.pointerEvents = "all";
        }
        isMinimized = !isMinimized;
      };
      count++;
    }

    // Minimize when click outside
    document.addEventListener(
      "mousedown",
      (evt) => {
        if (
          !isMinimized &&
          evt.target != dropButton &&
          evt.target.tagName != "LI" &&
          evt.target.tagName != "SPAN"
        ) {
          let count = 0;
          defaultBox.style.borderBottomRightRadius = "1vw";
          defaultBox.style.borderBottomLeftRadius = "1vw";
          dropButton.style.transform = "translateY(-50%)";
          toggleWrapperAnimation();
          for (let x = optionElements.length - 1; x >= 0; x--) {
            optionElements[x].style.transitionDelay = 15 * count + "ms";
            optionElements[x].classList.toggle("ANIMATION_option-expand");
            count++;
          }
          isMinimized = !isMinimized;

          for (wrapper of wrapperElements) {
            wrapper.style.pointerEvents = "all";
          }
        }
      },
      { once: true }
    );
    //Scale down the rest of the list
    defaultBox.style.borderBottomRightRadius = "0";
    defaultBox.style.borderBottomLeftRadius = "0";
    toggleWrapperAnimation();
  }
  // ANIMATION_Minimize list
  else {
    //close
    let count = 0;
    defaultBox.style.borderBottomRightRadius = "1vw";
    defaultBox.style.borderBottomLeftRadius = "1vw";
    dropButton.style.transform = "translateY(-50%)";
    toggleWrapperAnimation();
    for (let x = optionElements.length - 1; x >= 0; x--) {
      optionElements[x].style.transitionDelay = 15 * count + "ms";
      optionElements[x].classList.toggle("ANIMATION_option-expand");
      count++;
    }
    for (wrapper of wrapperElements) {
      wrapper.style.pointerEvents = "all";
    }
  }
  isMinimized = !isMinimized;

  //=============== ANIMATION TOGGLES ===============
  function toggleWrapperAnimation() {
    for (arrow of scrollArrows) {
      arrow.classList.toggle("arrows-hidden");
    }
    wrapperElements[index].classList.toggle("ANIMATION_selected-expand");
    if (defaultFontValue.style.pointerEvents === "none") {
      defaultFontValue.style.pointerEvents = "all";
    } else {
      defaultFontValue.style.pointerEvents = "none";
    }
    for (let y = 0; y < 4; y++) {
      if (y === index) {
      } else {
        wrapperElements[y].classList.toggle("ANIMATION_minimize-others");
        wrapperElements[y].style.pointerEvents = "none";
      }
    }
  }
}

//=============== FONT ===============
for (let x = 0; x <= fontOptions.length-1; x++) {
  fontOptions[x].addEventListener('click', evt => {
    knobButton.classList.add('knob-disabled');
    document.body.style.cursor = 'wait';
    changeFont(textLayerName, fontList[fontOptions[x].innerText]);
    
    setTimeout(() => {
      knobButton.classList.remove('knob-disabled');
      document.body.style.cursor = 'auto';
    }, 1500);
  }, {once: true})
}

//=============== FONT COLOR ===============
const fontColorButton = document.getElementsByClassName("fontColor")[0];
const fontColorPicker = new ColorPicker(fontColorButton);
function trackForKeyboard(evt) {
  if (evt.key === "Enter" || evt.key === "Escape") {
    textField.blur();
  }
}


// =============== TEXT INPUT ===============
const textField = document.getElementsByClassName("emote-text")[0];
const textLabel = document.getElementsByClassName("text-label")[0];
textField.onfocus = function () {
  prefWrappers[0].classList.toggle("ANIMATION_minimize-others");
  prefWrappers[0].style.pointerEvents = "none";
  prefWrappers[1].classList.toggle("ANIMATION_minimize-others");
  prefWrappers[1].style.pointerEvents = "none";
  prefWrappers[2].classList.toggle("ANIMATION_minimize-others");
  prefWrappers[2].style.pointerEvents = "none";
  textLabel.style.animation = "text-move-up 200ms ease-out forwards";
  textField.addEventListener("keydown", trackForKeyboard);
};

textField.onblur = function () {
  textField.removeEventListener("keydown", trackForKeyboard);
  prefWrappers[0].classList.toggle("ANIMATION_minimize-others");
  prefWrappers[0].style.pointerEvents = "all";
  prefWrappers[1].classList.toggle("ANIMATION_minimize-others");
  prefWrappers[1].style.pointerEvents = "all";
  prefWrappers[2].classList.toggle("ANIMATION_minimize-others");
  prefWrappers[2].style.pointerEvents = "all";
  textLabel.style.animation = "text-move-down 200ms ease-out forwards";
};


// =============== SCROLL CONTROL ===============
const settingWrapper = document.getElementsByClassName("settings-wrapper")[0];
const arrowsWrapper = document.getElementsByClassName("arrows-wrapper")[0];
let totalHeight = settingWrapper.scrollHeight - settingWrapper.offsetHeight;
settingWrapper.onscroll = function () {
  let scrollPercent = (settingWrapper.scrollTop / totalHeight) * 100;
  arrowsWrapper.style.transform = `translateY(${scrollPercent / 3}%)`;
  arrowsWrapper.style.opacity = 100 - scrollPercent;
};

// =============== APPLY BUTTON ===============
const knobMover = document.querySelector("#knob-mover");
const knobButton = document.querySelector(".apply-knob");
let initX;
let maxX;
const minX = 0;
let isDown = false;
let isDone = false;
let currX;
knobButton.addEventListener("mousedown", (evt) => {
  currX = 0;
  knobButton.style.animation = "none";
  maxX = (window.innerWidth / 100) * 6;
  initX = evt.pageX;
  isDown = true;
  document.querySelector("body").style.cursor = "grabbing";
  knobButton.style.cursor = "grabbing";
  window.addEventListener(
    "mouseup",
    (evt) => {
      document.querySelector("body").style.cursor = "auto";
      knobButton.style.cursor = "grab";
      isDown = false;
      knobMover.style.transition = "transform 150ms ease-out";
      const currTransX = parseFloat(
        knobMover.style.transform.match(/-*\d+/)[0]
      );
      if (currTransX < (maxX / 100) * 70) {
        // if not past 70%
        knobMover.style.transform = "translateX(0)";
        setTimeout(() => {
          knobMover.style.transition = "none";
        }, 150);
      } else {
        knobMover.style.transform = "translateX(6vw)";
        knobButton.className = "apply-knob knob-maxed-out";
        setTimeout(() => {
          knobMover.style.transition = "none";
        }, 150);
      }
    },
    { once: true }
  );
});

document.addEventListener("mousemove", (evt) => {
  if (!isDown) return;
  evt.preventDefault();
  let diffX = evt.movementX;
  let oneVw = maxX / 6; // = 1vw;
  if (currX >= maxX) {
    // De-accelerate forwards
    if (currX >= maxX + oneVw * 2 && currX <= maxX + oneVw * 3) {
      diffX *= 0.2;
    } else if (currX >= maxX + oneVw * 3) {
      diffX *= 0.05;
    }
  } else if (currX <= 0) {
    // De-accelerate backwards
    if (currX <= maxX - oneVw * 2 && currX >= maxX - oneVw * 3) {
      diffX *= 0.1;
    } else if (currX <= maxX - oneVw * 3) {
      diffX *= 0.05;
    }
  }

  currX += diffX;
  knobMover.style.transform = `translateX(${currX}px)`;
  if (currX >= (maxX / 100) * 70) {
    knobButton.classList.add("knob-70");
  } else {
    knobButton.classList.remove("knob-70");
  }
});

// Watch for class changes
const classObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.classList.contains("knob-maxed-out") && mutation.attributeName === 'class') {
      setStatus('emoteLoading');
      applyAction();
    }
  });
});

classObserver.observe(knobButton, { attributes: true });


function applyAction() {
  let changeCnt = 0;
  let messageCnt = 0;
  let newFontValue = document.querySelector('.fontValue').innerText;
  let newFontSizeValue = document.querySelector('.fontSizeValue').innerText;
  let newFontColorValue;
  let emoteName;

  if (document.querySelector('.fontColor').getAttribute('data-color') !== undefined) {
    newFontColorValue = document.querySelector('.fontColor').getAttribute('data-color');
  }
  let newTextValue = document.querySelector('.emote-text').value;

  if (newFontValue !== currFontValue) {
    changeFont(textLayerName, fontList[newFontValue]);
    currFontValue = newFontValue;
    console.log('Changed Font');
    changeCnt++;
  }
  if (newFontSizeValue !== currFontSizeValue) {
    changeFontSize(textLayerName, newFontSizeValue.match(/(\d+)\s*px/)[1]);
    currFontSizeValue = newFontSizeValue;
    console.log('Changed Font Size');
    changeCnt++;
  }
  if (newFontColorValue !== currFontColorValue) {
    changeFontColor(textLayerName, newFontColorValue);
    currFontColorValue = newFontColorValue;
    console.log('Changed Font Color');
    changeCnt++;
  }
  if (newTextValue !== currTextValue) {
    currTextValue = newTextValue;
    changeEmoteText(textLayerName, newTextValue);
    console.log('Changed Text');
    changeCnt++;
    emoteName = newTextValue;
  }
  if (changeCnt == 0) {
    setStatus('emoteLoaded');
  }
  else {
    window.addEventListener('message', applyChanges)
  }

  function applyChanges(evt) {
    console.log(changeCnt);
    if (evt.data === 'done') messageCnt++;
    if (messageCnt >= changeCnt) {
      if (newTextValue) {
        exportEmote(fileFormat, whichEmote, newTextValue);
      }
      else {
        exportEmote(fileFormat, whichEmote, currTextValue);
      }
      window.removeEventListener('message', applyChanges);
    }
    
  }
}

function setKnobTo0() {
  if (knobButton.className !== "apply-button") {
    knobMover.style.transition = "transform 150ms ease-out";
    knobButton.className = "apply-knob";
    knobMover.style.transform = "translateX(0)";
    setTimeout(() => {
      knobMover.style.transition = "none";
    }, 150);
  }

}

function setKnobTo100() {
  if (knobButton.className !== "apply-button knob-maxed-out") {
    console.log('reached');
    knobMover.style.transition = "transform 150ms ease-out";
    knobButton.className = "apply-knob knob-maxed-out";
    knobMover.style.transform = "translateX(6vw)";
    setTimeout(() => {
      knobMover.style.transition = "none";
    }, 150);
  };
}

// =============== OUTPUT ===============

const emoteContainer = document.querySelector("#emote-container");
const emoteOutput = document.querySelector("#emote-output");
const downloadButton = document.querySelector(".download-button");
const hoverArea = document.querySelector(".hover-area");
const infoPanel = document.querySelector(".info-panel");

emoteContainer.onmouseenter = function () {
  downloadButton.classList.add("download-button-triggered");
  infoPanel.classList.add("info-panel-triggered");
  emoteContainer.classList.add("emote-container-triggered");
};
emoteContainer.onmouseleave = function () {
  downloadButton.classList.remove("download-button-triggered");
  infoPanel.classList.remove("info-panel-triggered");
  emoteContainer.classList.remove("emote-container-triggered");
};

hoverTracking([emoteOutput, infoPanel]);

function hoverTracking(elements) {
  elements.forEach((element) => {
    element.onmouseenter = mouseEnterTriggered;
    element.onmouseleave = mouseLeaveTriggered;
  });
}

function mouseEnterTriggered() {
  emoteContainer.dispatchEvent(new MouseEvent("mouseenter"));
}

function mouseLeaveTriggered() {
  emoteContainer.dispatchEvent(new MouseEvent("mouseleave"));
}


//=============== BLOB ANIMATION =============== 
lottie.setQuality("low");
const blobContainer = document.querySelector(".loading-blob");
let loadingBlob = lottie.loadAnimation({
  container: blobContainer,
  renderer: "svg",
  loop: true,
  autoplay: false,
  path: "/assets/icons/circle-blob-animation2.json",
  name: "loadingBlobAnimation",
});

//=============== WAVE ANIMATION ===============
window.addEventListener('load', evt => {
  document.body.style.setProperty('--animation-state-on-load', 'running');
})

//=============== WILL-CHANGE DYNAMICALLY ===============

defaultFontBox.addEventListener("mouseenter", function () {
  for (li of this.children) {
    if (li.tagName === "LI") {
      li.style.willChange = "transform, opacity";
    }
  }

  prefWrappers[1].style.willChange = "transform, opacity, filter";
  prefWrappers[2].style.willChange = "transform, opacity, filter";
  prefWrappers[3].style.willChange = "transform, opacity, filter";
});
defaultFontBox.addEventListener("mouseleave", function () {
  for (li of this.children) {
    if (li.tagName === "LI") {
      li.style.willChange = "auto";
    }
  }

  prefWrappers[1].style.willChange = "auto";
  prefWrappers[2].style.willChange = "auto";
  prefWrappers[3].style.willChange = "auto";
});

defaultFontSizeBox.addEventListener("mouseenter", function () {
  for (li of this.children) {
    if (li.tagName === "LI") {
      li.style.willChange = "transform, opacity";
    }
  }
  prefWrappers[0].style.willChange = "transform, opacity, filter";
  prefWrappers[2].style.willChange = "transform, opacity, filter";
  prefWrappers[3].style.willChange = "transform, opacity, filter";
});

defaultFontSizeBox.addEventListener("mouseleave", function () {
  for (li of this.children) {
    if (li.tagName === "LI") {
      li.style.willChange = "auto";
    }
  }

  prefWrappers[0].style.willChange = "auto";
  prefWrappers[2].style.willChange = "auto";
  prefWrappers[3].style.willChange = "auto";
});

textField.addEventListener("mouseenter", function () {
  textLabel.style.willChange = "transform, opacity";
  this.style.willChange = "transform, opacity";

  prefWrappers[0].style.willChange = "transform, opacity, filter";
  prefWrappers[1].style.willChange = "transform, opacity, filter";
  prefWrappers[2].style.willChange = "transform, opacity, filter";
});

textField.addEventListener("mouseleave", function () {
  textLabel.style.willChange = "auto";
  this.style.willChange = "auto";
  prefWrappers[0].style.willChange = "auto";
  prefWrappers[1].style.willChange = "auto";
  prefWrappers[2].style.willChange = "auto";
});
