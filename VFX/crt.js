const container = document.createElement("div");
container.className = "VFX";

const audioAmbient = document.createElement("audio");
audioAmbient.src = "1Ambient.mp3";
audioAmbient.className = "AmbientAudio";

const audioServer = document.createElement("audio");
audioServer.src = "1Ambient.mp3";
audioServer.className = "serverAudio";

const acrylDiv = document.createElement("div");
acrylDiv.className = "acryl";

const img = document.createElement("img");
img.src = "assets/images/beam.png";
img.className = "effect";
img.alt = "decor";

container.appendChild(audioAmbient);
container.appendChild(audioServer);
container.appendChild(acrylDiv);
container.appendChild(img);

const parent = document.body;
parent.appendChild(container);

const windowMaxHeight = document.documentElement.clientHeight;
const elem = document.querySelector(".acryl");

const k = 0.2;

function me() {
  for (let i = -50; i < windowMaxHeight + 10; i++) {
    setTimeout(
      () => {
        if (elem) elem.style.marginTop = `${i}px`;
      },
      (5 * i) / k,
    );
  }
}

me();
setInterval(me, ((windowMaxHeight + 10) * 5.01) / k);
