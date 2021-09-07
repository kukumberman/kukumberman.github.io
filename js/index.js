const value = "Cucumber";
document.querySelector("#title").textContent = btoa(value);

const soundBtn = document.querySelector("#btn-sound");
const playBtn = document.querySelector("#btn-play");
const iconClass = "fas fa-2x";

const state = {
  _isPlaying: false,
  get isPlaying() {
    return this._isPlaying;
  },
  set isPlaying (value) {
    this._isPlaying = value;
    this.updatePlayBtn();
    const func = this.isPlaying ? "play" : "pause";
    this.playables.all.forEach(element => element[func]());
  },
  _isMuted: false,
  get isMuted() {
    return this._isMuted;
  },
  set isMuted(value) {
    this._isMuted = value;
    this.updateSoundBtn();
    this.playables["audio"].muted = this.isMuted;
  },
  updatePlayBtn: function() {
    playBtn.className = [(this.isPlaying ? "fa-pause" : "fa-play"), iconClass].join(" ");
  },
  updateSoundBtn: function() {
    soundBtn.className = [(this.isMuted ? "fa-volume-mute" : "fa-volume-up"), iconClass].join(" ");
  },
  playables: {
    all: ["video", "audio"],
  },
  init: function() {
    this.playables.all = this.playables.all.map(selector => {
      const element = document.querySelector(selector);
      this.playables[selector] = element;
      return element;
    });

    state.updatePlayBtn();
    state.updateSoundBtn();

    playBtn.addEventListener("click", event => {
      this.isPlaying = !this.isPlaying;
    });
    
    soundBtn.addEventListener("click", event => {
      this.isMuted = !this.isMuted;
    });
  }
}

state.init();
