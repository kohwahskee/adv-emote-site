//=============== LISTENER =============== 
function setStatus(status) {
  if (status === "emoteLoading") {
    loadingBlob.play();
    blobContainer.classList.remove("loading-blob-hidden");
    emoteContainer.classList.add("emote-container-hidden");
    // Make settings unclickable
    settingsClickableToggle(false);
  }
  if (status === "emoteLoaded") {
    blobContainer.classList.add("loading-blob-hidden");
    emoteContainer.classList.remove("emote-container-hidden");
    loadingBlob.pause();

    // Make settings clickable
    settingsClickableToggle(true);
    setKnobTo0();
  }
}


function settingsClickableToggle(isClickable) {
  let prefBoxes = document.querySelectorAll(".prefBox");
  if (isClickable) {
    for (box of prefBoxes) {
      for (child of box.children) {
        child.classList.remove("pref-loading");
      }
      box.classList.remove("pref-loading");
    }
  }
  else {
    for (box of prefBoxes) {
      for (child of box.children) {
        child.classList.add("pref-loading");
      }
      box.classList.add("pref-loading");
    }
  }
}

