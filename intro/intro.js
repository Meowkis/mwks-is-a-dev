let UsernameCounter = 0;
let PasswordCounter = 0;

const Username = "Guest";
const Password = "******";

let startedLogging = false;
let flag = 0;

function checkInput() {
  const loginForm = document.querySelector("#loginForm");
  const IntroVideo = document.querySelector("#IntroVideo");
  const video = document.querySelector(".video-container");

  if (
    !startedLogging &&
    UsernameCounter >= Username.length &&
    PasswordCounter >= Password.length &&
    loginForm &&
    video
  ) {
    startedLogging = true;

    loginForm.classList.add("hidden");
    IntroVideo.classList.remove("hidden");

    video.play();
    playLoadedAudio(true);

    video.addEventListener("ended", () => {
      IntroVideo.classList.add("hidden");
    });
  }
}

function onUsernameInput(e) {
  if (flag == 0) {
    flag = 1;
  }
  UsernameCounter++;

  e.target.value = Username.substring(0, UsernameCounter);

  if (UsernameCounter >= Username.length && PasswordCounter < Password.length) {
    const passwordInput = document.querySelector(".passwordInput");

    if (passwordInput) {
      passwordInput.focus();
    }
  }

  checkInput();
}

function onPasswordInput(e) {
  PasswordCounter++;

  e.target.value = Password.substring(0, PasswordCounter);

  checkInput();
}

const loadAudio = async (audioName) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    const response = await fetch(audioName);
    const arrayBuffer = await response.arrayBuffer();
    loadedBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    console.log("loaded");
    return loadedBuffer;
  } catch (error) {
    console.error("err:", error);
  }
};

let audioCtx = null;
let loadedBuffer = null;

const playLoadedAudio = (loop = false) => {
  if (!audioCtx || !loadedBuffer) {
    console.warn("Аудио ещё не загружено или контекст не создан");
    return;
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume().then(() => {
      startSource(loop);
    });
  } else {
    startSource(loop);
  }
};

const startSource = (loop) => {
  const source = audioCtx.createBufferSource();
  source.buffer = loadedBuffer;
  source.loop = loop;

  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 1;
  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  source.start();
  console.log("Воспроизведение начато");
};

loadAudio("assets/audios/perfect_loop.wav");

const usernameInput = document.querySelector(".usernameInput");

const passwordInput = document.querySelector(".passwordInput");

usernameInput.addEventListener("input", onUsernameInput);

passwordInput.addEventListener("input", onPasswordInput);
